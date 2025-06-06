import { ServiceAccount, ValidationResult, EvidenceFile } from '../types';
import { ReactNode } from 'react';

export const getMockServiceAccount = (accountId: string): ServiceAccount => {
  return {
    account_id: accountId || 'svc-usr123',
    application: 'CustomerDataPipeline',
    owner: 'John Doe',
    last_used: '2025-01-10',
    evidence: ['JIRA-1182', 'Email Approval Screenshot'],
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
    score: '72%',
    violations: ['Inactive > 90 days', 'Stale ticket'],
    recommendation: 'Get owner reconfirmation via updated approval ticket',
    explanation: 'The service account has not been used for 125 days. Approval ticket found but older than 90 days.'
  };
};

export const getEvidenceFiles = (): EvidenceFile[] => {
  return [
    {
      id: 'JIRA-1182',
      name: 'JIRA-1182',
      type: 'ticket',
      date: '2024-08-20',
      content: (
        <div className="p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold">JIRA Ticket: JIRA-1182</h3>
          <p><strong>Type:</strong> Service Account Request</p>
          <p><strong>Created:</strong> 2024-08-15</p>
          <p><strong>Status:</strong> Resolved</p>
          <p><strong>Requester:</strong> John Doe</p>
          <p><strong>Description:</strong> Request for service account creation for CustomerDataPipeline application for automated data processing.</p>
          <p><strong>Approver:</strong> Jane Smith (Manager)</p>
          <p><strong>Approval Date:</strong> 2024-08-20</p>
          <p><strong>Note:</strong> This ticket is now older than 90 days and requires renewal.</p>
        </div>
      ) as ReactNode
    },
    {
      id: 'Email-Approval',
      name: 'Email Approval Screenshot',
      type: 'screenshot',
      date: '2024-08-20',
      content: (
        <div className="text-center">
          <img 
            src="https://via.placeholder.com/500x300?text=Email+Approval+Screenshot" 
            alt="Email Approval" 
            className="max-w-full border border-gray-300" 
          />
          <p className="mt-2 italic">Email approval from Jane Smith (Manager) on 2024-08-20</p>
        </div>
      ) as ReactNode
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