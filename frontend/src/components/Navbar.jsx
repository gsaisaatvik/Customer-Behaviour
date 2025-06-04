// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo / Brand */}
                <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => navigate('/')}
                >
                    <Heart className="text-primary mr-2" />
                    <span className="text-xl font-bold text-primary">GANESH INSURANCE</span>
                </div>

                {/* Navigation Links */}
                <div className="space-x-6 text-base font-medium">
                    <button 
                        onClick={() => {
                            const featuresSection = document.getElementById('features');
                            featuresSection?.scrollIntoView({ behavior: 'smooth' });
                        }} 
                        className="hover:text-primary transition"
                    >
                        About Us
                    </button>
                    <button 
                        onClick={() => navigate('/login')} 
                        className="hover:text-primary transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
