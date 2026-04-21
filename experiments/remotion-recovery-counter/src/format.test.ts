import { describe, expect, it } from 'vitest';
import { formatUSDCents, formatUSDWhole, formatDropDelta } from './format';

describe('formatUSDCents', () => {
  it('formats integer dollars with two decimals and commas', () => {
    expect(formatUSDCents(34776.15)).toBe('$34,776.15');
  });
  it('rounds to nearest cent', () => {
    expect(formatUSDCents(34776.149)).toBe('$34,776.15');
  });
  it('formats zero', () => {
    expect(formatUSDCents(0)).toBe('$0.00');
  });
});

describe('formatUSDWhole', () => {
  it('formats whole dollars with commas, no decimals', () => {
    expect(formatUSDWhole(250)).toBe('$250');
  });
  it('rounds to nearest dollar', () => {
    expect(formatUSDWhole(249.9)).toBe('$250');
  });
  it('formats zero', () => {
    expect(formatUSDWhole(0)).toBe('$0');
  });
  it('formats large values with commas', () => {
    expect(formatUSDWhole(34776)).toBe('$34,776');
  });
});

describe('formatDropDelta', () => {
  it('prefixes drop amount with an en-dash (not hyphen)', () => {
    expect(formatDropDelta(34776.15, 34526.15)).toBe('\u2013$250.00');
  });
  it('rounds to cents', () => {
    expect(formatDropDelta(100.005, 0)).toBe('\u2013$100.01');
  });
  it('returns empty string when there is no drop', () => {
    expect(formatDropDelta(100, 100)).toBe('');
  });
  it('returns empty string when the value went up (not a drop)', () => {
    expect(formatDropDelta(100, 200)).toBe('');
  });
});
