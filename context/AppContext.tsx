import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, EmergencyContact, Helpline, LocationState, UserLocation, ChatMessage } from '../types';
import { useLocation } from '../hooks/useLocation';

// This is a mock database stored in localStorage.
// In a real app, this would be handled by a secure backend.
const DB_KEY = 'georaksha-users-db';
const SESSION_KEY = 'georaksha-session';

// Define a minimal interface for the chat object to avoid top-level import issues.
interface GeminiChat {
    sendMessage: (params: { message: string }) => Promise<{ text: string }>;
}

const safeJSONParse = (str: string | null, fallback: any = null) => {
    if (str === null) {
        return fallback;
    }
    try {
        return JSON.parse(str);
    } catch (e) {
        console.error("Error parsing JSON from localStorage", e);
        return fallback;
    }
};

interface AppContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isPanicMode: boolean;
  currentUser: User | null;
  emergencyContacts: EmergencyContact[];
  helplines: Helpline[];
  userLocations: UserLocation[];
  location: LocationState;
  isChatOpen: boolean;
  isBotTyping: boolean;
  chatHistory: ChatMessage[];
  toggleChat: () => void;
  sendChatMessage: (message: string) => void;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  loginWithGoogle: () => void;
  logout: () => void;
  createDigitalId: (details: { name: string; age: string; governmentId: string; country: string; state: string; gender: string; photoUrl: string; }) => void;
  completeOnboarding: (contacts: EmergencyContact[], tracking: boolean) => void;
  setPanicMode: (status: boolean) => void;
  addHelpline: (name: string, phone: string) => void;
  removeHelpline: (id: string) => void;
  addUserLocation: (name: string, pincode: string) => void;
  removeUserLocation: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [helplines, setHelplines] = useState<Helpline[]>([]);
  const [userLocations, setUserLocations] = useState<UserLocation[]>([]);
  const location = useLocation();
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chat, setChat] = useState<GeminiChat | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
        try {
            // Safely check for API key
            const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) ? process.env.API_KEY : null;

            if (apiKey) {
                // Dynamically import the library to prevent crash on load
                const { GoogleGenAI } = await import('@google/genai');
                const ai = new GoogleGenAI({ apiKey });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: 'You are GeoRaksha, a friendly and helpful AI assistant for tourists. Your goal is to provide concise and useful travel safety tips. Keep your answers short and to the point.',
                    },
                });
                setChat(newChat);
            } else {
                console.error("API_KEY environment variable is not set.");
                setChatHistory([{ role: 'model', text: "Chat is not available: API Key is missing." }]);
            }
        } catch (error) {
            console.error("Error initializing AI Chat:", error);
            setChatHistory([{ role: 'model', text: "There was an error initializing the chat." }]);
        }
    };

    initializeChat();

    // Check for active session
    const sessionUserEmail = sessionStorage.getItem(SESSION_KEY);
    if (sessionUserEmail) {
      const db_raw = safeJSONParse(localStorage.getItem(DB_KEY), []);
      const db = Array.isArray(db_raw) ? db_raw : []; // Ensure db is an array to prevent crashes
      const userAccount = db.find((u: any) => u.email === sessionUserEmail);
      if (userAccount) {
        setCurrentUser(userAccount.profile);
        setEmergencyContacts(userAccount.contacts || []);
        setUserLocations(userAccount.locations || []);
        setIsOnboarded(userAccount.isOnboarded || false);
        setIsAuthenticated(true);
      }
    }
    
    // Load app-wide helplines
    const storedHelplines = localStorage.getItem('georaksha-helplines');
    const parsedHelplines = safeJSONParse(storedHelplines);
    if (Array.isArray(parsedHelplines)) { // Ensure helplines data is an array
        setHelplines(parsedHelplines);
    } else {
        const defaultHelplines = [
            { id: '1', name: 'National Emergency', phone: '112' },
            { id: '2', name: 'Tourism Helpline', phone: '1363' },
        ];
        setHelplines(defaultHelplines);
        localStorage.setItem('georaksha-helplines', JSON.stringify(defaultHelplines));
    }

    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  
  const updateUserAccount = (email: string, updates: any) => {
      const db_raw = safeJSONParse(localStorage.getItem(DB_KEY), []);
      const db = Array.isArray(db_raw) ? db_raw : [];
      const userIndex = db.findIndex((u: any) => u.email === email);
      if (userIndex > -1) {
          db[userIndex] = { ...db[userIndex], ...updates };
          localStorage.setItem(DB_KEY, JSON.stringify(db));
      }
  };

  const login = (email: string, pass: string): boolean => {
      const db_raw = safeJSONParse(localStorage.getItem(DB_KEY), []);
      const db = Array.isArray(db_raw) ? db_raw : [];
      const userAccount = db.find((u: any) => u.email === email && u.password === pass);
      if (userAccount) {
          sessionStorage.setItem(SESSION_KEY, userAccount.email);
          setCurrentUser(userAccount.profile);
          setEmergencyContacts(userAccount.contacts || []);
          setUserLocations(userAccount.locations || []);
          setIsOnboarded(userAccount.isOnboarded || false);
          setIsAuthenticated(true);
          return true;
      }
      return false;
  };

  const signup = (name: string, email: string, pass: string): boolean => {
      const db_raw = safeJSONParse(localStorage.getItem(DB_KEY), []);
      const db = Array.isArray(db_raw) ? db_raw : [];
      if (db.some((u: any) => u.email === email)) {
          return false; // User already exists
      }
      const newUserProfile: User = { name, email };
      const newUserAccount = {
          email,
          password: pass, // In a real app, hash this!
          profile: newUserProfile,
          isOnboarded: false,
          contacts: [],
          tracking: false,
          locations: [], // Initialize empty locations
      };
      db.push(newUserAccount);
      localStorage.setItem(DB_KEY, JSON.stringify(db));
      return login(email, pass);
  };
  
  const loginWithGoogle = () => {
      const googleUserEmail = 'user.google@example.com';
      const db_raw = safeJSONParse(localStorage.getItem(DB_KEY), []);
      const db = Array.isArray(db_raw) ? db_raw : [];
      let userAccount = db.find((u: any) => u.email === googleUserEmail);
      if(!userAccount) {
           // First time Google sign in, create account
           signup('Alex Doe', googleUserEmail, 'google_sso_mock_password');
      } else {
           login(googleUserEmail, 'google_sso_mock_password');
      }
  }

  const completeOnboarding = (contacts: EmergencyContact[], tracking: boolean) => {
    if (!currentUser?.email) return;
    updateUserAccount(currentUser.email, { isOnboarded: true, contacts, tracking });
    setEmergencyContacts(contacts);
    setIsOnboarded(true);
  };
  
  const createDigitalId = (details: { name: string; age: string; governmentId: string; country: string; state: string; gender: string; photoUrl: string; }) => {
    if (!currentUser?.email) return;

    const newTouristId = `TID-${Date.now().toString().slice(-8)}`;
    const updatedProfile: User = {
        ...currentUser,
        name: details.name,
        age: details.age,
        governmentId: details.governmentId,
        country: details.country,
        state: details.state,
        gender: details.gender,
        photoUrl: details.photoUrl,
        touristId: newTouristId,
    };
    
    setCurrentUser(updatedProfile);
    updateUserAccount(currentUser.email, { profile: updatedProfile });
};

  const setPanicModeWrapper = (status: boolean) => {
    setIsPanicMode(status);
  }
  
  const addHelpline = (name: string, phone: string) => {
      const newHelpline: Helpline = { id: Date.now().toString(), name, phone };
      const updatedHelplines = [...helplines, newHelpline];
      setHelplines(updatedHelplines);
      localStorage.setItem('georaksha-helplines', JSON.stringify(updatedHelplines));
  };

  const removeHelpline = (id: string) => {
      const updatedHelplines = helplines.filter(h => h.id !== id);
      setHelplines(updatedHelplines);
      localStorage.setItem('georaksha-helplines', JSON.stringify(updatedHelplines));
  };
  
  const addUserLocation = (name: string, pincode: string) => {
      if (!currentUser?.email) return;
      const newLocation: UserLocation = { id: Date.now().toString(), name, pincode };
      const updatedLocations = [...userLocations, newLocation];
      setUserLocations(updatedLocations);
      updateUserAccount(currentUser.email, { locations: updatedLocations });
  };
  
  const removeUserLocation = (id: string) => {
      if (!currentUser?.email) return;
      const updatedLocations = userLocations.filter(loc => loc.id !== id);
      setUserLocations(updatedLocations);
      updateUserAccount(currentUser.email, { locations: updatedLocations });
  };


  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
    setEmergencyContacts([]);
    setUserLocations([]);
    setIsAuthenticated(false);
    setIsOnboarded(false);
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  
  const sendChatMessage = async (message: string) => {
      if (!chat) return;

      const userMessage: ChatMessage = { role: 'user', text: message };
      setChatHistory(prev => [...prev, userMessage]);
      setIsBotTyping(true);

      try {
          const result = await chat.sendMessage({ message });
          const modelMessage: ChatMessage = { role: 'model', text: result.text };
          setChatHistory(prev => [...prev, modelMessage]);
      } catch (error) {
          console.error("Error sending message:", error);
          const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting right now." };
          setChatHistory(prev => [...prev, errorMessage]);
      } finally {
          setIsBotTyping(false);
      }
  };

  const contextValue = { 
      isLoading, isAuthenticated, isOnboarded, isPanicMode, currentUser, emergencyContacts, helplines, userLocations, location, isChatOpen, isBotTyping, chatHistory,
      login, signup, loginWithGoogle, completeOnboarding, logout, 
      createDigitalId,
      setPanicMode: setPanicModeWrapper, 
      addHelpline, removeHelpline, addUserLocation, removeUserLocation,
      toggleChat, sendChatMessage,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};