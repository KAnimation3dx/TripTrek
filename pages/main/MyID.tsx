import React, { useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MOCK_ITINERARY } from '../../constants';

const ItineraryMap: React.FC = () => {
    if (MOCK_ITINERARY.length === 0) return null;

    // Calculate bounding box to fit all markers
    const latitudes = MOCK_ITINERARY.map(item => item.lat);
    const longitudes = MOCK_ITINERARY.map(item => item.lon);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

    // Add some padding to the bbox to ensure markers aren't on the edge
    const latPadding = (maxLat - minLat) * 0.2 || 0.1;
    const lonPadding = (maxLon - minLon) * 0.2 || 0.1;

    const bbox = [
        minLon - lonPadding,
        minLat - latPadding,
        maxLon + lonPadding,
        maxLat + latPadding
    ].join(',');

    // Create marker string for the URL
    const markers = MOCK_ITINERARY.map(item => `marker=${item.lat},${item.lon}`).join('&');
    
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markers}`;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Itinerary Map</h3>
            <iframe
                className="w-full h-64 rounded-lg"
                title="itinerary-map"
                src={mapUrl}
                style={{ border: 0 }}
                loading="lazy"
                aria-label="Map showing itinerary locations"
            ></iframe>
             <div className="mt-4 text-xs text-gray-500">
                <p>Markers indicate locations on your itinerary. This map provides a visual overview of your trip.</p>
            </div>
        </div>
    );
};

const IDCreationForm: React.FC = () => {
    const { currentUser, createDigitalId } = useAppContext();
    const [name, setName] = useState(currentUser?.name || '');
    const [age, setAge] = useState('');
    const [governmentId, setGovernmentId] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [gender, setGender] = useState('');
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please check permissions and ensure you are using a secure (HTTPS) connection.");
            setIsCameraOpen(false);
        }
    };

    const closeCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if(context){
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/png');
                setPhotoUrl(dataUrl);
            }
            closeCamera();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!photoUrl) {
            alert('Please take a photo.');
            return;
        }
        if (name && age && governmentId && country && state && gender) {
            createDigitalId({ name, age, governmentId, country, state, gender, photoUrl });
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 px-2">Create Your Digital ID</h1>
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="text-center">
                        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center overflow-hidden">
                             {photoUrl ? (
                                <img src={photoUrl} alt="Your selfie" className="w-full h-full object-cover" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            )}
                        </div>
                        <button type="button" onClick={openCamera} className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors">
                            Take Photo
                        </button>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full p-3 border border-gray-300 rounded-lg"/>
                    </div>
                     <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} required className="mt-1 w-full p-3 border border-gray-300 rounded-lg"/>
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select id="gender" value={gender} onChange={e => setGender(e.target.value)} required className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none">
                            <option value="" disabled>Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="govId" className="block text-sm font-medium text-gray-700">Government ID Number</label>
                        <input type="text" id="govId" value={governmentId} onChange={e => setGovernmentId(e.target.value)} required className="mt-1 w-full p-3 border border-gray-300 rounded-lg"/>
                    </div>
                     <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                        <input type="text" id="country" value={country} onChange={e => setCountry(e.target.value)} required className="mt-1 w-full p-3 border border-gray-300 rounded-lg"/>
                    </div>
                     <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                        <input type="text" id="state" value={state} onChange={e => setState(e.target.value)} required className="mt-1 w-full p-3 border border-gray-300 rounded-lg"/>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                        Generate My ID
                    </button>
                </form>
            </div>
            
            {isCameraOpen && (
                <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4">
                    <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg h-auto rounded-lg mb-4"></video>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    <button onClick={capturePhoto} className="bg-white text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg mb-4">Capture</button>
                    <button onClick={closeCamera} className="text-white/80 hover:text-white">Cancel</button>
                </div>
            )}
        </div>
    );
};

const MyID: React.FC = () => {
  const { currentUser } = useAppContext();
  const [showQR, setShowQR] = useState(false);

  if (!currentUser) {
    return <div className="p-4">Loading...</div>;
  }
  
  if (!currentUser.touristId) {
    return <IDCreationForm />;
  }

  const handleDownloadIdCard = () => {
    const user = currentUser;
    if (!user || !user.photoUrl || !user.touristId) return;

    const canvas = document.createElement('canvas');
    const cardWidth = 1011;
    const cardHeight = 638;
    canvas.width = cardWidth;
    canvas.height = cardHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const userPhoto = new Image();
    userPhoto.crossOrigin = 'Anonymous';
    const qrCode = new Image();
    qrCode.crossOrigin = 'Anonymous';

    const loadImages = Promise.all([
        new Promise((resolve, reject) => { userPhoto.onload = resolve; userPhoto.onerror = reject; userPhoto.src = user.photoUrl!; }),
        new Promise((resolve, reject) => { qrCode.onload = resolve; qrCode.onerror = reject; qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${user.touristId}&qzone=1`; })
    ]);

    loadImages.then(() => {
        const gradient = ctx.createLinearGradient(0, 0, cardWidth, cardHeight);
        gradient.addColorStop(0, '#3B82F6');
        gradient.addColorStop(1, '#4F46E5');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cardWidth, cardHeight);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px sans-serif';
        ctx.fillText('GR', 40, 80);
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('GeoRaksha Tourist ID', 110, 80);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 110);
        ctx.lineTo(cardWidth - 40, 110);
        ctx.stroke();

        const photoSize = 200;
        ctx.drawImage(userPhoto, 40, 140, photoSize, photoSize);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 6;
        ctx.strokeRect(37, 137, photoSize + 6, photoSize + 6);
        
        const detailsX = 280;
        let detailsY = 180;
        
        const drawDetail = (label: string, value: string) => {
            ctx.fillStyle = '#BFDBFE';
            ctx.font = '28px sans-serif';
            ctx.fillText(label, detailsX, detailsY);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 32px sans-serif';
            ctx.fillText(value, detailsX, detailsY + 40);
            detailsY += 100;
        };

        drawDetail('Name', user.name);
        drawDetail('Age / Gender', `${user.age || 'N/A'} / ${user.gender || 'N/A'}`);
        drawDetail('Country', `${user.country || 'N/A'}, ${user.state || 'N/A'}`);
        
        detailsY = 500;
        ctx.fillStyle = '#BFDBFE';
        ctx.font = '28px sans-serif';
        ctx.fillText('Government ID', 40, detailsY);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px monospace';
        ctx.fillText(user.governmentId || 'N/A', 40, detailsY + 40);

        ctx.fillStyle = '#BFDBFE';
        ctx.font = '28px sans-serif';
        ctx.fillText('Tourist ID', 500, detailsY);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px monospace';
        ctx.fillText(user.touristId || 'N/A', 500, detailsY + 40);

        ctx.fillStyle = 'white';
        ctx.fillRect(cardWidth - 225, 135, 190, 190);
        ctx.drawImage(qrCode, cardWidth - 220, 140, 180, 180);

        const link = document.createElement('a');
        link.download = `GeoRaksha_ID_Card_${user.name.replace(/\s/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        console.error("Error loading images for canvas:", err);
        alert("Could not download ID card. An error occurred while loading images.");
    });
};

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 px-2">My Digital ID</h1>
      
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white mb-6">
        <div className="flex items-center mb-6">
          <img src={currentUser.photoUrl} alt="User" className="w-24 h-24 rounded-full border-4 border-white/50 object-cover mr-4" />
          <div>
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            <p className="text-blue-200">{currentUser.country}, {currentUser.state}</p>
          </div>
        </div>
        <div className="space-y-2">
           <div className="flex justify-between">
            <span className="text-blue-200 text-sm">Age</span>
            <span className="font-semibold">{currentUser.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200 text-sm">Gender</span>
            <span className="font-semibold">{currentUser.gender}</span>
          </div>
           <div className="flex justify-between">
            <span className="text-blue-200 text-sm">Government ID</span>
            <span className="font-mono font-semibold">{currentUser.governmentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200 text-sm">Tourist ID</span>
            <span className="font-mono font-semibold">{currentUser.touristId}</span>
          </div>
        </div>
         <div className="mt-6 grid grid-cols-2 gap-4">
            <button 
                onClick={() => setShowQR(true)}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 21h8v-8h-8v8zm2-6h4v4h-4v-4z"></path></svg>
                Show QR
            </button>
            <button 
                onClick={handleDownloadIdCard}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download
            </button>
        </div>
      </div>

      <ItineraryMap />

      <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Trip Itinerary</h3>
          <ol className="relative border-l border-blue-200 ml-4">                  
              {MOCK_ITINERARY.map((item, index) => (
                  <li key={item.day} className={`ml-8 ${index === MOCK_ITINERARY.length - 1 ? 'mb-0' : 'mb-10'}`}>            
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full -left-4 ring-8 ring-white text-white font-bold">
                          {item.day}
                      </span>
                      <h4 className="font-bold text-gray-900">Day {item.day}</h4>
                      <p className="text-base font-normal text-gray-600">{item.description}</p>
                  </li>
              ))}
          </ol>
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