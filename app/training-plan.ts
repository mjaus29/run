export type PhaseId = "water" | "air" | "earth";

export type SessionType =
  | "Intervals"
  | "Tempo"
  | "Easy"
  | "Long Run"
  | "Over/Under";

export type PaceBand = {
  label: string;
  pace: string;
  cue: string;
};

export type TrainingSession = {
  slot: string;
  type: SessionType;
  workout: string;
  note?: string;
  target?: string;
};

export type TrainingWeek = {
  week: number;
  focus: string;
  recovery: string;
  sessions: TrainingSession[];
};

export type TrainingPhase = {
  id: PhaseId;
  label: string;
  subtitle: string;
  objective: string;
  targetPace: string;
  color: string;
  bg: string;
  paceTargets: Partial<Record<SessionType, string>>;
  paceBands: PaceBand[];
  notes: string[];
  weeks: TrainingWeek[];
};

export type TrainingPlanWeek = {
  phase: TrainingPhase;
  week: TrainingWeek;
};

export const TRAINING_PHASES: TrainingPhase[] = [
  {
    id: "water",
    label: "Water Run",
    subtitle: "Breaking the hour",
    objective:
      "Build the aerobic floor first: one quality run, one easy run, and one long run every week.",
    targetPace: "6:00/km",
    color: "#4cc9f0",
    bg: "rgba(76, 201, 240, 0.12)",
    paceTargets: {
      Easy: "7:00-7:30/km",
      Tempo: "6:10-6:15/km",
      Intervals: "5:45-5:55/km",
      "Long Run": "7:00-7:30/km easy",
    },
    paceBands: [
      {
        label: "Easy",
        pace: "7:00-7:30/km",
        cue: "Conversational flow; rhythmic breathing.",
      },
      {
        label: "Tempo",
        pace: "6:10-6:15/km",
        cue: "Comfortably hard; stay just under the red line.",
      },
      {
        label: "Intervals",
        pace: "5:45-5:55/km",
        cue: "Hard, controlled repetitions with full form.",
      },
    ],
    notes: [
      "Respect the de-load weeks in weeks 4 and 8. That is where the gains settle in.",
      "Add the optional recovery run only when the first three sessions still feel controlled.",
    ],
    weeks: [
      {
        week: 1,
        focus: "Routine first",
        recovery: "Optional recovery: 3km Recovery",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "4 x 800m @ 5:50 (2m walk)",
          },
          { slot: "Run 2", type: "Easy", workout: "5km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "6km (Time on feet)" },
        ],
      },
      {
        week: 2,
        focus: "Threshold intro",
        recovery: "Optional recovery: 3km Recovery",
        sessions: [
          { slot: "Run 1", type: "Tempo", workout: "4km Tempo @ 6:15" },
          { slot: "Run 2", type: "Easy", workout: "5km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "7km (10% rule)" },
        ],
      },
      {
        week: 3,
        focus: "Engine build",
        recovery: "Optional recovery: 4km Recovery",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "5 x 1km @ 5:55 (2m walk)",
          },
          { slot: "Run 2", type: "Easy", workout: "6km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "8km (Build engine)" },
        ],
      },
      {
        week: 4,
        focus: "De-load",
        recovery: "Session 4: Rest",
        sessions: [
          { slot: "Run 1", type: "Easy", workout: "3km Easy" },
          { slot: "Run 2", type: "Easy", workout: "4km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "6km Long Run" },
        ],
      },
      {
        week: 5,
        focus: "Volume up",
        recovery: "Optional recovery: 4km Recovery",
        sessions: [
          { slot: "Run 1", type: "Intervals", workout: "6 x 800m @ 5:50" },
          { slot: "Run 2", type: "Easy", workout: "6km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "9km Long Run" },
        ],
      },
      {
        week: 6,
        focus: "Reach 10km",
        recovery: "Optional recovery: 5km Recovery",
        sessions: [
          { slot: "Run 1", type: "Tempo", workout: "5km Tempo @ 6:10" },
          { slot: "Run 2", type: "Easy", workout: "7km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "10km Long Run" },
        ],
      },
      {
        week: 7,
        focus: "Peak long run",
        recovery: "Optional recovery: 5km Recovery",
        sessions: [
          { slot: "Run 1", type: "Intervals", workout: "6 x 1km @ 5:55" },
          { slot: "Run 2", type: "Easy", workout: "7km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "11km Long Run" },
        ],
      },
      {
        week: 8,
        focus: "Recovery + prep",
        recovery: "Session 4: Rest (Race prep)",
        sessions: [
          { slot: "Run 1", type: "Easy", workout: "3km Easy" },
          { slot: "Run 2", type: "Easy", workout: "4km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "6km Recovery Run" },
        ],
      },
    ],
  },
  {
    id: "air",
    label: "Air Run",
    subtitle: "Higher aerobic pressure",
    objective:
      "Shift to stronger sustained work and teach the long run to finish better than it starts.",
    targetPace: "5:30/km",
    color: "#90be6d",
    bg: "rgba(144, 190, 109, 0.12)",
    paceTargets: {
      Easy: "6:30-6:45/km",
      Tempo: "5:40-5:45/km",
      Intervals: "5:15-5:20/km",
      "Long Run": "6:30-6:45/km with a negative split",
    },
    paceBands: [
      {
        label: "Easy",
        pace: "6:30-6:45/km",
        cue: "Keep the breathing calm and the pressure low.",
      },
      {
        label: "Tempo",
        pace: "5:40-5:45/km",
        cue: "Strong aerobic pressure, still controlled.",
      },
      {
        label: "Intervals",
        pace: "5:15-5:20/km",
        cue: "Fast but repeatable. Leave one rep in reserve.",
      },
    ],
    notes: [
      "Long runs should trend faster in the second half instead of fading.",
      "This phase is still three core runs. Add the optional fourth only if recovery remains stable.",
    ],
    weeks: [
      {
        week: 1,
        focus: "Set the new baseline",
        recovery: "Optional recovery: 4km Recovery",
        sessions: [
          { slot: "Run 1", type: "Intervals", workout: "5 x 1km @ 5:20" },
          { slot: "Run 2", type: "Easy", workout: "6km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "8km (Negative split)" },
        ],
      },
      {
        week: 2,
        focus: "Tempo pressure",
        recovery: "Optional recovery: 4km Recovery",
        sessions: [
          { slot: "Run 1", type: "Tempo", workout: "5km Tempo @ 5:40" },
          { slot: "Run 2", type: "Easy", workout: "6km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "9km (Time on feet)" },
        ],
      },
      {
        week: 3,
        focus: "Steady engine",
        recovery: "Optional recovery: 5km Recovery",
        sessions: [
          { slot: "Run 1", type: "Intervals", workout: "6 x 1km @ 5:20" },
          { slot: "Run 2", type: "Easy", workout: "7km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "10km (Steady)" },
        ],
      },
      {
        week: 4,
        focus: "De-load",
        recovery: "Session 4: Rest",
        sessions: [
          { slot: "Run 1", type: "Easy", workout: "4km Easy" },
          { slot: "Run 2", type: "Easy", workout: "5km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "7km Long Run" },
        ],
      },
      {
        week: 5,
        focus: "800m strength",
        recovery: "Optional recovery: 5km Recovery",
        sessions: [
          { slot: "Run 1", type: "Intervals", workout: "8 x 800m @ 5:15" },
          { slot: "Run 2", type: "Easy", workout: "7km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "11km (Negative split)" },
        ],
      },
      {
        week: 6,
        focus: "12km durability",
        recovery: "Optional recovery: 6km Recovery",
        sessions: [
          { slot: "Run 1", type: "Tempo", workout: "6km Tempo @ 5:35" },
          { slot: "Run 2", type: "Easy", workout: "8km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "12km (Time on feet)" },
        ],
      },
      {
        week: 7,
        focus: "Peak long-run volume",
        recovery: "Optional recovery: 6km Recovery",
        sessions: [
          { slot: "Run 1", type: "Intervals", workout: "5 x 1.5km @ 5:20" },
          { slot: "Run 2", type: "Easy", workout: "8km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "13km (Engine build)" },
        ],
      },
      {
        week: 8,
        focus: "Recovery + prep",
        recovery: "Session 4: Rest (Race prep)",
        sessions: [
          { slot: "Run 1", type: "Easy", workout: "4km Easy" },
          { slot: "Run 2", type: "Easy", workout: "5km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "8km Recovery" },
        ],
      },
    ],
  },
  {
    id: "earth",
    label: "Earth Run",
    subtitle: "Red-line mastery",
    objective:
      "Push the top end with over-and-under work while keeping the long run honest and durable.",
    targetPace: "5:00/km",
    color: "#f4a261",
    bg: "rgba(244, 162, 97, 0.12)",
    paceTargets: {
      Easy: "6:00-6:15/km",
      Tempo: "5:10/km",
      Intervals: "4:40-4:50/km",
      "Long Run": "6:00-6:15/km easy",
      "Over/Under": "Under 5:10/km, over 4:50/km",
    },
    paceBands: [
      {
        label: "Easy",
        pace: "6:00-6:15/km",
        cue: "Steady, relaxed mileage that protects the quality work.",
      },
      {
        label: "Under",
        pace: "5:10/km",
        cue: "Slightly slower than race pace, fully controlled.",
      },
      {
        label: "Over",
        pace: "4:50/km",
        cue: "Slightly faster than race pace without losing form.",
      },
      {
        label: "Intervals",
        pace: "4:40-4:50/km",
        cue: "Sharp, repeatable speed with smooth mechanics.",
      },
    ],
    notes: [
      "The over-and-under sessions teach lactate clearance while the effort is still rising.",
      "For the 24 x 60s sessions, never stop. Keep the 30-second recoveries as a shuffle.",
    ],
    weeks: [
      {
        week: 1,
        focus: "Freight-train turnover",
        recovery: "Optional recovery: 5km Recovery",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "24 x 60s (30s recovery)",
            note: "Use a rhythmic shuffle through the recoveries. No full stops.",
          },
          { slot: "Run 2", type: "Easy", workout: "7km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "10km (10% rule)" },
        ],
      },
      {
        week: 2,
        focus: "Threshold hold",
        recovery: "Optional recovery: 5km Recovery",
        sessions: [
          { slot: "Run 1", type: "Tempo", workout: "6km Tempo @ 5:10" },
          { slot: "Run 2", type: "Easy", workout: "7km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "11km (Steady)" },
        ],
      },
      {
        week: 3,
        focus: "Over-under control",
        recovery: "Optional recovery: 6km Recovery",
        sessions: [
          {
            slot: "Run 1",
            type: "Over/Under",
            workout: "1km Over/Unders x 6",
            note: "Alternate 5:10/km under pace with 4:50/km over pace while keeping form intact.",
          },
          { slot: "Run 2", type: "Easy", workout: "8km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "12km (Form focus)" },
        ],
      },
      {
        week: 4,
        focus: "De-load",
        recovery: "Session 4: Rest",
        sessions: [
          { slot: "Run 1", type: "Easy", workout: "5km Easy" },
          { slot: "Run 2", type: "Easy", workout: "6km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "8km Long Run" },
        ],
      },
      {
        week: 5,
        focus: "Speed ceiling",
        recovery: "Optional recovery: 6km Recovery",
        sessions: [
          { slot: "Run 1", type: "Intervals", workout: "10 x 800m @ 4:45" },
          { slot: "Run 2", type: "Easy", workout: "8km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "13km (Time on feet)" },
        ],
      },
      {
        week: 6,
        focus: "14km durability",
        recovery: "Optional recovery: 7km Recovery",
        sessions: [
          { slot: "Run 1", type: "Tempo", workout: "7km Tempo @ 5:05" },
          { slot: "Run 2", type: "Easy", workout: "9km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "14km (10% rule)" },
        ],
      },
      {
        week: 7,
        focus: "Peak volume",
        recovery: "Optional recovery: 7km Recovery",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "24 x 60s (30s recovery)",
            note: "Treat the recoveries like a rolling reset instead of a rest break.",
          },
          { slot: "Run 2", type: "Easy", workout: "9km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "15km (Peak volume)" },
        ],
      },
      {
        week: 8,
        focus: "Recovery + prep",
        recovery: "Session 4: Rest (Race prep)",
        sessions: [
          { slot: "Run 1", type: "Easy", workout: "5km Easy" },
          { slot: "Run 2", type: "Easy", workout: "6km Easy" },
          { slot: "Run 3", type: "Long Run", workout: "9km Recovery" },
        ],
      },
    ],
  },
];

export const TRAINING_WEEKS: TrainingPlanWeek[] = TRAINING_PHASES.flatMap(
  (phase) => phase.weeks.map((week) => ({ phase, week }))
);

export const CORE_RULES = [
  {
    label: "80/20 balance",
    text: "Keep roughly 80% of your weekly volume easy so the quality session still lands with purpose.",
  },
  {
    label: "10% progression",
    text: "Do not push total volume or the long run up by more than 10% from one week to the next.",
  },
  {
    label: "Warm before speed",
    text: "Use a short jog plus drills like A-skips and B-skips before faster sessions.",
  },
];

export const SUPPORT_WORK = [
  "Run-focused strength twice per week: calf raises, squats, single-leg work, and core stability.",
  "Longer runs need hydration. Sharper phases need better sleep. Treat both as part of the plan.",
  "Sharp pain is a stop signal. Normal soreness is not the same as structural pain.",
];
