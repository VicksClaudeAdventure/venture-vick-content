import { Config } from '@remotion/cli/config';

Config.setOverwriteOutput(true);
Config.setConcurrency(4);

// Alpha-preserving render defaults for ProRes 4444 output.
// Without these, ProRes falls back to yuv422p12le (no alpha), defeating the
// transparent-overlay design goal of the counter compositions.
Config.setCodec('prores');
Config.setProResProfile('4444');
Config.setPixelFormat('yuva444p10le');
Config.setVideoImageFormat('png');
