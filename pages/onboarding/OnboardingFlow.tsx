import React, { useState } from 'react';
import { EmergencyContact } from '../../types';
import { useAppContext } from '../../context/AppContext';
import OnboardingCarousel from '../../components/OnboardingCarousel';

type OnboardingStep = 'welcome' | 'location' | 'notifications' | 'id_activation' | 'manual_id' | 'final_setup';

const OnboardingFlow: React.FC = () => {
    const [step, setStep] = useState<OnboardingStep>('welcome');
    const { completeOnboarding } = useAppContext();
    const [contacts, setContacts] = useState<EmergencyContact[]>([{ name: '', phone: '' }, { name: '', phone: '' }]);
    const [trackingEnabled, setTrackingEnabled] = useState(false);

    const handleContactChange = (index: number, field: keyof EmergencyContact, value: string) => {
        const newContacts = [...contacts];
        newContacts[index][field] = value;
        setContacts(newContacts);
    };

    const handleCompleteSetup = () => {
        const filledContacts = contacts.filter(c => c.name && c.phone);
        completeOnboarding(filledContacts, trackingEnabled);
    };
    
    const slides = {
        'welcome': {
            title: 'Welcome to GeoRaksha!',
            text: 'Your personal safety companion for a worry-free journey. Let\'s get you set up.',
            buttonText: 'Next',
            onButtonClick: () => setStep('location'),
        },
        'location': {
            title: 'Stay Aware with Location Services',
            text: 'GeoRaksha uses your location to provide real-time risk alerts and to send for help in an emergency.',
            buttonText: 'Enable Location Services',
            onButtonClick: () => {
                // In a real app, this triggers OS permission pop-up. We'll simulate approval.
                console.log("Location permission requested");
                setStep('notifications');
            },
        },
        'notifications': {
            title: 'Instant Alerts, Instant Safety',
            text: 'We need permission to send you notifications to warn you about high-risk zones or other critical alerts.',
            buttonText: 'Allow Notifications',
            onButtonClick: () => {
                // In a real app, this triggers OS permission pop-up.
                console.log("Notification permission requested");
                setStep('id_activation');
            },
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'welcome':
            case 'location':
            case 'notifications':
                return <OnboardingCarousel slide={slides[step]} />;
            case 'id_activation':
                return (
                    <div className="flex flex-col items-center justify-between text-center p-8 h-full">
                        <h2 className="text-3xl font-bold text-gray-800 mt-8">Activate Your Digital Tourist ID</h2>
                        <div className="flex-grow flex flex-col items-center justify-center w-full">
                            <div className="w-full max-w-xs h-64 bg-gray-900 rounded-lg flex items-center justify-center text-white flex-col mb-6">
                                <p className="text-sm mb-2">Camera View</p>
                                <div className="w-48 h-48 border-2 border-dashed border-gray-400"></div>
                            </div>
                            <p className="text-gray-600 mb-6">Please scan the QR code you received at the airport/hotel check-in.</p>
                            <button onClick={() => { /* Simulate scan */ setStep('final_setup'); }} className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-4">
                               Simulate Successful Scan
                            </button>
                            <button onClick={() => setStep('manual_id')} className="text-blue-600 font-semibold">
                               Or Enter Your ID Manually
                            </button>
                        </div>
                    </div>
                );
            case 'manual_id':
                return (
                     <div className="flex flex-col p-8 h-full">
                        <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Enter Your ID</h2>
                        <div className="flex-grow flex flex-col justify-center">
                            <input type="text" placeholder="TID-XXXX-XXXX-XXXX" className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-center text-lg"/>
                            <button onClick={() => setStep('final_setup')} className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Activate ID
                            </button>
                             <button onClick={() => setStep('id_activation')} className="mt-4 text-gray-600 font-semibold">
                                Back to Scan
                            </button>
                        </div>
                    </div>
                );
            case 'final_setup':
                return (
                    <div className="flex flex-col p-6 h-full overflow-y-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-6">One Last Step</h2>
                        
                        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                            <h3 className="font-bold text-lg mb-2">Emergency Contacts</h3>
                            <p className="text-sm text-gray-600 mb-4">Add up to two contacts who will be notified if you activate the Panic Button.</p>
                            {contacts.map((contact, index) => (
                                <div key={index} className="mb-3">
                                    <input type="text" placeholder={`Contact ${index + 1} Name`} value={contact.name} onChange={e => handleContactChange(index, 'name', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-2"/>
                                    <input type="tel" placeholder={`Contact ${index + 1} Phone`} value={contact.phone} onChange={e => handleContactChange(index, 'phone', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg"/>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                             <h3 className="font-bold text-lg mb-2">Real-time Safety Tracking</h3>
                             <div className="flex items-center justify-between">
                                <label htmlFor="tracking-toggle" className="text-gray-700 flex-1 pr-4">Enable Real-time Safety Tracking</label>
                                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="tracking-toggle" id="tracking-toggle" checked={trackingEnabled} onChange={() => setTrackingEnabled(!trackingEnabled)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                    <label htmlFor="tracking-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                </div>
                             </div>
                             <p className="text-xs text-gray-500 mt-3">By enabling this, your location will be shared for AI-based anomaly detection. Your family can also request to see your location. This is optional.</p>
                        </div>

                         <button onClick={handleCompleteSetup} className="w-full bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition-colors mt-auto">
                            Complete Setup
                        </button>
                        <style>{`
                            .toggle-checkbox:checked { right: 0; border-color: #34D399; }
                            .toggle-checkbox:checked + .toggle-label { background-color: #34D399; }
                        `}</style>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-50">
            {renderStep()}
        </div>
    );
};

export default OnboardingFlow;