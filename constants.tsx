
import React from 'react';
import { User, Alert } from './types';

export const MOCK_USER: User = {
  name: 'Alex Doe',
  nationality: 'American',
  touristId: 'TID-A8B4-Z9X1-C7V2',
  validFrom: '2024-07-15',
  validTo: '2024-08-15',
  photoUrl: 'https://picsum.photos/200'
};

export const MOCK_ALERTS: Alert[] = [
  {
    id: 1,
    type: 'warning',
    title: "Geo-fence Alert",
    description: "You have entered 'Hanuman Tok', a high-risk zone. Please be cautious.",
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'info',
    title: 'System Message',
    description: 'Real-time Safety Tracking is now active.',
    timestamp: 'Yesterday',
  },
  {
    id: 3,
    type: 'success',
    title: 'Itinerary Update',
    description: 'Your trip to Nathula Pass for tomorrow is confirmed.',
    timestamp: '2 days ago',
  },
];

export const MOCK_ITINERARY = [
    "Day 1: Check-in Hotel Himalayan",
    "Day 2: Tsomgo Lake Tour",
    "Day 3: Gangtok City Tour - Rumtek Monastery",
    "Day 4: Transfer to Pelling",
    "Day 5: Pelling Sightseeing",
    "Day 6: Departure"
];


// SVG Icons
export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const IdCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

export const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

export const CogIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.226.554-.22 1.196-.22 1.75 0 .548.22 1.018.684 1.11 1.226M9.594 3.94c-.09.542-.56 1.007-1.11 1.226-.554-.22-1.196-.22-1.75 0-.548-.22-1.018-.684-1.11-1.226m13.232 4.234c.09-.542.56-1.007 1.11-1.226.554-.22 1.196-.22 1.75 0 .548.22 1.018.684 1.11 1.226M19.706 8.174c-.09.542-.56 1.007-1.11 1.226-.554-.22-1.196-.22-1.75 0-.548-.22-1.018-.684-1.11-1.226m-6.442 1.226c.09-.542.56-1.007 1.11-1.226.554-.22 1.196-.22 1.75 0 .548.22 1.018.684 1.11 1.226M12 12v.01M4.294 8.174c.09-.542.56-1.007 1.11-1.226.554-.22 1.196-.22 1.75 0 .548.22 1.018.684 1.11 1.226M4.294 8.174c-.09.542-.56 1.007-1.11 1.226-.554-.22-1.196-.22-1.75 0-.548-.22-1.018-.684-1.11-1.226m12.15 6.658c.09.542.56 1.007 1.11 1.226.554-.22 1.196-.22 1.75 0 .548.22 1.018.684 1.11 1.226m-1.442-1.226c-.09-.542-.56-1.007-1.11-1.226-.554-.22-1.196-.22-1.75 0-.548-.22-1.018-.684-1.11-1.226m-6.442 1.226c.09.542.56 1.007 1.11 1.226.554-.22 1.196-.22 1.75 0 .548.22 1.018.684 1.11 1.226m-1.442-1.226c-.09-.542-.56-1.007-1.11-1.226-.554-.22-1.196-.22-1.75 0-.548-.22-1.018-.684-1.11-1.226" />
  </svg>
);

export const GeoRakshaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
    <text x="12" y="14.5"
          fill="currentColor"
          stroke="none"
          fontSize="9"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          textAnchor="middle"
          alignmentBaseline="middle">
        ॐ
    </text>
  </svg>
);