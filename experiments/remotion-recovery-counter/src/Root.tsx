import React from 'react';
import { Composition } from 'remotion';
import { Day1Intro } from './episodes/Day1Intro';
import { Day1End } from './episodes/Day1End';
import { Day3Intro } from './episodes/Day3Intro';
import { Day3End } from './episodes/Day3End';

const COMMON = {
  durationInFrames: 120,
  fps: 30,
  width: 1080,
  height: 1920,
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Day1Intro" component={Day1Intro} {...COMMON} />
    <Composition id="Day1End"   component={Day1End}   {...COMMON} />
    <Composition id="Day3Intro" component={Day3Intro} {...COMMON} />
    <Composition id="Day3End"   component={Day3End}   {...COMMON} />
  </>
);
