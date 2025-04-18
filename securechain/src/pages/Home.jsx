import React, { useState, useEffect } from 'react';
import Testimonials from '../components/home/Testimonials';
import Faq from '../components/home/Faq';
// import Pricings from '../components/home/Pricings';
import Features from '../components/home/Features';
import Footer from '../components/home/Footer';

const Home = () => {
  const [animatedText, setAnimatedText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fullText = "Advanced threat detection powered by AI.";
  
  // Text animation effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const securityImages = [
    "https://media.istockphoto.com/id/1051409860/photo/protection-network-security-computer-in-the-hands-of-a-businessman.jpg?s=612x612&w=0&k=20&c=2niYoXfUd_hpwKX2PRwtXx-stLyp7EZFXMasBnZLRj0=",
    "https://media.istockphoto.com/id/1402450534/photo/padlock-with-keyhole-in-data-security-on-circuit-modern-safety-digital-concept.jpg?s=612x612&w=0&k=20&c=vBzRPNY53FvkckEBjRxZBm-3QTQd3bttgglFRPgYOqc=",
    "https://images.pexels.com/photos/5475752/pexels-photo-5475752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  ];
  
  const securityFeatures = ['Real-time Detection', 'Blockchain Verification', 'AI Analysis'];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        {/* Enhanced Navigation Bar */}
        <nav className="flex flex-col md:flex-row justify-between items-center mb-16 bg-blue-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl font-bold">CS</span>
            </div>
            <span className="text-xl font-bold">CyberShield</span>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden mt-4">
            <button onClick={toggleMenu} className="text-blue-600 hover:text-blue-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-8`}>
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">Home</a>
            <a href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">Dashboard</a>
            <a href="/detection" className="text-blue-600 hover:text-blue-800 font-medium">Intrusion Detection</a>
            <a href="/blockchain-ledger" className="text-blue-600 hover:text-blue-800 font-medium">Blockchain Ledger</a>
            <a href="/alert" className="text-blue-600 hover:text-blue-800 font-medium">Alerts</a>
            <a href="/analytics" className="text-blue-600 hover:text-blue-800 font-medium">Analytics</a>
            <a href="/assistant" className="text-blue-600 hover:text-blue-800 font-medium">Security Assistant</a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </nav>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Next-Generation Network Intrusion Detection
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-6 h-10">
              {animatedText}<span className="animate-pulse">|</span>
            </h2>
            <p className="text-lg mb-8 text-blue-600">
              Advanced security infrastructure powered by blockchain technology and autoencoder neural networks for superior threat detection and immutable security logs.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                Request Demo
              </button>
              <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-100 transition-colors">
                View Dashboard
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
              {securityImages.map((img, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img 
                    src={img} 
                    alt={`${securityFeatures[index]} Visualization`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-xl font-bold text-white">{securityFeatures[currentImageIndex]}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white text-blue-600 p-4 rounded-lg shadow-lg">
              <p className="font-bold text-lg">96%</p>
              <p className="text-sm">Detection Rate</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex justify-center space-x-6 md:space-x-16">
          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <div className="text-4xl mb-2 animate-bounce">🔍</div>
            <p>Detection</p>
          </div>
          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <div className="text-4xl mb-2 animate-bounce">🔒</div>
            <p>Protection</p>
          </div>
          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <div className="text-4xl mb-2 animate-bounce">⚡</div>
            <p>Response</p>
          </div>
        </div>
      </div>
      <div className='mb-26 mx-26'>
        <Features/>
      </div>
      <div className='mb-26'>
        <Faq/>
      </div>
      <div className='mb-26'>
        <Testimonials/>
      </div>
     <Footer/>

    </div>
  );
};

export default Home;