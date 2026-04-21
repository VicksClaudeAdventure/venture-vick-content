import React from 'react';
import { Composition } from 'remotion';
import { Day1Intro } from './episodes/Day1Intro';
import { Day3Intro } from './episodes/Day3Intro';

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
  </>
);
