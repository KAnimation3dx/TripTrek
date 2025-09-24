import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

// --- Helper Components for the new UI ---

const TouristView: React.FC<{ state: any; onGenerateId: () => void; onPanic: () => void; }> = ({ state, onGenerateId, onPanic }) => (
    <main className="w-full max-w-sm mx-auto bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono">9:41 AM</span>
            <div className="w-24 h-6 bg-black rounded-full"></div>
            <div>
                <svg className="inline w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m12.728 0L5.636 18.364"></path></svg>
                <svg className="inline w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.778 8.222c-4.296 0-7.778-3.482-7.778-7.778C9.333.2 8.65.01 8 .01 3.582.01.01 3.582.01 8c0 4.418 3.572 7.99 7.99 7.99C12.418 15.99 16 12.418 16 8c0-.65-.19-1.333-.444-1.778.02.002.04.004.06.006.23.084.47.15.714.194.24.04.48.07.726.088.25.02.5.02.75.012a.25.25 0 00.222-.222V8.222z" clipRule="evenodd"></path></svg>
            </div>
        </div>

        {!state.tourist.id ? (
            <div>
                <h2 className="text-lg font-semibold text-center text-cyan-400 mb-2">Welcome to NER</h2>
                <p className="text-xs text-center text-gray-400 mb-4">Generate your secure Blockchain ID to begin your trip.</p>
                <button onClick={onGenerateId} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                    Generate Secure Digital ID
                </button>
            </div>
        ) : (
            <div>
                <div className="text-center mb-4 p-3 bg-gray-900 rounded-lg">
                    <h3 className="text-sm font-semibold text-cyan-400">Blockchain Digital ID</h3>
                    <p className="text-xs font-mono text-gray-300 break-all">{state.tourist.id}</p>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${state.tourist.id}&bgcolor=2D3748&color=E0E0E0&qzone=1`} alt="QR Code" className="mx-auto mt-2 rounded-lg bg-gray-700"/>
                </div>
                
                <button onClick={onPanic} className="w-full h-24 bg-red-600 hover:bg-red-700 text-white font-bold text-2xl py-3 px-4 rounded-full transition-colors panic-button">
                    PANIC
                </button>

                <div className="mt-4 bg-gray-900 rounded-lg p-3">
                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">Activity Log</h3>
                    <div className="h-32 overflow-y-auto text-xs font-mono space-y-1">
                       {state.touristLog.map((log: any, index: number) => (
                           <p key={index} dangerouslySetInnerHTML={{ __html: log.message }} />
                       ))}
                    </div>
                </div>
            </div>
        )}
    </main>
);

const AuthorityView: React.FC<{ state: any; }> = ({ state }) => (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Real-time Tourist Monitoring</h2>
            <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden border-2 border-dashed border-gray-600">
                <div className="absolute top-2 left-2 text-xs bg-black/50 p-1 rounded">North Eastern Region - Demo Area</div>
                <div className="absolute" style={{ top: '50%', left: '50%', width: '50%', height: '50%' }} title="High-Risk Geofenced Zone">
                   <div className="w-full h-full bg-red-500/10 border-2 border-red-500 border-dashed rounded-lg flex items-center justify-center">
                       <span className="text-red-500 font-bold text-xs opacity-50">HIGH-RISK ZONE</span>
                   </div>
                </div>
                <div className="absolute w-4 h-4 bg-cyan-400 rounded-full border-2 border-white map-dot shadow-lg" style={{ top: `${state.tourist.location.y}%`, left: `${state.tourist.location.x}%`, transition: 'top 1s linear, left 1s linear' }} title="Tourist Location"></div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-bold text-red-500 mb-4">CRITICAL ALERTS</h2>
                <div className="h-40 overflow-y-auto space-y-2">
                    {state.alerts.length === 0 ? (
                        <p className="text-gray-500 text-sm">No critical alerts...</p>
                    ) : (
                        state.alerts.map((alert: any) => (
                            <div key={alert.id} className="bg-red-900/50 p-2 rounded-md text-sm border-l-4 border-red-500 animate-pulse">
                                <strong>{alert.type}</strong>
                                <p>Tourist ID: <span className="font-mono text-xs">{alert.touristId}</span></p>
                                <p>Location: [{alert.location.x.toFixed(0)}, {alert.location.y.toFixed(0)}]</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">AI Anomaly Detection</h2>
                <div className="h-40 overflow-y-auto space-y-2">
                    {state.aiFlags.length === 0 ? (
                        <p className="text-gray-500 text-sm">AI system monitoring...</p>
                    ) : (
                         state.aiFlags.map((flag: any) => (
                             <div key={flag.id} className="bg-yellow-900/50 p-2 rounded-md text-sm border-l-4 border-yellow-500">
                                <strong>{flag.type}</strong>
                                <p>Tourist ID: <span className="font-mono text-xs">{flag.touristId}</span></p>
                                <p>{flag.details}</p>
                            </div>
                         ))
                    )}
                </div>
            </div>
        </div>
    </main>
);


const Home: React.FC = () => {
    const [view, setView] = useState('tourist');
    const [state, setState] = useState({
        tourist: { id: null, location: { x: 10, y: 10 }, lastMoveTime: Date.now(), isActive: false },
        alerts: [] as any[],
        aiFlags: [] as any[],
        touristLog: [] as any[],
        config: { highRiskZone: { x: 50, y: 50, width: 50, height: 50 } }
    });
    
    const isSimulationRunning = useRef(false);
    const { helplines } = useAppContext();
    const [isHelplineModalOpen, setIsHelplineModalOpen] = useState(false);
    const navigate = useNavigate();

    const log = (message: string, colorClass = 'text-gray-400') => {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = {
            id: Date.now() + Math.random(),
            message: `<span class="text-cyan-500">${timestamp}:</span> <span class="${colorClass}">${message}</span>`
        };
        setState(prevState => ({
            ...prevState,
            touristLog: [logEntry, ...prevState.touristLog].slice(0, 20)
        }));
    };
    
    const handleGenerateId = () => {
        const newId = '0x' + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        setState(prevState => ({ ...prevState, tourist: { ...prevState.tourist, id: newId, isActive: true } }));
        log('Secure ID Generated.', 'text-green-400');
        log(`ID: ${newId}`, 'text-gray-400');
        isSimulationRunning.current = true;
    };

    const handlePanic = () => {
        if (!state.tourist.id) return;
        const newAlert = {
            id: `alert-${Date.now()}`,
            type: 'PANIC BUTTON',
            touristId: state.tourist.id,
            location: state.tourist.location,
            timestamp: new Date()
        };
        setState(prevState => ({ ...prevState, alerts: [newAlert, ...prevState.alerts] }));
        log('PANIC SIGNAL SENT!', 'text-red-400');
    };

    useEffect(() => {
        if (!isSimulationRunning.current) return;

        const moveInterval = setInterval(() => {
            setState(prevState => {
                if (!prevState.tourist.isActive) return prevState;
                
                const moved = Math.random() > 0.3;
                let newLocation = prevState.tourist.location;
                let lastMoveTime = prevState.tourist.lastMoveTime;

                if (moved) {
                    newLocation.x += (Math.random() - 0.5) * 5;
                    newLocation.y += (Math.random() - 0.5) * 5;
                    newLocation.x = Math.max(0, Math.min(95, newLocation.x));
                    newLocation.y = Math.max(0, Math.min(95, newLocation.y));
                    lastMoveTime = Date.now();
                }

                log(`Location: [${newLocation.x.toFixed(1)}, ${newLocation.y.toFixed(1)}]`, 'text-gray-400');
                
                return { ...prevState, tourist: { ...prevState.tourist, location: newLocation, lastMoveTime }};
            });
        }, 2000);

        const aiInterval = setInterval(() => {
            setState(prevState => {
                if (!prevState.tourist.isActive) return prevState;

                const timeSinceLastMove = Date.now() - prevState.tourist.lastMoveTime;
                let newAiFlags = [...prevState.aiFlags];

                // Inactivity check
                if (timeSinceLastMove > 10000) {
                    const flagId = `ai-inactive-${Math.floor(prevState.tourist.lastMoveTime / 10000)}`;
                    if (!newAiFlags.some(f => f.id === flagId)) {
                        newAiFlags.push({
                           id: flagId, type: 'AI Anomaly Detected', touristId: prevState.tourist.id,
                           details: 'Prolonged Inactivity Detected.', timestamp: new Date()
                        });
                        log('AI: Prolonged Inactivity', 'text-yellow-400');
                    }
                }

                // Geofence check
                const { x, y } = prevState.tourist.location;
                const zone = prevState.config.highRiskZone;
                const isInZone = x > zone.x && x < (zone.x + zone.width) && y > zone.y && y < (zone.y + zone.height);
                const geofenceFlagId = `ai-geofence-${Math.floor(Date.now() / 10000)}`;
                
                if (isInZone && !newAiFlags.some(f => f.id === geofenceFlagId)) {
                    newAiFlags.push({
                        id: geofenceFlagId, type: 'Geofence Alert', touristId: prevState.tourist.id,
                        details: 'Entered a high-risk zone.', timestamp: new Date()
                    });
                    log('ALERT: Entered high-risk zone!', 'text-yellow-400');
                }
                
                return { ...prevState, aiFlags: newAiFlags };
            });
        }, 5000);
        
        return () => {
            clearInterval(moveInterval);
            clearInterval(aiInterval);
            isSimulationRunning.current = false;
        }

    }, [isSimulationRunning.current]);

    const commonBtnClass = "px-4 py-2 text-sm font-medium rounded-md focus:outline-none";
    const activeBtnClass = "bg-cyan-600 text-white";
    const inactiveBtnClass = "text-gray-300 hover:bg-gray-700";

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen p-4 antialiased">
            <style>{`
                .panic-button { box-shadow: 0 0 0 0 rgba(239, 68, 68, 1); animation: pulse 1.5s infinite; }
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                    70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }
            `}</style>
            
            <header className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">Smart Tourist Safety System</h1>
                <p className="text-gray-400 mt-2">Minimum Viable Product (MVP) Demonstration</p>
                <div className="mt-4 inline-flex rounded-md shadow-sm bg-gray-800 p-1">
                    <button onClick={() => setView('tourist')} className={`${commonBtnClass} ${view === 'tourist' ? activeBtnClass : inactiveBtnClass}`}>
                        Tourist View
                    </button>
                    <button onClick={() => setView('authority')} className={`${commonBtnClass} ${view === 'authority' ? activeBtnClass : inactiveBtnClass}`}>
                        Authority View
                    </button>
                </div>
            </header>
            
            <div className="container mx-auto max-w-7xl">
                {view === 'tourist' ? <TouristView state={state} onGenerateId={handleGenerateId} onPanic={handlePanic} /> : <AuthorityView state={state} />}
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-24 right-4 flex flex-col items-center space-y-3 z-20">
                 <button onClick={() => navigate('/id')} title="My Digital ID" className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6.5-1l-2.293 2.293a1 1 0 000 1.414l7.586 7.586a1 1 0 001.414 0l2.293-2.293a1 1 0 000-1.414l-7.586-7.586a1 1 0 00-1.414 0z" /></svg>
                </button>
                <button onClick={() => setIsHelplineModalOpen(true)} title="Helplines" className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </button>
            </div>

            {isHelplineModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-xl font-bold text-cyan-400 mb-4">Helplines</h2>
                        {helplines.length > 0 ? (
                            <ul className="space-y-3 max-h-64 overflow-y-auto">
                                {helplines.map(helpline => (
                                    <li key={helpline.id} className="flex justify-between items-center bg-gray-900 p-3 rounded-lg">
                                        <div>
                                            <p className="font-semibold text-gray-200">{helpline.name}</p>
                                            <p className="text-sm text-gray-400">{helpline.phone}</p>
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
                        <button onClick={() => setIsHelplineModalOpen(false)} className="mt-6 w-full bg-gray-700 text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
