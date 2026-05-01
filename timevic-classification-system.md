# Classifying Work for Timevic: A Research-Backed Evaluation of the Task / Project / Goal Trichotomy and a Recommended Classification System for an AI Scheduling Assistant

## Executive Summary

The proposed three-tier classification — **Tasks → Projects → Goals** — is a familiar mental model that broadly tracks the dominant hierarchical view in goal-setting theory, project management literature, and many productivity systems. It is roughly *mutually exclusive* (each tier sits at a different level of granularity and decomposability), but it is **not collectively exhaustive**. The literature and the leading scheduling products consistently expose at least four classes of work that fall outside this trichotomy: (1) habits / recurring behaviors, (2) areas of ongoing responsibility, (3) fixed-time events, and (4) open-ended ambitions or "someday" intentions that have no scheduling shape yet.

More importantly, for a *scheduling assistant* — as opposed to a task database or productivity OS — the relevant axes are not "task / project / goal" at all. They are the operational properties that determine whether and how something can be placed on a calendar: **time-anchored vs. flexible, atomic vs. multi-session, recurring vs. one-off, deadline-bound vs. open-ended, and bounded vs. ongoing**. These axes, not the t/p/g hierarchy, are what every actual scheduling product (Motion, Reclaim.ai, Akiflow, Sunsama, Trevor AI, Google Calendar) ultimately models.

The recommendation, consistent with Timevic's narrow, calm, low-friction philosophy, is to reject the task/project/goal trichotomy as the *primary* classification and instead adopt a **four-shape scheduling model**: **Event, Task, Block (chunked task), and Habit** — with goals handled through a separate **Goals Layer**: a lightweight meta-construct in which the user articulates an ambition, sets a check-in cadence, and Timevic schedules a recurring check-in Block that repeatedly translates the goal into concrete weekly Tasks, Blocks, or Habits.

---

## Part 1 — What the Academic and Practitioner Literature Says

### 1.1 Goal-Setting Theory (Locke & Latham) and the hierarchy of goals

Locke and Latham's goal-setting theory, summarized in *A Theory of Goal Setting and Task Performance* (1990) and updated through 2013, establishes that **specific, challenging goals produce higher performance than vague "do your best" goals** — Locke's classic finding is that participants with difficult goals performed up to ~250% better than those with the easiest goals. The five principles are clarity, challenge, commitment, feedback, and task complexity.

Crucially, the theory itself acknowledges a *hierarchy of goals*. Höchli, Brügger & Messner (2018, *Frontiers in Psychology*, "How Focusing on Superordinate Goals Motivates Broad, Long-Term Goal Pursuit") explicitly distinguish **superordinate goals** (abstract, long-horizon, e.g., "become healthier") from **subordinate goals** (concrete, immediate, e.g., "do 40 push-ups Saturday"). Steel & König's (2006) *temporal motivation theory* extends this with the observation that dividing a project into immediate subgoals exploits the principle of diminishing returns and counters temporal discounting. The literature is therefore unambiguous: goals naturally form a tree, with abstraction decreasing as one moves toward action. But — and this matters for Timevic — the literature is also explicit that **the abstract end of that tree is poorly suited to direct scheduling**; only the concrete subordinate goals act as effective behavioral regulators.

### 1.2 Hierarchical Task Analysis (HTA) — human factors

HTA, formalized by John Annett and Keith Duncan in the 1960s and codified in Annett's "Hierarchical Task Analysis" (in *Handbook of Human Factors and Ergonomics Methods*, 2003), is the most widely used method in human factors and ergonomics for analyzing work. The technique starts with a **top-level goal**, decomposes it into **subgoals**, and then into **operations** with associated **plans** that describe ordering and conditions. The structure is explicitly tree-like and is the cognitive-engineering ancestor of the project-management WBS (work breakdown structure). HTA therefore confirms that decomposition is a real and well-studied property of work, but its insight for a scheduling assistant is operational: **only leaf-level operations are executable**; everything above them is structure for the analyst, not for the doer.

### 1.3 Getting Things Done (GTD) — David Allen's Horizons of Focus

GTD provides the most fully-articulated practitioner taxonomy of human commitments. Allen's "Horizons of Focus" model (*Getting Things Done*, 2001, revised 2015) lays out six levels:

- **Ground** — Calendar / Next Actions (the runway)
- **Horizon 1** — Projects (anything requiring more than one next action; "most people have 30–100")
- **Horizon 2** — Areas of Focus and Accountability (ongoing roles to maintain; not finishable)
- **Horizon 3** — Goals and Objectives (12–24 months, with specific outcomes)
- **Horizon 4** — Vision (3–5 year outlook)
- **Horizon 5** — Purpose and Principles

Several points are decisive for evaluating the t/p/g trichotomy:

1. GTD distinguishes **Projects** (have an end-state; "buy a car," "ship the workshop") from **Areas of Focus** (no end-state; "Health," "Marketing," "Parenting"). This is the single most important conceptual distinction the proposed trichotomy misses.
2. GTD treats **Goals** as a separate horizon *above* projects — they are not the same thing as long-horizon ambitions; in GTD, goals have specific outcomes and a 12–24-month timeframe.
3. The **Calendar** in GTD is reserved for *time-specific* and *day-specific* commitments. Allen explicitly warns against putting flexible to-dos on the calendar — they live on context lists.

### 1.4 OKRs — Objectives and Key Results

OKRs (Andy Grove at Intel; popularized by John Doerr's *Measure What Matters*, 2018) are a specifically *outcome-oriented* framework that deliberately separates **Objectives** (qualitative, aspirational, "where we want to go") from **Key Results** (quantitative, measurable outcomes). Importantly, the OKR community explicitly warns against the failure mode of "task-focused key results" — i.e., using the framework as a checklist of activities. Doerr writes that key results "must be measurable… without any arguments: did I do that or did I not do it?" OKRs sit *above* the task/project layer and connect strategy to work; they do not themselves describe schedulable units. Most modern organizations have abandoned individual-level OKRs precisely because they tend to look like a task list and conflate OKRs with performance reviews.

The implication for Timevic: ambitions and outcomes are real and important, but they are *upstream* of scheduling. A scheduling assistant should not pretend to be an OKR system; it should accept that goals exist and translate them into scheduled work shapes.

### 1.5 The PARA Method (Tiago Forte)

Tiago Forte's PARA (*The PARA Method*, 2023; also *Building a Second Brain*, 2022) classifies all digital information — and by extension all work — into four buckets:

- **Projects** — short-term efforts with a goal *and* a deadline
- **Areas** — "spheres of activity with a standard to be maintained over time," explicitly ongoing
- **Resources** — topics of interest, reference material
- **Archives** — inactive items from any of the above

PARA's explicit definition of an Area as having "no deadline" and "no specific endpoint" is the cleanest articulation in the practitioner literature of why a two-tier or three-tier model that omits *areas of responsibility* fails to be MECE. Forte explicitly contrasts Projects ("you can finish") with Areas ("you maintain a standard"). His weekly review covers Projects; his monthly/quarterly review covers Areas — different cadences, different cognitive treatments.

### 1.6 Time-Management Frameworks: Eisenhower / Covey, Deep Work

Stephen Covey's *7 Habits of Highly Effective People* (1989) repackaged Eisenhower's urgency/importance distinction into the four-quadrant Time Management Matrix. The relevant insight for a scheduling assistant is that **Q2 — Important but Not Urgent — is the only quadrant that requires *scheduling* to happen at all** ("schedule"), as opposed to Q1 (do), Q3 (delegate), and Q4 (delete). Covey's specific advice — "the key is not to prioritize what's on your schedule, but to schedule your priorities" — is, almost word for word, the philosophical mission of an AI scheduling assistant.

Cal Newport's *Deep Work* (2016) and *Time-Block Planner* (2020) extend this with the **deep vs. shallow distinction**: cognitively demanding tasks ("writing, researching, coding, analysis") require protected, contiguous blocks (Newport recommends ≥30–90 minutes), while shallow tasks (email, admin) can be batched. The implication: **cognitive depth is a property of work that meaningfully affects how it should be placed on a calendar**, even though it cuts orthogonally across "task vs. project."

### 1.7 Implementation Intentions (Gollwitzer)

Peter Gollwitzer's "Implementation Intentions: Strong Effects of Simple Plans" (*American Psychologist*, 1999) and the Gollwitzer & Sheeran (2006) meta-analysis ("Implementation Intentions and Goal Achievement: A Meta-Analysis of Effects and Processes," *Advances in Experimental Social Psychology*) are the empirical bedrock for why scheduling specific time slots increases follow-through. Their central finding: a goal intention furnished with an *if–then* implementation intention ("if it is Tuesday at 7 a.m., then I will pick up my gym bag") is achieved roughly **2–3× more often** than an unfurnished goal intention. Gollwitzer & Brandstätter's (1997) original study found difficult goals were completed three times more often when participants had formed implementation intentions.

A subtle point matters for a scheduling assistant: the meta-analysis (Bieleke, Keller & Gollwitzer, 2021, *European Review of Social Psychology*) notes that pure **schedule-format plans** (specifying only *when*) produce *smaller* effects than fully **contingent if-then plans** (specifying *when, where, and how*). A scheduling assistant that only books a calendar slot is implementing the weaker form. The stronger form attaches the action to environmental cues (location, prior event, mental state). This suggests Timevic could differentiate itself by, for example, optionally letting users tag *cues* on a recurring habit ("after I make morning coffee → 5-minute meditation"), but at minimum the placement-on-calendar action is a real implementation-intentions intervention.

### 1.8 Cognitive Load Theory and Task Complexity

Sweller's cognitive load theory (Sweller, van Merriënboer & Paas, "Cognitive Architecture and Instructional Design: 20 Years Later," *Educational Psychology Review*, 2019) frames task complexity in terms of **element interactivity** — how many elements a person must hold in working memory simultaneously. Paas, Renkl & Sweller (2003) and the Paas & van Merriënboer (2020) review establish the practical scheduling implication: high-element-interactivity tasks impose intrinsic cognitive load that working memory cannot sustain indefinitely, motivating **shorter, focused blocks with breaks** for complex work, and **batching and longer runs** for low-load work. This is the academic underpinning of Newport's deep/shallow distinction.

For Timevic, the operational lesson is that *cognitive depth* should be at minimum an inferable property: a task labeled "draft strategy memo" should default to a longer, protected block than "send confirmation email."

### 1.9 Atomic vs. Decomposable Work

PMI's PMBOK Guide and standard project management literature (e.g., Kerzner, *Project Management*, 12th ed., 2017) treat the **work breakdown structure** as the canonical decomposition tool: a project is decomposed into deliverables, then work packages, then activities (the "atomic" leaf nodes that get estimated and scheduled). The atomic activity is typically defined as the smallest unit that has a single owner, a single duration estimate, and a single completion criterion. This gives a precise definition of what counts as a "task" in scheduling: **the smallest unit that fits in a single work session by a single person with a single completion check**. Anything larger is decomposable; anything smaller is too granular to schedule.

### 1.10 Habit Formation as a Distinct Category

BJ Fogg's *Tiny Habits* (2020) and his Behavior Model (B = MAP: Behavior happens when Motivation, Ability, and a Prompt converge) and James Clear's *Atomic Habits* (2018) both treat habits as a categorically different kind of behavior from one-off tasks. Clear explicitly defines "habit stacking" as a *special case of an implementation intention* in which the cue is an existing behavior rather than a time. The cycle Clear describes (cue → craving → response → reward, drawing on Charles Duhigg's *The Power of Habit*) is fundamentally repetition-based and cue-driven, while a "task" is a one-time intentional action. This is the strongest argument that **recurring behaviors deserve their own slot in any classification scheme**: they obey a different psychology, require a different scheduling pattern (cadence with flexibility, not a one-off block), and their success is measured by streak/consistency rather than completion.

### 1.11 Time Horizons in Planning

The planning literature (operations research, strategic management, and forecasting — see Hyndman & Athanasopoulos, *Forecasting: Principles and Practice*, 3rd ed., 2021) uses a fairly stable convention:

- **Short-term** — minutes to ~12 months (operational; the calendar layer)
- **Medium-term** — 12–36 months (tactical; goals and objectives)
- **Long-term** — 3+ years (strategic; vision and direction)

GTD's horizons closely parallel this: Projects (short), Goals (12–24 months), Vision (3–5 years), Purpose (lifetime). This is empirically well-supported: people *plan* differently and *commit* differently across these horizons, and committing the medium-/long-term layer to a daily calendar is generally counterproductive (it produces "calendar bloat" without action).

### 1.12 Is the Task / Project / Goal Trichotomy MECE? — The Direct Verdict

Putting this all together:

- **Mutually exclusive?** *Approximately yes*, when each is defined by decomposability/scale: a Task is atomic (one session), a Project is decomposable (multi-session, has an endpoint), a Goal is an outcome statement (the *why*, often without specified actions). The boundaries are fuzzy — practitioners argue endlessly about when a task becomes a project (Allen's rule of thumb: more than one next action = project) — but the categories are not severely overlapping if defined carefully.
- **Collectively exhaustive?** *No.* The literature and lived practice converge on at least four omissions:
  1. **Habits / recurring behaviors** (run 3×/week, daily journal). These are not a project (no endpoint), not a goal (they're already an action), and not a one-off task. Fogg, Clear, and Reclaim.ai all treat them as a distinct primitive.
  2. **Areas of ongoing responsibility** (PARA, GTD, Things 3): Health, Marketing, Parenting, "my consulting practice." They have no end-state and no deadline; they generate projects and tasks but are themselves neither.
  3. **Fixed-time events** (a 2 p.m. client call, a flight, a dentist appointment). These are atomic but already-scheduled; they are not really tasks at all in the productivity-app sense — they are calendar events. Google Calendar, Motion, Reclaim, and Akiflow all surface this as the most important first-order distinction.
  4. **Open-ended "Someday" ambitions** without commitment ("learn Mandarin," "write a novel"). These belong in GTD's Someday/Maybe or Things 3's Someday list — visible but explicitly not scheduled.

Additionally, several **cross-cutting properties** ride orthogonally to t/p/g and are individually more important to scheduling than the trichotomy itself: deadline vs. open-ended; cognitive depth (deep vs. shallow); urgency × importance (Eisenhower); and must-be-scheduled vs. flexible.

---

## Part 2 — How Existing Scheduling and Task Products Actually Classify Work

A useful empirical question is: *do successful scheduling products use a task/project/goal trichotomy?* The short answer is **none of them do as the primary axis**. They all use some variant of the operational shape model.

### 2.1 Motion (usemotion.com)

Motion's primary objects (per its help center) are:

- **Tasks** — the schedulable unit. Auto-scheduled by AI based on priority, deadline (hard or soft), duration, start date, and recurrence. Tasks must be "specific, actionable, and time-bound"; vague items like "research AI tools" are explicitly flagged as not Motion-shaped.
- **Events** — fixed-time commitments (meetings, flights). Motion will *not* move an event; it schedules tasks *around* events.
- **Recurring tasks** — implemented via a Master Task and Child Task instances. Motion explicitly notes: "Recurring tasks are placed ahead of one-off tasks to maintain cadence."
- **Projects** — containers for grouping tasks (with Workflow Projects, Gantt views, etc.) — but importantly, **a project does not get scheduled directly; only its constituent tasks do.**
- **Chunked tasks** — a task with chunking rules can be split into smaller blocks (e.g., a 4-hour task scheduled as four 1-hour chunks).

Motion has **no concept of "Goals"** as a separate first-class object. Long-horizon ambitions are simply absent from the data model.

### 2.2 Reclaim.ai

Reclaim is the most explicit practitioner of the multi-shape model. Its help docs ("Habits vs. Tasks vs. Focus Time: When to use each") define four distinct primitives:

- **Habits** — recurring routines with a flexible scheduling window ("lunch every weekday between 11:30 and 1:30"). Rescheduled automatically when conflicts occur; consistency-driven.
- **Tasks** — one-off work to complete by a deadline. Auto-chunked and slotted, with min/max duration ranges.
- **Smart 1:1s / Smart Meetings** — recurring multi-attendee meetings; finds best-fit time across calendars.
- **Focus Time** — placeholder blocks for deep work *without* a specific task attached yet (a key insight: sometimes you just need protected time).
- **Scheduling Links, Buffer Time, Travel Time** — secondary primitives.

Reclaim is unambiguous that these "serve different purposes" and are not interchangeable. Its docs recommend Habits for personal/professional routines, Tasks for specific deliverables before a deadline, and Focus Time for unstructured deep work.

### 2.3 Sunsama

Sunsama deliberately rejects building its own task hierarchy. Its core philosophy — explicit on its blog ("The Official Daily Planning Guide") — is that **"your day is not a project"** and that Sunsama is for *daily planning only*; project management lives in Asana/Trello/Jira/Notion/etc., from which Sunsama pulls tasks. The day is structured as: pull in meetings → pull in tasks from external tools → assign planned time → optionally time-block onto the calendar → end-of-day shutdown ritual. There is no concept of "goal" or "project" inside Sunsama itself; everything is just a *task scheduled today* (with channels and time estimates).

### 2.4 Akiflow

Akiflow combines a **Universal Inbox** (aggregating tasks from Gmail, Slack, Notion, Asana, ClickUp, Jira, Trello, Todoist, Linear) with a **time-blocking calendar**. Its primary objects:

- **Tasks** — with title, duration, priority, project, label
- **Events** — calendar-native fixed-time
- **Time Slots** — multi-task category windows ("admin time 2–4 p.m.")
- **Projects** — for grouping/coloring
- **Rituals / recurring tasks**

Akiflow's positioning compared to Motion (per its own docs and user reviews) is "exact-hour control" — manual placement rather than auto-rescheduling. There is no goal layer; projects are organizational tags, not scheduling primitives.

### 2.5 Todoist

Todoist's hierarchy is **Project (with up to 3 indent levels of sub-projects) → Section → Task → Sub-task**, plus **Labels** (cross-cutting context like @phone, @low-energy) and **Filters** (saved queries). Importantly, Todoist's official GTD guide acknowledges users typically map *Projects* (Todoist) to either GTD Projects *or* GTD Areas of Focus, and use Labels for contexts. There is no explicit "goal" object; Todoist's approach is that goals get implemented as projects with a deadline. Recurring tasks are first-class via natural-language dates ("every Monday").

### 2.6 Things 3 (Cultured Code)

Things 3 has perhaps the cleanest object model in the genre, and it explicitly mirrors GTD's ground/projects/areas distinction:

- **To-Dos** — atomic actions
- **Projects** — finishable groupings of to-dos (with optional Headings to sub-group within)
- **Areas** — ongoing spheres ("Health," "Career," "Family"); not finishable, used to group projects and standalone to-dos
- **Time-based views** orthogonal to the structure: **Today, This Evening, Upcoming, Anytime, Someday**
- **Tags** — cross-cutting, contextual, multi-applied

The Anytime/Someday distinction is itself meaningful: Anytime contains active tasks ready to be done; Someday explicitly contains things "you might decide to discard." Things 3 thus implements four distinct kinds of work-status: scheduled (Today/Upcoming), active-but-untimed (Anytime), parked (Someday), and structural (Areas).

### 2.7 TickTick, Asana, Notion, Linear

- **TickTick** mirrors Todoist with added habit tracking (a separate Habits module — confirming again that habits don't fit the task/project hierarchy cleanly).
- **Asana** uses Goals → Projects → Tasks → Sub-tasks, plus Portfolios. Goals are explicit but are deliberately separated from the execution layer (the Goals module is essentially OKR-shaped and reports up rather than schedules down).
- **Notion** lets users build any hierarchy in a relational database; community templates frequently use Life Directions → Goals → Projects → Tasks but with explicit acknowledgment that this is "fluid" and "not a strict rule."
- **Linear** is engineering-specific: Issue → Project → Initiative, with Milestones; it does not really attempt life-management.

### 2.8 Google Calendar / Outlook

The events vs. tasks distinction is the foundational primitive of every modern calendar. **Events block time, have a duration, location, and attendees**; **Tasks are pinned to a date but do not block time, have minimal metadata, and persist (rolling over) until checked off.** This is a design pattern that 2 billion users now have intuition for and that any scheduling assistant should respect rather than fight.

### 2.9 AI-First Scheduling Tools

- **Trevor AI** uses **Tasks** that get drag-and-drop scheduled into the calendar, with **Smart Scheduling Queue** for AI-suggested time slots. Recurring tasks are explicitly supported. There is no goal or project hierarchy; just tasks + calendar.
- **BeforeSunset** adds an interesting wrinkle — its "Todo Assistant" takes a high-level goal in plain language and *generates* a structured task list with subtasks and time estimates. This is exactly the **goal-to-schedulable-work translation** Timevic should perform, but BeforeSunset still ultimately stores everything as tasks.
- **SkedPal**, **Flowsavvy**, **Clockwise**, **Amie** — variations on the same theme: Tasks (auto-scheduled) + Events (fixed) + sometimes Habits.

### 2.10 The Empirical Pattern

The pattern across the entire scheduling product space is striking: **every successful scheduling product converges on the same 3–4 primary primitives**: Events (fixed-time), Tasks (flexible-time, atomic), Recurring/Habits, and (sometimes) Focus Time / Time Slots. The "project" concept exists primarily as a *grouping container*, not a scheduling primitive. The "goal" concept is *almost universally absent* from the scheduling layer; where it exists (Asana Goals, OKR tools), it explicitly does not get scheduled.

This is the strongest empirical evidence that a *scheduling* assistant should not adopt task/project/goal as its primary classification.

---

## Part 3 — Synthesis and Recommendation for Timevic

### 3.1 Is the proposed task/project/goal trichotomy MECE?

**Mostly mutually exclusive, but not collectively exhaustive, and — critically — not the right axis for a scheduling assistant.**

The trichotomy fails to cover, in order of operational importance for scheduling:

1. **Fixed-time events.** A 2 p.m. doctor's appointment is atomic, but it is not a task in any useful sense — it's already scheduled. Conflating events with tasks is the single most common failure mode in productivity apps. *Every* serious scheduling product (Google Calendar, Motion, Reclaim, Akiflow) treats events as a separate first-class primitive.

2. **Habits and recurring behaviors.** "Run three times a week," "weekly review every Friday," "daily 5-minute journal." These obey different psychology (Fogg, Clear), require different scheduling logic (cadence with flexibility, streak-tracking), and break the task/project/goal trichotomy entirely. Reclaim.ai's most explicit design lesson is that *habits cannot be modeled as either tasks or projects*.

3. **Areas of ongoing responsibility.** Health, my consulting practice, parenting. They have no endpoint, no deadline, and generate ad-hoc work but are not themselves work. PARA and GTD both make this distinction central.

4. **Open-ended ambitions / Someday items.** "Learn Mandarin." "Maybe write a book one day." These have no scheduling shape; forcing them onto a calendar is what makes calendars feel like prisons (Newport's caveat).

5. **Cross-cutting properties** that are individually more decision-relevant than t/p/g: hard deadline vs. soft deadline vs. open-ended; cognitive depth (deep vs. shallow); urgency (Eisenhower Q1–Q4); fixed-context vs. flexible-context.

### 3.2 What classification axes are most relevant for a scheduling assistant?

Distilling from the literature and existing products, the axes that *actually drive scheduling decisions* are:

| Axis | What it determines | Source |
|---|---|---|
| **Time-anchored vs. flexible** | Whether Timevic chooses the time, or it's already given | Google Calendar, Motion (Events vs. Tasks) |
| **Atomic vs. multi-session (decomposable)** | Whether to book one block or several | PMBOK, HTA, Motion's chunking |
| **Recurring vs. one-off** | Whether to manage cadence or a single placement | Reclaim Habits, Fogg, Clear |
| **Deadline-bound vs. open-ended** | Urgency of placement and risk of slippage | Locke & Latham, Motion auto-scheduling |
| **Cognitive depth (deep vs. shallow)** | Block length and protection (no fragmentation) | Newport, Sweller |
| **Bounded vs. ongoing (project vs. area)** | Whether progress = "done" or "maintained" | GTD, PARA |

A scheduling assistant should classify intentions along *these* axes, not along the abstract task/project/goal hierarchy. The t/p/g hierarchy is *upstream* of these axes — it tells you *why* you're doing something, not *how it should land on a calendar*.

### 3.3 Recommended Classification System for Timevic

Given Timevic's stated philosophy — **narrow scope, calm/minimal UX, natural-language input → calendar block, low friction, restrained intelligence, MVP for one user, Google Calendar, single conversational channel** — the right answer is to keep the user-facing model tiny while encoding the operationally relevant axes implicitly.

**Recommendation: A four-shape scheduling model.** Internally, every captured intention is resolved into exactly one of four "shapes." Externally, the user never has to learn this taxonomy explicitly — Timevic infers shape from natural language and asks at most one clarifying question when it can't.

#### Shape 1 — **Event** (time-anchored, atomic)
*"Call with Anna at 3 p.m. Tuesday." "Flight Friday morning."*

- **Properties:** fixed start time, fixed duration, optionally a location/link, attendees.
- **Scheduling behavior:** Timevic confirms time and writes a single Google Calendar event. No optimization needed; it already has a time.
- **Clarification triggers:** missing duration ("how long?"), ambiguous time ("3 p.m. today or next Tuesday?").
- **Maps to:** Google Calendar event; Motion event; Reclaim Smart Meeting (if recurring with attendees).

#### Shape 2 — **Task** (flexible-time, atomic, single session)
*"Write follow-up email to Mark." "Review the contract by Friday."*

- **Properties:** estimated duration (default and inferable), optional deadline (hard/soft), optional preferred window (mornings/afternoons), implicit cognitive depth (Timevic can default-infer from verb: "draft / write / design" → deep, "send / book / file" → shallow).
- **Scheduling behavior:** Timevic proposes a single calendar block before the deadline, biased toward deep-work hours if the task is cognitively heavy and toward batched shallow blocks otherwise. Implements implementation-intentions theory: by *placing* the task at a specific time, expected follow-through rises ~2–3× over a pure to-do list (Gollwitzer & Sheeran 2006).
- **Clarification triggers:** missing duration estimate, missing deadline if user implies urgency.
- **Maps to:** Reclaim Task, Motion auto-scheduled task, Google Tasks-as-event-block.

#### Shape 3 — **Block** (flexible-time, multi-session — i.e., "chunked work")
*"Prepare the AI workshop — needs slides, voiceover script, and a practice run, by next Thursday." "Spend ~6 hours on the budget over the next two weeks."*

This is the slot in the model where what Timevic's founder is calling a "Project" actually lives — but **reframed as a scheduling shape, not a task-database object.** The user states an intention with a target total time (or implicitly: "this is bigger than one sitting") and a deadline; Timevic schedules **N chunks of M minutes** spread before the deadline.

- **Properties:** total estimated duration (e.g., 6 hours), deadline, preferred chunk size (defaulted by Timevic — e.g., 60–90 min for deep work per Newport / Sweller), preferred days/times.
- **Scheduling behavior:** Timevic places multiple recurring or distributed blocks before the deadline, leaving the *content* of each session up to the user. Optionally, Timevic accepts a user-provided checklist of sub-actions (slides → script → practice) and labels each block with the next sub-action — but this is opt-in; the scheduling itself only needs the time-shape.
- **Why not call it a "Project"?** Because (a) "Project" implies a database object with status, sub-tasks, dependencies, etc., and Timevic is not a project tool; (b) this framing keeps the model focused on what gets *scheduled*, not what gets *managed*. The user says "I have a thing that takes ~6 hours and is due Thursday," and Timevic protects that time. That is the entire scheduling job.
- **Clarification triggers:** "Roughly how many hours total?" "Should I spread this across the week or batch it?" "Hard deadline or flexible?"
- **Maps to:** Motion's chunked task; Reclaim's Task with min/max range; ad-hoc time-blocking in Akiflow/Sunsama. None of these tools call this a "project," and Timevic shouldn't either.

#### Shape 4 — **Habit** (recurring cadence)
*"Run three times a week." "Weekly review every Friday at 4 p.m." "Read 30 minutes every evening."*

- **Properties:** cadence (X times per period), duration per occurrence, preferred window, optional cue/anchor (per Gollwitzer's contingent format and Clear's habit stacking).
- **Scheduling behavior:** Timevic places recurring blocks indefinitely, defending them against conflicts, and reschedules within-period when conflicts arise (mirroring Reclaim Habits). Treats consistency, not deadline, as the success metric.
- **Clarification triggers:** cadence ("daily? weekdays? 3×/week?"), preferred time window, fixed time vs. flexible.
- **Maps to:** Reclaim Habits, Motion recurring tasks. The literature here is clear: habits *must* be modeled separately because their psychology, success criteria, and rescheduling logic all differ from one-off work (Fogg 2020; Clear 2018).

### 3.4 The Goals Layer: Long-Horizon Ambitions, Made Schedulable Through Check-ins

The four-shape model deliberately keeps long-horizon goals out of the scheduling primitives. But that does not mean Timevic should be silent about them. The right design — one that preserves the narrow scope while still serving users who *do* hold marathon-running, book-writing, or language-learning ambitions — is to treat **Goals** as a *meta-layer* that sits on top of the four shapes and is, itself, mediated by a primitive Timevic already knows how to schedule: a **recurring check-in**.

#### The mechanism

When a user states a goal in natural language ("I want to run a marathon by October," "I want to write a book this year," "I want to get fluent in Mandarin"), Timevic does *not* create a "Goal" object in any rich sense. Instead, it asks **one question**:

> *"How often should I check in with you about this — weekly, every two weeks, or monthly?"*

The user's answer is the only thing that turns into a calendar artifact: a **recurring check-in Block** at the chosen cadence (e.g., a 5–10 minute Sunday-evening event titled *"Check-in: Marathon training"*). The Goal itself is stored only as a lightweight reference attached to that recurring event — title, optional target date, cadence.

Then, every time the check-in fires, Timevic opens with a single question:

> *"What do you want to do this week toward [running a marathon]?"*

The user's answer is translated, in real time, into one of the four shapes — a **Habit** ("run 3×/week, 45 min, mornings"), a **Block** ("90 minutes for a long run Saturday morning"), or a **Task** ("book the marathon entry by Friday"). The check-in produces *scheduled work*; the goal itself never goes on the calendar as a thing-to-do.

#### Why this design works

1. **The Goal is never a schedulable object.** Only the *check-in* is — and a check-in is just a small recurring Block. The four-shape model stays intact; no fifth primitive is added.
2. **The user controls the pressure.** The cadence question — "how often am I allowed to ask?" — keeps the user in charge. A user pursuing a 10-month marathon plan might want weekly check-ins; a user holding a vague "learn Mandarin someday" wish might want monthly. Either is fine; both end at the same place: a recurring Block on the calendar.
3. **It applies implementation-intentions theory at the meta-level.** Gollwitzer's research is about scheduling specific actions to increase follow-through. This mechanism applies the same logic one level up: it schedules the *act of planning* itself. The recurring check-in is an implementation intention for "I will translate my goal into concrete this-week actions" — precisely the cognitive move users fail to make on their own.
4. **It forces re-decomposition on a healthy cadence.** Long-horizon goals notoriously go stale or stay abstract. By repeatedly asking "what this week?", Timevic keeps the goal converted into a concrete subordinate goal (in Locke & Latham's sense) and a fresh implementation intention (in Gollwitzer's sense) — over and over.
5. **It respects users who don't want a goals layer.** The mechanism only activates if the user introduces a goal. There is no goals dashboard, no progress chart, no streak system. Goals remain optional; the four-shape model remains the core.

#### What gets stored

Per Goal, Timevic needs only:

- A short title ("Marathon by October")
- A check-in cadence (weekly, biweekly, monthly, custom)
- The recurring check-in calendar event (lives in Google Calendar)
- Optionally, a target date (used to nudge cadence — e.g., as the date approaches, Timevic might gently ask whether the user wants more frequent check-ins)

No sub-task tree, no progress percentage, no key-results schema. The Goal is essentially a bookmark attached to a recurring event.

#### Example flow

> **User:** I want to run a marathon by October.
>
> **Timevic:** Got it. How often should I check in with you about this — weekly, every two weeks, or monthly?
>
> **User:** Weekly.
>
> **Timevic:** Done. I'll check in every Sunday at 6 p.m. to ask what you want to do that week toward the marathon.
>
> *(One week later, Sunday at 6 p.m.)*
>
> **Timevic:** Quick check-in — what do you want to do this week toward the marathon?
>
> **User:** Three runs of about 45 minutes, and one long run on Saturday — probably 90 minutes.
>
> **Timevic:** I'll set up a 3×/week 45-minute run Habit, plus a 90-minute Block Saturday morning for the long run. Want me to schedule those now?

The output is one Habit and one Block. The Goal itself never becomes a calendar item — only its check-in and its weekly outputs do. The pattern repeats; the user moves toward the goal one scheduled week at a time.

#### Where this sits relative to the four shapes

Goals are best understood as a **conversational meta-layer that generates shapes**, not as a fifth shape. The four-shape model — Event, Task, Block, Habit — remains the complete set of things Timevic schedules. Goals are inputs to the conversation that, through a recurring check-in mechanism, repeatedly produce instances of the four shapes.

This handling resolves the original tension cleanly: the user gets to articulate ambitions, but Timevic remains a scheduling assistant, not a goals tracker.

### 3.5 How Each Shape Affects Timevic's Scheduling Behavior

The four shapes determine Timevic's full operational behavior:

| Behavior | Event | Task | Block | Habit |
|---|---|---|---|---|
| Time chosen by | User | Timevic | Timevic | Timevic, within window |
| Number of calendar entries | 1 | 1 | N (multiple) | Recurring |
| Default chunking | None | None | 60–90 min, configurable | Per-occurrence duration |
| Reschedules on conflict | Asks user | Yes, before deadline | Yes, redistributes chunks | Yes, within period |
| Success criterion | Attended | Completed | Completed | Cadence maintained |
| Default clarifying questions | Time, duration | Duration, deadline | Total time, deadline, chunk pref. | Cadence, window |
| Cognitive depth handling | N/A | Infer from verb | Default to deep blocks | Per-occurrence |

### 3.6 The Capture → Interpret → Clarify → Propose → Confirm Pipeline

Mapped onto Timevic's stated MVP flow:

1. **Capture** — User types/speaks an intention in natural language.
2. **Interpret** — Timevic classifies into Event, Task, Block, Habit, or **Goal** (the meta-layer described in 3.4). The classifier should be opinionated (small LLM-driven heuristics): explicit time word → Event; "by [date]" + short verb → Task; multi-step verb or "spend N hours" or named multi-step deliverable → Block; "every / X times a week / weekly" → Habit; "I want to [long-horizon ambition]" / "someday" / "one day" / explicit goal framing → Goal.
3. **Clarify** — Ask *one* question, only when needed. The shape determines which question. For Goals, the single question is always cadence ("how often should I check in?"). Avoid asking more than one question.
4. **Propose** — Show the proposed calendar block(s) in a single calm preview.
5. **Confirm** — One-tap accept; on accept, write to Google Calendar.

The entire pipeline operates on these four shapes plus the Goal meta-layer.

### 3.7 Why This Recommendation Aligns with Timevic's Philosophy

- **Narrow scope:** Four shapes plus a thin Goals layer that reuses the Block primitive. No PARA-style folders, no GTD-style Areas, no goals database. The shapes and the check-ins both correspond exactly to what Google Calendar can store — there is no parallel object model to maintain beyond a small per-Goal record (title + cadence + linked recurring event).
- **Calm/minimal UX:** The user never has to *learn* the taxonomy; it's inferred. The user-facing surface remains "tell me what you want to do."
- **Restrained intelligence:** The classification problem is small (4 shapes + Goal meta-layer + out-of-scope), well-bounded, and amenable to a small LLM call with no need for memory beyond a single conversation and a tiny per-Goal record.
- **Low friction:** At most one clarifying question per intention, including the cadence question for Goals.
- **Single user / single calendar / single channel:** Nothing in this model requires multi-user collaboration, project-sharing, or a persistent task database. Google Calendar is the entire backing store; Goal records are minimal metadata attached to recurring events.
- **Avoids the productivity-OS trap:** Explicitly refuses to be a project manager, an OKR tool, or a PARA system. Goals are accommodated only insofar as they generate scheduled work via check-ins.

### 3.8 Where the Recommendation Departs from the Original Trichotomy

The original task/project/goal proposal corresponds to this recommendation as follows:

- The original **Task** ≈ recommended **Task** (single-session, atomic).
- The original **Project** ≈ recommended **Block** — but reframed as a *scheduling shape* (chunks of time before a deadline), not a database object with sub-task hierarchies.
- The original **Goal** is *re-included via the Goals Layer* (section 3.4) — not as a fifth scheduling shape, but as a thin meta-construct that the user opts into. A Goal is stored as a title + cadence + recurring check-in Block; at each check-in Timevic translates it into Tasks, Blocks, or Habits for the upcoming period.
- A new fourth shape, **Habit**, is added to address the most important gap in the original trichotomy (recurring behaviors cannot be modeled as tasks or projects).
- A new fourth shape, **Event**, is added (or rather, made explicit) because conflating "fixed-time meeting" with "task to schedule" is the most common product-design failure in this space.

### 3.9 Final Note on Implementation Intentions and Habit Stacking

If Timevic wants a single scientifically-grounded differentiator beyond shape classification, it should consider an opt-in **cue field** on Habits and (optionally) recurring Blocks. Gollwitzer & Sheeran's meta-analysis is unambiguous that fully contingent if-then plans ("after my morning coffee, I will…") outperform pure schedule-format plans ("at 8 a.m., I will…") by a non-trivial margin. A single optional natural-language field — *"After what cue?"* — costs almost nothing in UX complexity and meaningfully increases follow-through. This is the kind of restrained, evidence-based intelligence that fits Timevic's philosophy exactly.

The Goals Layer is the same principle applied recursively: it schedules the *planning act itself* as a recurring contingent intention (every Sunday at 6 p.m. → I will plan this week toward [goal]), so that abstract ambitions repeatedly become concrete this-week implementation intentions.

---

## Conclusion

The Task / Project / Goal trichotomy is intuitive, internally roughly consistent, and partially supported by the academic literature (it parallels Locke & Latham's goal hierarchy, HTA's decomposition tree, and the OKR/project/task layers in standard PM practice). But it is **not collectively exhaustive** — it omits habits, areas of ongoing responsibility, fixed-time events, and open-ended ambitions — and, more importantly, **it is not the right axis for a scheduling assistant**, which needs to know *how something gets onto a calendar*, not *what level of abstraction it sits at conceptually*.

The empirical convergence of every successful scheduling product (Motion, Reclaim, Akiflow, Sunsama, Trevor AI, Google Calendar, Things 3) is on a four-shape model: **fixed-time events, flexible one-off tasks, multi-session blocks, and recurring habits**, with goals/areas explicitly handled outside the scheduling layer.

For Timevic, the recommendation is to adopt this four-shape model — Event, Task, Block, Habit — as an *internal* classification that is inferred from natural language and never imposed on the user. **Goals are accommodated through a separate, lightweight Goals Layer**: when a user articulates an ambition, Timevic asks only how often it may check in, schedules a recurring check-in Block at that cadence, and at each check-in translates the goal into concrete Tasks, Blocks, or Habits for the upcoming period. The Goal itself is never scheduled — only its check-in and its weekly outputs are. This keeps Timevic narrow, calm, and minimal; aligns with the dominant pattern in successful scheduling products; respects the implementation-intentions and habit-formation literature; and produces a product whose entire job is, exactly as stated, to turn intentions into calendar time.
