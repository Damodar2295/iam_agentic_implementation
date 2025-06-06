import React, { useState } from 'react';
import { FeedbackData } from '../types';

interface FeedbackBoxProps {
  onSubmitFeedback: (feedback: FeedbackData) => void;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({ onSubmitFeedback }) => {
  const [positive, setPositive] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = () => {
    if (positive === null) return;
    
    onSubmitFeedback({
      positive,
      comment: comment.trim() || undefined
    });
    
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
        <div className="text-center py-6">
          <div className="bg-green-100 text-green-700 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-2">Thank you for your feedback!</p>
          <p className="text-gray-600">Your input helps us improve our validation system.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
      <h3 className="text-lg font-bold mb-3 text-gray-800">Validation Feedback</h3>
      <p className="text-sm text-gray-700 mb-4">Was this validation helpful?</p>
      
      <div className="flex space-x-4 mb-5">
        <button
          onClick={() => setPositive(true)}
          className={`px-5 py-2.5 rounded-md text-white font-medium ${
            positive === true 
              ? 'bg-green-600 ring-2 ring-green-200' 
              : 'bg-green-500 hover:bg-green-600'
          } transition-all shadow-sm flex-1`}
          aria-label="Yes, the validation was helpful"
          tabIndex={0}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Yes
          </span>
        </button>
        <button
          onClick={() => setPositive(false)}
          className={`px-5 py-2.5 rounded-md text-white font-medium ${
            positive === false 
              ? 'bg-red-600 ring-2 ring-red-200' 
              : 'bg-red-500 hover:bg-red-600'
          } transition-all shadow-sm flex-1`}
          aria-label="No, the validation was not helpful"
          tabIndex={0}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
            No
          </span>
        </button>
      </div>
      
      {positive !== null && (
        <>
          <label htmlFor="feedbackComment" className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Comments (Optional)
          </label>
          <textarea
            id="feedbackComment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Please share your thoughts on the validation"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-500 min-h-[100px] text-gray-800 shadow-sm"
            aria-label="Feedback comments"
            tabIndex={0}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 shadow-md"
            aria-label="Submit feedback"
            tabIndex={0}
          >
            Submit Feedback
          </button>
        </>
      )}
    </div>
  );
};

export default FeedbackBox; 