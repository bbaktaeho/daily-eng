// 한국어 조사 자동 선택 (받침 유무)
function josa(w,a,b){const c=w.charCodeAt(w.length-1)-0xAC00;return w+(c>=0&&c<11172&&c%28!==0?a:b)}
const EUL=w=>josa(w,'을','를'),IGA=w=>josa(w,'이','가');

// 주제 성격(물건 / 좌석·예약 / 정보 / 서비스 / 문서 / 일정 / 업무)별로 어울리는 패턴만 묶는다.
// 패턴마다 한국어 해석 · 자연스러운 답변 · 핵심 표현을 함께 둔다.
const GROUPS={travel:[
{topics:[['an extra towel','여분의 수건'],['a phone charger','휴대폰 충전기'],['a bottle of water','생수 한 병'],['a city map','시내 지도'],['an extra pillow','여분의 베개'],['a receipt','영수증'],['an English menu','영어 메뉴판'],['a luggage tag','수하물 태그'],['a plug adapter','플러그 어댑터'],['a blanket','담요'],['an ice bucket','아이스 버킷'],['a spare key card','여분의 키카드'],['a shopping bag','쇼핑백'],['a paper napkin','종이 냅킨'],['a bottle opener','병따개'],['an umbrella','우산'],['a pen','펜'],['a hair dryer','헤어드라이어'],['a first-aid kit','구급상자'],['a luggage cart','짐수레']],
 forms:[
 {en:'Could I get %s?',ko:k=>`${EUL(k)} 받을 수 있을까요?`,reply:'Of course. I’ll bring it right away.',replyKo:'물론입니다. 바로 가져다드리겠습니다.',ex:'Could I get ~?',exKo:'~을 받을 수 있을까요?'},
 {en:'Could you bring me %s?',ko:k=>`${EUL(k)} 가져다주실 수 있을까요?`,reply:'Certainly. I’ll be there in a minute.',replyKo:'네, 곧 가져다드리겠습니다.',ex:'bring me ~',exKo:'~을 가져다주다'},
 {en:'Do you have %s?',ko:k=>`${IGA(k)} 있나요?`,reply:'Yes, we do. Let me get it for you.',replyKo:'네, 있습니다. 가져다드릴게요.',ex:'Do you have ~?',exKo:'~이 있나요?'},
 {en:'May I have %s, please?',ko:k=>`${EUL(k)} 주실 수 있을까요?`,reply:'Of course. Here you are.',replyKo:'물론입니다. 여기 있습니다.',ex:'May I have ~?',exKo:'~을 주시겠어요?'},
 {en:'Where can I get %s?',ko:k=>`${EUL(k)} 어디서 구할 수 있을까요?`,reply:'You can get one at the front desk.',replyKo:'프런트 데스크에서 받으실 수 있습니다.',ex:'Where can I get ~?',exKo:'~을 어디서 구할 수 있나요?'}]},
{topics:[['an aisle seat','통로 좌석'],['a window seat','창가 좌석'],['a seat upgrade','좌석 업그레이드'],['an early check-in','얼리 체크인'],['a late check-out','레이트 체크아웃'],['a room with a view','전망 좋은 방'],['a quieter room','더 조용한 방'],['a non-smoking room','금연 객실'],['a table for two','2인 테이블'],['a table by the window','창가 자리'],['an airport pickup','공항 픽업'],['an earlier flight','더 이른 항공편'],['a vegetarian meal','채식 기내식'],['a later flight','더 늦은 항공편'],['an extra bed','추가 침대'],['a room on a higher floor','높은 층 객실'],['a connecting room','연결 객실'],['a late breakfast','늦은 조식'],['a crib for my baby','아기 침대'],['a seat next to my friend','친구 옆자리']],
 forms:[
 {en:'Could I get %s?',ko:k=>`${EUL(k)} 받을 수 있을까요?`,reply:'Let me check what’s available.',replyKo:'가능한지 확인해 보겠습니다.',ex:'Could I get ~?',exKo:'~을 받을 수 있을까요?'},
 {en:'Is %s available?',ko:k=>`${IGA(k)} 가능한가요?`,reply:'Let me check for you. One moment, please.',replyKo:'확인해 드리겠습니다. 잠시만 기다려 주세요.',ex:'Is ~ available?',exKo:'~이 가능한가요?'},
 {en:'I’d like to request %s.',ko:k=>`${EUL(k)} 요청드리고 싶습니다.`,reply:'Sure. I’ll note that on your booking.',replyKo:'네, 예약에 반영해 두겠습니다.',ex:'I’d like to request ~.',exKo:'~을 요청드리고 싶습니다.'},
 {en:'Could you check if %s is available?',ko:k=>`${IGA(k)} 가능한지 확인해 주실 수 있을까요?`,reply:'Of course. I’ll check right now.',replyKo:'물론입니다. 지금 확인해 보겠습니다.',ex:'check if ~ is available',exKo:'~이 가능한지 확인하다'},
 {en:'Would it be possible to arrange %s?',ko:k=>`혹시 ${EUL(k)} 준비해 주실 수 있을까요?`,reply:'I’ll see what I can do for you.',replyKo:'가능한지 알아보겠습니다.',ex:'Would it be possible to ~?',exKo:'혹시 ~할 수 있을까요?'}]},
{topics:[['the Wi-Fi password','와이파이 비밀번호'],['the check-out time','체크아웃 시간'],['the breakfast hours','조식 시간'],['the platform number','승강장 번호'],['the last train time','막차 시간'],['the museum’s opening hours','박물관 운영 시간'],['the exchange rate','환율'],['the total price','총액'],['the gate number','탑승구 번호'],['the departure time','출발 시간'],['the address of the hotel','호텔 주소'],['the address of the nearest pharmacy','가장 가까운 약국 주소'],['the bus route to downtown','시내 가는 버스 노선'],['the shuttle bus schedule','셔틀버스 시간표'],['the closing time','영업 종료 시간']],
 forms:[
 {en:'Could you tell me %s?',ko:k=>`${EUL(k)} 알려주실 수 있을까요?`,reply:'Sure. Let me look that up for you.',replyKo:'네, 확인해서 알려드리겠습니다.',ex:'Could you tell me ~?',exKo:'~을 알려주시겠어요?'},
 {en:'Do you know %s?',ko:k=>`${EUL(k)} 아시나요?`,reply:'Yes, I can help you with that.',replyKo:'네, 제가 알려드릴 수 있습니다.',ex:'Do you know ~?',exKo:'~을 아시나요?'},
 {en:'I’d like to check %s.',ko:k=>`${EUL(k)} 확인하고 싶습니다.`,reply:'No problem. Let me pull that up.',replyKo:'네, 바로 확인해 드리겠습니다.',ex:'I’d like to check ~.',exKo:'~을 확인하고 싶습니다.'},
 {en:'Could you write down %s for me?',ko:k=>`${EUL(k)} 적어주실 수 있을까요?`,reply:'Of course. Here you go.',replyKo:'물론입니다. 여기 적어드렸습니다.',ex:'write down ~',exKo:'~을 적어주다'},
 {en:'Where can I find %s?',ko:k=>`${EUL(k)} 어디서 확인할 수 있을까요?`,reply:'Let me show you where to find it.',replyKo:'어디서 확인하시는지 안내해 드릴게요.',ex:'Where can I find ~?',exKo:'~을 어디서 찾을 수 있나요?'}]},
{topics:[['laundry service','세탁 서비스'],['luggage storage','짐 보관'],['an airport shuttle','공항 셔틀'],['room service','룸서비스'],['a guided city tour','가이드 시티 투어']],
 forms:[
 {en:'Do you offer %s?',ko:k=>`${EUL(k)} 제공하시나요?`,reply:'Yes, we do. Would you like to use it?',replyKo:'네, 제공합니다. 이용하시겠어요?',ex:'Do you offer ~?',exKo:'~을 제공하시나요?'},
 {en:'Could you arrange %s for me?',ko:k=>`${EUL(k)} 준비해 주실 수 있을까요?`,reply:'Certainly. I’ll set it up for you.',replyKo:'물론입니다. 준비해 드리겠습니다.',ex:'arrange ~',exKo:'~을 준비하다'},
 {en:'Is %s available here?',ko:k=>`여기서 ${IGA(k)} 가능한가요?`,reply:'Yes, it is. Let me explain how it works.',replyKo:'네, 가능합니다. 이용 방법을 안내해 드릴게요.',ex:'Is ~ available?',exKo:'~이 가능한가요?'},
 {en:'Could I request %s?',ko:k=>`${EUL(k)} 요청드릴 수 있을까요?`,reply:'Of course. I’ll arrange it right away.',replyKo:'물론입니다. 바로 준비해 드리겠습니다.',ex:'Could I request ~?',exKo:'~을 요청드릴 수 있을까요?'},
 {en:'How much does %s cost?',ko:k=>`${EUL(k)} 이용하면 얼마인가요?`,reply:'Let me check the rate for you.',replyKo:'요금을 확인해 드리겠습니다.',ex:'How much does ~ cost?',exKo:'~은 얼마인가요?'}]}],
business:[
{topics:[['the meeting agenda','회의 안건'],['the presentation slides','발표 자료'],['the latest report','최신 보고서'],['a copy of the contract','계약서 사본'],['the invoice','청구서'],['the meeting notes','회의록'],['the budget breakdown','예산 내역'],['the project timeline','프로젝트 일정표'],['the updated quote','수정된 견적서'],['the signed copy','서명본'],['the client list','고객 목록'],['the sales figures','매출 수치'],['the draft proposal','제안서 초안'],['the user manual','사용 설명서'],['the test results','테스트 결과'],['the design mockups','디자인 시안'],['the meeting recording','회의 녹화본'],['the onboarding guide','온보딩 가이드'],['the API documentation','API 문서'],['the expense report','지출 보고서'],['the performance review form','인사 평가 양식'],['the vendor contract','벤더 계약서'],['the release notes','릴리스 노트'],['the survey results','설문 결과'],['the training materials','교육 자료']],
 forms:[
 {en:'Could you send me %s?',ko:k=>`${EUL(k)} 보내주실 수 있을까요?`,reply:'Sure. I’ll send it over shortly.',replyKo:'네, 곧 보내드리겠습니다.',ex:'Could you send me ~?',exKo:'~을 보내주시겠어요?'},
 {en:'Could you share %s with me?',ko:k=>`${EUL(k)} 공유해 주실 수 있을까요?`,reply:'Of course. I’ll share it after this meeting.',replyKo:'물론입니다. 회의 후에 공유드리겠습니다.',ex:'share ~ with me',exKo:'~을 공유해 주다'},
 {en:'Do you have %s ready?',ko:k=>`${IGA(k)} 준비되었나요?`,reply:'Almost. I’ll have it ready by this afternoon.',replyKo:'거의 됐습니다. 오늘 오후까지 준비하겠습니다.',ex:'Do you have ~ ready?',exKo:'~이 준비되었나요?'},
 {en:'Could you forward me %s?',ko:k=>`${EUL(k)} 전달해 주실 수 있을까요?`,reply:'Sure. I’ll forward it to you now.',replyKo:'네, 지금 전달드리겠습니다.',ex:'forward ~',exKo:'~을 전달하다'},
 {en:'I’d like to request %s.',ko:k=>`${EUL(k)} 요청드리고 싶습니다.`,reply:'Noted. I’ll prepare it and get back to you.',replyKo:'알겠습니다. 준비해서 회신드리겠습니다.',ex:'I’d like to request ~.',exKo:'~을 요청드리고 싶습니다.'}]},
{topics:[['the delivery date','납품일'],['the final approval status','최종 승인 상태'],['the deadline','마감일'],['the budget approval','예산 승인'],['the client’s feedback','고객 피드백'],['the next steps','다음 단계'],['the review deadline','검토 마감일'],['the hiring plan','채용 계획'],['the launch date','출시일'],['the pending payment','미결제 건'],['the contract renewal','계약 갱신'],['the vendor response','벤더 회신'],['the migration schedule','마이그레이션 일정'],['the priority for this week','이번 주 우선순위'],['the test schedule','테스트 일정']],
 forms:[
 {en:'Could you tell me %s?',ko:k=>`${EUL(k)} 알려주실 수 있을까요?`,reply:'Sure. Let me check and get back to you.',replyKo:'네, 확인 후 알려드리겠습니다.',ex:'Could you tell me ~?',exKo:'~을 알려주시겠어요?'},
 {en:'Could you confirm %s?',ko:k=>`${EUL(k)} 확인해 주실 수 있을까요?`,reply:'Yes, I can confirm that today.',replyKo:'네, 오늘 중으로 확인해 드리겠습니다.',ex:'Could you confirm ~?',exKo:'~을 확인해 주시겠어요?'},
 {en:'Do you know %s?',ko:k=>`${EUL(k)} 아시나요?`,reply:'I’m not sure. Let me find out for you.',replyKo:'정확히는 모르겠습니다. 확인해 보겠습니다.',ex:'Do you know ~?',exKo:'~을 아시나요?'},
 {en:'I’d like to check %s.',ko:k=>`${EUL(k)} 확인하고 싶습니다.`,reply:'Of course. I’ll walk you through it.',replyKo:'네, 제가 안내해 드리겠습니다.',ex:'I’d like to check ~.',exKo:'~을 확인하고 싶습니다.'},
 {en:'Any update on %s?',ko:k=>`${k} 관련해서 진행 상황이 있을까요?`,reply:'Not yet. I’ll update you as soon as I hear back.',replyKo:'아직입니다. 소식 오는 대로 공유드리겠습니다.',ex:'Any update on ~?',exKo:'~은 어떻게 진행되고 있나요?'}]},
{topics:[['a quick call','짧은 통화'],['a follow-up meeting','후속 회의'],['a kickoff meeting','킥오프 미팅'],['a design review','디자인 리뷰'],['a one-on-one','1:1 미팅'],['a project update meeting','프로젝트 점검 회의'],['a short sync','짧은 논의'],['a client call','고객 통화'],['a team workshop','팀 워크숍'],['a demo session','데모 세션'],['a planning session','기획 세션'],['a handover meeting','인수인계 회의']],
 forms:[
 {en:'Could we schedule %s?',ko:k=>`${EUL(k)} 잡을 수 있을까요?`,reply:'Sure. How does Thursday morning sound?',replyKo:'좋습니다. 목요일 오전은 어떠신가요?',ex:'Could we schedule ~?',exKo:'~을 잡을 수 있을까요?'},
 {en:'Would you be available for %s?',ko:k=>`${k} 가능하실까요?`,reply:'Yes, I’m free after 2 p.m.',replyKo:'네, 오후 2시 이후에 가능합니다.',ex:'be available for ~',exKo:'~에 시간이 되다'},
 {en:'I’d like to set up %s.',ko:k=>`${EUL(k)} 잡고 싶습니다.`,reply:'Sounds good. Please send me an invite.',replyKo:'좋습니다. 초대장 보내주세요.',ex:'set up ~',exKo:'~을 마련하다'},
 {en:'Do you have time for %s this week?',ko:k=>`이번 주에 ${k} 하실 시간이 있으실까요?`,reply:'I do. Wednesday works best for me.',replyKo:'가능합니다. 수요일이 가장 좋습니다.',ex:'Do you have time for ~?',exKo:'~할 시간이 있으신가요?'},
 {en:'Would it be possible to arrange %s?',ko:k=>`혹시 ${EUL(k)} 잡아 주실 수 있을까요?`,reply:'Of course. I’ll find a time that works.',replyKo:'물론입니다. 가능한 시간을 잡아보겠습니다.',ex:'Would it be possible to ~?',exKo:'혹시 ~할 수 있을까요?'}]},
{topics:[['this draft','이 초안'],['the client’s request','고객 요청'],['the budget revision','예산 수정'],['the onboarding process','온보딩 절차'],['the bug report','버그 리포트'],['the vendor negotiation','벤더 협상'],['the pending invoice','미결제 청구서'],['the feedback from last week','지난주 피드백']],
 forms:[
 {en:'Could you take a look at %s?',ko:k=>`${EUL(k)} 한번 봐주실 수 있을까요?`,reply:'Sure. I’ll review it today.',replyKo:'네, 오늘 검토해 보겠습니다.',ex:'take a look at ~',exKo:'~을 살펴보다'},
 {en:'Could you help me with %s?',ko:k=>`${EUL(k)} 도와주실 수 있을까요?`,reply:'Of course. What do you need from me?',replyKo:'물론입니다. 무엇을 도와드릴까요?',ex:'help me with ~',exKo:'~을 도와주다'},
 {en:'Would you be able to handle %s?',ko:k=>`${EUL(k)} 맡아주실 수 있을까요?`,reply:'Yes, I can take that on.',replyKo:'네, 제가 맡겠습니다.',ex:'handle ~',exKo:'~을 처리하다'},
 {en:'I’d like to ask you to review %s.',ko:k=>`${EUL(k)} 검토해 주시길 부탁드립니다.`,reply:'Happy to. I’ll send my comments by Friday.',replyKo:'좋습니다. 금요일까지 의견 드리겠습니다.',ex:'review ~',exKo:'~을 검토하다'},
 {en:'Could you follow up on %s?',ko:k=>`${EUL(k)} 후속 조치해 주실 수 있을까요?`,reply:'Will do. I’ll check on it and report back.',replyKo:'알겠습니다. 확인해서 공유드리겠습니다.',ex:'follow up on ~',exKo:'~을 후속 조치하다'}]}]};

function build(groups){const out=[];for(const g of groups)for(const[en,ko]of g.topics)for(const f of g.forms)out.push({key:en,sentence:f.en.replace('%s',en),translation:f.ko(ko),reply:f.reply,replyTranslation:f.replyKo,expression:f.ex,expressionTranslation:f.exKo});return out}
// 생성 결과는 주제별로 뭉쳐 있다. 날짜 i 를 (주제, 패턴) 좌표로 흩어 같은 주제가 60일마다,
// 같은 패턴이 이틀 연속으로는 나오지 않게 재배열한다. 매핑은 전단사라 300개가 모두 한 번씩 쓰인다.
function gcd(a,b){return b?gcd(b,a%b):a}
const FORMS_PER_TOPIC=5;
function spread(list,nf=FORMS_PER_TOPIC){const nt=list.length/nf,m=gcd(7,nt)===1?7:1;
  return list.map((_,i)=>list[(i*m%nt)*nf+(i+Math.floor(i/nt))%nf])}
const courses={travel:{label:'여행',shortLabel:'TRAVEL',lessons:spread(build(GROUPS.travel))},business:{label:'비즈니스',shortLabel:'BUSINESS',lessons:spread(build(GROUPS.business))}};
const EPOCH='2026-08-30',KEY='daily-english-state';
function getLessonIndex(kstDate,length=300){const days=(Date.parse(`${kstDate}T00:00:00Z`)-Date.parse(`${EPOCH}T00:00:00Z`))/86400000;return((days%length)+length)%length}
function kst(){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date());return Object.fromEntries(p.filter(x=>x.type!=='literal').map(x=>[x.type,x.value]))}function dateKey(){const p=kst();return`${p.year}-${p.month}-${p.day}`}
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));return s?.date===dateKey()&&courses[s.course]?s:{date:dateKey(),course:'travel',index:getLessonIndex(dateKey())}}catch{return{date:dateKey(),course:'travel',index:getLessonIndex(dateKey())}}}let state=load();function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function renderCourseTabs(){const box=document.getElementById('tabs');box.innerHTML='';Object.entries(courses).forEach(([id,c])=>{const b=document.createElement('button');b.className='tab';b.textContent=c.label;b.setAttribute('aria-selected',id===state.course);b.onclick=()=>{state={date:dateKey(),course:id,index:getLessonIndex(dateKey(),c.lessons.length)};render()};box.append(b)})}
function render(){if(state.date!==dateKey())state={date:dateKey(),course:state.course,index:getLessonIndex(dateKey(),courses[state.course].lessons.length)};const c=courses[state.course],l=c.lessons[state.index];document.getElementById('date').textContent=`${dateKey()} · KST`;document.getElementById('count').textContent=`${c.shortLabel} · ${String(state.index+1).padStart(3,'0')} / ${c.lessons.length}`;for(const[id,key]of[['sentence','sentence'],['translation','translation'],['reply','reply'],['reply-ko','replyTranslation'],['expression','expression'],['expression-ko','expressionTranslation']])document.getElementById(id).textContent=l[key];document.getElementById('progress').textContent=`${c.label} · ${state.index+1} / ${c.lessons.length}`;renderCourseTabs();fitAll();save()}
function scheduleNextLesson(){const p=kst(),ms=(+p.hour*3600 + +p.minute*60 + +p.second)*1000;setTimeout(()=>{render();scheduleNextLesson()},86400000-ms+500)}
const FIT=[['sentence-box','sentence'],['translation-box','translation'],['reply-box','reply'],['reply-ko-box','reply-ko']];
function overflows(box,el){return el.scrollHeight>box.clientHeight+1||el.scrollWidth>box.clientWidth+1}
function fit(box,el){let lo=8,hi=Math.min(box.clientHeight,200);el.style.fontSize=hi+'px';if(!overflows(box,el))return;while(hi-lo>.5){const mid=(lo+hi)/2;el.style.fontSize=mid+'px';overflows(box,el)?hi=mid:lo=mid}el.style.fontSize=lo+'px'}
function fitAll(){for(const[b,e]of FIT)fit(document.getElementById(b),document.getElementById(e))}
globalThis.dailyEnglish={courses,getLessonIndex};document.addEventListener('DOMContentLoaded',()=>{document.getElementById('next').onclick=()=>{state.index=(state.index+1)%courses[state.course].lessons.length;render()};render();scheduleNextLesson();addEventListener('resize',fitAll);document.fonts?.ready.then(fitAll)});
