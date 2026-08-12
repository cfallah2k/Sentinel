import type { ClassificationResult, DataCategory } from '@sentinel/types';

const patterns: Record<DataCategory, RegExp> = {
  PUBLIC: /(?:)/i,
  INTERNAL: /(?:)/i,
  CONFIDENTIAL: /(?:)/i,
  RESTRICTED: /(?:)/i,
  NAME: /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/,
  EMAIL: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  PHONE: /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)\d{3}[-.\s]?\d{4}/,
  ADDRESS: /\d+\s+[A-Z0-9][A-Za-z0-9.\s-]+(?:Street|Road|Avenue|Drive|Lane|Close|Way|Boulevard|St\.|Rd\.|Ave\.|Dr\.)/i,
  DATE_OF_BIRTH: /(?:\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b|\b\d{4}-\d{2}-\d{2}\b)/,
  NATIONAL_ID: /(?:\b[A-Z]{2}-\d{6,9}\b|\b\d{13}\b)/,
  PASSPORT: /\b(?:P<)?[A-Z0-9]{6,9}\b/i,
  BANK_ACCOUNT: /(?:\b(?:IBAN|ACCOUNT|BANK)[:\s]*[A-Z0-9]{8,34}\b|\b\d{10,18}\b)/i,
  PAYMENT_CARD: /(?:\b(?:\d{4}[-\s]?){3}\d{4}\b|\b\d{16}\b)/,
  TRANSACTION_DATA: /(?:TXN|TRANSACTION|TRANSFER)\s*[:#-]?\s*\d+/i,
  PASSWORD: /(?:(?:pass(?:word)?)\s*[:=]\s*['\"]?[A-Za-z0-9!@#$%^&*()_+\-=]{6,}['\"]?|\b(?:P@ssw0rd|Secret123)\b)/i,
  API_KEY: /(?:sk-[A-Za-z0-9]{12,}|api[_-]?key\s*[:=]\s*[A-Za-z0-9._-]{8,})/i,
  ACCESS_TOKEN: /(?:eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+|access[_-]?token\s*[:=]\s*[A-Za-z0-9._-]{10,})/i,
  SECRET: /(?:secret\s*[:=]\s*[A-Za-z0-9._-]{8,}|\b[A-Fa-f0-9]{32,}\b)/,
  HEALTH_DATA: /(?:medical|health|patient|diagnosis|clinic|prescription)/i,
  BIOMETRIC_DATA: /(?:fingerprint|face|iris|voiceprint|biometric)/i,
  LOCATION_DATA: /(?:lat|lng|latitude|longitude|gps|location|address)/i,
  EMPLOYEE_DATA: /(?:employee|staff|payroll|salary|contract)/i,
  CUSTOMER_DATA: /(?:customer|client|account holder|subscriber)/i
};

export class DefaultClassifier {
  static detect(input: string): ClassificationResult[] {
    const results: ClassificationResult[] = [];

    for (const [category, regex] of Object.entries(patterns)) {
      if (regex.test(input)) {
        results.push({
          category: category as DataCategory,
          matchedValue: input.match(regex)?.[0] ?? undefined,
          confidence: 0.9
        });
      }
    }

    return results;
  }
}

export default DefaultClassifier;
