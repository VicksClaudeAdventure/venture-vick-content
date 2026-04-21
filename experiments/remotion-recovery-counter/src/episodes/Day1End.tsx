import React from 'react';
import { RecoveryEndCard } from '../components/RecoveryEndCard';

// Day 1: declaration — $0 paid back so far, $0 today. Red "NO CHANGE TODAY" chip.
export const Day1End: React.FC = () => (
  <RecoveryEndCard totalOriginal={34776.15} previousPaidBack={0} newPaidBack={0} />
);
