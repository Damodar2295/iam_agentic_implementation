import React from 'react';
import { ServiceAccount, ValidationResult } from '../types';

interface ResultPanelProps {
  accountData: ServiceAccount;
  validationResult: ValidationResult;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ accountData, validationResult }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border-t-4 border-yellow-600 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold mb-1 text-gray-800">Validation Results</h2>
          <p className="text-sm font-medium text-gray-700">Account ID: <span className="font-semibold">{accountData.account_id}</span></p>
        </div>
        <div>
          <span className="text-2xl text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded-md border border-yellow-200">{validationResult.score}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-md p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Account Information</h3>
          <p className="text-sm mb-2"><span className="text-gray-700 font-semibold">Application:</span> <span className="text-gray-900">{accountData.application}</span></p>
          <p className="text-sm mb-2"><span className="text-gray-700 font-semibold">Owner:</span> <span className="text-gray-900">{accountData.owner}</span></p>
          <p className="text-sm mb-2"><span className="text-gray-700 font-semibold">Last Used:</span> <span className="text-gray-900">{accountData.last_used}</span></p>
          <p className="text-sm mb-2"><span className="text-gray-700 font-semibold">Account Type:</span> <span className="text-gray-900">{accountData.metadata.account_type}</span></p>
          <p className="text-sm"><span className="text-gray-700 font-semibold">Last Activity:</span> <span className="text-gray-900">{accountData.metadata.last_activity_days} days ago</span></p>
        </div>
        
        <div className="bg-gray-50 rounded-md p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Compliance Status</h3>
          <p className="text-sm mb-2"><span className="text-gray-700 font-semibold">Status:</span> <span className={`font-bold ${validationResult.compliance === 'Compliant' ? 'text-green-600' : 'text-red-600'}`}>{validationResult.compliance}</span></p>
          <p className="text-sm text-gray-700 font-semibold mb-1">Violations:</p>
          <ul className="ml-5 mb-3">
            {validationResult.violations.map((violation, index) => (
              <li key={index} className="text-sm text-red-700 font-medium mb-1">{violation}</li>
            ))}
          </ul>
          <p className="text-sm"><span className="text-gray-700 font-semibold">Recommendation:</span> <span className="text-gray-900">{validationResult.recommendation}</span></p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-md p-5 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Validation Explanation</h3>
        <p className="text-sm text-gray-800 leading-relaxed">{validationResult.explanation}</p>
      </div>
    </div>
  );
};

export default ResultPanel; 