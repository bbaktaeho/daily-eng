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

test('lessons are unique, spread out, and free of particle errors', () => {
  const { courses } = loadApp();
  const BAD_PARTICLE = [/을 있나요/, /를 있나요/, /을 가능/, /를 가능/, /을 필요/, /를 필요/, /이 받을/, /가 받을/, /을을/, /를를/];

  for (const [name, course] of Object.entries(courses)) {
    const lessons = course.lessons;
    assert.equal(new Set(lessons.map((l) => l.sentence)).size, lessons.length, `${name}: duplicate sentence`);

    const lastSeen = new Map();
    lessons.forEach((lesson, i) => {
      for (const bad of BAD_PARTICLE) {
        assert.doesNotMatch(lesson.translation, bad, `${name} #${i}: ${lesson.translation}`);
      }
      const seen = lastSeen.get(lesson.key);
      if (seen !== undefined) assert.ok(i - seen >= 30, `${name}: topic "${lesson.key}" repeats after ${i - seen} days`);
      lastSeen.set(lesson.key, i);
      if (i > 0) assert.notEqual(lesson.key, lessons[i - 1].key, `${name} #${i}: same topic two days in a row`);
    });

    assert.ok(new Set(lessons.map((l) => l.reply)).size >= 10, `${name}: replies are not varied enough`);
  }
});

test('page is designed to use KST and reschedule at midnight', () => {
  const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  assert.match(source, /timeZone:\s*['"]Asia\/Seoul['"]/);
  assert.match(source, /function scheduleNextLesson/);
  assert.match(source, /localStorage/);
  assert.match(source, /renderCourseTabs/);
});

test('text is auto-fitted into fixed boxes on render and resize', () => {
  const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const markup = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(source, /function fitAll/);
  assert.match(source, /renderCourseTabs\(\);fitAll\(\)/);
  assert.match(source, /addEventListener\('resize',fitAll\)/);
  for (const id of ['sentence-box', 'translation-box', 'reply-box', 'reply-ko-box']) {
    assert.ok(markup.includes(`id="${id}"`), `missing fit box: ${id}`);
  }
  assert.match(markup, /html,body\{height:100%;overflow:hidden\}/);
});
