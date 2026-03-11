"use client";
import { useState } from "react";

const PHASES = {
  base: {
    label: "BASE BUILDING",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
  },
  development: {
    label: "DEVELOPMENT",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
  },
  recovery: {
    label: "RECOVERY",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
  },
  peak: { label: "PEAK", color: "#fb923c", bg: "rgba(251,146,60,0.08)" },
  taper: { label: "TAPER", color: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
  race: { label: "RACE WEEK", color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
};

const TYPE_COLORS = {
  Easy: "#4ade80",
  Interval: "#f87171",
  Tempo: "#60a5fa",
  "Long Run": "#fb923c",
  Shakeout: "#a78bfa",
  Rest: "#6b7280",
  "🏁 RACE DAY": "#fbbf24",
  "🏆 Time Trial": "#fbbf24",
};

const WEEKS = [
  {
    week: 1,
    dates: "Mar 11–17",
    phase: "base",
    total: "~22 km",
    focus: "Form + habit",
    days: [
      {
        date: "2026-03-11",
        label: "Wed Mar 11",
        type: "Easy",
        workout: "Easy jog, focus on form",
        distance: "3 km",
        duration: "22–23 min",
        pace: "7:30/km",
        splits: "3 × 7:30/km",
      },
      {
        date: "2026-03-13",
        label: "Fri Mar 13",
        type: "Interval",
        workout: "6×400m @ hard, 90s rest",
        distance: "4.4 km",
        duration: "~30 min",
        pace: "~6:50/km",
        splits: "WU 1km · 6×0.4km@5:40 · CD 1km",
      },
      {
        date: "2026-03-15",
        label: "Sun Mar 15",
        type: "Easy",
        workout: "Easy recovery run",
        distance: "4 km",
        duration: "29–30 min",
        pace: "7:20/km",
        splits: "4 × 7:20/km",
      },
      {
        date: "2026-03-17",
        label: "Tue Mar 17",
        type: "Long Run",
        workout: "Build endurance base",
        distance: "7 km",
        duration: "52 min",
        pace: "7:26/km",
        splits: "2km@7:45 · 3km@7:30 · 2km@7:20",
      },
    ],
  },
  {
    week: 2,
    dates: "Mar 18–24",
    phase: "base",
    total: "~24 km",
    focus: "First tempo",
    days: [
      {
        date: "2026-03-18",
        label: "Wed Mar 18",
        type: "Easy",
        workout: "Easy run, controlled breathing",
        distance: "4 km",
        duration: "29 min",
        pace: "7:20/km",
        splits: "4 × 7:20/km",
      },
      {
        date: "2026-03-20",
        label: "Fri Mar 20",
        type: "Interval",
        workout: "6×400m faster, 90s rest",
        distance: "4.4 km",
        duration: "~30 min",
        pace: "~6:45/km",
        splits: "WU 1km · 6×0.4km@5:30 · CD 1km",
      },
      {
        date: "2026-03-22",
        label: "Sun Mar 22",
        type: "Tempo",
        workout: "First tempo intro (20 min)",
        distance: "5 km",
        duration: "33 min",
        pace: "6:36/km",
        splits: "1km@7:20 · 3km@6:05 · 1km@7:20",
      },
      {
        date: "2026-03-24",
        label: "Tue Mar 24",
        type: "Long Run",
        workout: "Slow & steady",
        distance: "8 km",
        duration: "59 min",
        pace: "7:22/km",
        splits: "2km@7:40 · 3km@7:30 · 3km@7:15",
      },
    ],
  },
  {
    week: 3,
    dates: "Mar 25–31",
    phase: "base",
    total: "~26 km",
    focus: "Interval boost",
    days: [
      {
        date: "2026-03-25",
        label: "Wed Mar 25",
        type: "Easy",
        workout: "Easy aerobic run",
        distance: "5 km",
        duration: "35–36 min",
        pace: "7:10/km",
        splits: "5 × 7:10/km",
      },
      {
        date: "2026-03-27",
        label: "Fri Mar 27",
        type: "Interval",
        workout: "8×400m @ 5:25, 90s rest",
        distance: "5.2 km",
        duration: "~36 min",
        pace: "~6:50/km",
        splits: "WU 1km · 8×0.4km@5:25 · CD 1km",
      },
      {
        date: "2026-03-29",
        label: "Sun Mar 29",
        type: "Tempo",
        workout: "Tempo 25 min",
        distance: "5.5 km",
        duration: "35 min",
        pace: "6:22/km",
        splits: "1km@7:10 · 3.5km@6:00 · 1km@7:10",
      },
      {
        date: "2026-03-31",
        label: "Tue Mar 31",
        type: "Long Run",
        workout: "First 'long' feel run",
        distance: "8 km",
        duration: "58–59 min",
        pace: "7:22/km",
        splits: "2km@7:30 · 4km@7:20 · 2km@7:10",
      },
    ],
  },
  {
    week: 4,
    dates: "Apr 1–7",
    phase: "development",
    total: "~28 km",
    focus: "800m intervals",
    days: [
      {
        date: "2026-04-01",
        label: "Wed Apr 1",
        type: "Easy",
        workout: "Easy run with 4× 30s strides at end",
        distance: "5.2 km",
        duration: "37 min",
        pace: "7:06/km",
        splits: "5km@7:05 + 4×30s@4:45",
      },
      {
        date: "2026-04-03",
        label: "Fri Apr 3",
        type: "Interval",
        workout: "5×800m @ 5:25, 2 min rest",
        distance: "6 km",
        duration: "~42 min",
        pace: "~7:00/km",
        splits: "WU 1km · 5×0.8km@5:25 · CD 1km",
      },
      {
        date: "2026-04-05",
        label: "Sun Apr 5",
        type: "Tempo",
        workout: "Tempo 30 min",
        distance: "6 km",
        duration: "37 min",
        pace: "6:10/km",
        splits: "1km@7:10 · 4km@5:55 · 1km@7:10",
      },
      {
        date: "2026-04-07",
        label: "Tue Apr 7",
        type: "Long Run",
        workout: "Progressive long run",
        distance: "9 km",
        duration: "65 min",
        pace: "7:13/km",
        splits: "2km@7:30 · 4km@7:15 · 3km@7:00",
      },
    ],
  },
  {
    week: 5,
    dates: "Apr 8–14",
    phase: "development",
    total: "~29 km",
    focus: "10km LR reached",
    days: [
      {
        date: "2026-04-08",
        label: "Wed Apr 8",
        type: "Easy",
        workout: "Easy aerobic + strides",
        distance: "5.2 km",
        duration: "36 min",
        pace: "6:55/km",
        splits: "5km@7:00 + 4×30s@4:45",
      },
      {
        date: "2026-04-10",
        label: "Fri Apr 10",
        type: "Interval",
        workout: "6×800m @ 5:20, 2 min rest",
        distance: "6.8 km",
        duration: "~48 min",
        pace: "~7:03/km",
        splits: "WU 1km · 6×0.8km@5:20 · CD 1km",
      },
      {
        date: "2026-04-12",
        label: "Sun Apr 12",
        type: "Tempo",
        workout: "Cruise tempo 35 min",
        distance: "7 km",
        duration: "41 min",
        pace: "5:51/km",
        splits: "1km@7:00 · 5km@5:50 · 1km@7:00",
      },
      {
        date: "2026-04-14",
        label: "Tue Apr 14",
        type: "Long Run",
        workout: "Longest run so far",
        distance: "10 km",
        duration: "71 min",
        pace: "7:06/km",
        splits: "2km@7:30 · 5km@7:10 · 3km@6:55",
      },
    ],
  },
  {
    week: 6,
    dates: "Apr 15–21",
    phase: "recovery",
    total: "~26 km",
    focus: "Cutback week",
    days: [
      {
        date: "2026-04-15",
        label: "Wed Apr 15",
        type: "Easy",
        workout: "Easy shakeout run",
        distance: "4 km",
        duration: "29 min",
        pace: "7:15/km",
        splits: "4 × 7:15/km",
      },
      {
        date: "2026-04-17",
        label: "Fri Apr 17",
        type: "Interval",
        workout: "5×800m @ 5:20, 2 min rest",
        distance: "6 km",
        duration: "~42 min",
        pace: "~7:00/km",
        splits: "WU 1km · 5×0.8km@5:20 · CD 1km",
      },
      {
        date: "2026-04-19",
        label: "Sun Apr 19",
        type: "Tempo",
        workout: "Moderate tempo",
        distance: "6 km",
        duration: "37 min",
        pace: "6:10/km",
        splits: "1km@7:10 · 4km@6:00 · 1km@7:10",
      },
      {
        date: "2026-04-21",
        label: "Tue Apr 21",
        type: "Long Run",
        workout: "Cutback long run",
        distance: "8 km",
        duration: "58 min",
        pace: "7:15/km",
        splits: "2km@7:30 · 4km@7:15 · 2km@7:00",
      },
    ],
  },
  {
    week: 7,
    dates: "Apr 22–28",
    phase: "peak",
    total: "~31 km",
    focus: "🎯 Sub-60 trial",
    days: [
      {
        date: "2026-04-23",
        label: "Wed Apr 23",
        type: "Easy",
        workout: "Easy + strides",
        distance: "5.2 km",
        duration: "36 min",
        pace: "6:55/km",
        splits: "5km@6:55 + 4×30s@4:40",
      },
      {
        date: "2026-04-25",
        label: "Fri Apr 25",
        type: "Interval",
        workout: "6×800m @ 5:15, 90s rest",
        distance: "6.8 km",
        duration: "~47 min",
        pace: "~6:55/km",
        splits: "WU 1km · 6×0.8km@5:15 · CD 1km",
      },
      {
        date: "2026-04-27",
        label: "Sun Apr 27",
        type: "🏆 Time Trial",
        workout: "10km Sub-60 attempt!",
        distance: "10 km",
        duration: "~60 min",
        pace: "6:00/km",
        splits: "2km@6:20 · 3km@6:05 · 3km@5:55 · 2km@5:45",
      },
      {
        date: "2026-04-28",
        label: "Tue Apr 28",
        type: "Easy",
        workout: "Recovery easy run",
        distance: "4 km",
        duration: "30 min",
        pace: "7:30/km",
        splits: "4 × 7:30/km",
      },
    ],
  },
  {
    week: 8,
    dates: "Apr 29–May 5",
    phase: "peak",
    total: "~29 km",
    focus: "11km long run",
    days: [
      {
        date: "2026-04-30",
        label: "Wed Apr 30",
        type: "Easy",
        workout: "Easy aerobic run",
        distance: "5 km",
        duration: "35 min",
        pace: "7:00/km",
        splits: "5 × 7:00/km",
      },
      {
        date: "2026-05-01",
        label: "Fri May 1",
        type: "Interval",
        workout: "8×400m @ 5:10, 90s rest",
        distance: "5.2 km",
        duration: "~38 min",
        pace: "~7:18/km",
        splits: "WU 1km · 8×0.4km@5:10 · CD 1km",
      },
      {
        date: "2026-05-03",
        label: "Sun May 3",
        type: "Tempo",
        workout: "Race-pace tempo run",
        distance: "8 km",
        duration: "48 min",
        pace: "6:00/km",
        splits: "1km@7:00 · 6km@6:00 · 1km@7:00",
      },
      {
        date: "2026-05-05",
        label: "Tue May 5",
        type: "Long Run",
        workout: "Final long run",
        distance: "11 km",
        duration: "78 min",
        pace: "7:05/km",
        splits: "2km@7:30 · 5km@7:10 · 4km@6:55",
      },
    ],
  },
  {
    week: 9,
    dates: "May 6–12",
    phase: "taper",
    total: "~26 km",
    focus: "Begin taper",
    days: [
      {
        date: "2026-05-06",
        label: "Wed May 6",
        type: "Easy",
        workout: "Easy easy easy",
        distance: "4 km",
        duration: "28–29 min",
        pace: "7:10/km",
        splits: "4 × 7:10/km",
      },
      {
        date: "2026-05-08",
        label: "Fri May 8",
        type: "Interval",
        workout: "5×800m @ 5:15, 2 min rest",
        distance: "6 km",
        duration: "~42 min",
        pace: "~7:00/km",
        splits: "WU 1km · 5×0.8km@5:15 · CD 1km",
      },
      {
        date: "2026-05-10",
        label: "Sun May 10",
        type: "Tempo",
        workout: "Sharp tempo",
        distance: "6 km",
        duration: "37 min",
        pace: "6:10/km",
        splits: "1km@7:10 · 4km@5:55 · 1km@7:10",
      },
      {
        date: "2026-05-12",
        label: "Tue May 12",
        type: "Long Run",
        workout: "Gentle long run",
        distance: "8 km",
        duration: "58 min",
        pace: "7:15/km",
        splits: "2km@7:30 · 4km@7:10 · 2km@7:00",
      },
    ],
  },
  {
    week: 10,
    dates: "May 13–19",
    phase: "taper",
    total: "~18 km",
    focus: "Sharpen, reduce",
    days: [
      {
        date: "2026-05-13",
        label: "Wed May 13",
        type: "Easy",
        workout: "Short easy shakeout",
        distance: "3 km",
        duration: "21–22 min",
        pace: "7:10/km",
        splits: "3 × 7:10/km",
      },
      {
        date: "2026-05-15",
        label: "Fri May 15",
        type: "Interval",
        workout: "4×800m @ 5:20, 2 min rest",
        distance: "5.2 km",
        duration: "~36 min",
        pace: "~6:55/km",
        splits: "WU 1km · 4×0.8km@5:20 · CD 1km",
      },
      {
        date: "2026-05-17",
        label: "Sun May 17",
        type: "Tempo",
        workout: "Short sharpener",
        distance: "5 km",
        duration: "32 min",
        pace: "6:24/km",
        splits: "1km@7:00 · 3km@5:55 · 1km@7:00",
      },
      {
        date: "2026-05-19",
        label: "Tue May 19",
        type: "Easy",
        workout: "Final medium easy run",
        distance: "4 km",
        duration: "28 min",
        pace: "7:00/km",
        splits: "4 × 7:00/km",
      },
    ],
  },
  {
    week: 11,
    dates: "May 20–24",
    phase: "race",
    total: "~10 km",
    focus: "🏁 Race Day!",
    days: [
      {
        date: "2026-05-20",
        label: "Wed May 20",
        type: "Easy",
        workout: "Light jog, stay loose",
        distance: "2 km",
        duration: "14–15 min",
        pace: "7:10/km",
        splits: "2 × 7:10/km",
      },
      {
        date: "2026-05-22",
        label: "Fri May 22",
        type: "Shakeout",
        workout: "3×200m @ race pace, easy rest",
        distance: "2.5 km",
        duration: "18 min",
        pace: "7:12/km",
        splits: "WU/CD jog + 3×0.2km@6:00",
      },
      {
        date: "2026-05-23",
        label: "Sat May 23",
        type: "Rest",
        workout: "Full rest, hydrate, sleep 💤",
        distance: "—",
        duration: "—",
        pace: "—",
        splits: "—",
      },
      {
        date: "2026-05-24",
        label: "Sun May 24",
        type: "🏁 RACE DAY",
        workout: "10km — Goal: Sub 60:00!",
        distance: "10 km",
        duration: "~59:30",
        pace: "5:57/km",
        splits: "2km@6:15 · 3km@6:00 · 3km@5:55 · 2km@5:45",
      },
    ],
  },
];

function getCurrentWeekIndex() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  for (let i = 0; i < WEEKS.length; i++) {
    const days = WEEKS[i].days.filter((d) => d.date !== undefined);
    if (days.length === 0) continue;
    const dates = days.map((d) => d.date).sort();
    if (todayStr >= dates[0] && todayStr <= dates[dates.length - 1]) return i;
    if (i === 0 && todayStr < dates[0]) return 0;
  }
  return WEEKS.length - 1;
}

function isToday(dateStr) {
  return new Date().toISOString().split("T")[0] === dateStr;
}

function isPast(dateStr) {
  return new Date().toISOString().split("T")[0] > dateStr;
}

const paceRefData = [
  {
    type: "Easy",
    pace: "7:00–7:30/km",
    feel: "Conversational",
    rpe: "4–5",
    color: "#4ade80",
  },
  {
    type: "Tempo",
    pace: "5:50–6:10/km",
    feel: "Comfortably hard",
    rpe: "7–8",
    color: "#60a5fa",
  },
  {
    type: "Intervals",
    pace: "5:10–5:40/km",
    feel: "Hard, controlled",
    rpe: "8–9",
    color: "#f87171",
  },
  {
    type: "Long Run",
    pace: "7:00–7:45/km",
    feel: "Very easy",
    rpe: "4–5",
    color: "#fb923c",
  },
  {
    type: "Race Pace",
    pace: "6:00/km",
    feel: "Strong, focused",
    rpe: "8",
    color: "#fbbf24",
  },
];

export default function App() {
  const [weekIdx, setWeekIdx] = useState(getCurrentWeekIndex);
  const [showPaceRef, setShowPaceRef] = useState(false);
  const [expandedDay, setExpandedDay] = useState(null);
  const [direction, setDirection] = useState(null);
  const [animating, setAnimating] = useState(false);

  const week = WEEKS[weekIdx];
  const phase = PHASES[week.phase];

  const navigate = (dir) => {
    if (animating) return;
    const next = weekIdx + dir;
    if (next < 0 || next >= WEEKS.length) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setWeekIdx(next);
      setExpandedDay(null);
      setDirection(null);
      setAnimating(false);
    }, 220);
  };

  const totalWeeks = WEEKS.length;
  const progress = ((weekIdx + 1) / totalWeeks) * 100;
  const daysUntilRace = Math.ceil(
    (new Date("2026-05-24") - new Date()) / 86400000
  );

  const slideStyle = {
    transform: animating
      ? `translateX(${direction === 1 ? "-60px" : "60px"})`
      : "translateX(0)",
    opacity: animating ? 0 : 1,
    transition: "transform 0.22s cubic-bezier(.4,0,.2,1), opacity 0.22s ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "'DM Mono', 'Courier New', monospace",
        color: "#e5e5e5",
        padding: "0",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .day-card { cursor: pointer; transition: background 0.15s, border-color 0.15s, transform 0.15s; }
        .day-card:hover { transform: translateY(-1px); }
        .nav-btn { cursor: pointer; background: none; border: 1px solid #222; color: #888; border-radius: 4px; padding: 8px 16px; font-family: inherit; font-size: 12px; letter-spacing: 0.1em; transition: all 0.15s; }
        .nav-btn:hover:not(:disabled) { border-color: #555; color: #e5e5e5; background: #1a1a1a; }
        .nav-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .week-dot { width: 6px; height: 6px; border-radius: 50%; transition: all 0.2s; cursor: pointer; }
        .split-chip { display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; padding: 2px 7px; font-size: 11px; margin: 2px; letter-spacing: 0.03em; }
        .toggle-ref { cursor: pointer; background: none; border: 1px solid #222; color: #666; border-radius: 3px; padding: 5px 12px; font-family: inherit; font-size: 11px; letter-spacing: 0.08em; transition: all 0.15s; }
        .toggle-ref:hover { border-color: #444; color: #aaa; }
        .today-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.3); } 50% { box-shadow: 0 0 0 6px rgba(251,191,36,0); } }
      `}</style>

      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #161616",
          padding: "20px 24px 16px",
          position: "sticky",
          top: 0,
          background: "#0a0a0a",
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "#555",
                marginBottom: 4,
              }}
            >
              10K TRAINING PLAN
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: "0.05em",
                color: "#e5e5e5",
                lineHeight: 1,
              }}
            >
              SUB 60:00
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontSize: 11, color: "#444", letterSpacing: "0.15em" }}
            >
              RACE DAY IN
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 26,
                color: daysUntilRace > 0 ? "#fbbf24" : "#4ade80",
                letterSpacing: "0.05em",
              }}
            >
              {daysUntilRace > 0 ? `${daysUntilRace}d` : "TODAY!"}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ maxWidth: 680, margin: "12px auto 0" }}>
          <div
            style={{
              height: 2,
              background: "#161616",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${phase.color}88, ${phase.color})`,
                transition: "width 0.4s ease",
                borderRadius: 1,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {WEEKS.map((w, i) => (
                <div
                  key={i}
                  className="week-dot"
                  onClick={() => {
                    if (!animating) {
                      setWeekIdx(i);
                      setExpandedDay(null);
                    }
                  }}
                  style={{
                    background:
                      i === weekIdx
                        ? phase.color
                        : i < weekIdx
                          ? "#2a2a2a"
                          : "#1a1a1a",
                    border:
                      i === weekIdx
                        ? `1px solid ${phase.color}`
                        : "1px solid #222",
                  }}
                  title={`Week ${i + 1}`}
                />
              ))}
            </div>
            <div
              style={{ fontSize: 10, color: "#444", letterSpacing: "0.12em" }}
            >
              MAY 24, 2026
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 40px" }}
      >
        {/* Week header */}
        <div style={{ ...slideStyle }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <button
              className="nav-btn"
              onClick={() => navigate(-1)}
              disabled={weekIdx === 0}
            >
              ← PREV
            </button>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "inline-block",
                  background: phase.bg,
                  border: `1px solid ${phase.color}22`,
                  borderRadius: 3,
                  padding: "3px 12px",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: phase.color,
                  marginBottom: 6,
                }}
              >
                {phase.label}
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  letterSpacing: "0.08em",
                  color: "#e5e5e5",
                  lineHeight: 1,
                }}
              >
                WEEK {week.week}{" "}
                <span style={{ color: "#444", fontSize: 16 }}>
                  / {totalWeeks}
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#555",
                  marginTop: 3,
                  letterSpacing: "0.1em",
                }}
              >
                {week.dates}
              </div>
            </div>

            <button
              className="nav-btn"
              onClick={() => navigate(1)}
              disabled={weekIdx === WEEKS.length - 1}
            >
              NEXT →
            </button>
          </div>

          {/* Week stats */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[
              { label: "VOLUME", value: week.total },
              { label: "SESSIONS", value: `${week.days.length}` },
              { label: "FOCUS", value: week.focus },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  background: "#111",
                  border: "1px solid #1a1a1a",
                  borderRadius: 6,
                  padding: "10px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    color: "#444",
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: 13, color: "#ccc", fontWeight: 500 }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Day cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {week.days.map((day, i) => {
              const today = isToday(day.date);
              const past = isPast(day.date);
              const expanded = expandedDay === i;
              const typeColor = TYPE_COLORS[day.type] || "#888";
              const isRest = day.type === "Rest";
              const isRace = day.type === "🏁 RACE DAY";
              const isTrial = day.type === "🏆 Time Trial";

              return (
                <div
                  key={i}
                  className={`day-card ${today ? "today-pulse" : ""}`}
                  onClick={() => setExpandedDay(expanded ? null : i)}
                  style={{
                    background: today
                      ? "#111"
                      : isRace || isTrial
                        ? "#111"
                        : "#0e0e0e",
                    border: `1px solid ${today ? "#fbbf2444" : isRace || isTrial ? `${typeColor}33` : past ? "#1a1a1a" : "#1e1e1e"}`,
                    borderRadius: 8,
                    padding: "14px 16px",
                    opacity: past && !today ? 0.6 : 1,
                    borderLeft: `3px solid ${today ? "#fbbf24" : typeColor}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      {today && (
                        <div
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.18em",
                            color: "#fbbf24",
                            background: "#fbbf2411",
                            border: "1px solid #fbbf2422",
                            borderRadius: 2,
                            padding: "1px 6px",
                          }}
                        >
                          TODAY
                        </div>
                      )}
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#555",
                            letterSpacing: "0.1em",
                            marginBottom: 2,
                          }}
                        >
                          {day.label}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            color: typeColor,
                            letterSpacing: "0.08em",
                            fontWeight: 500,
                          }}
                        >
                          {day.type}
                        </div>
                      </div>
                    </div>

                    {!isRest && (
                      <div
                        style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "center",
                        }}
                      >
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#555",
                              letterSpacing: "0.1em",
                            }}
                          >
                            DIST
                          </div>
                          <div
                            style={{
                              fontSize: 15,
                              color: "#ccc",
                              fontWeight: 500,
                            }}
                          >
                            {day.distance}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#555",
                              letterSpacing: "0.1em",
                            }}
                          >
                            PACE
                          </div>
                          <div style={{ fontSize: 13, color: "#aaa" }}>
                            {day.pace}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            color: "#333",
                            transform: expanded ? "rotate(180deg)" : "none",
                            transition: "transform 0.2s",
                          }}
                        >
                          ▾
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded details */}
                  {expanded && !isRest && (
                    <div
                      style={{
                        marginTop: 14,
                        paddingTop: 14,
                        borderTop: "1px solid #1a1a1a",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          color: "#888",
                          marginBottom: 10,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {day.workout}
                      </div>

                      <div
                        style={{ display: "flex", gap: 16, marginBottom: 12 }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 9,
                              color: "#444",
                              letterSpacing: "0.15em",
                              marginBottom: 3,
                            }}
                          >
                            DURATION
                          </div>
                          <div style={{ fontSize: 13, color: "#bbb" }}>
                            {day.duration}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 9,
                              color: "#444",
                              letterSpacing: "0.15em",
                              marginBottom: 3,
                            }}
                          >
                            AVG PACE
                          </div>
                          <div style={{ fontSize: 13, color: "#bbb" }}>
                            {day.pace}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: 9,
                          color: "#444",
                          letterSpacing: "0.15em",
                          marginBottom: 6,
                        }}
                      >
                        SPLITS
                      </div>
                      <div>
                        {day.splits.split("·").map((s, si) => (
                          <span key={si} className="split-chip">
                            {s.trim()}
                          </span>
                        ))}
                      </div>

                      {(isRace || isTrial) && (
                        <div
                          style={{
                            marginTop: 12,
                            padding: "10px 12px",
                            background: `${typeColor}0a`,
                            border: `1px solid ${typeColor}22`,
                            borderRadius: 6,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              color: typeColor,
                              letterSpacing: "0.1em",
                            }}
                          >
                            {isRace
                              ? "🏁 RACE STRATEGY: Start at 6:10–6:15/km, negative split the back half!"
                              : "🎯 RUN IT LIKE A RACE — this is your confidence builder!"}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {isRest && (
                    <div style={{ marginTop: 6, fontSize: 12, color: "#555" }}>
                      Rest, hydrate, prepare 💤
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pace Reference toggle */}
          <div style={{ marginTop: 24 }}>
            <button
              className="toggle-ref"
              onClick={() => setShowPaceRef(!showPaceRef)}
            >
              {showPaceRef ? "▾ PACE REFERENCE" : "▸ PACE REFERENCE"}
            </button>

            {showPaceRef && (
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {paceRefData.map((p) => (
                  <div
                    key={p.type}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#0e0e0e",
                      border: "1px solid #1a1a1a",
                      borderLeft: `3px solid ${p.color}`,
                      borderRadius: 6,
                      padding: "10px 14px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: p.color,
                        letterSpacing: "0.08em",
                        width: 90,
                      }}
                    >
                      {p.type}
                    </div>
                    <div style={{ fontSize: 12, color: "#ccc", width: 110 }}>
                      {p.pace}
                    </div>
                    <div style={{ fontSize: 11, color: "#555", flex: 1 }}>
                      {p.feel}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#444",
                        letterSpacing: "0.05em",
                      }}
                    >
                      RPE {p.rpe}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <div
            style={{
              marginTop: 16,
              padding: "14px 16px",
              background: "#0e0e0e",
              border: "1px solid #1a1a1a",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "#444",
                marginBottom: 10,
              }}
            >
              COACHING NOTES
            </div>
            {[
              "Easy means EASY — when in doubt, slow down",
              "Hydrate on any run over 40 minutes",
              "Sleep is training — aim 7–9 hrs in peak weeks",
              "Pain ≠ soreness — sharp/joint pain means rest",
              "Trust the taper — sluggishness in wk 10–11 is normal",
            ].map((tip, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 6,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#333",
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.6 }}>
                  {tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #111",
          padding: "14px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.15em" }}>
          YOU'VE GOT THIS 🎽
        </div>
      </div>
    </div>
  );
}
