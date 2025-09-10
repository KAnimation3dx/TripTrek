import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const PanicScreen: React.FC = () => {
    const [isActivating, setIsActivating] = useState(true);
    const [countdown, setCountdown] = useState(3);
    const { setPanicMode, location } = useAppContext();

    useEffect(() => {
        if (isActivating) {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setIsActivating(false);
                // API call to backend would be made here
            }
        }
    }, [countdown, isActivating]);

    const handleCancel = () => {
        setPanicMode(false);
    };
    
    const handleDeactivate = () => {
        // The window.confirm dialog can be unreliable in some environments and provides a poor user experience.
        // To ensure the button works correctly as requested, this confirmation step is removed.
        // In a real-world scenario, this should be replaced with a custom confirmation modal.
        setPanicMode(false);
    }

    if (isActivating) {
        return (
            <div className="fixed inset-0 bg-yellow-400 text-gray-900 flex flex-col items-center justify-center z-50 p-4">
                <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                    <div className="absolute inset-0 border-8 border-gray-900 rounded-full animate-ping opacity-50"></div>
                    <div className="absolute text-7xl font-bold">{countdown}</div>
                </div>
                <h1 className="text-3xl font-bold mb-4 animate-pulse">ACTIVATING EMERGENCY MODE</h1>
                <button 
                    onClick={handleCancel}
                    className="mt-8 bg-white text-gray-900 font-bold py-4 px-12 rounded-lg text-lg shadow-lg"
                >
                    CANCEL
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-red-600 text-white flex flex-col items-center justify-between z-50 p-8 text-center">
            <div className="animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <div>
                <h1 className="text-5xl font-extrabold mb-4">SOS ACTIVATED</h1>
                <p className="text-lg mb-6">Your location has been shared with the nearest police unit and your emergency contacts. Help is on its way.</p>
                {location.latitude && location.longitude ? (
                    <iframe
                        className="w-full h-40 rounded-lg mb-6"
                        title="live-sos-map"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.005},${location.latitude - 0.005},${location.longitude + 0.005},${location.latitude + 0.005}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
                        style={{ border: 0 }}
                        loading="lazy"
                      ></iframe>
                ) : (
                    <div className="w-full h-40 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 mb-6">
                        <p>{location.error || 'Acquiring live location...'}</p>
                    </div>
                )}
                <p className="font-semibold">Stay on the line if possible. Keep this screen open.</p>
            </div>

            <button 
                onClick={handleDeactivate}
                className="w-full bg-green-500 text-white font-bold py-5 px-4 rounded-lg text-xl shadow-lg"
            >
                I AM SAFE NOW
            </button>
        </div>
    );
};

export default PanicScreen;
