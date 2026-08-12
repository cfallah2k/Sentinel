import { describe, expect, it } from 'vitest';
import { DefaultPolicyEngine } from '../packages/policy-engine/src';

describe('DefaultPolicyEngine', () => {
  it('blocks national IDs for external providers', () => {
    const result = DefaultPolicyEngine.evaluate({
      organizationId: 'org-1',
      providerName: 'External AI Provider',
      detectedCategories: ['NATIONAL_ID']
    });

    expect(result.decision).toBe('BLOCK');
  });

  it('redacts phone numbers', () => {
    const result = DefaultPolicyEngine.evaluate({
      organizationId: 'org-1',
      providerName: 'External AI Provider',
      detectedCategories: ['PHONE']
    });

    expect(result.decision).toBe('REDACT');
  });

  it('allows approved provider email', () => {
    const result = DefaultPolicyEngine.evaluate({
      organizationId: 'org-1',
      providerName: 'Approved AI Provider',
      detectedCategories: ['EMAIL']
    });

    expect(result.decision).toBe('ALLOW');
  });
});
