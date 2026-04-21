import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { formatUSDCents, formatDropDelta } from '../format';

const { fontFamily } = loadFont();

export type RecoveryIntroCardProps = {
  previousTotal: number | null;
  newTotal: number;
  countUpFrames?: number;
  holdFrames?: number;
};

const TEXT_SHADOW =
  '0 6px 36px rgba(0,0,0,0.75), 0 12px 72px rgba(0,0,0,0.55), 0 0 6px rgba(0,0,0,0.9)';

export const RecoveryIntroCard: React.FC<RecoveryIntroCardProps> = ({
  previousTotal,
  newTotal,
  countUpFrames = 60,
  holdFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const startValue = previousTotal ?? 0;

  // Count-up value animation (ease-out cubic, clamped)
  const value = interpolate(frame, [0, countUpFrames], [startValue, newTotal], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Delta chip shows only on drop episodes (previousTotal provided AND different from newTotal)
  const showChip = previousTotal !== null && previousTotal !== newTotal;
  const chipLabel = showChip ? formatDropDelta(previousTotal as number, newTotal) : '';

  // Chip entrance: starts 6 frames after count ends, 10-frame fade-in
  const chipStart = countUpFrames + 6;
  const chipOpacity = interpolate(frame, [chipStart, chipStart + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chipScale = interpolate(frame, [chipStart, chipStart + 10], [0.92, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chipTranslateY = interpolate(frame, [chipStart, chipStart + 10], [36, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#FFF',
            fontWeight: 800,
            fontSize: 192,
            letterSpacing: '-0.035em',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            textShadow: TEXT_SHADOW,
          }}
        >
          {formatUSDCents(value)}
        </div>
        {showChip && (
          <div
            style={{
              marginTop: 96,
              background: '#B91C1C',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 48,
              letterSpacing: '0.02em',
              padding: '30px 66px',
              borderRadius: 999,
              boxShadow: '0 12px 54px rgba(0,0,0,0.45)',
              opacity: chipOpacity,
              transform: `translateY(${chipTranslateY}px) scale(${chipScale})`,
            }}
          >
            {chipLabel}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
