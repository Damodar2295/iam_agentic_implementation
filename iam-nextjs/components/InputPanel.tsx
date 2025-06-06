import React, { useState } from 'react';

interface InputPanelProps {
  onValidate: (accountId: string) => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onValidate, isLoading }) => {
  const [accountId, setAccountId] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onValidate(accountId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg border-t-4 border-red-700 p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">IAM Account Validation</h2>
      <form onSubmit={handleSubmit}>
        <label 
          htmlFor="accountId" 
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Service Account ID
        </label>
        <input
          type="text"
          id="accountId"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          placeholder="Enter Service Account ID (e.g. svc-usr123)"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-500 shadow-sm text-gray-800"
          required
          aria-label="Service Account ID input field"
          tabIndex={0}
        />
        <button
          type="submit"
          className={`w-full ${isLoading ? 'bg-red-500' : 'bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900'} text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 shadow-md`}
          disabled={isLoading}
          aria-label="Validate Account"
          tabIndex={0}
        >
          {isLoading ? 'Validating...' : 'Validate Account'}
        </button>
      </form>
    </div>
  );
};

export default InputPanel; 