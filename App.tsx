import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import OnboardingFlow from './pages/onboarding/OnboardingFlow';
import Home from './pages/main/Home';
import MyID from './pages/main/MyID';
import Alerts from './pages/main/Alerts';
import Settings from './pages/main/Settings';
import Layout from './components/Layout';
import PanicScreen from './pages/main/PanicScreen';
import SplashScreen from './components/SplashScreen';
import Auth from './pages/auth/Auth';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

const Main: React.FC = () => {
  const { isPanicMode, isOnboarded, isLoading, isAuthenticated } = useAppContext();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isPanicMode) {
    return <PanicScreen />;
  }

  return (
    <HashRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<Auth />} />
        ) : isOnboarded ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="id" element={<MyID />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <Route path="*" element={<OnboardingFlow />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;