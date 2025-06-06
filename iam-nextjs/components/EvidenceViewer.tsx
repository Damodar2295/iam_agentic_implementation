import React, { useState, useEffect } from 'react';
import { EvidenceFile } from '../types';

interface EvidenceViewerProps {
  evidenceFiles: EvidenceFile[];
  onModalOpen?: () => void;
  onModalClose?: () => void;
  initiallyOpen?: boolean;
}

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ 
  evidenceFiles, 
  onModalOpen, 
  onModalClose,
  initiallyOpen = false
}) => {
  const [selectedFile, setSelectedFile] = useState<EvidenceFile | null>(null);
  
  // Set initial state based on prop
  useEffect(() => {
    if (initiallyOpen && evidenceFiles.length > 0) {
      setSelectedFile(evidenceFiles[0]);
    }
  }, [initiallyOpen, evidenceFiles]);
  
  const openModal = (file: EvidenceFile) => {
    setSelectedFile(file);
    if (onModalOpen) onModalOpen();
  };
  
  const closeModal = () => {
    setSelectedFile(null);
    if (onModalClose) onModalClose();
  };
  
  // If used in list-only mode, just render nothing
  if (!initiallyOpen && evidenceFiles.length === 0) {
    return null;
  }
  
  // If we're in modal-only mode, just render the modal
  if (initiallyOpen) {
    return (
      <>
        {/* Modal - no backdrop */}
        {selectedFile && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <div 
              className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800">{selectedFile.name}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900 bg-white rounded-full h-8 w-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                  tabIndex={0}
                >
                  &times;
                </button>
              </div>
              <div className="p-6">
                {selectedFile.content}
              </div>
              <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-md transition-colors"
                  aria-label="Close"
                  tabIndex={0}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  
  // Standard component with list
  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 mt-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Evidence Files</h3>
        <div className="space-y-3">
          {evidenceFiles.map((file) => (
            <div 
              key={file.id}
              className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-md text-sm hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-800">
                <i className={`fas ${file.type === 'ticket' ? 'fa-file-alt' : 'fa-image'} mr-3 text-blue-600`}></i>
                {file.name}
                <span className="ml-2 text-xs text-gray-500">{file.date}</span>
              </span>
              <button
                onClick={() => openModal(file)}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
                aria-label={`View ${file.name}`}
                tabIndex={0}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal - no backdrop */}
      {selectedFile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
          <div 
            className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">{selectedFile.name}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900 bg-white rounded-full h-8 w-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
                tabIndex={0}
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              {selectedFile.content}
            </div>
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-md transition-colors"
                aria-label="Close"
                tabIndex={0}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EvidenceViewer; 