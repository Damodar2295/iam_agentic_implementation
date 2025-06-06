import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-white to-gray-50 shadow-lg border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-red-700 font-bold text-3xl tracking-tight">Wells Fargo</div>
          <div className="text-right">
            <h1 className="text-red-700 text-2xl font-bold m-0 tracking-tight">IAM Validation Assistant</h1>
            <p className="text-sm text-gray-700 font-medium">Non-Human Account Validation</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 