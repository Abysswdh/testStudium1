# Studium: Project Context & Architecture

## Overview
**Studium** is an all-in-one productivity booster application built for the Web Development Competition (WDC) 2026. 
The core concept is a **gamified Notion**—easier to use, highly engaging, and fun (similar to Duolingo). 

## UI/UX Vision: The "Console" Paradigm
The application should feel like a high-end gaming console UI (specifically taking heavy inspiration from the **Xbox PC App / Game Pass UI**).
- **Full-Page Views**: Expansive, immersive screens instead of small, constrained web cards.
- **Unified Design Language**: Consistent colors (dark greys/blacks, specific accent colors like Xbox Green or deep purple), consistent border radii (`rounded-2xl` or `3xl`), and consistent glassmorphic panels.
- **Expressive Design**: High contrast, snappy, satisfying interactions.
- **Micro-Interactions**: Subtle, polished animations and premium sound effects.
- **Visual Styles**: A mix of high-contrast "Osu!" style energy, dungeon-crawler RPG aesthetics, and friendly Duolingo-like progression, all wrapped in a sleek Console interface.

## Core Features (WDC Rules: Max 5 Productivity Features)
In accordance with WDC 2026 rules (Max 5 productivity features, including Note-taking), the feature set is strictly defined as:

1. **Dashboard (Command Center)**: Custom widget-based layout for personalized overview.
2. **Notes (Pencatatan)**: Fast, satisfying note-taking. (Baseline: simple text. Future: images, embeds, exports).
3. **Quests (Task Management)**: Goals and missions mapped to real-life tasks.
4. **Schedule (Time Management)**: Calendar with synced events (future: ics/Google Calendar import). If an event is on the schedule, it triggers Quests.
5. **Study Room (Focus/Activity)**: Pomodoro countdowns, energy refueling, and focus tracking.

*Supporting/Gamification elements (Leaderboard, 1v1 battles, Forum, Energy system) wrap around these 5 core productivity features.*

## Implementation Strategy: The Baseline Approach
For every feature, we start with a **Baseline (v1)**. 
- Implement purely the core mechanics with full UI polish.
- Ensure the architecture is modular so future capabilities (like drag-and-drop, rich text editing, external integrations) can be plugged in without rewriting the UI layout.

## Architecture & User Flow (The "Isekai" Alur)
The application flow is structured like an **Isekai Adventure World**, where the user (an active adventurer) chooses between three main hubs:

### 1. 🏠 Home (Single-Player Productivity: "The Armory & Command Center")
- **Concept:** The personal command center and private study area. Looks like the Xbox Dashboard Home.
- **Features:** 
  - **Quick Glance / Shortcuts:** Play shortcuts for Focus Mode, Note-taking, etc.
  - **Widgets:** Pinned notes, upcoming calendar schedule, active goals/missions, energy refueling limits.
  - **The Armory & Hall of Fame:** Showcase equipment bought with Gold (e.g., "Golden Book" for +10% XP), and the top 3 students of the week.
- **Vibe:** Focused, calm, high-contrast command center.

### 2. 🛡️ Guild Center (Co-Op & Community: "Focus Sanctuary & Guild Board")
- **Concept:** The social hub where adventurers gather, form parties (study groups), and support each other.
- **Features:** 
  - **Focus Sanctuary (Multiplayer Pomodoro):** Users study together real-time. "Combo Aura" grants 1.5x XP if everyone stays. "Wall of Shame" for those who quit early.
  - **Guild Board & Raids:** Co-op tasks. "Raid Party" where everyone must do their part to defeat a Boss task. Global board sharing tips, showing Character Levels and Equipments.
  - **The Grimoire:** Collaborative note-taking. Earning the "Grand Librarian" title for most helpful notes. Writing notes gives Mana.
- **Vibe:** Warm, collaborative, dungeon-tavern aesthetics.

### 3. 🏟️ Stadium / Arena (PvP Competition: "Ranked Duels")
- **Concept:** The battleground for testing knowledge and earning glory (Ranked DP - Duel Points). Inspired by Skuling.id.
- **Features:**
  - **Stadium Hub (Selection Screen):** Before fighting, you see leaderboards, player stats, and matchmaking buttons (like an Xbox multiplayer lobby).
  - **1v1 Ranked Memory Duels:** A high-intensity trivia fight (e.g., SNBT/UTBK flashcards) modeled like a fighting game.
  - **Betting System:** Winner takes Gold and XP from the loser.
  - **Player Identity:** Users have Avatars, Titles (e.g., "Battle Mage", "Rogue Academic"), Levels, and visually distinct HP bars.
  - **Seasons & Leagues:** Climb from Bronze to Crystal League by maintaining win streaks (e.g., "5x Combo").
- **Vibe:** Intense, dark, glowing arenas (fighting game aesthetics, deep purples/reds).
