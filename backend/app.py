from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from pymongo import MongoClient, errors
from dotenv import load_dotenv
import os
import pickle
import numpy as np
import tensorflow as tf
import pandas as pd
from collections import Counter
from datetime import datetime

# Initialize app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# Load environment variables
load_dotenv()

# MongoDB setup
try:
    MONGODB_URI = os.getenv('MONGODB_URI')
    client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    client.server_info()

    db = client['health_insurance']
    application_collection = db['application']
    policies_collection = db['insurance_policies']
    stats_collection = db['stats']

    if not stats_collection.find_one({"_id": "total_customers"}):
        stats_collection.insert_one({
            "_id": "total_customers",
            "count": application_collection.count_documents({})
        })

    print("✅ Connected to MongoDB")

except Exception as e:
    print("❌ MongoDB connection error:", e)
    application_collection = None
    policies_collection = None
    stats_collection = None

# Load ML model and preprocessor
try:
    with open('preprocessor.pkl', 'rb') as f:
        preprocessor = pickle.load(f)

    model = tf.keras.models.load_model('health_risk_model.h5')
    print("✅ ML Model and preprocessor loaded")
except Exception as e:
    print("❌ Model loading error:", e)
    model = None
    preprocessor = None

# Feature list
features = [
    'age', 'gender', 'preExistingConditions', 'smoker',
    'alcoholConsumption', 'bmiCategory', 'exerciseFrequency',
    'regularCheckups', 'familyHistory', 'stressLevel', 'condition_count'
]

# ---------- Project-1: ML Prediction ----------
@app.route('/predict', methods=['POST'])
def predict():
    if model is None or preprocessor is None:
        return jsonify({'error': 'Model not loaded properly'}), 500
    if application_collection is None:
        return jsonify({'error': 'Database not connected'}), 500

    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        selected_conditions = data.get('selectedConditions', [])
        data['condition_count'] = len(selected_conditions) if isinstance(selected_conditions, list) and 'None' not in selected_conditions else 0

        input_df = pd.DataFrame([data])
        if 'selectedConditions' in input_df.columns:
            input_df = input_df.drop(columns=['selectedConditions'])

        missing = [f for f in features if f not in input_df.columns]
        if missing:
            return jsonify({'error': f'Missing features: {missing}'}), 400

        processed = preprocessor.transform(input_df[features])
        prediction = model.predict(processed)
        risk_score = int(np.argmax(prediction))
        confidence = float(np.max(prediction))

        assessment = {
            **data,
            'riskScore': risk_score,
            'confidence': confidence,
            'selectedConditions': selected_conditions
        }

        result = application_collection.insert_one(assessment)
        return jsonify({
            'riskScore': risk_score,
            'confidence': confidence,
            'prediction': risk_score,
            'assessmentId': str(result.inserted_id)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# # ---------- Project-2: SocketIO + Policy APIs ----------
# def categorize_age(age):
#     try:
#         age = int(age)
#         if age < 20: return '<20'
#         elif age < 30: return '20-29'
#         elif age < 40: return '30-39'
#         elif age < 50: return '40-49'
#         elif age < 60: return '50-59'
#         else: return '60+'
#     except:
#         return None

# def compute_age_distribution():
#     try:
#         data = list(application_collection.find({}, {"age": 1, "_id": 0}))
#         ages = [doc.get("age") for doc in data if isinstance(doc.get("age"), (int, float))]
#         categories = [categorize_age(age) for age in ages if categorize_age(age)]
#         counts = Counter(categories)
#         return [{"name": cat, "count": counts.get(cat, 0)} for cat in ['<20', '20-29', '30-39', '40-49', '50-59', '60+']]
#     except Exception as e:
#         print(f"Age distribution error: {e}")
#         return []

# @socketio.on('connect')
# def handle_connect():
#     emit('age_update', compute_age_distribution())
def categorize_age(age):
    print(f"Categorizing age: {age}")
    if not isinstance(age, (int, float)) or age < 0:
        print(f"Skipping invalid age: {age} (not int/float or negative)")
        return None  # Skip invalid ages
    if age < 20:
        return '<20'
    elif 20 <= age < 30:
        return '20-29'
    elif 30 <= age < 40:
        return '30-39'
    elif 40 <= age < 50:
        return '40-49'
    elif 50 <= age < 60:
        return '50-59'
    else:
        return '60+'

# Function to compute and emit age distribution
def compute_and_emit_age_distribution(application_collection, socketio):
    try:
        # Fetch all documents with age field
        data_cursor = application_collection.find({}, {"age": 1, "_id": 0})
        all_docs = list(data_cursor)  # Convert to list for debugging
        print(f"Total documents fetched: {len(all_docs)}")
        print(f"All documents with age: {[doc for doc in all_docs]}")

        # Extract and filter valid ages
        ages = [doc.get("age") for doc in all_docs if isinstance(doc.get("age"), (int, float)) and doc.get("age") >= 0]
        print(f"Valid ages extracted: {ages}, Count: {len(ages)}")

        # Categorize ages
        age_groups = [categorize_age(age) for age in ages if categorize_age(age) is not None]
        print(f"Categorized age groups: {age_groups}")

        # Count occurrences
        group_counts = Counter(age_groups)
        print(f"Group counts: {dict(group_counts)}")

        # Prepare result with all age groups
        result = [
            {"name": group, "count": group_counts.get(group, 0)}
            for group in ['<20', '20-29', '30-39', '40-49', '50-59', '60+']
        ]
        print(f"Final age distribution result: {result}")

        # Emit to all connected clients
        socketio.emit('age_distribution', result)
        return result

    except Exception as e:
        print(f"❌ Error computing age distribution: {e}")
        socketio.emit('error', {'error': 'Failed to compute age distribution'})
        return None

# Route: GET /api/age-distribution
@app.route('/api/age-distribution', methods=['GET'])
def get_age_distribution():
    if application_collection is None:
        print("❌ No DB connection for age-distribution")
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        result = compute_and_emit_age_distribution(application_collection, socketio)
        if result is None:
            return jsonify({"error": "Failed to fetch age distribution."}), 500
        return jsonify(result)

    except Exception as e:
        print(f"❌ Error fetching age distribution: {e}")
        return jsonify({"error": "Failed to fetch age distribution."}), 500
@app.route('/api/customers', methods=['POST'])
def add_customer():
    data = request.get_json()
    required = ['age', 'gender', 'bmi', 'riskScore', 'preExistingConditions']
    if not all(data.get(f) is not None for f in required):
        return jsonify({"error": "Missing fields"}), 400

    try:
        entry = {
            'age': int(data['age']),
            'gender': data['gender'],
            'bmi': float(data['bmi']),
            'riskScore': int(data['riskScore']),
            'preExistingConditions': bool(data['preExistingConditions']),
            'timestamp': datetime.now().isoformat()
        }
        result = application_collection.insert_one(entry)
        stats_collection.update_one({"_id": "total_customers"}, {"$inc": {"count": 1}})
        socketio.emit('age_update', compute_and_emit_age_distribution())
        return jsonify({
            "message": "Customer added",
            "id": str(result.inserted_id),
            "totalCount": stats_collection.find_one({"_id": "total_customers"})['count']
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/customers/all', methods=['GET'])
def get_all_customers():
    try:
        customers = []
        for doc in application_collection.find({}):
            doc['_id'] = str(doc['_id'])  # convert ObjectId to string
            customers.append(doc)
        return jsonify(customers)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/policies', methods=['GET'])
def get_policies():
    try:
        policies = list(policies_collection.find({}, {"_id": 0}))
        return jsonify(policies)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/policies/filter', methods=['GET'])
def filter_policies():
    try:
        filters = {k: v for k, v in request.args.items() if v}
        query = {k: {"$regex": v, "$options": "i"} for k, v in filters.items()}
        results = list(policies_collection.find(query, {"_id": 0}))
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/age-distribution', methods=['GET'])
def get_age_dist():
    return jsonify(compute_and_emit_age_distribution())

@app.route('/api/risk-distribution', methods=['GET'])
def get_risk_dist():
    try:
        scores = [doc.get('riskScore', 0) for doc in application_collection.find({})]
        counts = Counter(scores)
        return jsonify({
            "low": counts.get(0, 0),
            "medium": counts.get(1, 0),
            "high": counts.get(2, 0)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------- Health Check ----------
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'database_connected': application_collection is not None
    })

# @app.route('/api/policies/recommend', methods=['GET'])
# def recommend_policies():
#     try:
#         risk_score = request.args.get('riskScore')
#         if risk_score is None:
#             return jsonify({'error': 'Missing riskScore parameter'}), 400

#         # Map numeric score to textual level
#         risk_map = {
#             '0': 'low',
#             '1': 'medium',
#             '2': 'high'
#         }

#         risk_level = risk_map.get(str(risk_score))
#         if risk_level is None:
#             return jsonify({'error': 'Invalid riskScore'}), 400

#         # Fetch policies by risk level
#         policies = list(policies_collection.find({'riskLevel': risk_level}, {"_id": 0}))
#         print("Received riskScore:", risk_score)
#         return jsonify(policies)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# from flask import request, jsonify
# from pymongo import MongoClient

# Assuming you already have MongoDB set up
# client = MongoClient("mongodb://localhost:27017/")
# db = client["your_database_name"]
# policies_collection = db["your_collection_name"]

# @app.route('/api/policies/recommend', methods=['GET'])
# def recommend_policies():
#     try:
#         risk_score = request.args.get('riskScore')
#         if risk_score is None:
#             return jsonify({'error': 'Missing riskScore parameter'}), 400

#         # Map riskScore to risk level used in your schema (capitalized)
#         risk_map = {
#             '0': 'Low',
#             '1': 'Medium',
#             '2': 'High'
#         }

#         risk_level = risk_map.get(str(risk_score))
#         if risk_level is None:
#             return jsonify({'error': 'Invalid riskScore value'}), 400

#         # Fetch policies that match the risk level
#         policies = list(policies_collection.find({'risk': risk_level}, {"_id": 0}))

#         return jsonify(policies), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/api/policies/recommend', methods=['GET'])
# def recommend_policies():
#     try:
#         risk_score = request.args.get('riskScore')
#         if risk_score is None:
#             return jsonify({'error': 'Missing riskScore parameter'}), 400

#         # Normalize input
#         risk_score = risk_score.lower()

#         # Accept either numeric or text form
#         risk_map = {
#             '0': 'low',
#             '1': 'medium',
#             '2': 'high',
#             'low': 'low',
#             'medium': 'medium',
#             'high': 'high'
#         }

#         risk_level = risk_map.get(risk_score)
#         if risk_level is None:
#             return jsonify({'error': 'Invalid riskScore'}), 400

#         # Fetch policies by risk level
#         policies = list(policies_collection.find({'risk': risk_level.capitalize()}, {"_id": 0}))
#         return jsonify(policies)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


@app.route('/api/policies/recommend', methods=['GET'])
def recommend_policies():
    try:
        risk_score = request.args.get('riskScore')
        if not risk_score:
            return jsonify({'error': 'Missing riskScore parameter'}), 400

        risk_map = {
            '0': 'low',
            '1': 'medium',
            '2': 'high',
            'low': 'low',
            'medium': 'medium',
            'high': 'high'
        }

        risk_level = risk_map.get(risk_score.lower())
        if not risk_level:
            return jsonify({'error': 'Invalid riskScore'}), 400

        # Case-insensitive search using regex
        query = {
            'risk': {
                '$regex': f'^{risk_level}$',
                '$options': 'i'
            }
        }

        policies = list(policies_collection.find(query, {"_id": 0}))
        return jsonify(policies)

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# ---------- Run Flask with SocketIO ----------
if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
