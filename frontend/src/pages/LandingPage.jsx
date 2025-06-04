import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Shield, Heart, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar'; // adjust if path differs

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                                Your Health, <span className="text-primary">Your Future</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                                Get personalized health insights and insurance recommendations based on your health profile.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                    size="lg" 
                                    onClick={() => navigate('/login')}
                                    className="text-base px-8"
                                >
                                    Get Started <ArrowRight className="ml-2" />
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="lg"
                                    onClick={() => {
                                        const featuresSection = document.getElementById('features');
                                        featuresSection?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-base"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                                alt="Health Assessment" 
                                className="rounded-lg shadow-2xl max-w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-accent">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our AI-powered platform helps you understand your health risks and find the best insurance options.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="border-t-4 border-t-primary">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                                        <CheckCircle className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Complete Assessment</h3>
                                    <p className="text-muted-foreground">
                                        Answer questions about your health history and lifestyle factors.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-primary">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                                        <Activity className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Get Your Risk Score</h3>
                                    <p className="text-muted-foreground">
                                        Receive a personalized health risk assessment based on your responses.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-primary">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Insurance Recommendations</h3>
                                    <p className="text-muted-foreground">
                                        View insurance options tailored to your health profile and needs.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Hear from people who have used our platform to improve their health and find the right insurance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "This platform helped me understand my health risks and find insurance that actually covers what I need.",
                                name: "Sarah Johnson",
                                title: "Marketing Manager"
                            },
                            {
                                quote: "The assessment was quick and easy, and the recommendations were spot on. Highly recommend!",
                                name: "Michael Chen",
                                title: "Software Developer"
                            },
                            {
                                quote: "I was surprised by how accurate the risk assessment was. It helped me take action to improve my health.",
                                name: "Emily Rodriguez",
                                title: "Teacher"
                            }
                        ].map((testimonial, index) => (
                            <Card key={index} className="h-full">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="flex-1">
                                        <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
                        <p className="text-muted-foreground mb-8">
                            Join thousands of users who have discovered their health risks and found the perfect insurance plan.
                        </p>
                        <Button 
                            size="lg" 
                            onClick={() => navigate('/login')}
                            className="text-base px-8"
                        >
                            Start Your Assessment <ArrowRight className="ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-accent/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0 flex items-center">
                            <Heart className="text-primary mr-2" />
                            <span className="font-semibold">Health Risk Assessment</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Health Risk Assessment. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
