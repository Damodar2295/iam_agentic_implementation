'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import InputPanel from '../components/InputPanel';
import ResultPanel from '../components/ResultPanel';
import EvidenceViewer from '../components/EvidenceViewer';
import FeedbackBox from '../components/FeedbackBox';
import ArchitectureInfo from '../components/ArchitectureInfo';
import Chatbot from '../components/Chatbot';
import { ServiceAccount, ValidationResult, FeedbackData } from '../types';
import { getMockServiceAccount, getMockValidationResult, getEvidenceFiles } from '../data/mockData';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState<ServiceAccount | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [evidenceViewerOpen, setEvidenceViewerOpen] = useState(false);
  const [selectedEvidenceFile, setSelectedEvidenceFile] = useState<any>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successDetails, setSuccessDetails] = useState<any>(null);

  // Handle validation request
  const handleValidate = (accountId: string) => {
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const mockAccount = getMockServiceAccount(accountId);
      const mockResult = getMockValidationResult();
      
      setAccountData(mockAccount);
      setValidationResult(mockResult);
      setShowResults(true);
      setLoading(false);
    }, 1500);
  };
  
  // Handle feedback submission
  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    console.log('Feedback submitted:', feedback);
    // In a real app, you would send this to your backend
  };

  // Handle evidence viewer modal state
  const handleEvidenceViewerOpen = (file: any) => {
    setSelectedEvidenceFile(file);
    setEvidenceViewerOpen(true);
    setIsAnyModalOpen(true);
  };

  const handleEvidenceViewerClose = () => {
    setEvidenceViewerOpen(false);
    setSelectedEvidenceFile(null);
    setIsAnyModalOpen(false);
  };

  // Handle chatbot open/close without blurring
  const handleChatbotOpen = () => {
    setIsChatbotOpen(true);
  };

  const handleChatbotClose = () => {
    setIsChatbotOpen(false);
  };

  // Handle compliance action modal
  const handleActionModalOpen = () => {
    setShowActionModal(true);
    setIsAnyModalOpen(true);
  };

  const handleActionModalClose = () => {
    setShowActionModal(false);
    setIsAnyModalOpen(false);
  };

  // Handle JIRA ticket creation
  const handleCreateJiraTicket = () => {
    console.log('Creating JIRA ticket for compliance violation...');
    
    const jiraDetails = {
      type: 'jira',
      ticketNumber: 'COMP-2025-001',
      title: `Service Account Compliance Violation - ${accountData?.account_id}`,
      status: 'Open',
      priority: 'Medium',
      assignee: 'IAM Team (iam-team@wellsfargo.com)',
      reporter: 'IAM Validation Assistant',
      project: 'Compliance Management (COMP)',
      url: 'https://wellsfargo.atlassian.net/browse/COMP-2025-001',
      components: ['Identity & Access Management', 'Service Accounts'],
      labels: ['compliance-violation', 'service-account', 'inactive-account'],
      description: `Service account ${accountData?.account_id} has been flagged for compliance violations:\n\n• ${validationResult?.violations?.join('\n• ')}\n\nAccount Details:\n- Application: ${accountData?.application}\n- Owner: ${accountData?.owner}\n- Last Used: ${accountData?.last_used}\n- Compliance Score: ${validationResult?.score}\n\nRecommended Action: ${validationResult?.recommendation}`,
      watchers: ['john.doe@wellsfargo.com', 'jane.smith@wellsfargo.com', 'security-team@wellsfargo.com'],
      created: new Date().toLocaleString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() // 7 days from now
    };
    
    setSuccessDetails(jiraDetails);
    setShowActionModal(false);
    setShowSuccessModal(true);
  };

  // Handle email sending
  const handleSendEmail = () => {
    console.log('Sending compliance email...');
    
    const emailDetails = {
      type: 'email',
      subject: 'Action Required - Service Account Compliance Issue',
      messageId: 'MSG-IAM-' + Date.now(),
      recipients: {
        to: [
          { name: 'John Doe', email: 'john.doe@wellsfargo.com', role: 'Account Owner' },
          { name: 'IAM Team', email: 'iam-team@wellsfargo.com', role: 'IAM Team' }
        ],
        cc: [
          { name: 'Jane Smith', email: 'jane.smith@wellsfargo.com', role: 'Manager' },
          { name: 'Security Team', email: 'security-team@wellsfargo.com', role: 'Security Team' }
        ],
        bcc: [
          { name: 'Compliance Audit', email: 'compliance-audit@wellsfargo.com', role: 'Audit Team' }
        ]
      },
      content: {
        body: `Dear Team,\n\nThis is an automated notification regarding a compliance issue with service account ${accountData?.account_id}.\n\nCompliance Issues Detected:\n• ${validationResult?.violations?.join('\n• ')}\n\nAccount Information:\n- Service Account ID: ${accountData?.account_id}\n- Application: ${accountData?.application}\n- Account Owner: ${accountData?.owner}\n- Last Activity: ${accountData?.last_used}\n- Compliance Score: ${validationResult?.score}\n\nRecommended Action:\n${validationResult?.recommendation}\n\nPlease take immediate action to address these compliance violations. If you have any questions, please contact the IAM team.\n\nBest regards,\nIAM Validation Assistant`,
        attachments: [
          'compliance-report.pdf',
          'evidence-files.zip'
        ]
      },
      sentAt: new Date().toLocaleString(),
      smtpServer: 'smtp.wellsfargo.com',
      priority: 'High',
      deliveryReceipt: true,
      readReceipt: true
    };
    
    setSuccessDetails(emailDetails);
    setShowActionModal(false);
    setShowSuccessModal(true);
  };

  // Handle success modal close
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setSuccessDetails(null);
    setIsAnyModalOpen(false);
  };
  
  // Determine if we should blur - only blur for architecture or evidence, not chatbot
  const shouldBlur = (isAnyModalOpen && !isChatbotOpen) || showActionModal || showSuccessModal;
  
  return (
    <main className="min-h-screen bg-gray-100 relative">
      {/* Watermark */}
      <div 
        className="fixed inset-0 bg-no-repeat bg-center z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url(/wells-fargo-logo.png)', backgroundSize: '40%' }}
      ></div>
      
      <Header />
      
      {/* Main content with conditional blur */}
      <div 
        className={`max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 relative z-10 transition-all duration-300 ${shouldBlur ? 'blur-sm' : ''}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <InputPanel onValidate={handleValidate} isLoading={loading} />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2">
            {!showResults ? (
              <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center min-h-[200px] text-gray-500">
                Enter a service account ID and click &quot;Validate Account&quot; to see results
              </div>
            ) : (
              <div>
                {accountData && validationResult && (
                  <>
                    <ResultPanel accountData={accountData} validationResult={validationResult} />
                    
                    {/* Compliance Action Button - Show when there are violations */}
                    {validationResult.violations && validationResult.violations.length > 0 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1">
                            <h3 className="text-sm font-medium text-orange-800">
                              Compliance Issues Detected
                            </h3>
                            <div className="mt-2 text-sm text-orange-700">
                              <p>This service account has {validationResult.violations.length} compliance violation(s) that require immediate attention.</p>
                            </div>
                            <div className="mt-4">
                              <button
                                onClick={handleActionModalOpen}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm inline-flex items-center"
                                aria-label="Take Action on Compliance Issues"
                                tabIndex={0}
                              >
                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Take Action
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Evidence Files List - Only the list is in the main content */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 mt-6">
                      <h3 className="text-lg font-bold mb-4 text-gray-800">Evidence Files</h3>
                      <div className="space-y-3">
                        {getEvidenceFiles().map((file) => (
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
                              onClick={() => handleEvidenceViewerOpen(file)}
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
                    
                    <FeedbackBox onSubmitFeedback={handleFeedbackSubmit} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <footer className="text-center text-gray-500 text-xs mt-12">
          <p>© 2025 Wells Fargo Bank, N.A. All rights reserved. Member FDIC.</p>
      </footer>
    </div>
      
      {/* Components that should appear above the blur */}
      {evidenceViewerOpen && selectedEvidenceFile && (
        <EvidenceViewer 
          evidenceFiles={[selectedEvidenceFile]} 
          onModalOpen={() => {}} // No-op since we're handling it in the parent
          onModalClose={handleEvidenceViewerClose}
          initiallyOpen={true}
        />
      )}
      
      <ArchitectureInfo 
        onModalOpen={() => setIsAnyModalOpen(true)}
        onModalClose={() => setIsAnyModalOpen(false)}
      />
      <Chatbot 
        onModalOpen={handleChatbotOpen}
        onModalClose={handleChatbotClose}
      />

      {/* Compliance Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleActionModalClose}></div>
          <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-2xl relative z-10">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Take Action on Compliance Issues</h2>
                <button 
                  onClick={handleActionModalClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Choose an action to address the compliance violations for service account <strong>{accountData?.account_id}</strong>
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* JIRA Ticket Option */}
              <button
                onClick={handleCreateJiraTicket}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-900">
                      Create JIRA Ticket
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 group-hover:text-blue-700">
                      Automatically create a compliance ticket assigned to the IAM team with violation details and remediation steps
                    </p>
                  </div>
                </div>
              </button>

              {/* Email Option */}
              <button
                onClick={handleSendEmail}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-600 group-hover:text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-900">
                      Send Email Notification
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 group-hover:text-green-700">
                      Send immediate notification to account owner, manager, and IAM team about compliance violations
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={handleActionModalClose}
                className="w-full text-center py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Details Modal */}
      {showSuccessModal && successDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleSuccessModalClose}></div>
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
            {/* Success Header */}
            <div className="p-6 border-b border-gray-200 bg-green-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h2 className="text-xl font-bold text-green-900">
                      {successDetails.type === 'jira' ? 'JIRA Ticket Created Successfully' : 'Email Sent Successfully'}
                    </h2>
                    <p className="text-sm text-green-700">
                      {successDetails.type === 'jira' ? 'Compliance ticket has been created and assigned' : 'Notification has been sent to all relevant parties'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleSuccessModalClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {successDetails.type === 'jira' ? (
                <>
                  {/* JIRA Ticket Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Ticket Number</label>
                        <p className="mt-1 text-sm font-mono text-blue-600">{successDetails.ticketNumber}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {successDetails.status}
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</label>
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {successDetails.priority}
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Due Date</label>
                        <p className="mt-1 text-sm text-gray-900">{successDetails.dueDate}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Assignee</label>
                        <p className="mt-1 text-sm text-gray-900">{successDetails.assignee}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Reporter</label>
                        <p className="mt-1 text-sm text-gray-900">{successDetails.reporter}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Project</label>
                        <p className="mt-1 text-sm text-gray-900">{successDetails.project}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Created</label>
                        <p className="mt-1 text-sm text-gray-900">{successDetails.created}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Ticket URL</label>
                    <a href={successDetails.url} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm text-blue-600 hover:text-blue-800 underline break-all">
                      {successDetails.url}
                    </a>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Components</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {successDetails.components.map((component: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {component}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Labels</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {successDetails.labels.map((label: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Watchers</label>
                    <div className="mt-1 space-y-1">
                      {successDetails.watchers.map((watcher: string, index: number) => (
                        <p key={index} className="text-sm text-gray-700">{watcher}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Description</label>
                    <div className="mt-1 bg-gray-50 rounded-md p-3">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{successDetails.description}</pre>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Email Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Message ID</label>
                        <p className="mt-1 text-sm font-mono text-gray-600">{successDetails.messageId}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</label>
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {successDetails.priority}
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">SMTP Server</label>
                        <p className="mt-1 text-sm text-gray-900">{successDetails.smtpServer}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Sent At</label>
                        <p className="mt-1 text-sm text-gray-900">{successDetails.sentAt}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Delivery Receipt</label>
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {successDetails.deliveryReceipt ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Read Receipt</label>
                        <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {successDetails.readReceipt ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Subject</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">{successDetails.subject}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Recipients (TO)</label>
                      <div className="mt-1 space-y-2">
                        {successDetails.recipients.to.map((recipient: any, index: number) => (
                          <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded-md">
                            <span className="text-sm text-gray-900">{recipient.name} ({recipient.email})</span>
                            <span className="text-xs text-blue-600 font-medium">{recipient.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Recipients (CC)</label>
                      <div className="mt-1 space-y-2">
                        {successDetails.recipients.cc.map((recipient: any, index: number) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                            <span className="text-sm text-gray-900">{recipient.name} ({recipient.email})</span>
                            <span className="text-xs text-gray-600 font-medium">{recipient.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Recipients (BCC)</label>
                      <div className="mt-1 space-y-2">
                        {successDetails.recipients.bcc.map((recipient: any, index: number) => (
                          <div key={index} className="flex items-center justify-between bg-yellow-50 p-2 rounded-md">
                            <span className="text-sm text-gray-900">{recipient.name} ({recipient.email})</span>
                            <span className="text-xs text-yellow-600 font-medium">{recipient.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Attachments</label>
                    <div className="mt-1 space-y-1">
                      {successDetails.content.attachments.map((attachment: string, index: number) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          {attachment}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Email Content</label>
                    <div className="mt-1 bg-gray-50 rounded-md p-3">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{successDetails.content.body}</pre>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={handleSuccessModalClose}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
