import { ServiceAccount, ValidationResult, EvidenceFile } from '../types';
import React, { ReactNode } from 'react';

export const getMockServiceAccount = (accountId: string): ServiceAccount => {
  return {
    account_id: accountId || 'svc-usr123',
    application: 'CustomerDataPipeline',
    owner: 'John Doe',
    last_used: '2025-01-10',
    evidence: ['JIRA-1182', 'Email Approval Screenshot', 'Application Security Configuration'],
    metadata: {
      ticket_id: 'JIRA-1182',
      last_activity_days: 125,
      account_type: 'Privileged Service Account'
    }
  };
};

export const getMockValidationResult = (): ValidationResult => {
  return {
    compliance: 'Partially Compliant',
    score: '78%',
    violations: ['Inactive > 90 days'],
    recommendation: 'Get owner reconfirmation for inactive account',
    explanation: 'The service account has not been used for 125 days. Valid email approval found, but account requires reactivation confirmation due to extended inactivity.'
  };
};

// Simulate JIRA ticket with styled content
const JIRATicketContent = () => (
  <div className="bg-white p-6 border border-gray-300 rounded-md max-w-3xl mx-auto shadow-sm">
    <div className="flex items-center mb-4 border-b border-gray-200 pb-4">
      <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-bold mr-3">JIRA-1182</div>
      <h3 className="text-xl font-bold text-gray-800">Service Account Request: CustomerDataPipeline</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm font-medium">
              Resolved
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Requester</p>
          <div className="flex items-center">
            <div className="bg-blue-100 h-7 w-7 rounded-full flex items-center justify-center mr-2 text-xs font-bold text-blue-800">JD</div>
            <span className="text-gray-800">John Doe</span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Approver</p>
          <div className="flex items-center">
            <div className="bg-purple-100 h-7 w-7 rounded-full flex items-center justify-center mr-2 text-xs font-bold text-purple-800">JS</div>
            <span className="text-gray-800">Jane Smith (Manager)</span>
          </div>
        </div>
      </div>
      
      <div>
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Created</p>
          <p className="text-gray-800">2024-08-15</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Approval Date</p>
          <p className="text-gray-800">2024-08-20</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Type</p>
          <p className="text-gray-800">Service Account Request</p>
        </div>
      </div>
    </div>
    
    <div className="mb-6">
      <p className="text-sm text-gray-500 mb-1">Description</p>
      <p className="text-gray-800 bg-gray-50 p-3 rounded-md border border-gray-200">
        Request for service account creation for CustomerDataPipeline application for automated data processing.
        This account will be used for ETL processes between core systems and data warehouse.
      </p>
    </div>
    
    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <p className="font-medium text-amber-800">Compliance Note</p>
        <p className="text-sm text-amber-700">
          This ticket is now older than 90 days and requires renewal according to Wells Fargo IAM policy.
        </p>
      </div>
    </div>
  </div>
);

// Simulate Outlook Email Approval Screenshot - Updated
const EmailApprovalContent = () => (
  <div className="bg-gray-50 p-0 max-w-4xl mx-auto shadow-lg border border-gray-300 rounded-lg overflow-hidden">
    {/* Outlook Header Bar */}
    <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between text-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
            <span className="text-blue-600 text-xs font-bold">O</span>
          </div>
          <span className="font-medium">Outlook</span>
        </div>
        <span className="text-blue-200">|</span>
        <span>Mail</span>
      </div>
      <div className="flex items-center space-x-2">
        <button className="w-4 h-4 bg-blue-500 hover:bg-blue-400 rounded-sm flex items-center justify-center">
          <span className="text-xs">−</span>
        </button>
        <button className="w-4 h-4 bg-blue-500 hover:bg-blue-400 rounded-sm"></button>
        <button className="w-4 h-4 bg-red-500 hover:bg-red-400 rounded-sm flex items-center justify-center">
          <span className="text-xs">×</span>
        </button>
      </div>
    </div>

    {/* Outlook Ribbon */}
    <div className="bg-gray-100 border-b border-gray-300 px-4 py-1">
      <div className="flex items-center space-x-6 text-sm">
        <span className="text-blue-600 font-medium">Home</span>
        <span className="text-gray-600">Send / Receive</span>
        <span className="text-gray-600">Folder</span>
        <span className="text-gray-600">View</span>
      </div>
    </div>

    {/* Email Content */}
    <div className="bg-white">
      {/* Email Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Re: Service Account Approval - CustomerDataPipeline (JIRA-1182)
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                📧 Approved
              </span>
              <span>•</span>
              <span>Tuesday, August 20, 2024 10:15 AM</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sender/Recipient Info */}
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 w-16">From:</span>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
                JS
              </div>
              <div>
                <span className="font-medium text-gray-900">Jane Smith</span>
                <span className="text-gray-600 ml-1">&lt;jane.smith@wellsfargo.com&gt;</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 w-16">To:</span>
            <div className="text-gray-900">
              <span className="font-medium">John Doe</span> &lt;john.doe@wellsfargo.com&gt;; 
              <span className="font-medium ml-1">IAM Team</span> &lt;iam-team@wellsfargo.com&gt;
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 w-16">Subject:</span>
            <span className="text-gray-900 font-medium">Re: Service Account Approval - CustomerDataPipeline (JIRA-1182)</span>
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className="p-6 bg-white">
        <div className="text-gray-800 leading-relaxed space-y-4">
          <p>Hello John and IAM Team,</p>
          
          <p>
            I am writing to provide formal approval for the service account request documented in 
            <strong className="text-blue-600"> JIRA-1182</strong> for the CustomerDataPipeline application.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <h4 className="font-semibold text-blue-900 mb-2">📋 Service Account Details:</h4>
            <ul className="space-y-1 text-blue-800">
              <li><strong>Account Purpose:</strong> CustomerDataPipeline automation</li>
              <li><strong>Responsible Owner:</strong> John Doe (john.doe@wellsfargo.com)</li>
              <li><strong>Business Justification:</strong> ETL processes for data warehouse operations</li>
              <li><strong>Department:</strong> Data Engineering</li>
            </ul>
          </div>
          
          <p>
            As the Senior Manager overseeing the CustomerDataPipeline project, I confirm that this service account 
            is essential for our automated data processing operations. The account will be used for:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Read access to customer source data systems</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Write access to the enterprise data warehouse</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Execute permissions for scheduled ETL processes</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>API access for data validation and monitoring</span>
              </li>
            </ul>
          </div>
          
          <p>
            John Doe will serve as the primary account owner and will ensure compliance with all Wells Fargo 
            security policies and data governance requirements. We commit to regular access reviews and 
            immediate notification of any changes in account requirements.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-6">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-green-800">APPROVAL GRANTED</span>
            </div>
            <p className="text-green-700 text-sm">
              This email serves as formal management approval for the service account creation as outlined in JIRA-1182.
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p>Best regards,</p>
            <div className="mt-3">
              <p className="font-semibold text-gray-900">Jane Smith</p>
              <p className="text-gray-600">Senior Manager, Data Engineering</p>
              <p className="text-gray-600">Wells Fargo & Company</p>
              <p className="text-blue-600 text-sm">📧 jane.smith@wellsfargo.com</p>
              <p className="text-gray-600 text-sm">📞 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Footer with Outlook-style info */}
      <div className="bg-gray-50 border-t border-gray-200 p-3 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>📎 No attachments</span>
            <span>🔒 This message was sent securely</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Received: Aug 20, 2024 at 10:15 AM</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Simulate Application Configuration Logs/Screenshots
const AppConfigLogsContent = () => (
  <div className="bg-gray-900 text-green-400 font-mono text-sm max-w-5xl mx-auto shadow-lg border border-gray-600 rounded-lg overflow-hidden">
    {/* Terminal Header */}
    <div className="bg-gray-800 text-gray-300 px-4 py-2 flex items-center justify-between text-xs">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="font-medium">CustomerDataPipeline - Application Security Configuration</span>
      </div>
      <div className="text-gray-400">
        <span>Last Updated: 2024-08-15 14:30:22 UTC</span>
      </div>
    </div>

    {/* Terminal Content */}
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="border-b border-gray-700 pb-3">
        <div className="text-yellow-400 font-bold">
          $ sudo cat /opt/customerdatapipeline/config/security.conf
        </div>
        <div className="text-gray-500 text-xs mt-1">
          [SERVICE ACCOUNT: svc-usr123] Application Security Configuration Audit
        </div>
      </div>

      {/* Password Complexity Section */}
      <div className="space-y-2">
        <div className="text-cyan-400 font-bold">
          ################################################################################
        </div>
        <div className="text-cyan-400 font-bold">
          # PASSWORD COMPLEXITY CONFIGURATION
        </div>
        <div className="text-cyan-400 font-bold">
          ################################################################################
        </div>
        
        <div className="space-y-1 ml-4">
          <div><span className="text-yellow-300">password.complexity.enabled</span>=<span className="text-green-300">true</span></div>
          <div><span className="text-yellow-300">password.min.length</span>=<span className="text-green-300">12</span></div>
          <div><span className="text-yellow-300">password.require.uppercase</span>=<span className="text-green-300">true</span></div>
          <div><span className="text-yellow-300">password.require.lowercase</span>=<span className="text-green-300">true</span></div>
          <div><span className="text-yellow-300">password.require.numbers</span>=<span className="text-green-300">true</span></div>
          <div><span className="text-yellow-300">password.require.special.chars</span>=<span className="text-green-300">true</span></div>
          <div><span className="text-yellow-300">password.prohibited.patterns</span>=<span className="text-green-300">["password", "123456", "admin", "service"]</span></div>
          <div><span className="text-yellow-300">password.dictionary.check</span>=<span className="text-green-300">enabled</span></div>
        </div>

        <div className="bg-green-900 border border-green-700 rounded p-2 mt-2">
          <div className="text-green-300 font-bold">✓ COMPLIANCE STATUS: ENFORCED</div>
          <div className="text-green-200 text-xs">Password complexity rules are actively enforced for service account svc-usr123</div>
        </div>
      </div>

      {/* Password Rotation Section */}
      <div className="space-y-2 mt-6">
        <div className="text-cyan-400 font-bold">
          ################################################################################
        </div>
        <div className="text-cyan-400 font-bold">
          # PASSWORD ROTATION CONFIGURATION
        </div>
        <div className="text-cyan-400 font-bold">
          ################################################################################
        </div>
        
        <div className="space-y-1 ml-4">
          <div><span className="text-yellow-300">password.rotation.enabled</span>=<span className="text-green-300">true</span></div>
          <div><span className="text-yellow-300">password.rotation.interval.days</span>=<span className="text-green-300">90</span></div>
          <div><span className="text-yellow-300">password.rotation.warning.days</span>=<span className="text-green-300">14</span></div>
          <div><span className="text-yellow-300">password.history.count</span>=<span className="text-green-300">12</span></div>
          <div><span className="text-yellow-300">password.auto.rotation</span>=<span className="text-green-300">true</span></div>
          <div><span className="text-yellow-300">password.last.rotation</span>=<span className="text-yellow-300">2024-08-15T14:30:22Z</span></div>
          <div><span className="text-yellow-300">password.next.rotation</span>=<span className="text-orange-300">2024-11-13T14:30:22Z</span></div>
        </div>

        <div className="bg-blue-900 border border-blue-700 rounded p-2 mt-2">
          <div className="text-blue-300 font-bold">ℹ ROTATION STATUS: ACTIVE</div>
          <div className="text-blue-200 text-xs">Automatic password rotation scheduled every 90 days. Next rotation: 89 days</div>
        </div>
      </div>

      {/* Recent Security Events */}
      <div className="space-y-2 mt-6">
        <div className="text-cyan-400 font-bold">
          ################################################################################
        </div>
        <div className="text-cyan-400 font-bold">
          # RECENT SECURITY EVENTS
        </div>
        <div className="text-cyan-400 font-bold">
          ################################################################################
        </div>
        
        <div className="space-y-1 ml-4 text-xs">
          <div><span className="text-gray-400">[2024-08-15 14:30:22]</span> <span className="text-green-400">INFO</span> Password complexity check: <span className="text-green-300">PASSED</span></div>
          <div><span className="text-gray-400">[2024-08-15 14:30:22]</span> <span className="text-green-400">INFO</span> Password rotation: <span className="text-green-300">COMPLETED</span></div>
          <div><span className="text-gray-400">[2024-08-15 14:30:23]</span> <span className="text-blue-400">INFO</span> Service account authentication: <span className="text-green-300">SUCCESS</span></div>
          <div><span className="text-gray-400">[2024-08-15 14:30:24]</span> <span className="text-green-400">INFO</span> Security policy validation: <span className="text-green-300">PASSED</span></div>
          <div><span className="text-gray-400">[2024-08-10 09:15:33]</span> <span className="text-yellow-400">WARN</span> Password rotation reminder sent to owner</div>
          <div><span className="text-gray-400">[2024-07-20 16:45:12]</span> <span className="text-green-400">INFO</span> Password history cleanup: <span className="text-green-300">COMPLETED</span></div>
        </div>
      </div>

      {/* Configuration Verification */}
      <div className="space-y-2 mt-6">
        <div className="text-cyan-400 font-bold">
          ################################################################################
        </div>
        <div className="text-cyan-400 font-bold">
          # CONFIGURATION VERIFICATION
        </div>
        <div className="text-cyan-400 font-bold">
          ################################################################################
        </div>
        
        <div className="space-y-1 ml-4">
          <div className="text-yellow-400">$ security-validator --check-service-account svc-usr123</div>
          <div className="ml-2 space-y-1">
            <div><span className="text-green-400">✓</span> Password complexity requirements: <span className="text-green-300">COMPLIANT</span></div>
            <div><span className="text-green-400">✓</span> Password rotation policy: <span className="text-green-300">COMPLIANT</span></div>
            <div><span className="text-green-400">✓</span> Security configuration integrity: <span className="text-green-300">VERIFIED</span></div>
            <div><span className="text-green-400">✓</span> Audit logging: <span className="text-green-300">ACTIVE</span></div>
          </div>
        </div>

        <div className="bg-green-900 border border-green-700 rounded p-3 mt-3">
          <div className="text-green-300 font-bold">🔒 WELLS FARGO SECURITY COMPLIANCE: VERIFIED</div>
          <div className="text-green-200 text-xs mt-1">
            Service account svc-usr123 meets all Wells Fargo security requirements for password complexity and rotation policies.
          </div>
          <div className="text-green-200 text-xs">
            Configuration hash: <span className="text-yellow-300">SHA256:a8f5f167f44f4964e6c998dee827110c</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 pt-3 mt-6">
        <div className="text-gray-400 text-xs">
          Configuration verified by: Wells Fargo Security Operations Center
        </div>
        <div className="text-gray-400 text-xs">
          Audit trail: /var/log/security/svc-usr123-audit.log
        </div>
        <div className="text-gray-400 text-xs">
          Next compliance check: 2024-08-22 14:30:22 UTC
        </div>
      </div>
    </div>
  </div>
);

export const getEvidenceFiles = (): EvidenceFile[] => {
  return [
    {
      id: 'JIRA-1182',
      name: 'JIRA-1182',
      type: 'ticket',
      date: '2024-08-20',
      content: <JIRATicketContent />
    },
    {
      id: 'Email-Approval',
      name: 'Email Approval Screenshot',
      type: 'screenshot',
      date: '2024-08-20',
      content: <EmailApprovalContent />
    },
    {
      id: 'App-Config-Logs',
      name: 'Application Security Configuration',
      type: 'screenshot',
      date: '2024-08-15',
      content: <AppConfigLogsContent />
    }
  ];
};

export const getChatbotResponse = (message: string): string => {
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! How can I assist you with IAM validation today?";
  }
  else if (message.includes('what') && message.includes('iam')) {
    return "IAM (Identity and Access Management) is a framework for managing digital identities and their access to resources. Our validation assistant helps ensure service accounts comply with security policies.";
  }
  else if (message.includes('validation') && message.includes('process')) {
    return "The validation process involves checking service accounts against compliance rules. We verify last usage, ownership, approval documentation, and proper permissions.";
  }
  else if (message.includes('compliance') || message.includes('compliant')) {
    return "Compliance for service accounts requires: 1) Activity within 90 days, 2) Valid ownership, 3) Current approval documentation, and 4) Proper access controls. Accounts not meeting these are flagged for remediation.";
  }
  else if (message.includes('inactive')) {
    return "Inactive accounts (no usage for over 90 days) pose a security risk and should be reviewed. The owner should either confirm the account is still needed or it should be decommissioned.";
  }
  else if (message.includes('evidence')) {
    return "Evidence for service accounts includes: JIRA tickets, email approvals, access request forms, and usage logs. These are used to validate the account's purpose and authorization.";
  }
  else if (message.includes('fix') || message.includes('remediate')) {
    return "To remediate compliance issues: 1) Update approval documentation, 2) Confirm with the owner if the account is still needed, 3) Review and adjust permissions if necessary, or 4) Decommission if no longer required.";
  }
  else if (message.includes('architecture') || message.includes('how it works')) {
    return "Our system uses a Single Agent - Tool Use Pattern. The agent collects metadata, evidence, and applies compliance rules to evaluate service accounts. Check the Architecture Info panel for more details.";
  }
  else if (message.includes('check') || message.includes('validate')) {
    return "To validate an account, enter the service account ID in the main input field and click 'Validate Account'. The system will analyze it and provide compliance results and recommendations.";
  }
  else {
    return "I'm not sure I understand your question. Could you rephrase it? I can help with IAM validation processes, compliance requirements, or how to interpret results.";
  }
}; 