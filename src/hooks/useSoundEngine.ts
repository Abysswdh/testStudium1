"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Singleton AudioContext for BGM
let audioCtx: AudioContext | null = null;
function getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
}

// Cache for audio file elements so we don't recreate them on every hover
const audioCache: Record<string, HTMLAudioElement> = {};

function playAudioFile(path: string, volume: number = 0.5) {
    if (typeof window === "undefined") return;

    try {
        if (!audioCache[path]) {
            audioCache[path] = new Audio(path);
        }

        const audio = audioCache[path];
        audio.currentTime = 0; // reset to start
        audio.volume = volume;

        // Attempt to play, catch and ignore autoplay restrictions if they happen before interaction
        audio.play().catch(e => {
            // Browsers block audio before interaction. We silently ignore the error
            // so the console isn't spammed during mount cycles.
        });
    } catch (e) {
        console.error("Failed to play audio:", e);
    }
}

const PLAYLIST = [
    { title: "Changing Season", src: "/sounds/TRACK1_CHANGINGESEASON.mp3" },
    { title: "Color Your Night", src: "/sounds/TRACK2_COLORYOURNIGHT.mp3" },
];

// Singleton BGM State mapping
let globalAudio: HTMLAudioElement | null = null;
let globalPlaying = false;
let globalVolume = 0.05; // Lowered as requested
let globalTrackIndex = 0;
const listeners = new Set<() => void>();

function notify() {
    listeners.forEach(l => l());
}

export default function useSoundEngine() {
    const [, setTick] = useState(0);
    const forceUpdate = useCallback(() => setTick(t => t + 1), []);

    useEffect(() => {
        listeners.add(forceUpdate);
        return () => {
            listeners.delete(forceUpdate);
        };
    }, [forceUpdate]);

    // Initialize Global Audio once
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!globalAudio) {
            globalAudio = new Audio(PLAYLIST[globalTrackIndex].src);
            globalAudio.volume = globalVolume;
            globalAudio.addEventListener("ended", () => {
                globalTrackIndex = (globalTrackIndex + 1) % PLAYLIST.length;
                globalAudio!.src = PLAYLIST[globalTrackIndex].src;
                globalAudio!.play().catch(() => { globalPlaying = false; notify(); });
                notify();
            });
        }
    }, []);

    // Replace old synths with actual .mp3 files
    const playHover = useCallback(() => {
        playAudioFile("/sounds/hover.mp3", 0.5); // Adjusted volume
    }, []);

    const playSelect = useCallback(() => {
        playAudioFile("/sounds/click.mp3", 0.8);
    }, []);

    const playError = useCallback(() => {
        playAudioFile("/sounds/error.mp3", 0.6);
    }, []);

    const playBoot = useCallback(() => {
        playAudioFile("/sounds/start_stadium.mp3", 0.9);
    }, []);

    // --- Media Player Logic ---
    const currentTrack = PLAYLIST[globalTrackIndex];

    const toggleBGM = useCallback(() => {
        if (!globalAudio) return;
        globalPlaying = !globalPlaying;
        if (globalPlaying) {
            globalAudio.play().catch(e => {
                console.warn("BGM Auto-play blocked:", e);
                globalPlaying = false;
                notify();
            });
        } else {
            globalAudio.pause();
        }
        notify();
    }, []);

    const nextTrack = useCallback(() => {
        if (!globalAudio) return;
        globalTrackIndex = (globalTrackIndex + 1) % PLAYLIST.length;
        globalAudio.src = PLAYLIST[globalTrackIndex].src;
        globalPlaying = true;
        globalAudio.play();
        notify();
    }, []);

    const prevTrack = useCallback(() => {
        if (!globalAudio) return;
        globalTrackIndex = (globalTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
        globalAudio.src = PLAYLIST[globalTrackIndex].src;
        globalPlaying = true;
        globalAudio.play();
        notify();
    }, []);

    const setBgmVolume = useCallback((v: number) => {
        globalVolume = v;
        if (globalAudio) globalAudio.volume = v;
        notify();
    }, []);

    // Listen for boot completion to auto-start BGM
    useEffect(() => {
        const handleBootComplete = () => {
            if (globalAudio && !globalPlaying) {
                globalPlaying = true;
                globalAudio.play().catch(() => {
                    globalPlaying = false;
                    notify();
                });
                notify();
            }
        };
        window.addEventListener("studium-boot-complete", handleBootComplete);
        return () => window.removeEventListener("studium-boot-complete", handleBootComplete);
    }, []);

    return {
        playHover,
        playSelect,
        playError,
        playBoot,

        // BGM Player specifics
        bgmPlaying: globalPlaying,
        toggleBGM,
        currentTrackName: currentTrack.title,
        bgmVolume: globalVolume,
        setBgmVolume,
        nextTrack,
        prevTrack
    };
}
