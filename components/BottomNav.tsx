
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, IdCardIcon, BellIcon, CogIcon } from '../constants';
import { useAppContext } from '../context/AppContext';

const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);


const BottomNav: React.FC = () => {
  const { toggleChat } = useAppContext();
  
  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/id', label: 'My ID', icon: IdCardIcon },
    { path: '/alerts', label: 'Alerts', icon: BellIcon },
    { path: '/settings', label: 'Settings', icon: CogIcon },
  ];

  const activeLink = 'text-blue-600';
  const inactiveLink = 'text-gray-500 hover:text-blue-600';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
      <div className="flex justify-around items-center max-w-lg mx-auto py-2">
        {navItems.slice(0, 2).map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-20 transition-transform transform hover:scale-105 ${isActive ? activeLink : inactiveLink}`
            }
          >
            <Icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
        
        <div className="relative">
             <button
                onClick={toggleChat}
                aria-label="Open AI Chat"
                className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center -mt-8 shadow-lg transform hover:scale-110 transition-transform border-4 border-white"
             >
                <ChatIcon className="h-8 w-8" />
            </button>
        </div>


        {navItems.slice(2, 4).map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-20 transition-transform transform hover:scale-105 ${isActive ? activeLink : inactiveLink}`
            }
          >
            <Icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;