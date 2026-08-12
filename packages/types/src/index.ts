export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type PolicyDecision = 'ALLOW' | 'BLOCK' | 'REDACT' | 'REQUIRE_APPROVAL' | 'LOG';
export type DataCategory =
  | 'PUBLIC'
  | 'INTERNAL'
  | 'CONFIDENTIAL'
  | 'RESTRICTED'
  | 'NAME'
  | 'EMAIL'
  | 'PHONE'
  | 'ADDRESS'
  | 'DATE_OF_BIRTH'
  | 'NATIONAL_ID'
  | 'PASSPORT'
  | 'BANK_ACCOUNT'
  | 'PAYMENT_CARD'
  | 'TRANSACTION_DATA'
  | 'PASSWORD'
  | 'API_KEY'
  | 'ACCESS_TOKEN'
  | 'SECRET'
  | 'HEALTH_DATA'
  | 'BIOMETRIC_DATA'
  | 'LOCATION_DATA'
  | 'EMPLOYEE_DATA'
  | 'CUSTOMER_DATA';

export interface PolicyEvaluationInput {
  organizationId: string;
  applicationId?: string;
  aiSystemId?: string;
  providerName?: string;
  environment?: string;
  detectedCategories: DataCategory[];
  userId?: string;
  requestMetadata?: Record<string, unknown>;
}

export interface PolicyEvaluationResult {
  decision: PolicyDecision;
  policy?: string;
  reason: string;
  severity: RiskLevel;
  redactions: string[];
  approvalRequired: boolean;
}

export interface ClassificationResult {
  category: DataCategory;
  matchedValue?: string;
  confidence: number;
}

export interface TenantContext {
  organizationId: string;
  userId: string;
  roles: string[];
}
