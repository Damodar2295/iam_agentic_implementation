import React, { useState } from 'react';

// Architecture Diagram Component with interactive elements
const ArchitectureDiagram = () => {
  return (
    <div className="w-full h-full bg-white p-8 relative">
      {/* Main Flow Container */}
      <div className="absolute w-full h-full left-0 top-0 flex flex-col">
        <div className="w-full text-center py-4">
          <span className="bg-gradient-to-r from-red-100 to-red-50 text-red-700 text-sm font-bold py-1.5 px-5 rounded-full border border-red-200 inline-block shadow-sm">
            Wells Fargo IAM Validation Architecture
          </span>
        </div>

        {/* Main Process Flow */}
        <div className="flex-1 relative mx-6 border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50/30 to-white p-8 shadow-md">
          {/* Process Title */}
          <div className="absolute top-[-12px] left-[50%] transform translate-x-[-50%] bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 text-sm font-medium rounded-md shadow-sm">
            IAM Validation Flow
          </div>

          {/* Top Row Components - Consistent sizing and alignment */}
          <div className="flex justify-between items-center mt-4 px-8">
            {/* Common styles for all component boxes */}
            {[
              {
                title: "Input Handler",
                desc: "Service Account ID",
                color: "red",
                num: 1,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                ),
                label: "Account ID Validation"
              },
              {
                title: "Data Collection",
                desc: "Metadata & Evidence",
                color: "purple",
                num: 2,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                ),
                label: "Tool-based Collection"
              },
              {
                title: "Validation Agent",
                desc: "Apply IAM Rules",
                color: "green",
                num: 3,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                label: "AI-powered Analysis"
              },
              {
                title: "Results Generator",
                desc: "Compliance Results",
                color: "yellow",
                num: 4,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                ),
                label: "Scoring & Recommendations"
              }
            ].map((item, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Component Box - Fixed dimensions and consistent styling */}
                <div className={`group relative w-32 h-32 bg-gradient-to-br from-white to-${item.color}-50 border-2 border-${item.color}-400 rounded-lg flex flex-col items-center justify-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer z-10`}>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${item.color}-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-sm`}>{item.num}</div>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 text-${item.color}-500 mb-1 group-hover:text-${item.color}-600 transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                  <div className="text-center px-2">
                    <div className="font-bold text-[11px] text-gray-800 group-hover:text-gray-900">{item.title}</div>
                    <div className="text-[9px] text-gray-500 group-hover:text-gray-700">{item.desc}</div>
                  </div>
                </div>
                
                {/* Label below component */}
                <div className={`mt-2 text-[9px] font-medium text-${item.color}-700 bg-${item.color}-50 px-2 py-0.5 rounded-md border border-${item.color}-100 shadow-sm`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Flow arrows for top row - Clean and consistent */}
          <div className="flex justify-center items-center relative mt-4">
            {/* Unified flow line */}
            <div className="w-[80%] h-1.5 bg-gradient-to-r from-red-500 via-purple-500 via-green-500 to-yellow-500 rounded-full shadow-sm z-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full animate-pulse"></div>
            </div>
            
            {/* Flow direction indicators - Evenly spaced */}
            <div className="absolute left-[25%] top-[50%] transform -translate-y-1/2 z-20">
              <div className="h-3 w-3 bg-purple-500 rotate-45 transform animate-pulse"></div>
            </div>
            <div className="absolute left-[50%] top-[50%] transform -translate-y-1/2 z-20">
              <div className="h-3 w-3 bg-green-500 rotate-45 transform animate-pulse"></div>
            </div>
            <div className="absolute left-[75%] top-[50%] transform -translate-y-1/2 z-20">
              <div className="h-3 w-3 bg-yellow-500 rotate-45 transform animate-pulse"></div>
            </div>
          </div>

          {/* Bidirectional Data Exchange Label - Centered */}
          <div className="w-full text-center mt-4 mb-2">
            <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shadow-sm inline-block">
              Bidirectional Data Exchange
            </span>
          </div>

          {/* Evidence Collector (Center Bottom) with bidirectional connections */}
          <div className="flex justify-center items-center mt-2 relative">
            {/* Vertical connecting line - Centered and consistent */}
            <div className="absolute -top-3 left-[50%] transform -translate-x-1/2 w-1.5 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full z-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-transparent opacity-30 rounded-full animate-pulse"></div>
            </div>
            
            {/* Evidence Collector Box - Same styling as top components */}
            <div className="group relative w-36 h-36 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-400 rounded-lg flex flex-col items-center justify-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer z-10">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-sm">5</div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 mb-1 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <div className="text-center px-2">
                <div className="font-bold text-[11px] text-gray-800 group-hover:text-gray-900">Evidence Collector</div>
                <div className="text-[9px] text-gray-500 group-hover:text-gray-700">Manage Documents</div>
              </div>
              
              {/* Bidirectional flow connections - Symmetrical */}
              <div className="absolute left-[-60px] w-[60px] top-[50%] transform -translate-y-1/2 z-20">
                <div className="relative h-0.5 w-full bg-blue-400 rounded-full">
                  <div className="absolute left-0 top-[-3px] h-3 w-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-0 left-0 h-0.5 w-1/3 bg-blue-600 rounded-full animate-data-flow-right"></div>
                </div>
              </div>
              
              <div className="absolute right-[-60px] w-[60px] top-[50%] transform -translate-y-1/2 z-20">
                <div className="relative h-0.5 w-full bg-blue-400 rounded-full">
                  <div className="absolute right-0 top-[-3px] h-3 w-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-0 right-0 h-0.5 w-1/3 bg-blue-600 rounded-full animate-data-flow-left"></div>
                </div>
              </div>

              {/* Connection to external systems - Centered */}
              <div className="absolute -bottom-6 left-[50%] transform -translate-x-1/2 w-1.5 h-6 bg-gradient-to-b from-blue-500 to-gray-400 rounded-full">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-transparent opacity-30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* External Systems with improved alignment */}
        <div className="relative mx-6 mt-4 py-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-md shadow-sm border border-gray-200">
          {/* Centered label */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-md text-[10px] font-medium text-gray-700 border border-gray-200 shadow-sm whitespace-nowrap">
            External Systems
          </div>
          
          {/* Evenly spaced system icons */}
          <div className="flex justify-around items-center px-6">
            {[
              {name: 'Tachyon', desc: 'Activity Discovery', icon: 'T'},
              {name: 'MCP', desc: 'Metadata Collection', icon: 'M'},
              {name: 'Apigee', desc: 'API Gateway', icon: 'A'},
              {name: 'ES', desc: 'Evidence Storage', icon: 'E'},
              {name: 'NLP', desc: 'Context Understanding', icon: 'N'}
            ].map((system, index) => (
              <div key={index} className="group flex flex-col items-center transition-transform hover:scale-110 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 group-hover:from-gray-300 group-hover:to-gray-200 flex items-center justify-center mb-1 transition-colors shadow-sm">
                  <span className="text-[10px] font-bold text-gray-600">{system.icon}</span>
                </div>
                <span className="text-[9px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors text-center">{system.name}</span>
                <span className="text-[8px] text-gray-500 group-hover:text-gray-700 transition-colors text-center">{system.desc}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend - Centered and aligned */}
        <div className="flex justify-center mt-3 mb-2">
          <div className="bg-white rounded-full shadow-sm px-4 py-1 flex space-x-5 text-[8px] text-gray-600 border border-gray-100">
            {[
              {color: 'red', label: 'Input'},
              {color: 'purple', label: 'Collection'},
              {color: 'green', label: 'Validation'},
              {color: 'yellow', label: 'Results'},
              {color: 'blue', label: 'Evidence'}
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-2 h-2 bg-${item.color}-500 rounded-full mr-1`}></div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes dataFlowRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        @keyframes dataFlowLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-data-flow-right {
          animation: dataFlowRight 2s infinite;
        }
        .animate-data-flow-left {
          animation: dataFlowLeft 2s infinite;
        }
      `}</style>
    </div>
  );
};

interface ArchitectureInfoProps {
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

const ArchitectureInfo: React.FC<ArchitectureInfoProps> = ({ onModalOpen, onModalClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openInfo = () => {
    setIsOpen(true);
    if (onModalOpen) onModalOpen();
  };
  
  const closeInfo = () => {
    setIsOpen(false);
    if (onModalClose) onModalClose();
  };
  
  return (
    <>
      {/* Info button */}
      <button
        onClick={openInfo}
        className="fixed bottom-8 left-8 w-14 h-14 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full flex items-center justify-center shadow-xl hover:from-gray-700 hover:to-gray-600 transition-colors duration-200 z-40 border-2 border-white"
        aria-label="Open architecture information"
        tabIndex={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      {/* Drawer - Full screen width */}
      <div 
        className={`fixed inset-y-0 left-0 w-full bg-white shadow-2xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <div className="p-8 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">IAM Validation Architecture</h2>
            <button 
              onClick={closeInfo} 
              className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close architecture info"
              tabIndex={0}
            >
              &times;
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Single Agent – Tool Use Pattern</h3>
            <p className="text-sm mb-4 text-gray-700 leading-relaxed">This demo implements the &quot;Single Agent – Tool Use Pattern&quot; architecture for IAM validation:</p>
            
            {/* Diagram container with responsive height */}
            <div className="relative w-full h-[90vh] mb-6 bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
              <ArchitectureDiagram />
            </div>
            
            <h3 className="text-lg font-bold mb-3 mt-6 text-gray-800 border-t border-gray-200 pt-5">Components</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="text-sm list-disc ml-5 space-y-2 text-gray-700">
                <li><span className="font-semibold text-gray-800">Input Handler:</span> Processes service account IDs</li>
                <li><span className="font-semibold text-gray-800">Data Collection Tools:</span> Gathers metadata and evidence</li>
                <li><span className="font-semibold text-gray-800">Validation Agent:</span> Applies IAM rules to evaluate compliance</li>
              </ul>
              <ul className="text-sm list-disc ml-5 space-y-2 text-gray-700">
                <li><span className="font-semibold text-gray-800">Results Generator:</span> Creates structured output with scores</li>
                <li><span className="font-semibold text-gray-800">Evidence Collector:</span> Manages proof documents</li>
              </ul>
            </div>
            
            <h3 className="text-lg font-bold mb-3 mt-6 text-gray-800 border-t border-gray-200 pt-5">Tools Used</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="text-sm list-disc ml-5 space-y-2 text-gray-700">
                <li><span className="font-semibold text-gray-800">Tachyon:</span> Account activity discovery</li>
                <li><span className="font-semibold text-gray-800">MCP:</span> Metadata collection</li>
                <li><span className="font-semibold text-gray-800">Apigee:</span> API gateway for service calls</li>
              </ul>
              <ul className="text-sm list-disc ml-5 space-y-2 text-gray-700">
                <li><span className="font-semibold text-gray-800">ES:</span> Evidence storage and retrieval</li>
                <li><span className="font-semibold text-gray-800">NLP:</span> For context understanding</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-5 shadow-sm border border-blue-200">
            <h3 className="text-lg font-bold mb-3 text-blue-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Implementation Notes
            </h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              This is a demo implementation using Next.js, React, and TypeScript. In a production environment, these services would connect to actual Wells Fargo internal systems.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchitectureInfo; 