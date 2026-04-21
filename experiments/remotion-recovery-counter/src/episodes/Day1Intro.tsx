import React from 'react';
import { RecoveryIntroCard } from '../components/RecoveryIntroCard';

// Day 1: declaration episode — no previous total, count from $0 to $34,776.15.
export const Day1Intro: React.FC = () => (
  <RecoveryIntroCard previousTotal={null} newTotal={34776.15} />
);
