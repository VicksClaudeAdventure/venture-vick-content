import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { formatUSDCents, formatUSDWhole } from '../format';

const { fontFamily } = loadFont();

export type RecoveryEndCardProps = {
  totalOriginal: number;
  previousPaidBack: number;
  newPaidBack: number;
  countUpFrames?: number;
  holdFrames?: number;
};

const TEXT_SHADOW =
  '0 6px 36px rgba(0,0,0,0.75), 0 12px 72px rgba(0,0,0,0.55), 0 0 6px rgba(0,0,0,0.9)';
const LABEL_SHADOW =
  '0 6px 24px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.9)';

const PEAK_SCALE = 1.35;
const SETTLE_FRAMES = 10;

export const RecoveryEndCard: React.FC<RecoveryEndCardProps> = ({
  totalOriginal,
  previousPaidBack,
  newPaidBack,
  countUpFrames = 60,
  holdFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const todayDelta = newPaidBack - previousPaidBack;
  const hasProgressToday = todayDelta > 0;
  const isChanging = previousPaidBack !== newPaidBack;

  // Numerator value
  const value = interpolate(frame, [0, countUpFrames], [previousPaidBack, newPaidBack], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Numerator scale: 1.0 → PEAK during count, PEAK → 1.0 over SETTLE_FRAMES after count.
  // If the value isn't actually changing (Day 1/2/any no-move day), scale stays at 1.0.
  const scale = isChanging
    ? frame < countUpFrames
      ? interpolate(frame, [0, countUpFrames], [1, PEAK_SCALE], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : interpolate(frame, [countUpFrames, countUpFrames + SETTLE_FRAMES], [PEAK_SCALE, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
    : 1;

  const numeratorColor = hasProgressToday ? '#4ADE80' : '#F87171';

  // Status chip — always shown on end card
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

  const chipLabel = hasProgressToday
    ? `+${formatUSDWhole(todayDelta)} TODAY`
    : 'NO CHANGE TODAY';
  const chipBackground = hasProgressToday ? '#15803D' : '#B91C1C';

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
        {/* Fraction */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: 30,
            whiteSpace: 'nowrap',
            textShadow: TEXT_SHADOW,
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 120,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
              color: numeratorColor,
              display: 'inline-block',
              transform: `scale(${scale})`,
              transformOrigin: 'center bottom',
            }}
          >
            {formatUSDWhole(value)}
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 600,
              fontSize: 120,
              lineHeight: 1,
            }}
          >
            /
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600,
              fontSize: 120,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}
          >
            {formatUSDCents(totalOriginal)}
          </span>
        </div>

        {/* PAID BACK label */}
        <div
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontWeight: 600,
            fontSize: 48,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: 78,
            textShadow: LABEL_SHADOW,
          }}
        >
          PAID BACK
        </div>

        {/* Status chip */}
        <div
          style={{
            marginTop: 78,
            background: chipBackground,
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
      </div>
    </AbsoluteFill>
  );
};
