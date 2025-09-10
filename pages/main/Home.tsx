import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const Home: React.FC = () => {
    const { currentUser, setPanicMode, helplines, location, userLocations } = useAppContext();
    const [safetyScore] = useState(85); // Mock safety score
    const [isHelplineModalOpen, setIsHelplineModalOpen] = useState(false);
    
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getScoreMessage = (score: number) => {
        if (score >= 80) return "You are in a safe area.";
        if (score >= 50) return "Exercise caution. Moderately risky area.";
        return "High Alert. Avoid traveling alone.";
    };
    
    const quickActions = [
        { name: 'Share Location', icon: 'M7 16a4 4 0 01-7 0 4 4 0 017 0zM19 16a4 4 0 01-7 0 4 4 0 017 0z', onClick: () => alert('Share Location clicked!') },
        { name: 'Nearby Police', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', onClick: () => alert('Nearby Police clicked!') },
        { name: 'Helplines', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', onClick: () => setIsHelplineModalOpen(true) }
    ];

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Good Morning, {currentUser?.name.split(' ')[0]}</h1>
                <p className="text-gray-500">Welcome back to GeoRaksha</p>
            </header>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center mb-6">
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                        <path className={getScoreColor(safetyScore)} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${safetyScore}, 100`} strokeDashoffset="-25"></path>
                    </svg>
                    <div className="absolute">
                         <span className={`text-5xl font-bold ${getScoreColor(safetyScore)}`}>{safetyScore}</span>
                         <span className="block text-gray-500">Safety Score</span>
                    </div>
                </div>
                <p className={`mt-4 font-semibold ${getScoreColor(safetyScore)}`}>{getScoreMessage(safetyScore)}</p>
                <p className="text-sm text-gray-400 mt-1">Based on your current location and time of day.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex items-center">
                {location.latitude && location.longitude ? (
                    <>
                        <iframe
                            className="w-20 h-20 rounded-lg mr-4 object-cover flex-shrink-0"
                            title="user-location-map"
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.005},${location.latitude - 0.005},${location.longitude + 0.005},${location.latitude + 0.005}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
                            style={{ border: 0 }}
                            loading="lazy"
                        ></iframe>
                        <div>
                            {/* A reverse geocoding API would turn coordinates into a human-readable name. For now, showing coordinates is sufficient to demonstrate the feature is working. */}
                            <h3 className="font-bold text-gray-800">Your Current Location</h3>
                            <p className="text-xs text-gray-600 truncate">{`Lat: ${location.latitude.toFixed(4)}, Lon: ${location.longitude.toFixed(4)}`}</p>
                            <p className="text-sm text-green-600 bg-green-100 rounded-full px-2 py-0.5 inline-block font-medium mt-1">Low Risk Zone</p>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center w-full">
                         <div className="w-20 h-20 rounded-lg mr-4 bg-gray-200 animate-pulse flex-shrink-0"></div>
                         <div className="flex-grow">
                            <h3 className="font-bold text-gray-800">{location.error || 'Fetching location...'}</h3>
                            {location.error && <p className="text-xs text-red-500">Please enable location services.</p>}
                         </div>
                    </div>
                )}
            </div>
            
            {userLocations.length > 0 && (
                 <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
                    <h3 className="font-bold text-gray-800 mb-3 px-2">My Saved Places</h3>
                    <div className="space-y-2">
                        {userLocations.map(loc => (
                             <div key={loc.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                                <div className="bg-indigo-100 rounded-full p-2 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{loc.name}</p>
                                    <p className="text-sm text-gray-500">Pincode: {loc.pincode}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            <div className="grid grid-cols-3 gap-4 text-center mb-10">
                {quickActions.map(action => (
                    <div key={action.name} onClick={action.onClick} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition">
                         <div className="bg-blue-100 rounded-full p-3 mb-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                            </svg>
                         </div>
                        <span className="text-xs font-semibold text-gray-700">{action.name}</span>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-24 right-4 z-10">
                <button onClick={() => setPanicMode(true)} className="bg-red-600 text-white rounded-full p-5 shadow-2xl animate-pulse flex flex-col items-center justify-center transform hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-xs font-bold mt-1">SOS</span>
                </button>
            </div>
            
            {isHelplineModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Helplines</h2>
                        {helplines.length > 0 ? (
                            <ul className="space-y-3 max-h-64 overflow-y-auto">
                                {helplines.map(helpline => (
                                    <li key={helpline.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                        <div>
                                            <p className="font-semibold text-gray-800">{helpline.name}</p>
                                            <p className="text-sm text-gray-600">{helpline.phone}</p>
                                        </div>
                                        <a href={`tel:${helpline.phone}`} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex-shrink-0">
                                            Call
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No helplines have been added yet.</p>
                        )}
                        <button onClick={() => setIsHelplineModalOpen(false)} className="mt-6 w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;