(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const icons = () => window.lucide?.createIcons();
  const imageRoot = 'assets/images/';
  const hasLocalArchive = document.documentElement.dataset.localArchive === 'true';
  const menu = $('#menu-toggle');
  const nav = $('#main-nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    menu.title = open ? '메뉴 닫기' : '메뉴 열기';
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('pointerdown', event => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      menu.focus();
    }
  });

  const careData = {
    first: { kicker:'01 / FIRST VISIT', title:'처음 만나는 치과', copy:'방문 전 아이와 나눌 이야기, 보호자가 준비할 내용을 한 장에 담았습니다.', route:'guide-first' },
    growth: { kicker:'02 / GROWING TOGETHER', title:'치아가 자라는 시간', copy:'새 치아가 보인 시점과 아이가 느끼는 변화를 기록하며, 다음 상담에서 궁금한 점을 함께 확인하세요.', route:'growth' },
    home: { kicker:'03 / EVERYDAY CARE', title:'매일의 작은 습관', copy:'아이와 함께하는 양치 시간. 집에서 궁금했던 치약과 생활 관리의 질문을 정리했습니다.', route:'fluoride' },
    after: { kicker:'04 / AFTER YOUR VISIT', title:'진료 후, 다시 보는 안내', copy:'치료 후 받은 설명과 다음 약속을 잊지 않도록. 궁금한 점은 진료한 의료진에게 확인해 주세요.', route:'guide-after' }
  };
  const careButtons = [...document.querySelectorAll('[data-care]')];
  careButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.care;
    const data = careData[key];
    careButtons.forEach(item => {
      const selected = item.dataset.care === key;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    $('#care-kicker').textContent = data.kicker;
    $('#care-answer-title').textContent = data.title;
    $('#care-answer-copy').textContent = data.copy;
    $('#care-link').href = '#read/' + data.route;
  }));

  const rail = $('#review-rail');
  const railButtons = [...document.querySelectorAll('[data-review-direction]')];
  function updateRail() {
    const end = rail.scrollWidth - rail.clientWidth;
    railButtons.forEach(button => {
      button.disabled = Number(button.dataset.reviewDirection) < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= end - 2;
    });
  }
  railButtons.forEach(button => button.addEventListener('click', () => {
    const card = rail.querySelector('.review-card');
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: (card.getBoundingClientRect().width + gap) * Number(button.dataset.reviewDirection), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));
  rail.addEventListener('scroll', updateRail, { passive:true });
  window.addEventListener('resize', updateRail);
  updateRail();

  const entries = {
    first: {
      category:'NATURE JUNIOR JOURNAL / 첫 방문', title:'우리 아이의 첫 치과', image:'doctor-explaining-original.jpg', alt:'진료 도구를 설명하는 정우범 원장',
      lead:'아이에게 치과는 처음 만나는 공간입니다. 그 첫 만남을 준비하는 부모님의 말과 태도를 함께 생각합니다.',
      blocks:[['방문 전의 한마디','무엇을 하러 가는지 아이가 이해할 수 있는 말로 짧게 이야기해 주세요. 잘해야 한다는 약속보다 함께 가겠다는 안정감을 전하는 시간을 가져보세요.'],['아이의 속도','처음의 긴장을 성급하게 평가하지 않고, 아이가 낯선 공간과 사람을 받아들이는 모습을 살펴봅니다.'],['부모님의 질문','아이가 불편해했던 순간, 이전 치과 경험, 부모님이 궁금한 점을 미리 적어 두면 상담할 때 도움이 됩니다.']],
      full:'index.html#/journal/first', sample:true
    },
    fluoride: {
      category:'NATURE JUNIOR JOURNAL / 생활 관리', title:'불소치약 사용 가이드', image:'ai-dental-stilllife.png', alt:'치약과 칫솔, 치아 모형을 담은 콘셉트 이미지',
      lead:'매일 쓰는 치약, 어떤 점을 확인하면 좋을까요? 부모님이 자주 묻는 질문을 모은 칼럼입니다.',
      blocks:[['치약을 고르기 전','제품의 불소 함량과 사용 안내를 살펴보고, 아이의 양치 습관을 의료진과 함께 확인해 보세요.'],['상담에서 물어볼 것','아이에게 맞는 사용량, 양치 마무리 방법, 평소 관리 중 어려웠던 점을 질문 목록에 담아보세요.']],
      full:'index.html#/journal/fluoride', sample:true
    },
    growth: {
      category:'NATURE JUNIOR JOURNAL / 성장 이야기', title:'유치에서 영구치로', image:'ai-child-brushing.png', alt:'치아 모형으로 설명하는 콘셉트 이미지',
      lead:'아이의 치아가 바뀌는 시간에는 새로운 질문이 생깁니다. 오늘 관찰한 작은 변화를 다음 진료로 이어가는 기록입니다.',
      blocks:[['변화를 기록하기','유치가 빠진 시기와 새 치아가 보이기 시작한 때를 가볍게 기록해 보세요.'],['다음 상담에 가져갈 메모','씹을 때 불편해하는지, 입을 다물 때 달라진 모습이 있는지, 부모님이 궁금한 점을 적어 함께 살펴봅니다.']],
      full:'index.html#/journal/growth', sample:true
    },
    'guide-first': {
      category:'PARENT GUIDE / 첫 방문', title:'첫 방문 준비 노트', image:'doctor-highfive-original.jpg', alt:'원장과 아이가 하이파이브하는 장면',
      lead:'처음 만나는 치과를 조금 더 편안하게. 보호자가 준비할 내용을 간단히 정리했습니다.',
      blocks:[['방문 전','아이에게 방문 이유를 간단하게 설명하고, 평소 불편해했던 부분과 궁금한 점을 메모해 주세요.'],['진료실에서','아이가 익숙해지는 속도를 살펴보며, 설명 중 이해되지 않는 부분은 의료진에게 다시 물어보세요.'],['집에 돌아온 뒤','받은 설명과 다음 약속을 기록해 두세요. 치료 후 관리는 진료한 의료진의 안내를 따릅니다.']],
      full:'index.html#/guide/first', sample:true
    },
    'guide-after': {
      category:'PARENT GUIDE / 진료 후', title:'진료 후 확인 노트', image:'ai-dental-stilllife.png', alt:'치아 관리 안내자료 콘셉트 이미지',
      lead:'진료실에서 들었던 내용을 다시 확인할 수 있도록, 꼭 기억할 질문을 정리했습니다.',
      blocks:[['오늘 받은 설명','어떤 치료를 받았는지, 집에서 지켜야 할 안내가 무엇인지 확인해 주세요.'],['다음 약속','다음 방문 시기와 확인할 내용을 기록해 두세요.'],['궁금하거나 불편하다면','개별 치료 후의 주의사항과 증상은 진료한 병원에 문의해 주세요. 이 자료는 개별 처치나 진단을 안내하지 않습니다.']],
      full:'index.html#/guide/aftercare', sample:true
    },
    'film-intro': { category:'DOCTOR\'S FILM / 브랜드 영상', title:'정우범의 진료실', image:'doctor-explaining-original.jpg', alt:'원장 소개 영상 표지', lead:'아이에게 설명하는 순간, 부모님의 질문을 듣는 시간. 정우범 원장의 진료 기준을 담는 소개 영상 구성입니다.', blocks:[['01 · 원장을 만나다','소아치과를 선택한 이유와 아이를 대하는 마음.'],['02 · 진료실의 순간','아이의 눈높이에 맞춰 도구를 설명하고 대화하는 장면.'],['03 · 부모님께','집으로 돌아간 뒤에도 이어지는 설명과 기록.']], film:true },
    'film-first': { category:'DOCTOR\'S FILM / 첫 방문', title:'치과와 친해지는 시간', image:'doctor-highfive-original.jpg', alt:'아이와 교감하는 진료실 장면', lead:'아이와 인사하고, 설명하고, 함께 웃는 순간을 담은 짧은 영상 구성입니다.', blocks:[['영상 구성','첫 인사 → 도구를 알아가는 시간 → 오늘의 하이파이브']], film:true },
    'film-home': { category:'DOCTOR\'S FILM / 생활 관리', title:'함께하는 양치 습관', image:'ai-child-brushing.png', alt:'치아 모형으로 양치를 설명하는 콘셉트 이미지', lead:'일상의 양치 시간에 부모님과 함께 꺼내 보는 짧은 영상 구성입니다.', blocks:[['영상 구성','양치 준비 → 아이와 함께하는 시간 → 다음 질문 남기기']], film:true },
    'day-highfive': { category:'NATURE DAILY / 진료실의 순간', title:'오늘의 하이파이브', image:'doctor-highfive-original.jpg', alt:'원장과 아이의 하이파이브', lead:'진료실에서 나누는 인사, 작은 용기에 건네는 격려. 네이처의 하루는 이런 순간들로 채워집니다.', daily:true },
    'day-desk': { category:'NATURE DAILY / 콘셉트', title:'설명을 준비하는 시간', image:'ai-dental-stilllife.png', alt:'치아 모형과 도구가 놓인 책상 콘셉트', lead:'말로만 설명하기 어려운 것들을 모형과 그림으로 풀어내는 시간. 다음 만남을 준비하는 책상의 풍경을 담았습니다.', daily:true, concept:true },
    'day-question': { category:'NATURE DAILY / 원장의 기록', title:'작은 질문 하나까지', image:'doctor-explaining-original.jpg', alt:'원장이 아이에게 설명하는 장면', lead:'아이의 궁금증에서 시작하는 대화. 작은 질문 하나가 치과를 조금 더 익숙하게 만드는 계기가 됩니다.', daily:true },
    'day-brush': { category:'NATURE DAILY / 콘셉트', title:'하루의 작은 습관', image:'ai-child-brushing.png', alt:'어린이의 양치 습관 콘셉트', lead:'집에서도 이어지는 치아 관리 이야기. 아이와 함께하는 일상의 순간을 기록합니다.', daily:true, concept:true }
  };
  const collections = {
    journal: { title:'네이처쥬니어치과 칼럼', category:'아이와 부모를 위한 치과 이야기', keys:['first','fluoride','growth'] },
    daily: { title:'네이처 데일리', category:'NATURE DAILY', keys:['day-highfive','day-desk','day-question','day-brush'] }
  };
  const reader = $('#reader');
  const readerBody = $('#reader-body');
  const baseTitle = document.title;
  let returnHash = '#home';
  let returnFocus = null;
  let routeClosing = false;
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const arrow = '<i data-lucide="arrow-up-right" aria-hidden="true"></i>';

  function renderEntry(key) {
    const collection = collections[key];
    const entry = entries[key];
    if (!entry && !collection) return false;
    $('#share-fallback').hidden = true;
    if (collection) {
      $('#reader-category').textContent = collection.category;
      readerBody.innerHTML = `<div class="reader-content"><p class="eyebrow">THE DOCTOR'S RECORDS</p><h2 id="reader-title" tabindex="-1">${escape(collection.title)}</h2><div class="reader-list">${collection.keys.map(item => `<a href="#read/${item}"><div><span>${escape(entries[item].category)}</span><strong>${escape(entries[item].title)}</strong></div>${arrow}</a>`).join('')}</div></div>`;
    } else {
      $('#reader-category').textContent = entry.category;
      const notice = entry.film ? '영상 표지 및 구성 시안입니다. 연결된 원본 영상은 아직 없습니다.' : entry.sample ? '콘텐츠 시안 · 원장 집필 및 감수 완료본이 아닙니다.' + (hasLocalArchive ? ' 아래 링크에서 기존 제작 전문과 참고자료를 확인할 수 있습니다.' : '') : entry.concept ? 'SNS 콘텐츠 시안 · AI 콘셉트 이미지입니다.' : 'SNS 게시 문안 시안 · 원장 제공 사진을 활용했습니다.';
      readerBody.innerHTML = `<article class="reader-content"><p class="eyebrow">${escape(entry.film ? 'FILM PREVIEW' : entry.daily ? 'A NOTE FROM NATURE' : '부모님을 위한 기록')}</p><h2 id="reader-title" tabindex="-1">${escape(entry.title)}</h2><p>${escape(entry.lead)}</p><img class="reader-image" src="${imageRoot + entry.image}" alt="${escape(entry.alt)}">${entry.film ? '<div class="reader-status"><i data-lucide="video" aria-hidden="true"></i>영상 구성 미리보기 · 원본 연결 전</div>' : ''}${(entry.blocks || []).map(([title,copy]) => `<h3>${escape(title)}</h3><p>${escape(copy)}</p>`).join('')}${entry.full && hasLocalArchive ? `<a class="text-link" href="${entry.full}" target="_blank" rel="noopener noreferrer">제작된 전문과 참고자료 ${arrow}</a>` : ''}<p class="reader-note">${escape(notice)}</p></article>`;
    }
    document.title = (entry?.title || collection.title) + ' | 닥터인사이트';
    icons();
    return true;
  }
  function syncRoute() {
    const key = location.hash.startsWith('#read/') ? location.hash.slice(6) : null;
    if (key && renderEntry(key)) {
      if (!reader.open) {
        returnFocus = document.activeElement;
        reader.showModal();
        document.body.classList.add('modal-open');
      }
      reader.scrollTop = 0;
      $('#reader-title').focus({preventScroll:true});
    } else {
      if (reader.open) {
        routeClosing = true;
        reader.close();
      }
      document.body.classList.remove('modal-open');
      document.title = baseTitle;
      if (!key) returnHash = location.hash || '#home';
    }
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#read/"]');
    if (link && !reader.open) {
      returnHash = location.hash || '#home';
      returnFocus = link;
    }
    if (link && link.hash === location.hash) syncRoute();
  });
  $('#close-reader').addEventListener('click', () => reader.close());
  reader.addEventListener('click', event => {
    if (event.target !== reader) return;
    const bounds = reader.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) reader.close();
  });
  reader.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    document.title = baseTitle;
    if (!routeClosing && location.hash.startsWith('#read/')) history.replaceState(null, '', returnHash);
    routeClosing = false;
    if (returnFocus?.isConnected && !reader.contains(returnFocus)) returnFocus.focus({preventScroll:true});
  });
  let toastTimer;
  function toast(message) {
    $('#toast').textContent = message;
    $('#toast').classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2400);
  }
  $('#share-reader').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(location.href);
      toast('자료 링크를 복사했습니다.');
    } catch {
      $('#share-fallback').hidden = false;
      $('#share-url').value = location.href;
      $('#share-url').focus();
      $('#share-url').select();
    }
  });
  window.addEventListener('hashchange', syncRoute);
  syncRoute();
  icons();
})();
