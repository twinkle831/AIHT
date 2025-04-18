import React, { useState, useEffect } from 'react';
import { Shield, Activity, Database, AlertTriangle, Bell, Settings, LogOut, Menu, X } from 'lucide-react';
import Dashboard from './components/DasHboard';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboardClick = () => {
    setShowDashboard(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                CyberShield
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
              <a href="#dashboard" onClick={handleDashboardClick} className="hover:text-blue-400 transition-colors">Dashboard</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-medium transition-colors">
                Log In
              </button>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 shadow-xl border-t border-slate-700">
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col space-y-4 py-4">
                <a href="#features" className="hover:text-blue-400 transition-colors py-2">Features</a>
                <a href="#dashboard" onClick={handleDashboardClick} className="hover:text-blue-400 transition-colors py-2">Dashboard</a>
                <a href="#about" className="hover:text-blue-400 transition-colors py-2">About</a>
                <a href="#contact" className="hover:text-blue-400 transition-colors py-2">Contact</a>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-medium transition-colors w-full">
                  Log In
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Dashboard Section */}
      {showDashboard ? (
        <section id="dashboard" className="pt-24 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Security Dashboard
              </span>
            </h2>
            <Dashboard />
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="pt-24 pb-16 md:pt-40 md:pb-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Next-Gen Network <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                      Intrusion Detection
                    </span> System
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-8">
                    Securing your network with blockchain technology and advanced AI-powered autoencoders for real-time threat detection.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-medium transition-colors">
                      Get Started
                    </button>
                    <button onClick={handleDashboardClick} className="bg-transparent border border-blue-400 hover:bg-blue-900/20 px-6 py-3 rounded-full font-medium transition-colors">
                      Live Demo
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-20 rounded-full"></div>
                    <img 
                      src="/api/placeholder/600/400" 
                      alt="Network Security Visualization" 
                      className="relative z-10 rounded-lg shadow-2xl border border-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 bg-slate-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Advanced Features
                  </span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Our cutting-edge platform combines blockchain technology with AI autoencoders for unparalleled network security and real-time threat detection.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 group">
                  <div className="bg-blue-600/20 p-3 rounded-lg inline-block mb-4">
                    <Activity className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">Real-time Monitoring</h3>
                  <p className="text-gray-400">
                    Continuous monitoring of network traffic with intelligent anomaly detection powered by our autoencoder architecture.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 group">
                  <div className="bg-blue-600/20 p-3 rounded-lg inline-block mb-4">
                    <Database className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">Blockchain Security</h3>
                  <p className="text-gray-400">
                    Immutable security logs stored on blockchain for tamper-proof record-keeping and distributed validation.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 group">
                  <div className="bg-blue-600/20 p-3 rounded-lg inline-block mb-4">
                    <AlertTriangle className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">Advanced Threat Detection</h3>
                  <p className="text-gray-400">
                    AI-powered analysis to identify sophisticated attacks and zero-day exploits with minimal false positives.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 group">
                  <div className="bg-blue-600/20 p-3 rounded-lg inline-block mb-4">
                    <Bell className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">Intelligent Alerts</h3>
                  <p className="text-gray-400">
                    Contextual notification system that prioritizes alerts based on threat severity and network impact.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 group">
                  <div className="bg-blue-600/20 p-3 rounded-lg inline-block mb-4">
                    <Settings className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">Customizable Dashboard</h3>
                  <p className="text-gray-400">
                    Fully customizable interface with drag-and-drop widgets to monitor the metrics that matter most to your organization.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 group">
                  <div className="bg-blue-600/20 p-3 rounded-lg inline-block mb-4">
                    <LogOut className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">Automated Response</h3>
                  <p className="text-gray-400">
                    Configure automated actions to respond to detected threats, from isolating devices to blocking malicious traffic.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Network?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Get started with our next-generation intrusion detection system today and experience the power of blockchain and AI combined.
              </p>
              <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg transition-colors">
                Request a Demo
              </button>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                CyberShield
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} CyberShield. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;