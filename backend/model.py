from tensorflow.keras.models import load_model

# Load the model
model = load_model('health_risk_model.h5')

# Print architecture summary
model.summary()