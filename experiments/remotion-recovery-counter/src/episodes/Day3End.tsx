import React from 'react';
import { RecoveryEndCard } from '../components/RecoveryEndCard';

// Day 3: first win — $0 → $250 cumulative paid back. Green "+$250 TODAY" chip.
export const Day3End: React.FC = () => (
  <RecoveryEndCard totalOriginal={34776.15} previousPaidBack={0} newPaidBack={250} />
);
