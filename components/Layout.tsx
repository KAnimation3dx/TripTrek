
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import Chatbot from './Chatbot';
import { useAppContext } from '../context/AppContext';

const Layout: React.FC = () => {
  const { isChatOpen } = useAppContext();

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">
      <main className="pb-20">
        <Outlet />
      </main>
      {isChatOpen && <Chatbot />}
      <BottomNav />
    </div>
  );
};

export default Layout;