export interface SupportTicket {
  id: string;
  subject: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Waiting on Customer' | 'Resolved' | 'Closed';
  category: string;
  assignee: string;
  created: string;
  updated: string;
  requester: string;
  tags: string[];
}

export const supportTickets: SupportTicket[] = [
  { id: 'tkt-2841', subject: 'Gateway returning 429 on legitimate traffic spike', priority: 'High', status: 'In Progress', category: 'Gateway', assignee: 'Amara Okafor', created: '2026-08-13T08:12:00Z', updated: '2026-08-13T09:20:00Z', requester: 'jordan.patel@nexora.io', tags: ['rate-limit', 'gateway'] },
  { id: 'tkt-2840', subject: 'Redaction rule not matching invoice numbers', priority: 'Medium', status: 'Waiting on Customer', category: 'Redaction', assignee: 'Maya Chen', created: '2026-08-12T16:40:00Z', updated: '2026-08-13T08:05:00Z', requester: 'devon.clarke@nexora.io', tags: ['redaction', 'regex'] },
  { id: 'tkt-2839', subject: 'Okta SCIM provisioning sync failure', priority: 'High', status: 'Open', category: 'Identity', assignee: 'Devon Clarke', created: '2026-08-12T14:22:00Z', updated: '2026-08-12T14:22:00Z', requester: 'priya.raman@nexora.io', tags: ['scim', 'okta'] },
  { id: 'tkt-2838', subject: 'Request to extend audit retention window', priority: 'Low', status: 'Resolved', category: 'Billing', assignee: 'Amara Okafor', created: '2026-08-11T10:05:00Z', updated: '2026-08-12T09:30:00Z', requester: 'alicia.monroe@nexora.io', tags: ['retention', 'plan'] },
  { id: 'tkt-2837', subject: 'SDK streaming example returns empty chunks', priority: 'Medium', status: 'In Progress', category: 'SDK', assignee: 'Devon Clarke', created: '2026-08-11T09:11:00Z', updated: '2026-08-12T11:45:00Z', requester: 'tara.osei@nexora.io', tags: ['sdk', 'streaming'] },
  { id: 'tkt-2836', subject: 'PagerDuty webhook not receiving critical incidents', priority: 'Critical', status: 'Resolved', category: 'Integrations', assignee: 'Jordan Patel', created: '2026-08-10T18:02:00Z', updated: '2026-08-11T07:50:00Z', requester: 'sam.whitfield@nexora.io', tags: ['webhook', 'incidents'] },
  { id: 'tkt-2835', subject: 'Cannot rotate API key from CLI', priority: 'Medium', status: 'Closed', category: 'API', assignee: 'Maya Chen', created: '2026-08-09T13:30:00Z', updated: '2026-08-10T10:12:00Z', requester: 'nadia.haddad@nexora.io', tags: ['cli', 'keys'] },
  { id: 'tkt-2834', subject: 'Usage export CSV missing provider column', priority: 'Low', status: 'Closed', category: 'Reporting', assignee: 'Amara Okafor', created: '2026-08-08T15:20:00Z', updated: '2026-08-09T08:44:00Z', requester: 'peter.graves@nexora.io', tags: ['export', 'usage'] }
];

export const ticketConversations: Record<string, { author: string; role: string; time: string; body: string }[]> = {
  'tkt-2841': [
    { author: 'Jordan Patel', role: 'Requester', time: '2026-08-13T08:12:00Z', body: 'Our batch job spiked to ~4k req/s and the gateway started returning 429s even though our plan allows 10M/month. It recovered after 20 minutes.' },
    { author: 'Amara Okafor', role: 'Support', time: '2026-08-13T08:40:00Z', body: 'Checking the burst window. Your account uses a default 500 req/s burst cap. I have raised it to 1,500 req/s temporarily while we investigate.' },
    { author: 'Amara Okafor', role: 'Support', time: '2026-08-13T09:20:00Z', body: 'Confirmed — the 429s were from the burst limiter, not monthly quota. Recommend adding a queue to your batch job. Raising the burst cap is in progress.' }
  ],
  'tkt-2839': [
    { author: 'Priya Raman', role: 'Requester', time: '2026-08-12T14:22:00Z', body: 'Okta SCIM push stopped syncing groups to Sentinel around 13:00. No changes on our side.' },
    { author: 'Devon Clarke', role: 'Support', time: '2026-08-12T15:10:00Z', body: 'Okta reported a provisioning outage on their side. I have enabled the retry queue so nothing is lost when they recover.' }
  ],
  'tkt-2840': [
    { author: 'Devon Clarke', role: 'Requester', time: '2026-08-12T16:40:00Z', body: 'Invoice numbers like INV-2026-0841 are passing through redaction. Our detector config looks correct.' },
    { author: 'Maya Chen', role: 'Support', time: '2026-08-13T07:55:00Z', body: 'The detector requires a word boundary. I have updated the sample pattern and sent it — please confirm on your staging org.' }
  ],
  'tkt-2837': [
    { author: 'Tara Osei', role: 'Requester', time: '2026-08-11T09:11:00Z', body: 'Using @sentinel/ts 2.4.0 streaming, we receive empty chunks for the first ~2 seconds of a response.' },
    { author: 'Devon Clarke', role: 'Support', time: '2026-08-11T12:30:00Z', body: 'This is the buffering window while the gateway evaluates policy. I am adding an SSE comment event so clients can show a pending state.' }
  ]
};

export interface KbArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  updated: string;
  reads: number;
}

export const kbArticles: KbArticle[] = [
  { id: 'kb-1', title: 'Getting started with API keys', excerpt: 'Create, scope and rotate API keys for applications and automations.', category: 'API', updated: '2026-08-01', reads: 4821 },
  { id: 'kb-2', title: 'Understanding gateway decisions', excerpt: 'What Allowed, Blocked, Redacted, and Approval Required mean in practice.', category: 'Gateway', updated: '2026-07-28', reads: 3940 },
  { id: 'kb-3', title: 'Configuring the redaction engine', excerpt: 'Build detectors and patterns for PII, financial and health data.', category: 'Redaction', updated: '2026-08-05', reads: 3112 },
  { id: 'kb-4', title: 'Webhook signing and retries', excerpt: 'Verify payloads with HMAC signatures and tune delivery retries.', category: 'Webhooks', updated: '2026-07-20', reads: 2894 },
  { id: 'kb-5', title: 'SSO setup for Okta and Azure AD', excerpt: 'Enable SCIM provisioning and JIT role assignment.', category: 'Identity', updated: '2026-08-02', reads: 2501 },
  { id: 'kb-6', title: 'Data retention policies', excerpt: 'Choose retention windows for audit logs, requests and redacted payloads.', category: 'Data', updated: '2026-07-15', reads: 2130 },
  { id: 'kb-7', title: 'Sandbox vs production environments', excerpt: 'What differs between environments and how to promote safely.', category: 'Development', updated: '2026-08-08', reads: 1876 },
  { id: 'kb-8', title: 'Troubleshooting 429 and 503 errors', excerpt: 'Rate limit and availability error diagnosis guide.', category: 'Troubleshooting', updated: '2026-08-10', reads: 1742 }
];
