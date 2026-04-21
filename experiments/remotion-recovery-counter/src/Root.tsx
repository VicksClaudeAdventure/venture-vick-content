import React from 'react';
import { Composition } from 'remotion';

const Smoke: React.FC = () => (
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
    <div style={{ color: '#FFF', fontSize: 48 }}>scaffold ok</div>
  </div>
);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Smoke"
    component={Smoke}
    durationInFrames={30}
    fps={30}
    width={1080}
    height={1920}
  />
);
