
import React from 'react';
import { GeoRakshaLogo } from '../constants';

interface Slide {
    title: string;
    text: string;
    buttonText: string;
    onButtonClick: () => void;
}

interface OnboardingCarouselProps {
    slide: Slide;
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ slide }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full">
            <div className="flex-grow flex flex-col justify-center items-center">
                <div className="bg-blue-100 rounded-full p-6 mb-8">
                    <GeoRakshaLogo className="h-16 w-16 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{slide.title}</h2>
                <p className="text-gray-600 max-w-sm">{slide.text}</p>
            </div>
            <button
                onClick={slide.onButtonClick}
                className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
                {slide.buttonText}
            </button>
        </div>
    );
};

export default OnboardingCarousel;