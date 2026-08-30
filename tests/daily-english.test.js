const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

function loadApp() {
  const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const context = {
    globalThis: {},
    document: { addEventListener() {} },
    Intl,
    Date,
    setTimeout() {},
    clearTimeout() {},
  };
  vm.runInNewContext(source, context);
  return context.globalThis.dailyEnglish;
}

test('provides two expandable 300-lesson conversation courses', () => {
  const { courses, getLessonIndex } = loadApp();

  assert.deepEqual(Object.keys(courses), ['travel', 'business']);
  for (const course of Object.values(courses)) {
    assert.equal(course.lessons.length, 300);
    assert.match(course.label, /\S/);
    assert.match(course.shortLabel, /\S/);
  }
  assert.equal(getLessonIndex('2026-08-30'), 0);
  assert.equal(getLessonIndex('2026-08-31'), 1);
  assert.equal(getLessonIndex('2026-11-28'), 90);
  assert.equal(getLessonIndex('2027-06-26'), 0);

  for (const course of Object.values(courses)) for (const lesson of course.lessons) {
    for (const key of ['sentence', 'translation', 'reply', 'replyTranslation', 'expression', 'expressionTranslation']) {
      assert.match(lesson[key], /\S/);
    }
  }
});

test('page is designed to use KST and reschedule at midnight', () => {
  const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(source, /timeZone:\s*['"]Asia\/Seoul['"]/);
  assert.match(source, /function scheduleNextLesson/);
  assert.match(source, /localStorage/);
  assert.match(source, /renderCourseTabs/);
});
