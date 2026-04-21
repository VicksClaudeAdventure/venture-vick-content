import React from 'react';
import { RecoveryIntroCard } from '../components/RecoveryIntroCard';

// Day 3: first $250 win — count down from $34,776.15 to $34,526.15, show –$250 chip.
export const Day3Intro: React.FC = () => (
  <RecoveryIntroCard previousTotal={34776.15} newTotal={34526.15} />
);
