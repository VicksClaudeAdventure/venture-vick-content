import React from 'react';
import { Composition } from 'remotion';
import { Day1Intro } from './episodes/Day1Intro';
import { Day3Intro } from './episodes/Day3Intro';
import { RecoveryEndCard } from './components/RecoveryEndCard';

const COMMON = {
  durationInFrames: 120,
  fps: 30,
  width: 1080,
  height: 1920,
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Day1Intro" component={Day1Intro} {...COMMON} />
    <Composition id="Day3Intro" component={Day3Intro} {...COMMON} />
    <Composition
      id="EndPreview_NoProgress"
      component={RecoveryEndCard}
      defaultProps={{ totalOriginal: 34776.15, previousPaidBack: 0, newPaidBack: 0 }}
      {...COMMON}
    />
    <Composition
      id="EndPreview_Progress"
      component={RecoveryEndCard}
      defaultProps={{ totalOriginal: 34776.15, previousPaidBack: 0, newPaidBack: 250 }}
      {...COMMON}
    />
  </>
);
