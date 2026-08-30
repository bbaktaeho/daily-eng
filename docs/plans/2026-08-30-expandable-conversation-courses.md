# Expandable English Conversation Courses Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand the display into a touch-first, GitHub Pages conversation trainer with 300 travel lessons and 300 business lessons, while allowing future courses to be added by data only.

**Architecture:** Represent each course as a metadata object with a self-contained lesson collection. Build course tabs and lesson rendering dynamically from that collection; persist only same-day manual selection locally, so the KST daily default always takes over after midnight.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, localStorage.

---

### Task 1: Define and verify expandable course data

**Files:**
- Modify: `tests/daily-english.test.js`
- Modify: `app.js`

**Step 1: Write the failing test**

Require `courses` to be an object keyed by course ID, and assert that `travel` and `business` both have labels and exactly 300 complete lessons. Each lesson must include prompt/translation, response/translation, and expression/translation.

**Step 2: Run test to verify it fails**

Run: `node --test tests/daily-english.test.js`

Expected: FAIL because the current flat 90-item lesson list has no course or reply fields.

**Step 3: Write minimal implementation**

Expose a `courses` object and a data construction helper that produces complete course lesson objects. Add travel and business content with 300 distinct practical exchanges each.

**Step 4: Run test to verify it passes**

Run: `node --test tests/daily-english.test.js`

Expected: PASS; each initial course has 300 validated lesson records.

### Task 2: Make KST selection and manual state course-aware

**Files:**
- Modify: `tests/daily-english.test.js`
- Modify: `app.js`

**Step 1: Write the failing test**

Assert date selection receives a course length and wraps independently for 300 items. Assert `getDailyState` rejects stored state from an earlier KST date and preserves same-day course and offset.

**Step 2: Run test to verify it fails**

Run: `node --test tests/daily-english.test.js`

Expected: FAIL because the current helper is fixed to one global list.

**Step 3: Write minimal implementation**

Implement `getLessonIndex(kstDate, courseLength)`, a KST date helper, and safe localStorage state read/write methods. On each render, date mismatch discards manual state; course changes and next-lesson clicks write state for the current KST date.

**Step 4: Run test to verify it passes**

Run: `node --test tests/daily-english.test.js`

Expected: PASS.

### Task 3: Build touch-friendly, data-driven conversation UI

**Files:**
- Modify: `index.html`
- Modify: `app.js`

**Step 1: Write the failing test**

Assert the document includes dynamic course-tab container, expected-answer fields, and a next-lesson control. Assert JavaScript uses an event listener for course selection and next lesson.

**Step 2: Run test to verify it fails**

Run: `node --test tests/daily-english.test.js`

Expected: FAIL because the existing one-course UI has none of these controls.

**Step 3: Write minimal implementation**

Render course tabs from `courses`; use 56px-or-larger controls. Create an editorial dark screen with a primary spoken sentence, translation, a clearly separated “likely reply” block with English and Korean, expression card, counter, and full-width next button. Keep the current page visually legible at 27-inch display distance and responsive on smaller touch screens.

**Step 4: Run test to verify it passes**

Run: `node --test tests/daily-english.test.js`

Expected: PASS.

### Task 4: Verify the expanded display

**Files:**
- Verify: `index.html`
- Verify: `app.js`
- Verify: `tests/daily-english.test.js`

**Step 1: Run all automated tests**

Run: `node --test tests/daily-english.test.js`

Expected: PASS with zero failures.

**Step 2: Inspect at monitor dimensions**

Run: `python3 -m http.server 8000 --directory .`

Open the local page at a 1920×1080 viewport; verify category tabs, large-touch next control, main prompt, Korean translation, expected reply and translation, and key expression all appear without clipping.

**Step 3: Commit**

```bash
git add index.html app.js tests docs
git commit -m "feat: add expandable English conversation courses"
```
