import { useState, useEffect } from 'react';
import { LocationState } from '../types';

export const useLocation = (): LocationState => {
    const [location, setLocation] = useState<LocationState>({
        latitude: null,
        longitude: null,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation(loc => ({ ...loc, error: 'Geolocation is not supported by your browser.' }));
            return;
        }

        const handleSuccess = (position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        };

        const handleError = (error: GeolocationPositionError) => {
            setLocation(loc => ({ ...loc, error: `Unable to retrieve your location: ${error.message}` }));
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        const watcherId = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

        // Cleanup function to clear the watcher when the component unmounts
        return () => {
            navigator.geolocation.clearWatch(watcherId);
        };

    }, []);

    return location;
};
