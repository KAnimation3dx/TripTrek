import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { GeoRakshaLogo } from '../../constants';

const GoogleButton = ({ onClick }: { onClick: () => void }) => (
    <button
        type="button"
        onClick={onClick}
        className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 9.5c3.2 0 6.1 1.1 8.4 3.2l6.3-6.3C34.9 2.7 29.8 0 24 0 14.9 0 7.3 5.4 3 13l7.8 6c1.8-5.4 6.8-9.5 13.2-9.5z"></path>
            <path fill="#34A853" d="M46.2 25.4c0-1.7-.2-3.4-.5-5H24v9.3h12.5c-.5 3-2.1 5.6-4.6 7.3l7.5 5.8c4.4-4.1 7.3-10.1 7.3-17.4z"></path>
            <path fill="#FBBC05" d="M10.8 28.4c-.3-.9-.5-1.9-.5-2.9s.2-2 .5-2.9l-7.8-6C1.2 19.4 0 22.6 0 26s1.2 6.6 3 9.4l7.8-6z"></path>
            <path fill="#EA4335" d="M24 48c5.8 0 10.9-1.9 14.5-5.2l-7.5-5.8c-1.9 1.3-4.4 2.1-7 2.1-6.4 0-11.4-4.1-13.2-9.5l-7.8 6C7.3 42.6 14.9 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
        Sign in with Google
    </button>
);


const Auth: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { login, signup, loginWithGoogle } = useAppContext();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        let success = false;
        if (isLoginView) {
            success = login(email, password);
            if (!success) {
                setError('Invalid email or password.');
            }
        } else {
            if (name.trim().length < 2) {
                setError('Please enter your full name.');
                return;
            }
            success = signup(name, email, password);
            if (!success) {
                setError('An account with this email already exists.');
            }
        }
    };

    const handleGoogleSignIn = () => {
        setError('');
        loginWithGoogle();
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError('');
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full mx-auto">
                <div className="flex justify-center items-center mb-6">
                    <GeoRakshaLogo className="h-12 w-12 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800 ml-2">GeoRaksha</h1>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        {isLoginView ? 'Sign In' : 'Create Account'}
                    </h2>
                    
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4 text-sm">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLoginView && (
                             <div>
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 mt-1 border border-gray-300 rounded-lg" />
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 mt-1 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="w-full p-3 mt-1 border border-gray-300 rounded-lg" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            {isLoginView ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    
                    <GoogleButton onClick={handleGoogleSignIn} />

                    <p className="text-center text-sm text-gray-600 mt-6">
                        {isLoginView ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={toggleView} className="font-medium text-blue-600 hover:text-blue-500 ml-1">
                            {isLoginView ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
