import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const Settings: React.FC = () => {
  const { logout, emergencyContacts, helplines, addHelpline, removeHelpline, userLocations, addUserLocation, removeUserLocation } = useAppContext();
  const [trackingEnabled, setTrackingEnabled] = useState(() => {
    return localStorage.getItem('georaksha-tracking') === 'true';
  });

  const [newHelplineName, setNewHelplineName] = useState('');
  const [newHelplinePhone, setNewHelplinePhone] = useState('');
  
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationPincode, setNewLocationPincode] = useState('');


  const handleTrackingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingEnabled(e.target.checked);
    localStorage.setItem('georaksha-tracking', JSON.stringify(e.target.checked));
  }

  const handleAddNewHelpline = (e: React.FormEvent) => {
      e.preventDefault();
      if (newHelplineName.trim() && newHelplinePhone.trim()) {
          addHelpline(newHelplineName, newHelplinePhone);
          setNewHelplineName('');
          setNewHelplinePhone('');
      }
  };
  
  const handleAddNewLocation = (e: React.FormEvent) => {
      e.preventDefault();
      if (newLocationName.trim() && newLocationPincode.trim()) {
          addUserLocation(newLocationName, newLocationPincode);
          setNewLocationName('');
          setNewLocationPincode('');
      }
  }


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 px-2">Settings</h1>
      
      {/* Account Group */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase text-gray-500 mb-2 px-4">Account</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50">Profile</div>
            <div className="p-4 cursor-pointer hover:bg-gray-50">
              <p>Emergency Contacts</p>
              <div className="text-sm text-gray-500 mt-1">
                {emergencyContacts.map(c => c.name).join(', ') || 'No contacts added'}
              </div>
            </div>
        </div>
      </div>

      {/* Privacy & Security Group */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase text-gray-500 mb-2 px-4">Privacy & Security</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <label htmlFor="tracking-toggle">Real-time Safety Tracking</label>
                 <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="tracking-toggle" id="tracking-toggle" checked={trackingEnabled} onChange={handleTrackingChange} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                    <label htmlFor="tracking-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
            </div>
            <div className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50">Manage Data</div>
            <div className="p-4 cursor-pointer hover:bg-gray-50">Privacy Policy</div>
        </div>
      </div>
      
       {/* Manage My Locations Group */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase text-gray-500 mb-2 px-4">Manage My Locations</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4">
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                    {userLocations.map(loc => (
                        <div key={loc.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-semibold text-gray-800">{loc.name}</p>
                                <p className="text-sm text-gray-500">{loc.pincode}</p>
                            </div>
                            <button onClick={() => removeUserLocation(loc.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm px-2">Remove</button>
                        </div>
                    ))}
                    {userLocations.length === 0 && <p className="text-sm text-gray-500 text-center">No locations added yet.</p>}
                </div>
                <form onSubmit={handleAddNewLocation} className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-2">Add New Location</h3>
                    <input type="text" placeholder="Location Name (e.g., Hotel)" value={newLocationName} onChange={e => setNewLocationName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-2" required />
                    <input type="text" placeholder="Pincode" value={newLocationPincode} onChange={e => setNewLocationPincode(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-3" required />
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Add Location</button>
                </form>
            </div>
        </div>
      </div>

      {/* Manage Helplines Group */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase text-gray-500 mb-2 px-4">Manage Helplines</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4">
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                    {helplines.map(helpline => (
                        <div key={helpline.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-semibold text-gray-800">{helpline.name}</p>
                                <p className="text-sm text-gray-500">{helpline.phone}</p>
                            </div>
                            <button onClick={() => removeHelpline(helpline.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm px-2">Remove</button>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleAddNewHelpline} className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-2">Add New Helpline</h3>
                    <input type="text" placeholder="Helpline Name" value={newHelplineName} onChange={e => setNewHelplineName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-2" required />
                    <input type="tel" placeholder="Phone Number" value={newHelplinePhone} onChange={e => setNewHelplinePhone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-3" required />
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Add Helpline</button>
                </form>
            </div>
        </div>
      </div>


      {/* App Settings Group */}
       <div className="mb-8">
        <h2 className="text-xs font-bold uppercase text-gray-500 mb-2 px-4">App Settings</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50">Language</div>
            <div className="p-4 cursor-pointer hover:bg-gray-50">Notifications</div>
        </div>
      </div>
      
       {/* Support Group */}
       <div className="mb-8">
        <h2 className="text-xs font-bold uppercase text-gray-500 mb-2 px-4">Support</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50">Help & FAQ</div>
            <div className="p-4 cursor-pointer hover:bg-gray-50">Contact Us</div>
        </div>
      </div>


      <div className="text-center mt-10">
        <button onClick={logout} className="font-semibold text-red-500 hover:text-red-700">
          Logout
        </button>
      </div>
       <style>{`
            .toggle-checkbox:checked { right: 0; border-color: #34D399; }
            .toggle-checkbox:checked + .toggle-label { background-color: #34D399; }
        `}</style>
    </div>
  );
};

export default Settings;