import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const Chatbot: React.FC = () => {
    const { toggleChat, chatHistory, sendChatMessage, isBotTyping } = useAppContext();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [chatHistory, isBotTyping]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendChatMessage(input);
            setInput('');
        }
    };
    
    return (
        <div className="fixed bottom-0 right-0 z-40 sm:bottom-4 sm:right-4 w-full h-full sm:w-96 sm:h-[32rem] sm:max-h-[calc(100vh-2rem)] flex flex-col bg-white rounded-none sm:rounded-2xl shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-none sm:rounded-t-2xl">
                <h3 className="text-lg font-bold text-gray-800">GeoRaksha Assistant</h3>
                <button onClick={toggleChat} className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && (
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">GR</div>
                            )}
                            <div className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                                msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isBotTyping && (
                         <div className="flex items-end gap-2 justify-start">
                             <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">GR</div>
                            <div className="px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                 <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white rounded-b-none sm:rounded-b-2xl">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for safety tips..."
                        className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isBotTyping}
                    />
                    <button type="submit" className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:bg-blue-300" disabled={isBotTyping || !input.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;