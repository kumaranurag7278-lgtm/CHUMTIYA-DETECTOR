// Pure Web Audio API sound generator & Meme Soundbite Synthesizer (Zero external file dependencies)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem("chumtiya_sound_enabled");
  return saved === null ? true : saved === "true";
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("chumtiya_sound_enabled", String(enabled));
}

export function isMemeSoundsEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem("chumtiya_meme_sounds");
  return saved === null ? true : saved === "true";
}

export function setMemeSoundsEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("chumtiya_meme_sounds", String(enabled));
}

/** Soft UI tap sound */
export function playClick(): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    /* ignore audio errors */
  }
}

/** Option selection pop sound */
export function playOptionSelect(): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    /* ignore audio errors */
  }
}

/** Triumphant result fanfare */
export function playFanfare(): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25]; // C4, E4, G4, C5, E5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + idx * 0.08;
      const duration = 0.28;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.15, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    });
  } catch {
    /* ignore audio errors */
  }
}

/** 🎺 MEME 1: Sad Trombone ("Womp Womp Womp Waaahhh" fail sound) */
export function playMemeSadTrombone(): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // 4 notes: Eb4 (311Hz), D4 (293Hz), Db4 (277Hz), C4 sliding down to A3 (220Hz)
    const notes = [
      { freq: 311.13, startOffset: 0.0, dur: 0.35 },
      { freq: 293.66, startOffset: 0.4, dur: 0.35 },
      { freq: 277.18, startOffset: 0.8, dur: 0.35 },
    ];

    notes.forEach(({ freq, startOffset, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const st = ctx.currentTime + startOffset;

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.18, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + dur);
    });

    // The final slide-down "Waaahhhh"
    const slideOsc = ctx.createOscillator();
    const slideGain = ctx.createGain();
    const slideStart = ctx.currentTime + 1.25;
    const slideDur = 1.1;

    slideOsc.type = "sawtooth";
    slideOsc.frequency.setValueAtTime(261.63, slideStart);
    // Slide down to 196Hz with pitch bend
    slideOsc.frequency.exponentialRampToValueAtTime(185.0, slideStart + slideDur);

    slideGain.gain.setValueAtTime(0.22, slideStart);
    slideGain.gain.exponentialRampToValueAtTime(0.001, slideStart + slideDur);

    slideOsc.connect(slideGain);
    slideGain.connect(ctx.destination);
    slideOsc.start(slideStart);
    slideOsc.stop(slideStart + slideDur);
  } catch {
    /* ignore */
  }
}

/** ⚡ MEME 2: Indian Soap Opera "Dun Dun DUUUN!" Dramatic Stinger */
export function playMemeDramaticSting(): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const hits = [0.0, 0.3, 0.65];
    hits.forEach((offset, idx) => {
      const isFinal = idx === 2;
      const st = ctx.currentTime + offset;
      const dur = isFinal ? 1.2 : 0.22;

      // Layer 1: Bass hit
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = "sawtooth";
      bass.frequency.setValueAtTime(isFinal ? 73.42 : 110.0, st); // D2 / A2

      bassGain.gain.setValueAtTime(isFinal ? 0.35 : 0.22, st);
      bassGain.gain.exponentialRampToValueAtTime(0.001, st + dur);

      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      bass.start(st);
      bass.stop(st + dur);

      // Layer 2: Minor chord stabs
      const chordNotes = isFinal ? [146.83, 174.61, 220.0] : [220.0, 261.63, 329.63];
      chordNotes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, st);

        g.gain.setValueAtTime(0.08, st);
        g.gain.exponentialRampToValueAtTime(0.001, st + dur);

        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(st);
        osc.stop(st + dur);
      });
    });
  } catch {
    /* ignore */
  }
}

/** 🤪 MEME 3: Cartoon "Aayein? / Boing" Spring Sound */
export function playMemeBoing(): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const st = ctx.currentTime;
    const dur = 0.55;

    osc.type = "sine";
    // Pitch sweep up and wobble
    osc.frequency.setValueAtTime(180, st);
    osc.frequency.exponentialRampToValueAtTime(750, st + 0.18);
    osc.frequency.linearRampToValueAtTime(520, st + 0.35);
    osc.frequency.linearRampToValueAtTime(680, st + 0.45);

    gain.gain.setValueAtTime(0.25, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(st);
    osc.stop(st + dur);
  } catch {
    /* ignore */
  }
}

/** 🥁 MEME 4: Comedy "Ba-Dum-Tss" Rimshot Punchline */
export function playMemeRimshot(): void {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Drum 1: Ba (Tom 1)
    const tom1 = ctx.createOscillator();
    const tom1Gain = ctx.createGain();
    const t1 = ctx.currentTime;
    tom1.type = "sine";
    tom1.frequency.setValueAtTime(200, t1);
    tom1.frequency.exponentialRampToValueAtTime(100, t1 + 0.1);
    tom1Gain.gain.setValueAtTime(0.25, t1);
    tom1Gain.gain.exponentialRampToValueAtTime(0.001, t1 + 0.12);
    tom1.connect(tom1Gain);
    tom1Gain.connect(ctx.destination);
    tom1.start(t1);
    tom1.stop(t1 + 0.12);

    // Drum 2: Dum (Tom 2)
    const tom2 = ctx.createOscillator();
    const tom2Gain = ctx.createGain();
    const t2 = ctx.currentTime + 0.14;
    tom2.type = "sine";
    tom2.frequency.setValueAtTime(160, t2);
    tom2.frequency.exponentialRampToValueAtTime(80, t2 + 0.1);
    tom2Gain.gain.setValueAtTime(0.28, t2);
    tom2Gain.gain.exponentialRampToValueAtTime(0.001, t2 + 0.12);
    tom2.connect(tom2Gain);
    tom2Gain.connect(ctx.destination);
    tom2.start(t2);
    tom2.stop(t2 + 0.12);

    // Cymbal: Tss
    const cymbal = ctx.createOscillator();
    const cymbalGain = ctx.createGain();
    const t3 = ctx.currentTime + 0.28;
    cymbal.type = "triangle";
    cymbal.frequency.setValueAtTime(1200, t3);
    cymbal.frequency.exponentialRampToValueAtTime(400, t3 + 0.35);
    cymbalGain.gain.setValueAtTime(0.18, t3);
    cymbalGain.gain.exponentialRampToValueAtTime(0.001, t3 + 0.4);
    cymbal.connect(cymbalGain);
    cymbalGain.connect(ctx.destination);
    cymbal.start(t3);
    cymbal.stop(t3 + 0.4);
  } catch {
    /* ignore */
  }
}

/** Auto play appropriate meme sound based on roast score */
export function playRoastSoundForScore(scorePct: number): void {
  if (!isSoundEnabled()) return;
  if (scorePct >= 70) {
    playMemeSadTrombone();
  } else if (scorePct >= 45) {
    playMemeDramaticSting();
  } else {
    playFanfare();
  }
}
