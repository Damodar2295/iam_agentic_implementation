# IAM Validation Assistant - Production Ready Guide

## 🎯 Overview

The IAM Validation Assistant is a comprehensive Next.js application designed for Wells Fargo's Identity and Access Management compliance validation. This application provides automated service account validation, evidence collection, compliance scoring, and integrated remediation workflows.

## 🏗️ Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
│                      │                      │
├─ React Components   ├─ API Routes          ├─ LLM APIs
├─ TypeScript         ├─ MCP Agents          ├─ JIRA API
├─ Tailwind CSS       ├─ Database            ├─ SMTP Server
└─ State Management   └─ Authentication      └─ LDAP/AD
```

### Component Architecture
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── api/               # API routes
│       ├── validate/      # Service account validation
│       ├── llm/           # LLM integration
│       ├── jira/          # JIRA integration
│       └── email/         # Email service
├── components/            # React components
├── data/                  # Mock data & types
├── lib/                   # Utilities & configurations
├── types/                 # TypeScript definitions
└── hooks/                 # Custom React hooks
```

## 📦 Prerequisites

### System Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **TypeScript**: 5.0.0 or higher
- **PostgreSQL**: 14.0 or higher (for production)
- **Redis**: 6.0 or higher (for caching)

### External Service Access
- **OpenAI API** or **Claude API** access
- **JIRA** instance with API access
- **SMTP** server for email notifications
- **LDAP/Active Directory** for user authentication
- **Supabase** or **PostgreSQL** database

## 🚀 Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd iam-nextjs

# Install dependencies
npm install

# Install additional production dependencies
npm install @supabase/supabase-js
npm install openai
npm install @anthropic-ai/sdk
npm install nodemailer
npm install jira-client
npm install ldapjs
npm install redis
npm install winston
npm install helmet
npm install cors
npm install rate-limiter-flexible
```

### 2. Environment Configuration

Create `.env.local` file in the root directory:

```bash
# Application Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
PORT=3000

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/iam_validation
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# LLM API Configuration
OPENAI_API_KEY=sk-your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
LLM_PROVIDER=openai  # or 'anthropic'
LLM_MODEL=gpt-4      # or 'claude-3-sonnet'

# JIRA Integration
JIRA_HOST=https://wellsfargo.atlassian.net
JIRA_USERNAME=your-jira-email
JIRA_API_TOKEN=your-jira-api-token
JIRA_PROJECT_KEY=COMP

# Email Service
SMTP_HOST=smtp.wellsfargo.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
EMAIL_FROM=iam-validation@wellsfargo.com

# LDAP/Active Directory
LDAP_URL=ldap://your-ldap-server:389
LDAP_BASE_DN=dc=wellsfargo,dc=com
LDAP_BIND_DN=cn=admin,dc=wellsfargo,dc=com
LDAP_BIND_PASSWORD=your-ldap-password

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-redis-password

# Security
JWT_SECRET=your-very-strong-jwt-secret-key
ENCRYPTION_KEY=your-32-character-encryption-key
SESSION_SECRET=your-session-secret

# MCP Agent Configuration
MCP_SUPABASE_URL=https://your-mcp-project.supabase.co
MCP_SUPABASE_KEY=your-mcp-service-key

# Monitoring & Logging
LOG_LEVEL=info
SENTRY_DSN=https://your-sentry-dsn
NEW_RELIC_LICENSE_KEY=your-newrelic-key

# Feature Flags
ENABLE_CHATBOT=true
ENABLE_COMPLIANCE_ACTIONS=true
ENABLE_EVIDENCE_VIEWER=true
```

## 🔧 Component Breakdown

### 1. Main Application (`app/page.tsx`)
**Purpose**: Core application logic and state management
**Key Features**:
- Service account validation workflow
- Modal management for evidence viewer and compliance actions
- Integration with LLM chatbot
- Real-time validation results

**Production Considerations**:
```typescript
// Add error boundaries
// Implement proper loading states
// Add analytics tracking
// Implement user authentication
```

### 2. Header Component (`components/Header.tsx`)
**Purpose**: Application navigation and branding
**Production Enhancements**:
```typescript
// Add user authentication status
// Implement logout functionality
// Add notification system
// Include accessibility features
```

### 3. Input Panel (`components/InputPanel.tsx`)
**Purpose**: Service account ID input and validation trigger
**Production Features**:
```typescript
// Input validation and sanitization
// Auto-complete for service accounts
// Batch validation support
// Rate limiting protection
```

### 4. Result Panel (`components/ResultPanel.tsx`)
**Purpose**: Display validation results and compliance scores
**Enhanced Features**:
```typescript
// Real-time compliance monitoring
// Historical trend analysis
// Drill-down capabilities
// Export functionality
```

### 5. Evidence Viewer (`components/EvidenceViewer.tsx`)
**Purpose**: Display and manage compliance evidence
**Production Features**:
```typescript
// Document encryption
// Audit trail logging
// Version control
// Access controls
```

### 6. Chatbot Component (`components/Chatbot.tsx`)
**Purpose**: LLM-powered assistance for IAM queries
**Integration Requirements**:
```typescript
// LLM API integration
// Context management
// Response streaming
// Error handling
```

### 7. Compliance Actions (`app/page.tsx` - Action Modal)
**Purpose**: JIRA ticket creation and email notifications
**Production Features**:
```typescript
// Real JIRA API integration
// Email template management
// Approval workflows
// Escalation procedures
```

## 🤖 LLM Integration Setup

### 1. OpenAI Integration

Create `lib/openai.ts`:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getLLMResponse(
  messages: { role: string; content: string }[],
  context?: any
) {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.LLM_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an IAM expert assistant for Wells Fargo. 
          Help users with identity and access management questions, 
          compliance issues, and service account validation.
          
          Current context: ${JSON.stringify(context)}`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get LLM response');
  }
}
```

### 2. Claude Integration

Create `lib/anthropic.ts`:
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getClaudeResponse(
  messages: { role: string; content: string }[],
  context?: any
) {
  try {
    const message = await anthropic.messages.create({
      model: process.env.LLM_MODEL || 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      system: `You are an IAM expert assistant for Wells Fargo. 
      Help users with identity and access management questions.
      
      Current context: ${JSON.stringify(context)}`,
      messages: messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw new Error('Failed to get Claude response');
  }
}
```

### 3. API Route Implementation

Create `app/api/llm/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getLLMResponse } from '@/lib/openai';
import { getClaudeResponse } from '@/lib/anthropic';
import { verifyAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages, context } = await request.json();

    let response;
    if (process.env.LLM_PROVIDER === 'anthropic') {
      response = await getClaudeResponse(messages, context);
    } else {
      response = await getLLMResponse(messages, context);
    }

    // Log interaction for audit
    await logLLMInteraction(user.id, messages, response);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('LLM API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

## 🔗 MCP Agent Integration

### 1. MCP Supabase Setup

Create `lib/mcp-supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.MCP_SUPABASE_URL!,
  process.env.MCP_SUPABASE_KEY!
);

export class MCPSupabaseAgent {
  async validateServiceAccount(accountId: string) {
    const { data, error } = await supabase
      .from('service_accounts')
      .select('*')
      .eq('account_id', accountId)
      .single();

    if (error) throw error;
    return data;
  }

  async getComplianceHistory(accountId: string) {
    const { data, error } = await supabase
      .from('compliance_history')
      .select('*')
      .eq('account_id', accountId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createComplianceTicket(ticketData: any) {
    const { data, error } = await supabase
      .from('compliance_tickets')
      .insert(ticketData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
```

### 2. MCP Integration in Components

Update `components/Chatbot.tsx`:
```typescript
import { MCPSupabaseAgent } from '@/lib/mcp-supabase';

const mcpAgent = new MCPSupabaseAgent();

const handleChatSubmit = async (message: string) => {
  try {
    // Get current validation context
    const context = {
      serviceAccount: accountData,
      validationResult: validationResult,
      // Add MCP data
      complianceHistory: await mcpAgent.getComplianceHistory(accountData?.account_id),
    };

    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...chatHistory, { role: 'user', content: message }],
        context
      }),
    });

    const { response: llmResponse } = await response.json();
    setChatHistory(prev => [...prev, 
      { role: 'user', content: message },
      { role: 'assistant', content: llmResponse }
    ]);
  } catch (error) {
    console.error('Chat error:', error);
  }
};
```

## 🔐 Database Schema

### 1. Core Tables

```sql
-- Service Accounts
CREATE TABLE service_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id VARCHAR(255) UNIQUE NOT NULL,
  application VARCHAR(255) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  last_used TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Compliance History
CREATE TABLE compliance_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id VARCHAR(255) REFERENCES service_accounts(account_id),
  compliance_score INTEGER,
  violations JSONB,
  evidence JSONB,
  validation_date TIMESTAMP DEFAULT NOW()
);

-- Evidence Files
CREATE TABLE evidence_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id VARCHAR(255) REFERENCES service_accounts(account_id),
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_url VARCHAR(500),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Compliance Tickets
CREATE TABLE compliance_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id VARCHAR(255) REFERENCES service_accounts(account_id),
  ticket_number VARCHAR(100) UNIQUE,
  status VARCHAR(50),
  priority VARCHAR(50),
  assigned_to VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Audit Logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100),
  resource_id VARCHAR(255),
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 External Service Integrations

### 1. JIRA Integration

Create `lib/jira.ts`:
```typescript
import JiraClient from 'jira-client';

const jira = new JiraClient({
  protocol: 'https',
  host: process.env.JIRA_HOST!.replace('https://', ''),
  username: process.env.JIRA_USERNAME!,
  password: process.env.JIRA_API_TOKEN!,
  apiVersion: '2',
  strictSSL: true
});

export async function createComplianceTicket(ticketData: {
  accountId: string;
  violations: string[];
  priority: string;
  assignee: string;
}) {
  try {
    const issue = await jira.addNewIssue({
      fields: {
        project: { key: process.env.JIRA_PROJECT_KEY },
        summary: `Service Account Compliance Violation - ${ticketData.accountId}`,
        description: `Service account ${ticketData.accountId} has compliance violations:\n\n${ticketData.violations.join('\n')}`,
        issuetype: { name: 'Task' },
        priority: { name: ticketData.priority },
        assignee: { name: ticketData.assignee },
        labels: ['compliance-violation', 'service-account'],
        components: [{ name: 'Identity & Access Management' }]
      }
    });

    return {
      ticketNumber: issue.key,
      url: `${process.env.JIRA_HOST}/browse/${issue.key}`,
      id: issue.id
    };
  } catch (error) {
    console.error('JIRA ticket creation error:', error);
    throw error;
  }
}
```

### 2. Email Service

Create `lib/email.ts`:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendComplianceEmail(emailData: {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  accountId: string;
  violations: string[];
  attachments?: string[];
}) {
  try {
    const emailBody = `
Dear Team,

This is an automated notification regarding a compliance issue with service account ${emailData.accountId}.

Compliance Issues Detected:
${emailData.violations.map(v => `• ${v}`).join('\n')}

Please take immediate action to address these compliance violations.

Best regards,
IAM Validation Assistant
Wells Fargo Bank, N.A.
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: emailData.to.join(', '),
      cc: emailData.cc?.join(', '),
      bcc: emailData.bcc?.join(', '),
      subject: emailData.subject,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
      attachments: emailData.attachments?.map(file => ({
        filename: file,
        path: `/tmp/attachments/${file}`
      }))
    };

    const result = await transporter.sendMail(mailOptions);
    return {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected
    };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}
```

## 🚀 Production Deployment

### 1. Docker Configuration

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. Environment Variables for Production

```bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://iam-validation.wellsfargo.com

# Database (use connection pooling)
DATABASE_URL=postgresql://iam_user:secure_password@prod-db:5432/iam_validation?sslmode=require

# LLM Configuration
OPENAI_API_KEY=sk-prod-your-openai-key
LLM_PROVIDER=openai
LLM_MODEL=gpt-4-turbo

# Security (rotate these regularly)
JWT_SECRET=your-production-jwt-secret-64-chars-minimum
ENCRYPTION_KEY=your-32-character-encryption-key
SESSION_SECRET=your-session-secret-key

# Rate Limiting
REDIS_URL=redis://prod-redis:6379
REDIS_PASSWORD=your-redis-password

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=error
```

## 📊 Monitoring & Security

### 1. Health Checks

Create `app/api/health/route.ts`:
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connectivity
    // Check external API availability
    // Check memory usage
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```

### 2. Security Implementation

```typescript
// Add to middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Security headers
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}
```

## 📋 Production Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured securely
- [ ] Database schema deployed
- [ ] SSL certificates installed
- [ ] Load balancer configured
- [ ] API rate limits configured
- [ ] Monitoring dashboards set up
- [ ] Backup strategy implemented
- [ ] Security headers configured
- [ ] Error tracking enabled

### Post-Deployment
- [ ] Health checks passing
- [ ] Performance metrics within thresholds
- [ ] User authentication working
- [ ] LLM API integration functional
- [ ] JIRA integration operational
- [ ] Email notifications working
- [ ] Evidence viewer accessible
- [ ] Compliance actions functional
- [ ] Error rates acceptable
- [ ] Response times optimal

## 🆘 Troubleshooting Guide

### Common Issues

1. **LLM API Rate Limits**
   - Implement exponential backoff
   - Use request queuing
   - Monitor usage quotas

2. **Database Connection Issues**
   - Check connection pool settings
   - Verify network connectivity
   - Review security groups/firewall rules

3. **Authentication Failures**
   - Verify LDAP/AD connectivity
   - Check JWT token expiration
   - Review user permissions

4. **Performance Issues**
   - Enable caching layers
   - Optimize database queries
   - Use CDN for static assets

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- **Weekly**: Review error logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Rotate API keys and certificates
- **Annually**: Security audit and penetration testing

### Support Contacts
- **Technical Issues**: iam-support@wellsfargo.com
- **Security Concerns**: security-team@wellsfargo.com
- **Database Issues**: dba-team@wellsfargo.com

---

© 2025 Wells Fargo Bank, N.A. All rights reserved.
