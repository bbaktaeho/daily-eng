# Daily English Display Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dependency-free GitHub Pages site with one useful English sentence per KST day from a 90-day cycle.

**Architecture:** Store UI, lesson data, and date-selection logic in `index.html`, so GitHub Pages needs no build step. A Node assertion script extracts the data and rotation helper to verify daily behavior outside the visual UI.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-ins, GitHub Pages.

---

### Task 1: Establish the daily-rotation contract

**Files:**
- Create: `tests/daily-english.test.js`
- Create: `index.html`

**Step 1: Write the failing test**

Make the test load `index.html`, evaluate its lesson data and `getLessonIndex`, then assert:

```js
assert.equal(lessons.length, 90);
assert.equal(getLessonIndex('2026-08-30'), 0);
assert.equal(getLessonIndex('2026-11-28'), 0);
assert.equal(getLessonIndex('2026-08-31'), 1);
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/daily-english.test.js`

Expected: FAIL because the page and helper do not exist.

**Step 3: Write minimal implementation**

Add an empty `lessons` array and a `getLessonIndex(kstDate)` helper based on calendar-day difference from `2026-08-30`, modulo 90.

**Step 4: Run test to verify it passes**

Run: `node --test tests/daily-english.test.js`

Expected: rotation assertions pass; the lesson count stays red until Task 2.

**Step 5: Commit**

```bash
git add index.html tests/daily-english.test.js
git commit -m "test: define daily lesson rotation"
```

### Task 2: Add the 90-day curriculum

**Files:**
- Modify: `index.html`
- Modify: `tests/daily-english.test.js`

**Step 1: Write the failing test**

Assert every lesson provides non-empty `sentence`, `translation`, `expression`, and `expressionTranslation` strings.

**Step 2: Run test to verify it fails**

Run: `node --test tests/daily-english.test.js`

Expected: FAIL because the list is empty or incomplete.

**Step 3: Write minimal implementation**

Fill the list with 90 everyday-conversation sentences, a natural Korean translation for each, and one key expression with its Korean meaning.

**Step 4: Run test to verify it passes**

Run: `node --test tests/daily-english.test.js`

Expected: PASS with 90 complete items and correct wraparound.

**Step 5: Commit**

```bash
git add index.html tests/daily-english.test.js
git commit -m "feat: add 90 daily English lessons"
```

### Task 3: Build the monitor-first KST display

**Files:**
- Modify: `index.html`

**Step 1: Write the failing test**

Check the source contains `timeZone: 'Asia/Seoul'` and a `scheduleNextLesson` function.

**Step 2: Run test to verify it fails**

Run: `node --test tests/daily-english.test.js`

Expected: FAIL because KST scheduling is absent.

**Step 3: Write minimal implementation**

Add semantic HTML and responsive CSS for a warm, cinematic dark display: large sentence, Korean translation, expression card, counter, and KST date. Use `Intl.DateTimeFormat` in `Asia/Seoul` and schedule a recursive timer for the next KST midnight.

**Step 4: Run test to verify it passes**

Run: `node --test tests/daily-english.test.js`

Expected: PASS.

**Step 5: Commit**

```bash
git add index.html tests/daily-english.test.js
git commit -m "feat: create KST daily English display"
```

### Task 4: Publish and verify

**Files:**
- Verify: `index.html`
- Verify: `tests/daily-english.test.js`

**Step 1: Run automated verification**

Run: `node --test tests/daily-english.test.js`

Expected: PASS with zero failures.

**Step 2: Confirm static serving**

Run: `python3 -m http.server 8000 --directory .`

Expected: the page loads at `http://localhost:8000/`.

**Step 3: Initialize and publish**

Run after GitHub authentication is available:

```bash
git init -b main
git add index.html tests docs
git commit -m "feat: publish daily English display"
gh repo create daily-english-display --public --source=. --remote=origin --push
```

Then set GitHub repository Settings → Pages → Deploy from a branch → `main` / `(root)`.

**Step 4: Check the published URL**

Confirm the current sentence, translation, key expression, KST date, and `DAY n / 90` display correctly.
