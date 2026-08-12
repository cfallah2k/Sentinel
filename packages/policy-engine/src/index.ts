import type { PolicyEvaluationInput, PolicyEvaluationResult, PolicyDecision, RiskLevel } from '@sentinel/types';

export class DefaultPolicyEngine {
  static evaluate(input: PolicyEvaluationInput): PolicyEvaluationResult {
    const categories = new Set(input.detectedCategories ?? []);
    const provider = (input.providerName ?? '').toLowerCase();
    const environment = (input.environment ?? '').toLowerCase();

    if (categories.has('NATIONAL_ID') && provider && !provider.includes('internal')) {
      return {
        decision: 'BLOCK' as PolicyDecision,
        policy: 'Block National ID externally',
        reason: 'National identifier data is not allowed to leave the organization to external providers.',
        severity: 'CRITICAL' as RiskLevel,
        redactions: ['NATIONAL_ID'],
        approvalRequired: false
      };
    }

    if (categories.has('PHONE')) {
      return {
        decision: 'REDACT' as PolicyDecision,
        policy: 'Redact Phone',
        reason: 'Phone numbers require masking before external AI transmission.',
        severity: 'HIGH' as RiskLevel,
        redactions: ['PHONE'],
        approvalRequired: false
      };
    }

    if (categories.has('EMAIL') && provider.includes('approved')) {
      return {
        decision: 'ALLOW' as PolicyDecision,
        policy: 'Allow Email to approved provider',
        reason: 'Email is permitted to designated approved providers.',
        severity: 'LOW' as RiskLevel,
        redactions: [],
        approvalRequired: false
      };
    }

    return {
      decision: 'LOG' as PolicyDecision,
      policy: 'Default log only',
      reason: 'No explicit sensitive data classification triggered a blocker or redaction rule.',
      severity: 'MEDIUM' as RiskLevel,
      redactions: [],
      approvalRequired: false
    };
  }
}

export default DefaultPolicyEngine;
