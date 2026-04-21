const usdCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const usdWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatUSDCents(value: number): string {
  return usdCents.format(value);
}

export function formatUSDWhole(value: number): string {
  return usdWhole.format(value);
}

// Returns "–$XXX.XX" (en-dash) when `to < from`, empty string otherwise.
export function formatDropDelta(from: number, to: number): string {
  if (to >= from) return '';
  return '\u2013' + formatUSDCents(from - to);
}
