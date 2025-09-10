
import React from 'react';
import { MOCK_ALERTS } from '../../constants';
import { Alert as AlertType } from '../../types';

const AlertIcon: React.FC<{ type: AlertType['type'] }> = ({ type }) => {
    const baseClasses = "h-8 w-8 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0";
    let icon;
    let color;

    switch (type) {
        case 'warning':
            color = 'bg-red-500';
            icon = <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />;
            break;
        case 'info':
            color = 'bg-blue-500';
            icon = <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
            break;
        case 'success':
            color = 'bg-green-500';
            icon = <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />;
            break;
    }
    return (
        <div className={`${baseClasses} ${color}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {icon}
            </svg>
        </div>
    );
};

const Alerts: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 px-2">Notifications & Alerts</h1>
      <div className="space-y-4">
        {MOCK_ALERTS.map((alert) => (
          <div key={alert.id} className="bg-white rounded-2xl shadow-lg p-4 flex items-start">
            <AlertIcon type={alert.type} />
            <div className="flex-grow">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-800">{alert.title}</h3>
                <p className="text-xs text-gray-400">{alert.timestamp}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
