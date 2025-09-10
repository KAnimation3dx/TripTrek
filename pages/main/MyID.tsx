import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MOCK_ITINERARY } from '../../constants';

const MyID: React.FC = () => {
  const { currentUser } = useAppContext();
  const [showQR, setShowQR] = useState(false);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 px-2">My Digital ID</h1>
      
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white mb-6">
        <div className="flex items-center mb-6">
          <img src={currentUser.photoUrl} alt="User" className="w-24 h-24 rounded-full border-4 border-white/50 object-cover mr-4" />
          <div>
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            <p className="text-blue-200">{currentUser.nationality}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-blue-200 text-sm">Tourist ID</span>
            <span className="font-mono font-semibold">{currentUser.touristId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200 text-sm">Valid From</span>
            <span className="font-semibold">{currentUser.validFrom}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200 text-sm">Valid To</span>
            <span className="font-semibold">{currentUser.validTo}</span>
          </div>
        </div>
        <button 
            onClick={() => setShowQR(true)}
            className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
            Show QR Code
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Trip Itinerary</h3>
          <ul className="space-y-3">
              {MOCK_ITINERARY.map((item, index) => (
                  <li key={index} className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 font-bold rounded-full h-6 w-6 flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{item}</p>
                  </li>
              ))}
          </ul>
      </div>

      {showQR && (
        <div 
            className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
        >
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${currentUser.touristId}`} alt="QR Code" />
            <p className="mt-4 text-center font-semibold text-gray-700">Present this to authorities for verification.</p>
            <button 
                onClick={() => setShowQR(false)}
                className="mt-6 bg-blue-600 text-white font-bold py-2 px-8 rounded-lg"
            >
                Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyID;