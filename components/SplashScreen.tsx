import React from 'react';
import { GeoRakshaLogo } from '../constants';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <div className="animate-pulse">
            <GeoRakshaLogo className="h-24 w-24" />
        </div>
      <h1 className="text-4xl font-bold mt-4">GeoRaksha</h1>
      <p className="mt-2 text-lg">Paryatak Rakshak - Your Safety Companion</p>
    </div>
  );
};

export default SplashScreen;
