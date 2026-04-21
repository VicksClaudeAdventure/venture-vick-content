import React from 'react';
import { Composition } from 'remotion';
import { RecoveryIntroCard } from './components/RecoveryIntroCard';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="IntroPreview_Static"
      component={RecoveryIntroCard}
      durationInFrames={120}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ previousTotal: null, newTotal: 34776.15 }}
    />
    <Composition
      id="IntroPreview_Drop"
      component={RecoveryIntroCard}
      durationInFrames={120}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ previousTotal: 34776.15, newTotal: 34526.15 }}
    />
  </>
);
