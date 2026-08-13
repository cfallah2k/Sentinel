export type FieldStatus = 'allowed' | 'redacted' | 'blocked';

export interface Detection {
  category: string;
  status: FieldStatus;
  sample: string;
}

export interface Policy {
  id: string;
  name: string;
  rules: Record<string, FieldStatus>;
}

export interface Decision {
  tone: 'blocked' | 'allowed';
  title: string;
  message: string;
}

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
}

const CATEGORY_ORDER = ['Name', 'Email address', 'Phone number', 'National ID', 'Bank account', 'Credit card', 'Home address'];

export const MODELS: ModelOption[] = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'claude-4', name: 'Claude 4', provider: 'Anthropic' },
  { id: 'gemini-2.5', name: 'Gemini 2.5', provider: 'Google' },
  { id: 'local-llama', name: 'Llama 3 (local)', provider: 'Local' }
];

export const ORGS = [
  { id: 'sk_acme', name: 'Acme Corp', org: 'Acme Corp (enterprise)' },
  { id: 'sk_meridian', name: 'Meridian Bank', org: 'Meridian Bank' },
  { id: 'sk_monrovia', name: 'City of Monrovia', org: 'City of Monrovia' }
];

export const POLICIES: Policy[] = [
  {
    id: 'customer-data',
    name: 'Customer Data Protection',
    rules: {
      Name: 'allowed',
      'Email address': 'allowed',
      'Phone number': 'redacted',
      'National ID': 'blocked',
      'Bank account': 'redacted',
      'Credit card': 'redacted',
      'Home address': 'redacted'
    }
  },
  {
    id: 'privacy-first',
    name: 'Privacy First',
    rules: {
      Name: 'redacted',
      'Email address': 'blocked',
      'Phone number': 'redacted',
      'National ID': 'blocked',
      'Bank account': 'blocked',
      'Credit card': 'blocked',
      'Home address': 'blocked'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Governance',
    rules: {
      Name: 'allowed',
      'Email address': 'allowed',
      'Phone number': 'redacted',
      'National ID': 'blocked',
      'Bank account': 'redacted',
      'Credit card': 'redacted',
      'Home address': 'allowed'
    }
  }
];

const DETECTORS: { category: string; pattern: RegExp }[] = [
  {
    category: 'Email address',
    pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
  },
  {
    category: 'Phone number',
    pattern: /(?:\+\d{1,3}[\s-]?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{3,4})|\b0\d{9,10}\b/g
  },
  {
    category: 'National ID',
    pattern: /LR[-\s]?\d{4,6}|(?:national\s+id\s*[:#-]?\s*[A-Z0-9-]{4,12})|\bID\s*[:#-]?\s*\d{4,8}\b/gi
  },
  {
    category: 'Bank account',
    pattern: /(?:account(?:\s+number)?\s*[:#-]?\s*[A-Z]{2}\d{10,20})|\b[A-Z]{2}\d{10,20}\b/g
  },
  {
    category: 'Credit card',
    pattern: /\b(?:\d{4}[\s-]?){3}\d{4}\b/g
  },
  {
    category: 'Home address',
    pattern: /\b\d{1,5}\s+(?:[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+){0,2})\s+(?:street|avenue|road|lane|drive|blvd|boulevard|way)\b/gi
  },
  {
    category: 'Name',
    pattern: /(?:customer['’]?s?\s+name\s*[:=]\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})|\b(?:name|employee|customer)\s*[:=]\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3}/g
  }
];

export const EXAMPLE_PROMPTS = [
  'Summarize this customer record and explain their recent transactions.\nCustomer: John Doe\nEmail: john.doe@example.com\nPhone: +231 77 700 0000\nNational ID: LR-123456\nBank account: LR77000012345678',
  'My customer ID is LR-123456 and my phone is 0886123456. Give me a payment plan for the balance.',
  'Name: Maria Kone\nAddress: 12 Broad Street, Monrovia\nEmail: maria.kone@mail.com\nCard: 4242 4242 4242 4242\nPlease draft a welcome email.'
];

export function detect(prompt: string, policy: Policy): Detection[] {
  const found = new Map<string, { status: FieldStatus; sample: string }>();
  for (const detector of DETECTORS) {
    detector.pattern.lastIndex = 0;
    const match = detector.pattern.exec(prompt);
    if (match) {
      found.set(detector.category, {
        status: policy.rules[detector.category] ?? 'allowed',
        sample: match[0]
      });
    }
  }
  return CATEGORY_ORDER.filter((category) => found.has(category)).map((category) => ({
    category,
    status: found.get(category)!.status,
    sample: found.get(category)!.sample
  }));
}

export function sanitize(prompt: string, policy: Policy): string {
  let output = prompt;
  for (const detector of DETECTORS) {
    const status = policy.rules[detector.category] ?? 'allowed';
    if (status === 'allowed') continue;
    detector.pattern.lastIndex = 0;
    const hits = new Set<string>();
    let match: RegExpExecArray | null;
    while ((match = detector.pattern.exec(output)) !== null) {
      hits.add(match[0]);
      if (detector.pattern.lastIndex === match.index) detector.pattern.lastIndex++;
    }
    const marker = status === 'blocked' ? '[BLOCKED]' : '[REDACTED]';
    for (const hit of hits) {
      output = output.split(hit).join(marker);
    }
  }
  return output;
}

export function decide(detections: Detection[], policy: Policy): Decision {
  const blocked = detections.filter((d) => d.status === 'blocked');
  const redacted = detections.filter((d) => d.status === 'redacted');
  if (blocked.length > 0) {
    const fields = blocked.map((d) => d.category).join(', ');
    return {
      tone: 'blocked',
      title: 'Request blocked',
      message: `${fields} ${blocked.length > 1 ? 'are' : 'is'} prohibited under ${policy.name}. Nothing was sent to the model.`
    };
  }
  if (redacted.length > 0) {
    return {
      tone: 'allowed',
      title: 'Request allowed',
      message: `Request allowed after redacting ${redacted.length} sensitive field${redacted.length > 1 ? 's' : ''}. The model only receives the safe version.`
    };
  }
  if (detections.length > 0) {
    return {
      tone: 'allowed',
      title: 'Request allowed',
      message: 'Request allowed — detected fields are permitted under the active policy.'
    };
  }
  return {
    tone: 'allowed',
    title: 'Request allowed',
    message: 'No sensitive data detected. The request was passed through unchanged.'
  };
}

export function buildApiPreview(opts: {
  prompt: string;
  policy: Policy;
  model: ModelOption;
  orgKey: string;
}): string {
  const body = JSON.stringify(
    {
      model: opts.model.id,
      messages: [{ role: 'user', content: opts.prompt }]
    },
    null,
    2
  );
  return [
    `POST /v1/chat/completions`,
    `Authorization: Bearer ${opts.orgKey}`,
    `X-Sentinel-Policy: ${opts.policy.id}`,
    `X-Sentinel-Model: ${opts.model.id}`,
    `Content-Type: application/json`,
    ``,
    body
  ].join('\n');
}
