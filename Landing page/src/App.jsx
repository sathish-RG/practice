import React, { useState } from 'react';
import './App.css';

function App() {
  const handleJoinWhatsApp = () => {
    // Inject WhatsApp channel link here later
    window.location.href = 'https://whatsapp.com/channel/0029Vb8FE1UDeON3dFhrVq1C';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans selection:bg-blue-200">
      {/* Mobile Container inside Desktop View */}
      <div className="w-full max-w-md bg-white shadow-2xl relative flex flex-col min-h-screen">
        
        {/* Top Notification Bar */}
        <div className="w-full bg-yellow-400 py-2 px-4 shadow-sm z-10 sticky top-0 overflow-hidden">
          <div className="text-center font-bold text-gray-900 text-sm animate-pulse whitespace-nowrap">
            🔥 Limited Slots Available - Join 5,420+ Smart Shoppers!
          </div>
        </div>

        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          {/* Hero Section */}
          <div className="text-center mt-6 mb-8">
            <h1 className="text-3xl font-extrabold text-blue-700 leading-tight tracking-tight mb-4 drop-shadow-sm">
              Daily ₹500 - ₹2000 Save Panna Ready-ah? 💸
            </h1>
            <p className="text-base font-medium text-gray-600 leading-relaxed px-2">
              Amazon & Flipkart-la varra Hidden Loot Deals & 80% Off Offers-ah yarukum munnadi therinjika join our VIP WhatsApp Channel.
            </p>
          </div>

          {/* Social Proof / Recent Deal Alert Box */}
          <div className="mb-8 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-xl p-4 shadow-lg flex items-start space-x-3">
              <div className="mt-1 relative flex h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-green-500"></span>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-sm sm:text-base leading-snug">
                  🚨 Today's Top Deal: Branded TWS Earbuds at <span className="text-red-600 font-extrabold text-lg">₹199!</span>
                </p>
                <p className="text-xs text-gray-500 line-through mt-0.5">Original Price: ₹1499</p>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="mb-10 w-full px-2">
            <ul className="space-y-4">
              <li className="flex items-center text-gray-800 font-medium text-base bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                <span className="text-xl mr-3 bg-white rounded-full p-1 shadow-sm">⚡</span>
                Instant Price Drop Alerts
              </li>
              <li className="flex items-center text-gray-800 font-medium text-base bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                <span className="text-xl mr-3 bg-white rounded-full p-1 shadow-sm">💰</span>
                Best Earning & Cashback Offers
              </li>
              <li className="flex items-center text-gray-800 font-medium text-base bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                <span className="text-xl mr-3 bg-white rounded-full p-1 shadow-sm">🚫</span>
                No Spam. 100% Hand-picked Deals
              </li>
            </ul>
          </div>

          {/* Spacer to push footer down if needed */}
          <div className="flex-1"></div>

          {/* Call to Action Container */}
          <div className="w-full mt-auto mb-6">
            <button
              onClick={handleJoinWhatsApp}
              className="w-full bg-[#25D366] hover:bg-green-500 text-white font-extrabold text-xl py-4 px-6 rounded-2xl shadow-[0_10px_20px_rgba(37,211,102,0.4)] transform hover:-translate-y-1 transition duration-200 animate-bounce flex items-center justify-center space-x-2"
            >
              <span>JOIN WHATSAPP NOW</span>
              <span className="text-2xl">🚀</span>
            </button>
            <p className="text-center text-xs text-gray-400 font-medium mt-4">
              Join 5,420+ others. Slots filling fast!
            </p>
          </div>
        </div>

        {/* Footer/Disclaimer */}
        <div className="bg-gray-50 py-4 text-center border-t border-gray-200">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
            100% Free to Join • No Ads • Safe & Secure
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
