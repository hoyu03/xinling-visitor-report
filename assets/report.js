// The journey represents reading progress, never recovery or clinical improvement.
const screeningResult = {
  "metric": "legacy_item_inference_confidence",
  "title": "原报告条目置信度",
  "source": "张宸Charlie · 原报告",
  "scope": "仅原报告已覆盖条目，未合并后续 V2 与 Czzc 材料",
  "warning": "原报告未校准的条目置信度，不代表症状轻重、患病概率或量表得分；各方向仍有缺项。",
  "axes": [
    {
      "id": "mood",
      "label": "抑郁相关",
      "percent": 71,
      "covered": 6,
      "required": 7,
      "sourceField": "lastReport.assessment.scales.depression.confidence",
      "calibration": "uncalibrated_model_estimate",
      "complete": false
    },
    {
      "id": "worry",
      "label": "焦虑相关",
      "percent": 77,
      "covered": 5,
      "required": 7,
      "sourceField": "lastReport.assessment.scales.anxiety.confidence",
      "calibration": "uncalibrated_model_estimate",
      "complete": false
    },
    {
      "id": "stress",
      "label": "压力相关",
      "percent": 64,
      "covered": 3,
      "required": 7,
      "sourceField": "lastReport.assessment.scales.stress.confidence",
      "calibration": "uncalibrated_model_estimate",
      "complete": false
    }
  ]
};
const actionDetails = {
  letter: {
    title: '不寄的信',
    method: '象征性告别仪式 · 未寄信书写',
    practice: '给她写一句你还想说的话。写完可以折起收好，也可以撕掉，由你决定。',
    anonymous: '把还想说的一句话写成一封不寄出的信，如何保留由自己决定。',
    followUp: '如果愿意，下次可以从那句还想对她说的话聊起。那封信始终可以只属于你。',
    question: '如果只写下一句，此刻你最想让她听见哪句话？'
  },
  worry: {
    title: '给担心约个时间',
    method: '认知行为方法 · 担忧推迟',
    practice: '碰到一件不急着处理的担心，先记一个关键词。给它约个白天的时间，到时再看看。',
    anonymous: '把一件不急着处理的担心记成一个词，约个白天的时间再看看。',
    followUp: '下次你可以带来那个让你挂心的词。即使到时在意的事情变了，也可以从新的那件说起。',
    question: '如果把最近挂心的一件事先写成一个词，你会写什么？'
  },
  draft: {
    title: '先写一句',
    method: '认知行为疗法 · 分级任务安排',
    practice: '打开草稿，只写下想对前辈说的第一句。写到这里就可以停，发不发送留给之后决定。',
    anonymous: '为一件想推进的联系写一句开头，之后再决定是否发送。',
    followUp: '下次可以一起看看，开头的那句话里，哪一部分让你犹豫。你可以按自己的节奏决定要不要发。',
    question: '如果这条消息先留在草稿里，你想从哪一句开头？'
  }
};


// Authored demo scenes reuse verified evidence. Frames illustrate the account;
// they do not introduce new events, completed exercises, or a recovery trajectory.
const storyScenes = {
  april: {
    title: '四月 · 三年的关系结束了',
    steps: [
      {label: '一起走过的三年', art: 'relationship', expression: 'warm', text: '你们一起走过了三年。那时候，晚课结束后的回家路上，还可以和她打个电话。'},
      {label: '四月，你们分开了', art: 'parting', expression: 'sad', text: '到了四月，这段关系结束了。日子走到十月，你仍会在一些熟悉的时刻，想起她。'},
      {label: '有些习惯，还留着', art: 'habit', expression: 'calm', text: '后来，课照常上，那条路也还要走。有些习惯，是走到熟悉的地方、下意识拿起手机时，才发现自己还留着。'}
    ]
  },
  class: {
    title: '晚课后 · 下意识拿起手机',
    steps: [
      {label: '那天，你上完了晚课', art: 'lesson', expression: 'calm', text: '那天晚课结束，你像往常一样走在回家的路上。以前，这段路也是你和她打电话的时间。'},
      {label: '又走到那排路灯下', art: 'walk', expression: 'calm', text: '同一条街、熟悉的路灯，连身上的衣服都和那时候一样。那些熟悉的东西，让你又想起了她。'},
      {label: '手机拿起来，才想起……', art: 'phone', expression: 'sad', text: '你下意识拿起手机，想像从前那样给她发消息。拿到手上才想起来，你们已经分开了。耳机里的歌，让那阵难过更重了些。'},
      {label: '后来，你换了歌单', art: 'music', expression: 'calm', text: '后来，你换上流行乐，让耳机里的声音轻快一些。那条回家的路没有变，你试着照顾了一下走在路上的自己。'}
    ]
  },
  work: {
    title: '工作里 · 想联系前辈的时候',
    steps: [
      {label: '有些事，你想往前推进', art: 'work', expression: 'calm', text: '工作里，你想联系前辈，也希望把手里的事情往前推进。只是，先前那次沟通失误，还让你有些在意。'},
      {label: '想开口，又有些犹豫', art: 'pause', expression: 'calm', text: '再想联系时，你会担心自己又说错了什么。原本想推进的两三件事，就这样耽搁了下来。'},
      {label: '那份期待，也还在', art: 'hope', expression: 'warm', text: '可你依然期待项目最后会做成什么样。想往前走的心意是真的，开口时的犹豫也是真的。'}
    ]
  }
};


const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const chapters = $$('.chapter');
const titles = chapters.map(chapter => chapter.dataset.title);
const nextLabels = chapters.map(chapter => chapter.dataset.next);
const readingPages = chapters.slice(1);
let current = 0;
let full = false;
let chosen = null;
let toastTimer;
let imageRevision = 0;
let shareBlob = null;
const dialogOpeners = new WeakMap();

// Labels and points use one source snapshot; no severity score is inferred from confidence.
function renderRadar() {
  const svg = $('#screening-radar');
  const ns = 'http://www.w3.org/2000/svg';
  const element = (name,attributes={},text) => {
    const node = document.createElementNS(ns,name);
    Object.entries(attributes).forEach(([key,value]) => node.setAttribute(key,String(value)));
    if(text !== undefined) node.textContent = text;
    return node;
  };
  const axes = screeningResult.axes;
  const point = (index,value=100) => {
    const angle = (-90 + index*360/axes.length)*Math.PI/180;
    return [190+108*value/100*Math.cos(angle),166+108*value/100*Math.sin(angle)];
  };
  const points = values => values.map((value,index) => point(index,value).join(',')).join(' ');
  svg.replaceChildren(
    element('title',{id:'radar-title'},screeningResult.title),
    element('desc',{id:'radar-desc'},axes.map(axis=>`${axis.label} ${axis.percent}%，覆盖 ${axis.covered}/${axis.required} 项`).join('；')+'。'+screeningResult.warning)
  );
  const defs = element('defs');
  const fill = element('linearGradient',{id:'radar-fill',x1:'0',y1:'0',x2:'1',y2:'1'});
  fill.append(element('stop',{offset:'0','stop-color':'#9bd9ca','stop-opacity':'.38'}),element('stop',{offset:'1','stop-color':'#b3a2dc','stop-opacity':'.26'}));
  defs.append(fill);svg.append(defs);
  for(const value of [20,40,60,80,100]) svg.append(element('polygon',{points:points(axes.map(()=>value)),class:'radar-grid'}));
  axes.forEach((axis,index) => {
    const [x,y] = point(index);
    svg.append(element('line',{x1:190,y1:166,x2:x,y2:y,class:'radar-axis'}));
  });
  svg.append(element('polygon',{points:points(axes.map(axis=>axis.percent)),class:'radar-area'}));
  const labels = [[190,19],[303,261],[77,261]];
  axes.forEach((axis,index) => {
    const [x,y] = point(index,axis.percent);
    svg.append(element('circle',{cx:x,cy:y,r:4,class:'radar-point'}));
    const [labelX,labelY] = labels[index];
    svg.append(element('text',{x:labelX,y:labelY,class:'radar-label','text-anchor':'middle'},axis.label));
    svg.append(element('text',{x:labelX,y:labelY+25,class:'radar-value','text-anchor':'middle'},`${axis.percent}%`));
  });
  $('#radar-note').textContent = screeningResult.warning;
  $('#radar-table tbody').replaceChildren(...axes.map(axis => {
    const row = document.createElement('tr');
    for(const text of [axis.label,`${axis.percent}%`,`${axis.covered} / ${axis.required} 项，仍有缺项`]) {
      const cell = document.createElement('td');cell.textContent=text;row.append(cell);
    }
    return row;
  }));
}
function renderActionOptions() {
  const buttons = Object.entries(actionDetails).map(([key, action]) => {
    const button = document.createElement('button');
    button.className = 'step-option';
    button.dataset.action = key;
    button.setAttribute('aria-pressed', 'false');
    const dot = document.createElement('span');
    dot.className = 'choice-dot';
    dot.setAttribute('aria-hidden', 'true');
    const copy = document.createElement('span');
    copy.className = 'step-copy';
    const title = document.createElement('strong');
    title.textContent = action.title;
    const method = document.createElement('span');
    method.className = 'method';
    method.textContent = action.method;
    const practice = document.createElement('span');
    practice.textContent = action.practice;
    copy.append(title, method, practice);
    button.append(dot, copy);
    return button;
  });
  $('.step-options').replaceChildren(...buttons);
}

$('.chapter-jumps').replaceChildren(...readingPages.map((chapter,index) => {
  const button=document.createElement('button');button.dataset.go=String(index+1);
  button.setAttribute('aria-label',`第 ${index+1} 段：${chapter.dataset.title}`);return button;
}));
$('.journey-total').textContent=String(readingPages.length).padStart(2,'0');
renderRadar();
renderActionOptions();
$$('[data-practice]').forEach(paragraph => {
  paragraph.textContent = actionDetails[paragraph.dataset.practice].practice;
});

function updateScrollHint() {
  const more = document.documentElement.scrollHeight - innerHeight - scrollY > 30;
  $('.scroll-hint').textContent = more ? '↓ 这一页还有话想说' : '按你的步调';
}
function renderPage({focus=false,scroll=false,animate=false}={}) {
  document.body.classList.toggle('is-full',full);
  document.body.classList.toggle('is-cover',!full && current===0);
  document.body.dataset.step = String(current);
  $('#journey-pages').hidden = full;
  $('#full-letter').hidden = !full;
  chapters.forEach((chapter,index) => { chapter.hidden = index !== current; });
  $$('.chapter-jumps [data-go]').forEach(button => {
    if(Number(button.dataset.go) === current) button.setAttribute('aria-current','step');
    else button.removeAttribute('aria-current');
  });
  $('.journey-count strong').textContent = String(Math.max(1,current)).padStart(2,'0');
  $('#previous').disabled = current === 0;
  $('#next>span').textContent = nextLabels[current];
  $('.full-toggle').textContent = full ? '返回旅程 ↙' : '读长文 ↗';
  const progress = Math.max(0,current-1)/Math.max(1,readingPages.length-1);
  const route = $('#walking-route');
  const position = route.getPointAtLength(route.getTotalLength()*(.06+.82*progress));
  $('#traveler').style.transform = `translate(${position.x}px,${position.y}px) scale(${1-.35*progress})`;
  $$('.track-lamp').forEach((lamp,index) => lamp.classList.toggle('lit',index/2 <= progress));
  const traveler = $('.traveler-body');
  traveler.classList.remove('is-walking');
  if(animate) requestAnimationFrame(() => traveler.classList.add('is-walking'));
  if(full) renderLetter();
  $('#page-status').textContent = full ? '已打开完整长文，可复制或保存分享图。' : current===0 ? '报告封面，点击开始阅读。' : `阅读进度 ${current} / ${readingPages.length}。${titles[current]}`;
  if(scroll) window.scrollTo({top:0,behavior:'instant'});
  if(focus) (full ? $('#letter-heading') : chapters[current].querySelector('h1')).focus({preventScroll:true});
  requestAnimationFrame(updateScrollHint);
}
function go(index) {
  if(!Number.isInteger(index) || index<0 || index>=chapters.length) return;
  const moved = index !== current;
  current = index; full = false;
  history.replaceState(null,'',`#chapter-${current+1}`);
  renderPage({focus:true,scroll:true,animate:moved});
}
function toggleFull() {
  full = !full;
  history.replaceState(null,'',full ? '#report' : `#chapter-${current+1}`);
  renderPage({focus:true,scroll:true});
}
function carriedWords() {
  return $('#use-note').checked ? $('#visitor-words').value.trim() : '';
}

function renderPersonalEnding() {
  const words = carriedWords();
  const action = actionDetails[chosen];
  $('#personal-ending').hidden = !action && !words;
  const choice = $('#ending-choice');
  choice.hidden = !action;
  choice.textContent = action ? `你选了「${action.title}」。${action.followUp}` : '';
  const quote = $('#ending-words');
  quote.hidden = !words;
  quote.textContent = words;
  const response = $('#ending-response');
  response.hidden = !words;
  response.textContent = words ? '这是你愿意留下的那一句。下次想接着说，我们就从这里开始。' : '';
  $('#share-note-option').hidden = !words;
  if (!words) $('#share-note').checked = false;
}

function setAction(value) {
  if (!Object.hasOwn(actionDetails, value)) return;
  chosen = chosen === value ? null : value;
  $$('[data-action]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.action === chosen));
  });
  $('.choice-message').textContent = chosen
    ? `选好了「${actionDetails[chosen].title}」。再点一次可取消。`
    : '可以选一件，也可以先不选。';
  renderPersonalEnding();
}

$('#visitor-words').addEventListener('input', renderPersonalEnding);
$('#use-note').addEventListener('change', renderPersonalEnding);


const sceneFrames = new Map();
const mascotImages = ['calm', 'sad', 'warm'].map(expression => {
  const image = new Image();
  image.src = `/assets/mascot-${expression}.png`;
  return image;
});

function paintScene(key, animate = false) {
  const player = sceneFrames.get(key);
  const story = storyScenes[key];
  const step = story.steps[player.index];
  player.container.dataset.frame = String(player.index);
  player.stage.dataset.art = step.art;
  player.mascot.src = `/assets/mascot-${step.expression}.png`;
  player.label.textContent = step.label;
  player.text.textContent = step.text;
  player.count.textContent = `${player.index + 1} / ${story.steps.length}`;
  player.count.setAttribute('aria-label', `第 ${player.index + 1} 幕，共 ${story.steps.length} 幕`);
  player.previous.disabled = player.index === 0;
  const atEnd = player.index === story.steps.length - 1;
  player.next.textContent = atEnd ? '再看一遍 ↺' : '下一幕 →';
  player.dots.forEach((dot, index) => dot.classList.toggle('passed', index <= player.index));
  player.stage.getAnimations().forEach(animation => animation.cancel());
  if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    player.stage.animate([
      {opacity: .3, transform: 'translateY(5px)'},
      {opacity: 1, transform: 'translateY(0)'}
    ], {duration: 420, easing: 'ease-out'});
  }
  requestAnimationFrame(updateScrollHint);
}

Object.entries(storyScenes).forEach(([key, story]) => {
  const container = document.getElementById(`${key}-story`);
  // Only constant presentation markup is injected. Narrative and visitor input use textContent.
  container.innerHTML = `
    <div class="scene-stage" aria-hidden="true">
      <div class="scene-glow"></div><div class="scene-floor"></div>
      <svg class="story-props" viewBox="0 0 320 200" focusable="false">
        <g class="relationship-lines"><path d="M58 145Q110 90 156 94T271 57"/><path d="M58 145Q110 90 156 94T271 147"/><circle class="memory-light first-light" cx="209" cy="79" r="4"/><circle class="memory-light second-light" cx="222" cy="86" r="4"/></g>
        <use class="prop-board" href="#story-board"/>
        <use class="prop-lamp" href="#story-lamp"/>
        <use class="prop-computer" href="#story-computer"/>
      </svg>
      <img class="scene-mascot" alt="" width="1024" height="1024" decoding="async" draggable="false">
      <svg class="story-props foreground-props" viewBox="0 0 320 200" focusable="false">
        <use class="prop-phone" href="#story-phone"/>
        <g class="music-notes" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M217 93V72l13-3v19"/><ellipse cx="213" cy="93" rx="4" ry="2.5"/><ellipse cx="226" cy="88" rx="4" ry="2.5"/></g>
        <g class="pause-dots" fill="currentColor"><circle cx="127" cy="62" r="2"/><circle cx="137" cy="62" r="2"/><circle cx="147" cy="62" r="2"/></g>
      </svg>
    </div>
    <div class="scene-caption" aria-live="polite" aria-atomic="true"><h3></h3><p></p></div>
    <div class="scene-controls"><button class="scene-back" aria-label="上一幕">←</button><span class="scene-position"><span class="scene-count"></span><span class="scene-dots" aria-hidden="true"></span></span><button class="scene-next">下一幕 →</button></div>`;
  const dots = story.steps.map(() => document.createElement('span'));
  container.querySelector('.scene-dots').append(...dots);
  const player = {
    container, index: 0, dots,
    stage: container.querySelector('.scene-stage'),
    mascot: container.querySelector('.scene-mascot'),
    label: container.querySelector('.scene-caption h3'),
    text: container.querySelector('.scene-caption p'),
    count: container.querySelector('.scene-count'),
    previous: container.querySelector('.scene-back'),
    next: container.querySelector('.scene-next')
  };
  sceneFrames.set(key, player);
  const advance = (direction) => {
    if(direction < 0 && player.index === 0) return;
    player.index = (player.index + direction + story.steps.length) % story.steps.length;
    paintScene(key, true);
  };
  player.previous.addEventListener('click', () => advance(-1));
  player.next.addEventListener('click', () => advance(1));
  container.addEventListener('keydown', event => {
    if(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if(event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();event.stopPropagation();
    advance(event.key === 'ArrowRight' ? 1 : -1);
  });
  paintScene(key);
});

const sceneButtons = $$('.story-bubble');
function expandScene(button, open) {
  button.setAttribute('aria-expanded', String(open));
  document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
}
sceneButtons.forEach(button => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  if (open && button.classList.contains('branch')) {
    $$('.story-bubble.branch').forEach(sibling => {
      if (sibling !== button) expandScene(sibling, false);
    });
  }
  expandScene(button, open);
  requestAnimationFrame(() => {
    updateScrollHint();
    if (open) {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      const top = panel.getBoundingClientRect().top;
      const headerBottom = $('.site-header').getBoundingClientRect().bottom;
      const dockTop = $('.journey-dock').getBoundingClientRect().top;
      // Keep the picture and text together on phones; preserve the reader's place otherwise.
      if (top < headerBottom || top + Math.min(panel.offsetHeight, 400) > dockTop) {
        panel.scrollIntoView({block: 'start', behavior: 'instant'});
      }
    }
  });
}));

const appearance = $('#appearance-dialog');
function applyTheme(value) {
  const theme = value === 'day' ? 'day' : 'night';
  document.documentElement.dataset.theme = theme;
  $('meta[name="theme-color"]').content = theme === 'day' ? '#eef5fb' : '#192b38';
  $$('[data-theme-choice]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
  });
}
try { applyTheme(localStorage.getItem('xinling-visitor-appearance')); } catch { applyTheme('night'); }
$('#open-appearance').addEventListener('click', event => showDialog(appearance, event.currentTarget));
$$('[data-theme-choice]').forEach(button => button.addEventListener('click', () => {
  const theme = button.dataset.themeChoice;
  applyTheme(theme);
  try { localStorage.setItem('xinling-visitor-appearance', theme); } catch { /* Still applies for this visit. */ }
  appearance.close();
}));


function showDialog(dialog,opener) {
  dialogOpeners.set(dialog,opener);
  dialog.showModal(); document.body.style.overflow = 'hidden'; dialog.scrollTop = 0;
}
function openDetail(content,opener) {
  $('#dialog-eyebrow').textContent = content.eyebrow;
  $('#dialog-title').textContent = content.title;
  $('#dialog-body').replaceChildren();
  if (content.intro) {
    const intro = document.createElement('p');
    intro.textContent = content.intro;
    $('#dialog-body').append(intro);
  }
  showDialog($('#detail-dialog'),opener);
}
$$('dialog').forEach(dialog => {
  dialog.querySelector('.close-button').addEventListener('click',() => dialog.close());
  dialog.addEventListener('close',() => {
    document.body.style.overflow = '';
    dialogOpeners.get(dialog)?.focus({preventScroll:true});
  });
  dialog.addEventListener('click',event => {
    if(event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) dialog.close();
  });
});
$('.dialog-done').addEventListener('click',() => $('#detail-dialog').close());
$('#preview-conversation').addEventListener('click', event => {
  const action = actionDetails[chosen];
  const words = carriedWords();
  openDetail({eyebrow:'下一次交流 · 示例', title:'下回，可以这样开始'}, event.currentTarget);
  const body = $('#dialog-body');
  if (words) {
    const quote = document.createElement('blockquote');
    quote.className = 'preview-words';
    quote.textContent = words;
    body.append(quote);
  }
  const prompt = document.createElement('p');
  prompt.className = 'preview-question';
  prompt.textContent = words ? '你留下了这句话。今天再读到它，你最想从哪里接着说？'
    : action ? action.question : '从上次聊完到现在，有没有一个你还想拿出来说说的瞬间？';
  const caption = document.createElement('p');
  caption.className = 'detail-note';
  caption.textContent = '这是一段开场示例。你可以带来自己的话，也可以换个话题。';
  body.append(prompt, caption);
});
$$('[data-full]').forEach(button => button.addEventListener('click',toggleFull));
$$('[data-go]').forEach(button => button.addEventListener('click',() => go(Number(button.dataset.go))));
$$('[data-page-link]').forEach(button => button.addEventListener('click',() => go(chapters.findIndex(chapter=>chapter.dataset.page===button.dataset.pageLink))));
$$('[data-action]').forEach(button => button.addEventListener('click',() => setAction(button.dataset.action)));
$('#previous').addEventListener('click',() => go(current-1));
$('#next').addEventListener('click',() => current===chapters.length-1 ? toggleFull() : go(current+1));
$('.brand').addEventListener('click',event => {event.preventDefault();go(0);});

// One continuous letter reuses the authored passages, never the navigation or page frames.
function readText(node) {
  if(node.nodeType === Node.TEXT_NODE) return node.textContent;
  if(node.nodeName === 'BR') return '\n';
  return [...node.childNodes].map(readText).join('');
}
function paragraphs(selector) { return $$(selector).map(node => ({text:readText(node).trim()})); }
function buildLetter({stories = true, includeNote = true} = {}) {
  const segments = [{text: readText($('#heading-1')), pull: true}];
  const axes = screeningResult.axes.map(axis => `${axis.label} ${axis.percent}%（覆盖 ${axis.covered}/${axis.required} 项）`);
  segments.push({text: `${screeningResult.title}：${axes.join('、')}。${screeningResult.warning} 数字取自原报告，后续交流也写进了文字回顾。`});
  if (stories) {
    segments.push(...paragraphs('.result-summary p, .result-empathy p'));
    $$('.safety-notes section').forEach(section => {
      const account = Array.from(section.querySelectorAll('p'), node => node.textContent);
      segments.push({text: section.querySelector('h3').textContent + '。' + account.join('')});
    });
    // The personal letter contains all three scenes, even when the bubbles were never opened.
    Object.values(storyScenes).forEach(scene => {
      segments.push({text: scene.steps.map(step => step.text).join('')});
    });
    segments.push(...paragraphs('.story .page-closing'));
  } else {
    segments.push({text: '这段时间，睡眠、心情和做事的节奏都有些变化。那些睡得太晚的夜和还要照常过的白天，都值得被认真对待。'});
    segments.push({text: $$('.safety-now').map(node => node.textContent).join('')});
  }
  segments.push({text: readText($('#heading-4')) + '，' + readText($('.seen-lead')), pull: true});
  if (stories) segments.push(...paragraphs('.recognition-section p'));
  else segments.push({text: '你为自己做过一些小小的调整。我们听见了你的付出，也想给疲惫的你留一个可以歇脚的地方。'});
  segments.push({text: readText($('.seen-note')), pull: true});
  segments.push({text: readText($('#heading-5')), pull: true});
  Object.values(actionDetails).forEach(action => {
    segments.push({text: `${action.title}（${action.method}）。${stories ? action.practice : action.anonymous}`});
  });
  segments.push({text: readText($('#heading-6')), pull: true});
  if (stories) segments.push(...paragraphs('.onward-prose p'));
  else segments.push(...paragraphs('.onward-prose p:last-child'));
  if (chosen) {
    const action = actionDetails[chosen];
    segments.push({text: stories ? $('#ending-choice').textContent : `这次你选了「${action.title}」。下次可以聊聊你为什么想试试它。`});
  }
  const words = includeNote ? carriedWords() : '';
  if (words) segments.push({text: words, isNote: true}, {text: $('#ending-response').textContent});
  segments.push(...paragraphs('.continuation > p:first-child'));
  return segments;
}

function renderLetter() {
  $('#letter-body').replaceChildren(...buildLetter().map(segment => {
    const paragraph = document.createElement('p');
    paragraph.textContent = segment.isNote ? segment.text : segment.text.replace(/\n/g,'');
    if (segment.isNote) paragraph.className = 'letter-words';
    if(segment.pull) paragraph.className = 'letter-pull';
    return paragraph;
  }));
}
function letterText() {
  return ['写给此刻的你',$('.letter-byline').textContent,...buildLetter().map(segment => segment.text),'心聆 · 按你的步调，继续认识自己。','这份回顾依据交流内容整理，用于理解近期状态，不代替专业评估或诊断。'].join('\n\n');
}
function toast(message) {
  clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').hidden = false;
  toastTimer = setTimeout(() => {$('#toast').hidden = true;},4500);
}
$('#copy-letter').addEventListener('click',async event => {
  const text = letterText();
  const opener = event.currentTarget;
  try {
    await navigator.clipboard.writeText(text);
    toast('全文已复制，可以粘贴到你想保存的地方。');
  } catch {
    openDetail({eyebrow:'复制全文',title:'长按或全选这段文字',intro:'可以从下方全选并复制完整文字。'},opener);
    const textarea = document.createElement('textarea');
    textarea.className = 'manual-copy';textarea.readOnly = true;textarea.value = text;
    textarea.setAttribute('aria-label','完整报告文字');$('#dialog-body').append(textarea);textarea.focus();textarea.select();
  }
});

// Browser-local PNG export. Privacy switches apply to the generated output, not just its label.
function wrapText(ctx,text,maxWidth) {
  const lines = [];
  for(const paragraph of text.split('\n')) {
    let line = '';
    for(const character of [...paragraph]) {
      if(line && ctx.measureText(line+character).width>maxWidth) {
        if(/[，。！？；：、）】”’]/u.test(character)) {lines.push(line+character);line='';}
        else {lines.push(line);line=character;}
      } else line += character;
    }
    if(line) lines.push(line);
  }
  return lines;
}
async function makeShareImage() {
  const revision = ++imageRevision;
  shareBlob = null;
  $('#share-image').removeAttribute('src');
  $('#download-image').disabled = true;$('#native-share').disabled = true;
  $('#share-status').textContent = '正在把文字整理成长图…';
  try {
    await document.fonts.ready;
    const includeName = $('#share-name').checked;
    const includeStories = $('#share-stories').checked;
    const includeNote = Boolean(carriedWords() && $('#share-note').checked);
    const segments = buildLetter({stories:includeStories, includeNote});
    const palette = getComputedStyle(document.documentElement);
    const color = name => palette.getPropertyValue(name).trim();
    const width = 900, margin = 76, contentWidth = width-margin*2;
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    const font = size => `${size}px "PingFang SC", "Microsoft YaHei", sans-serif`;
    let y = 270;
    const blocks = segments.map(segment => {
      const size = segment.pull?38:28, lineHeight = segment.pull?65:54;
      ctx.font = font(size);
      const lines = wrapText(ctx,segment.text,contentWidth);
      const block = {lines,size,lineHeight,y,pull:segment.pull};
      y += lines.length*lineHeight+(segment.pull?44:34);
      return block;
    });
    canvas.width = width; canvas.height = Math.ceil(y+310);
    ctx = canvas.getContext('2d');
    const background = ctx.createLinearGradient(0,0,width,canvas.height);
    background.addColorStop(0,color('--paper-top'));background.addColorStop(.55,color('--paper-middle'));background.addColorStop(1,color('--paper-bottom'));
    ctx.fillStyle = background;ctx.fillRect(0,0,width,canvas.height);
    ctx.textBaseline = 'top';
    ctx.font = font(22);ctx.fillStyle=color('--muted');ctx.fillText('心聆  /  一段写给自己的路',margin,58);
    ctx.font = font(52);ctx.fillStyle=color('--ink');ctx.fillText('写给此刻的你。',margin,111);
    const byline = includeName ? $('.letter-byline').textContent : $('.letter-byline time').textContent;
    ctx.font = font(22);ctx.fillStyle=color('--muted');ctx.fillText(byline,margin,190);
    for(const block of blocks) {
      ctx.font = font(block.size);ctx.fillStyle = block.pull ? color('--mint') : color('--body');
      block.lines.forEach((line,index) => ctx.fillText(line,margin,block.y+index*block.lineHeight));
    }
    ctx.font = font(36);ctx.fillStyle=color('--ink');ctx.fillText('心聆',width-margin-80,y+22);
    ctx.font = font(22);ctx.fillStyle=color('--body');ctx.fillText('按你的步调，继续认识自己。',margin,y+99);
    ctx.fillStyle=color('--muted');ctx.font=font(20);
    wrapText(ctx,'依据交流内容整理，不代替专业评估或诊断。',contentWidth).forEach((line,i)=>ctx.fillText(line,margin,y+162+i*35));
    ctx.strokeStyle=color('--line');ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(700,68);ctx.bezierCurveTo(770,90,730,125,795,156);ctx.stroke();
    ctx.fillStyle=color('--mint');ctx.beginPath();ctx.arc(742,96,4,0,Math.PI*2);ctx.fill();
    const blob = await new Promise(resolve => canvas.toBlob(resolve,'image/png'));
    if(!blob) throw new Error('No image produced');
    if(revision !== imageRevision) return;
    shareBlob = blob;
    $('#share-image').src = canvas.toDataURL('image/png');
    $('#share-image').dataset.includesName = String(includeName);
    $('#share-image').dataset.includesStories = String(includeStories);
    $('#share-image').dataset.includesNote = String(includeNote);
    $('#share-status').textContent = `${includeName?'已包含姓名':'未包含姓名'} · ${includeStories?'已包含具体经历':'未包含具体经历'}${includeNote?' · 已包含留言':''}。`;
    $('#download-image').disabled=false;$('#native-share').disabled=false;
  } catch {
    if(revision !== imageRevision) return;
    $('#share-status').textContent='长图暂时生成失败，请关闭后重试；也可以返回复制全文。';
  }
}
$$('[data-share]').forEach(button => button.addEventListener('click', () => {
  renderPersonalEnding();
  $$('.share-options input').forEach(input => { input.checked = false; });
  showDialog($('#share-dialog'), button);
  makeShareImage();
}));
$$('.share-options input').forEach(input => input.addEventListener('change', makeShareImage));
function downloadImage() {
  if(!shareBlob) return;
  const url=URL.createObjectURL(shareBlob),link=document.createElement('a');
  link.href=url;link.download='心聆-写给此刻的你.png';document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
}
$('#download-image').addEventListener('click',()=>{downloadImage();$('#share-status').textContent='已发起长图下载，可以从浏览器下载列表保存或转发。';});
$('#native-share').addEventListener('click',async()=>{
  if(!shareBlob) return;
  const file=new File([shareBlob],'心聆-写给此刻的你.png',{type:'image/png'});
  if(navigator.canShare && navigator.canShare({files:[file]})) {
    try {await navigator.share({files:[file],title:'写给此刻的你'});}
    catch(error) {if(error.name!=='AbortError')$('#share-status').textContent='未能打开转发，可使用“保存长图”后发送。';}
  } else {
    downloadImage();$('#share-status').textContent='此浏览器不支持直接转发，已发起长图下载，可保存后发送。';
  }
});

document.addEventListener('keydown',event=>{
  if(full || document.querySelector('dialog[open]') || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input,textarea,select,[contenteditable=true]'))return;
  if(event.key==='ArrowRight'&&current<chapters.length-1){event.preventDefault();go(current+1);}
  if(event.key==='ArrowLeft'&&current>0){event.preventDefault();go(current-1);}
});
function loadHash(event) {
  full=location.hash==='#report';
  const match=location.hash.match(/^#chapter-(\d+)$/);
  const requested=match?Number(match[1])-1:0;
  if(!full)current=requested>=0&&requested<chapters.length?requested:0;
  renderPage({focus:Boolean(event)});
}
window.addEventListener('hashchange',loadHash);
window.addEventListener('scroll',updateScrollHint,{passive:true});
window.addEventListener('resize',updateScrollHint);
loadHash();
