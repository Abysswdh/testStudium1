"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Singleton AudioContext so we don't spam the browser
let audioCtx: AudioContext | null = null;

function getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
}

export default function useSoundEngine() {
    const [bgmPlaying, setBgmPlaying] = useState(false);
    const bgmOscillators = useRef<OscillatorNode[]>([]);
    const bgmGain = useRef<GainNode | null>(null);
    const nextNoteTime = useRef<number>(0);
    const timerID = useRef<number | NodeJS.Timeout | null>(null);

    // Resume context if suspended (needed for browsers blocking autoplay)
    const resumeCtx = async () => {
        const ctx = getAudioContext();
        if (ctx && ctx.state === "suspended") {
            await ctx.resume();
        }
        return ctx;
    };

    const playHover = useCallback(async () => {
        const ctx = await resumeCtx();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Premium snappy UI tick
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.005); // Boosted max volume
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
    }, []);

    const playSelect = useCallback(async () => {
        const ctx = await resumeCtx();
        if (!ctx) return;

        // Premium multi-layered confirm chime (C Major)
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.02); // Boosted max volume
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        masterGain.connect(ctx.destination);

        [523.25, 659.25, 783.99].forEach((freq) => {
            const osc = ctx.createOscillator();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.connect(masterGain);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.35);
        });
    }, []);

    // Soft ambient background loop
    const scheduleBGM = useCallback(() => {
        const ctx = getAudioContext();
        if (!ctx || !bgmPlaying) return;

        // Lookahead loop for scheduling ambient chords
        while (nextNoteTime.current < ctx.currentTime + 0.1) {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            // Random soft pad notes in a pentatonic scale
            const notes = [261.63, 293.66, 329.63, 392.00, 440.00]; // C D E G A
            const note1 = notes[Math.floor(Math.random() * notes.length)] / 2; // Bass
            const note2 = notes[Math.floor(Math.random() * notes.length)]; // Lead

            osc1.frequency.value = note1;
            osc2.frequency.value = note2;
            osc1.type = "sine";
            osc2.type = "triangle";

            gain.gain.setValueAtTime(0, nextNoteTime.current);
            gain.gain.linearRampToValueAtTime(0.12, nextNoteTime.current + 2); // Boosted BGM volume
            gain.gain.exponentialRampToValueAtTime(0.001, nextNoteTime.current + 6); // swell out

            if (!bgmGain.current || bgmGain.current.context !== ctx) {
                bgmGain.current = ctx.createGain();
                bgmGain.current.gain.value = 1;
                bgmGain.current.connect(ctx.destination);
            }

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(bgmGain.current);

            osc1.start(nextNoteTime.current);
            osc2.start(nextNoteTime.current);
            osc1.stop(nextNoteTime.current + 6);
            osc2.stop(nextNoteTime.current + 6);

            bgmOscillators.current.push(osc1, osc2);

            // Cleanup old oscillators
            setTimeout(() => {
                bgmOscillators.current = bgmOscillators.current.filter((o) => o !== osc1 && o !== osc2);
            }, 7000);

            // Next note in 4 seconds
            nextNoteTime.current += 4.0;
        }

        timerID.current = setTimeout(scheduleBGM, 50);
    }, [bgmPlaying]);

    useEffect(() => {
        if (bgmPlaying) {
            resumeCtx().then((ctx) => {
                if (ctx) {
                    nextNoteTime.current = ctx.currentTime + 0.1;
                    scheduleBGM();
                }
            });
        } else {
            // Stop BGM
            if (timerID.current) clearTimeout(timerID.current);
            bgmOscillators.current.forEach((osc) => {
                try { osc.stop(); } catch { /* ignore */ }
            });
            bgmOscillators.current = [];
        }

        return () => {
            if (timerID.current) clearTimeout(timerID.current);
        };
    }, [bgmPlaying, scheduleBGM]);

    const toggleBGM = useCallback(() => {
        setBgmPlaying((prev) => !prev);
    }, []);

    return { playHover, playSelect, toggleBGM, bgmPlaying };
}
