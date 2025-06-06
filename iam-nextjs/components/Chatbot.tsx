import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../data/mockData';

interface ChatbotProps {
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onModalOpen, onModalClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hello! I'm your IAM Validation Assistant. How can I help you with service account validation today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      if (onModalOpen) onModalOpen();
    } else {
      if (onModalClose) onModalClose();
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const sendMessage = () => {
    const userMessage = inputValue.trim();
    if (!userMessage) return;
    
    // Add user message with client-side timestamp
    const now = new Date();
    const clientTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setMessages(prev => [...prev, { text: userMessage, sender: 'user', time: clientTimeStr }]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getChatbotResponse(userMessage);
      const responseTime = new Date();
      const responseTimeStr = `${responseTime.getHours().toString().padStart(2, '0')}:${responseTime.getMinutes().toString().padStart(2, '0')}`;
      
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot', time: responseTimeStr }]);
      setIsTyping(false);
    }, 1000);
  };
  
  return (
    <>
      {/* Chat Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-full flex items-center justify-center shadow-xl hover:from-red-800 hover:to-red-700 transition-colors duration-200 z-40 border-2 border-white"
        aria-label="Toggle chat"
        tabIndex={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
      
      {/* Chat Window - No backdrop */}
      <div 
        className={`fixed bottom-24 right-8 w-80 md:w-96 bg-white rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'h-[500px] opacity-100' : 'h-0 opacity-0 pointer-events-none'} border border-gray-200`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="font-bold text-lg">IAM Assistant</h3>
          </div>
          <button 
            onClick={toggleChat}
            className="text-white hover:text-gray-200 bg-red-800 hover:bg-red-900 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close chat"
            tabIndex={0}
          >
            &times;
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-[85%] p-3 rounded-lg mb-3 ${
                msg.sender === 'user' 
                  ? 'ml-auto bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-none shadow-md' 
                  : 'mr-auto bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-200'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              {/* Only show timestamp for client-side added messages */}
              {msg.time && (
                <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-red-200' : 'text-gray-400'}`}>
                  {msg.time}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="max-w-[85%] p-3 rounded-lg mb-3 mr-auto bg-white shadow-md border border-gray-200 rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
        
        {/* Input */}
        <div className="p-3 border-t border-gray-200 bg-white flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-500 shadow-sm"
            aria-label="Chat message input"
            tabIndex={0}
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200 font-bold shadow-sm"
            aria-label="Send message"
            tabIndex={0}
            disabled={!inputValue.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot; 