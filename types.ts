export interface User {
  name: string;
  nationality: string;
  touristId: string;
  validFrom: string;
  validTo:string;
  photoUrl: string;
  email?: string; // Added for authentication
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