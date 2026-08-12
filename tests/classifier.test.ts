import { describe, expect, it } from 'vitest';
import { DefaultClassifier } from '../packages/classifier/src';

describe('DefaultClassifier', () => {
  it('detects national IDs', () => {
    const matches = DefaultClassifier.detect('My national ID is LR-123456.');
    expect(matches.some((item) => item.category === 'NATIONAL_ID')).toBe(true);
  });

  it('detects email addresses', () => {
    const matches = DefaultClassifier.detect('Contact me at jane@example.com');
    expect(matches.some((item) => item.category === 'EMAIL')).toBe(true);
  });
});
