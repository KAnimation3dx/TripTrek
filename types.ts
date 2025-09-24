export interface User {
  name: string;
  email?: string; // Added for authentication
  age?: string;
  governmentId?: string;
  country?: string;
  state?: string;
  gender?: string;
  photoUrl?: string;
  touristId?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: string;
}

export interface Helpline {
  id: string;
  name: string;
  phone: string;
}

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export interface UserLocation {
  id: string;
  name: string;
  pincode: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ItineraryItem {
  day: number;
  description: string;
  lat: number;
  lon: number;
}