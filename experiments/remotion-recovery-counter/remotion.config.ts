import { Config } from '@remotion/cli/config';

Config.setOverwriteOutput(true);
Config.setConcurrency(4);

// Alpha-preserving render defaults for ProRes 4444 output.
// Without these, ProRes falls back to yuv422p12le (no alpha), defeating the
// transparent-overlay design goal of the counter compositions.
// Note: requests yuva444p10le; on Apple Silicon the compositor promotes this
// to yuva444p12le — both carry alpha and are equivalent for editor compositing.
Config.setCodec('prores');
Config.setProResProfile('4444');
Config.setPixelFormat('yuva444p10le');
Config.setVideoImageFormat('png');

// Drop the silent PCM audio track Remotion adds by default.
// Counters are purely visual overlays — the Recovery episode's own voiceover
// is on a separate track in the editor, and a silent stereo stream in the
// overlay file only bloats size and risks NLE audio-routing confusion.
Config.setMuted(true);
