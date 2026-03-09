"use client";

import { useEffect, useCallback } from "react";
import useSoundEngine from "./useSoundEngine";

/**
 * Enables keyboard navigation across all [data-focusable] elements in the page.
 * Supports Arrow keys and WASD:
 *   - Right / D  → next element
 *   - Left  / A  → previous element
 *   - Down  / S  → next row (skip by columns)
 *   - Up    / W  → previous row (skip by columns)
 *   - Enter / Space → click the focused element
 *   - Escape → blur
 */
export default function useKeyboardNav() {
    const { playHover, playSelect } = useSoundEngine();

    const getFocusables = useCallback((): HTMLElement[] => {
        return Array.from(document.querySelectorAll<HTMLElement>("[data-focusable]"));
    }, []);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            const focusables = getFocusables();
            if (focusables.length === 0) return;

            const active = document.activeElement as HTMLElement;
            const idx = focusables.indexOf(active);

            // If nothing is focused yet, focus the first element on any nav key
            if (idx === -1) {
                if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "d", "a", "s", "w", "D", "A", "S", "W"].includes(e.key)) {
                    e.preventDefault();
                    focusables[0].focus();
                }
                return;
            }

            let direction: "UP" | "DOWN" | "LEFT" | "RIGHT" | null = null;
            switch (e.key) {
                case "ArrowUp":
                case "w":
                case "W": direction = "UP"; break;
                case "ArrowDown":
                case "s":
                case "S": direction = "DOWN"; break;
                case "ArrowLeft":
                case "a":
                case "A": direction = "LEFT"; break;
                case "ArrowRight":
                case "d":
                case "D": direction = "RIGHT"; break;
                case "Enter":
                case " ":
                    e.preventDefault();
                    playSelect();
                    active.click();
                    return;
                case "Escape":
                    active.blur();
                    return;
            }

            if (!direction) return;
            e.preventDefault();

            const rect = active.getBoundingClientRect();
            const currCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

            let bestMatch: HTMLElement | null = null;
            let bestScore = Infinity;

            for (const el of focusables) {
                if (el === active) continue;

                // Make sure the element is visible
                const r = el.getBoundingClientRect();
                if (r.width === 0 || r.height === 0) continue;

                const center = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
                let isCandidate = false;
                let primaryDist = 0;
                let secondaryDist = 0;

                // Thresholds to ensure we pick something actually in that direction visually
                if (direction === "UP" && center.y < currCenter.y - 5) {
                    isCandidate = true;
                    primaryDist = currCenter.y - center.y;
                    secondaryDist = Math.abs(currCenter.x - center.x);
                } else if (direction === "DOWN" && center.y > currCenter.y + 5) {
                    isCandidate = true;
                    primaryDist = center.y - currCenter.y;
                    secondaryDist = Math.abs(currCenter.x - center.x);
                } else if (direction === "LEFT" && center.x < currCenter.x - 5) {
                    isCandidate = true;
                    primaryDist = currCenter.x - center.x;
                    secondaryDist = Math.abs(currCenter.y - center.y);
                } else if (direction === "RIGHT" && center.x > currCenter.x + 5) {
                    isCandidate = true;
                    primaryDist = center.x - currCenter.x;
                    secondaryDist = Math.abs(currCenter.y - center.y);
                }

                if (isCandidate) {
                    // Score formula favoring primary direction alignment but considering cross-axis distance.
                    // A high multiplier on secondary distance strictly enforces column/row alignment
                    const score = primaryDist + secondaryDist * 5;

                    if (score < bestScore) {
                        bestScore = score;
                        bestMatch = el;
                    }
                }
            }

            if (bestMatch) {
                playHover();
                bestMatch.focus();
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [getFocusables]);
}
