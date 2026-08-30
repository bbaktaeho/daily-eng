# daily-eng

하루 한 문장 영어 회화 디스플레이. 빌드 도구 / 의존성 없는 정적 단일 페이지.

- 데모: https://bbaktaeho.github.io/daily-eng/
- 코스: 여행 / 비즈니스 각 300문장. KST(`Asia/Seoul`) 자정 기준으로 문장이 자동 전환된다
- 구조: `index.html`(레이아웃 / 스타일) + `app.js`(콘텐츠 / 상태 / 인터랙션)
- 설계 문서: `docs/plans/`

## 로컬 실행

```
python3 -m http.server 8000   # http://localhost:8000
node --test tests/daily-english.test.js
```

## 배포

GitHub Pages, `main` 브랜치 루트.
