export type PhaseId = "water" | "air" | "earth";

export type SessionType =
  | "Intervals"
  | "Tempo"
  | "Easy"
  | "Long Run"
  | "Over/Under"
  | "Race Pace"
  | "Shakeout";

export type BaselineResult = {
  label: string;
  time: string;
  pace: string;
  note: string;
};

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
  goalTime: string;
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

export const BASELINE_RESULT: BaselineResult = {
  label: "Fire run complete",
  time: "60:00",
  pace: "6:00/km",
  note: "Use the finished Fire block as the baseline before moving into Water, Air, and Earth.",
};

export const TRAINING_PHASES: TrainingPhase[] = [
  {
    id: "water",
    label: "Water Run",
    subtitle: "Bridge to 55:00",
    objective:
      "Build from a completed 60:00 Fire run toward a steadier 55:00 by improving aerobic control, threshold work, and safer speed economy.",
    goalTime: "55:00",
    targetPace: "5:30/km",
    color: "#4cc9f0",
    bg: "rgba(76, 201, 240, 0.12)",
    paceTargets: {
      Easy: "6:35-7:05/km",
      Tempo: "5:40-5:50/km",
      Intervals: "5:10-5:25/km",
      "Long Run": "6:35-7:10/km",
      Shakeout: "Very easy + 4 strides",
    },
    paceBands: [
      {
        label: "Easy",
        pace: "6:35-7:05/km",
        cue: "Relaxed aerobic running that never drifts into steady-state.",
      },
      {
        label: "Long run",
        pace: "6:35-7:10/km",
        cue: "Keep it comfortable and let time on feet do the work.",
      },
      {
        label: "Tempo",
        pace: "5:40-5:50/km",
        cue: "Strong and controlled, not a time trial.",
      },
      {
        label: "Intervals",
        pace: "5:10-5:25/km",
        cue: "Sharpen the legs without losing repeatable form.",
      },
      {
        label: "Strides",
        pace: "Fast but relaxed",
        cue: "Quick feet, tall posture, never an all-out sprint.",
      },
    ],
    notes: [
      "This block follows the completed Fire run and bridges from 60:00 toward 55:00.",
      "Weeks 4 and 8 cut the load on purpose. Keep the deloads easy enough to absorb the work.",
    ],
    weeks: [
      {
        week: 1,
        focus: "Controlled 800s",
        recovery: "Session 4: Optional 3km very easy or 30 min cycling.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "5 x 800m",
            target: "5:20-5:25/km",
            note: "Recover with 2:00 easy walk or jog between reps.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "5km easy",
            target: "6:35-7:05/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "7km easy",
            target: "6:35-7:10/km",
          },
        ],
      },
      {
        week: 2,
        focus: "First tempo block",
        recovery: "Session 4: Optional 3-4km very easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Tempo",
            workout: "2km warm-up / 4km tempo / 1km cool-down",
            target: "5:45-5:50/km",
            note: "Let the tempo settle instead of forcing the opening kilometer.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "5-6km easy",
            target: "6:35-7:05/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "8km easy",
            target: "6:35-7:10/km",
          },
        ],
      },
      {
        week: 3,
        focus: "Extend the long run",
        recovery: "Session 4: Optional 4km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "4 x 1km",
            target: "5:15-5:20/km",
            note: "Take 2:00 recovery between reps.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "6km easy",
            target: "6:35-7:05/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "9km easy",
            target: "6:35-7:10/km",
            note: "Let the final 1km lift slightly only if it still feels controlled.",
          },
        ],
      },
      {
        week: 4,
        focus: "Deload and reset",
        recovery: "Session 4: Rest or mobility only.",
        sessions: [
          {
            slot: "Run 1",
            type: "Easy",
            workout: "4km easy + 4 strides",
            target: "6:35-7:05/km",
            note: "Keep the strides quick and relaxed.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "5km easy",
            target: "6:35-7:05/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "7km relaxed",
            target: "6:35-7:10/km",
          },
        ],
      },
      {
        week: 5,
        focus: "Return to 800m work",
        recovery: "Session 4: Optional 4km very easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "6 x 800m",
            target: "5:15/km",
            note: "Use 90 sec jog recovery.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "6km easy",
            target: "6:35-7:05/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "10km easy",
            target: "6:35-7:10/km",
          },
        ],
      },
      {
        week: 6,
        focus: "Longer threshold",
        recovery: "Session 4: Optional 4-5km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Tempo",
            workout: "2km warm-up / 5km tempo / 1km cool-down",
            target: "5:40-5:45/km",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "6-7km easy",
            target: "6:35-7:05/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "10-11km easy",
            target: "6:35-7:10/km",
          },
        ],
      },
      {
        week: 7,
        focus: "Peak Water specificity",
        recovery: "Session 4: Optional 5km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "5 x 1km",
            target: "5:10-5:15/km",
            note: "Take 2:00 recovery and keep the final rep smooth.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "7km easy",
            target: "6:35-7:05/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "11km easy",
            target: "6:35-7:10/km",
            note: "If you feel good, let the final 2km become moderate instead of hard.",
          },
        ],
      },
      {
        week: 8,
        focus: "Taper and 55 attempt",
        recovery:
          "Session 4: 10km attempt at 55:00. Pace 5:35/km for km 1-2, 5:30/km for km 3-7, and 5:25/km if strong over km 8-10.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "3 x 800m",
            target: "Goal pace to slightly faster (5:20/km feel)",
            note: "Take full recovery between reps.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "4-5km easy",
            target: "6:35-7:05/km",
          },
          {
            slot: "Run 3",
            type: "Shakeout",
            workout: "3km shakeout + 4 strides",
            target: "Very easy + 4 relaxed strides",
            note: "Finish feeling loose, not tired.",
          },
        ],
      },
    ],
  },
  {
    id: "air",
    label: "Air Run",
    subtitle: "Build to 50:00",
    objective:
      "Raise threshold strength and sustain faster aerobic pressure so 5:00/km becomes realistic over a full 10K.",
    goalTime: "50:00",
    targetPace: "5:00/km",
    color: "#90be6d",
    bg: "rgba(144, 190, 109, 0.12)",
    paceTargets: {
      Easy: "5:55-6:25/km",
      Tempo: "5:08-5:18/km",
      Intervals: "4:40-4:55/km",
      "Long Run": "6:00-6:30/km",
      "Race Pace": "5:00-5:05/km",
      Shakeout: "Very easy + strides",
    },
    paceBands: [
      {
        label: "Easy",
        pace: "5:55-6:25/km",
        cue: "Keep the breathing calm and leave the legs fresher than you found them.",
      },
      {
        label: "Long run",
        pace: "6:00-6:30/km",
        cue: "Stay patient early and negative split only when it is prescribed.",
      },
      {
        label: "Tempo",
        pace: "5:08-5:18/km",
        cue: "Controlled threshold pressure that you can hold without tying up.",
      },
      {
        label: "Intervals",
        pace: "4:40-4:55/km",
        cue: "Sharp but repeatable. Do not win the workout in the first rep.",
      },
      {
        label: "Cruise intervals",
        pace: "Around 5:05/km",
        cue: "Practice long rhythm at the edge of goal pace without overreaching.",
      },
    ],
    notes: [
      "This is a bigger jump than Water. Threshold work and recovery both matter more here.",
      "When a long run calls for a negative split, save it for the back half instead of pushing too soon.",
    ],
    weeks: [
      {
        week: 1,
        focus: "Reopen speed",
        recovery: "Session 4: Optional 4km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "5 x 1km",
            target: "4:50-4:55/km",
            note: "Recover with 2:00 jog between reps.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "6km easy",
            target: "5:55-6:25/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "8km easy",
            target: "6:00-6:30/km",
          },
        ],
      },
      {
        week: 2,
        focus: "Threshold step",
        recovery: "Session 4: Optional 4km recovery.",
        sessions: [
          {
            slot: "Run 1",
            type: "Tempo",
            workout: "2km warm-up / 4km tempo / 1-2km cool-down",
            target: "5:15/km",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "6-7km easy",
            target: "5:55-6:25/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "9km easy",
            target: "6:00-6:30/km",
            note: "Keep the first half patient and finish with a gentle negative split.",
          },
        ],
      },
      {
        week: 3,
        focus: "More 1k volume",
        recovery: "Session 4: Optional 5km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "6 x 1km",
            target: "4:50/km",
            note: "Use 90-120 sec recovery and keep the rep quality even.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "7km easy",
            target: "5:55-6:25/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "10km easy",
            target: "6:00-6:30/km",
          },
        ],
      },
      {
        week: 4,
        focus: "Deload and absorb",
        recovery: "Session 4: Rest or cross-train.",
        sessions: [
          {
            slot: "Run 1",
            type: "Easy",
            workout: "5km easy + 4 strides",
            target: "5:55-6:25/km",
            note: "Keep the strides smooth and under control.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "5-6km easy",
            target: "5:55-6:25/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "8km long easy",
            target: "6:00-6:30/km",
          },
        ],
      },
      {
        week: 5,
        focus: "Sharper 800s",
        recovery: "Session 4: Optional 5km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "8 x 800m",
            target: "4:40-4:45/km",
            note: "Use 90 sec recovery and stay patient through the first half.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "7km easy",
            target: "5:55-6:25/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "11km easy",
            target: "6:00-6:30/km",
          },
        ],
      },
      {
        week: 6,
        focus: "Hold 6km tempo",
        recovery: "Session 4: Optional 5-6km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Tempo",
            workout: "2km warm-up / 6km tempo / 1km cool-down",
            target: "5:10/km",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "8km easy",
            target: "5:55-6:25/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "12km easy",
            target: "6:00-6:30/km",
          },
        ],
      },
      {
        week: 7,
        focus: "Race-pace durability",
        recovery: "Session 4: Optional 6km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Race Pace",
            workout: "3 x 2km",
            target: "5:00-5:05/km",
            note: "Recover with 2:30 jog and practice even goal rhythm.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "8km easy",
            target: "5:55-6:25/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "12-13km easy",
            target: "6:00-6:30/km",
            note: "Let the final 3km become steady only if you still feel controlled.",
          },
        ],
      },
      {
        week: 8,
        focus: "Taper and 50 attempt",
        recovery:
          "Session 4: 10km attempt at 50:00. Pace 5:05/km for km 1-2, 5:00/km for km 3-7, and 4:55/km if strong over km 8-10.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "4 x 800m",
            target: "4:45/km",
            note: "Take full recovery to keep the reps clean.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "5km easy",
            target: "5:55-6:25/km",
          },
          {
            slot: "Run 3",
            type: "Shakeout",
            workout: "3km shakeout + strides",
            target: "Very easy + relaxed strides",
            note: "Stop while the legs still feel snappy.",
          },
        ],
      },
    ],
  },
  {
    id: "earth",
    label: "Earth Run",
    subtitle: "Push to 45:00",
    objective:
      "Convert durability into serious 10K speed with threshold work, race-pace repetitions, and enough easy running to absorb the load.",
    goalTime: "45:00",
    targetPace: "4:30/km",
    color: "#f4a261",
    bg: "rgba(244, 162, 97, 0.12)",
    paceTargets: {
      Easy: "5:25-5:55/km",
      Tempo: "4:38-4:45/km",
      Intervals: "4:10-4:25/km",
      "Long Run": "5:30-6:00/km",
      "Over/Under": "500m @ 4:25/km + 500m @ 4:35/km",
      "Race Pace": "4:30/km",
      Shakeout: "Very easy + strides",
    },
    paceBands: [
      {
        label: "Easy",
        pace: "5:25-5:55/km",
        cue: "Steady recovery mileage that protects the harder work.",
      },
      {
        label: "Long run",
        pace: "5:30-6:00/km",
        cue: "Stay economical and let the quality sessions provide the real stress.",
      },
      {
        label: "Tempo",
        pace: "4:38-4:45/km",
        cue: "Hold threshold pressure without turning it into a race.",
      },
      {
        label: "Intervals",
        pace: "4:10-4:25/km",
        cue: "Fast but repeatable speed backed by smooth mechanics.",
      },
      {
        label: "Race pace",
        pace: "4:30/km",
        cue: "Practice the exact rhythm you want to own on race day.",
      },
    ],
    notes: [
      "This is a serious performance jump, so easy days, sleep, and fueling matter as much as the headline workouts.",
      "If the load feels too sharp, repeat the block instead of forcing the final goal on tired legs.",
    ],
    weeks: [
      {
        week: 1,
        focus: "Fast 800s",
        recovery: "Session 4: Optional 5km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "6 x 800m",
            target: "4:20-4:25/km",
            note: "Use 90 sec jog recovery and keep the first rep under control.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "7km easy",
            target: "5:25-5:55/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "10km easy",
            target: "5:30-6:00/km",
          },
        ],
      },
      {
        week: 2,
        focus: "True threshold",
        recovery: "Session 4: Optional 5km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Tempo",
            workout: "2km warm-up / 5km tempo / 1-2km cool-down",
            target: "4:42-4:45/km",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "7-8km easy",
            target: "5:25-5:55/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "11km easy",
            target: "5:30-6:00/km",
          },
        ],
      },
      {
        week: 3,
        focus: "Over-under control",
        recovery: "Session 4: Optional 6km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Over/Under",
            workout: "5 x 1km over/under",
            target: "500m @ 4:25/km + 500m @ 4:35/km",
            note: "Recover with 2:00 jog and keep the pace changes smooth.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "8km easy",
            target: "5:25-5:55/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "12km easy",
            target: "5:30-6:00/km",
            note: "If you are smooth late, let the final 2km become steady.",
          },
        ],
      },
      {
        week: 4,
        focus: "Deload and reset",
        recovery: "Session 4: Rest.",
        sessions: [
          {
            slot: "Run 1",
            type: "Easy",
            workout: "5km easy + 4 strides",
            target: "5:25-5:55/km",
            note: "Keep the strides crisp but relaxed.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "6km easy",
            target: "5:25-5:55/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "8-9km relaxed",
            target: "5:30-6:00/km",
          },
        ],
      },
      {
        week: 5,
        focus: "600m speed",
        recovery: "Session 4: Optional 6km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "10 x 600m",
            target: "4:15-4:20/km",
            note: "Use 75 sec recovery and keep the pace consistent.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "8km easy",
            target: "5:25-5:55/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "12-13km easy",
            target: "5:30-6:00/km",
          },
        ],
      },
      {
        week: 6,
        focus: "Longer tempo",
        recovery: "Session 4: Optional 6-7km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Tempo",
            workout: "2km warm-up / 6km tempo / 1km cool-down",
            target: "4:40/km",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "8-9km easy",
            target: "5:25-5:55/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "13-14km easy",
            target: "5:30-6:00/km",
          },
        ],
      },
      {
        week: 7,
        focus: "Race-pace control",
        recovery: "Session 4: Optional 7km easy.",
        sessions: [
          {
            slot: "Run 1",
            type: "Race Pace",
            workout: "3 x 2km",
            target: "4:30/km",
            note: "Recover with 2:30 jog and practice exact goal rhythm.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "9km easy",
            target: "5:25-5:55/km",
          },
          {
            slot: "Run 3",
            type: "Long Run",
            workout: "14km easy",
            target: "5:30-6:00/km",
            note: "Let the last 3km turn steady only if the form stays calm.",
          },
        ],
      },
      {
        week: 8,
        focus: "Taper and 45 attempt",
        recovery:
          "Session 4: 10km attempt at 45:00. Pace 4:33-4:35/km for km 1-2, 4:30/km for km 3-7, then squeeze under 4:30/km if it is there late.",
        sessions: [
          {
            slot: "Run 1",
            type: "Intervals",
            workout: "5 x 400m",
            target: "4:05-4:10/km",
            note: "Use full easy recovery so the session stays light and sharp.",
          },
          {
            slot: "Run 2",
            type: "Easy",
            workout: "5-6km easy",
            target: "5:25-5:55/km",
          },
          {
            slot: "Run 3",
            type: "Shakeout",
            workout: "3km shakeout + strides",
            target: "Very easy + relaxed strides",
            note: "Stay loose and stop before it feels like work.",
          },
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
    text: "Keep roughly 80% of the week easy and only 20% moderate or hard.",
  },
  {
    label: "Three-run structure",
    text: "Anchor each week with one quality session, one easy run, and one long run. Use session 4 only as recovery or cross-training unless it is race week.",
  },
  {
    label: "Warm up first",
    text: "Before every faster workout, do 5-10 minutes easy plus leg swings, A-skips, high knees, and 3-4 short strides.",
  },
  {
    label: "Deload on weeks 4 and 8",
    text: "Reduce the load on purpose so the next block lands stronger instead of flatter.",
  },
  {
    label: "Effort before pace",
    text: "If fatigue is high, trust effort first and let the watch read a little slower.",
  },
];

export const SUPPORT_WORK = [
  "Strength twice weekly: calf raises, split squats or lunges, glute bridges, hamstring work, planks, and single-leg balance.",
  "Fuel the work: eat carbs before quality sessions, hydrate well before long runs, and consider carbs during runs longer than 75 minutes.",
  "Recovery is a training input: aim for 7.5-9 hours of sleep and cut weekly volume by 20-30% if the legs stay dead for more than 3 days.",
];
