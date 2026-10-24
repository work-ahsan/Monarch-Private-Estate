(function(){
  'use strict';
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse=window.matchMedia&&window.matchMedia('(pointer: coarse)').matches;
  function rafReady(fn){requestAnimationFrame(function(){requestAnimationFrame(fn)})}

  function enhanceScenes(){
    var sections=[].slice.call(document.querySelectorAll('main>section'));
    var names=sections.map(function(s,i){return s.getAttribute('data-scene-name')||('Chapter '+(i+1))});
    sections.forEach(function(section,i){
      section.classList.add('motion-scene');section.dataset.chapter=String(i).padStart(2,'0');section.dataset.chapterName=names[i];
      if(!section.querySelector(':scope > .scene-line')){var line=document.createElement('span');line.className='scene-line';section.appendChild(line)}
      if(!section.querySelector(':scope > .scene-chapter')){var label=document.createElement('span');label.className='scene-chapter';label.innerHTML='<b>'+String(i+1).padStart(2,'0')+'</b><span>'+names[i]+'</span>';section.appendChild(label)}
    });
    if(!sections.length)return;
    var indicator=document.createElement('div');indicator.className='chapter-indicator';indicator.setAttribute('aria-hidden','true');indicator.innerHTML='<span class="chapter-no">01</span><span class="chapter-bar"><i></i></span><span class="chapter-name">'+names[0]+'</span>';document.body.appendChild(indicator);
    var no=indicator.querySelector('.chapter-no'),name=indicator.querySelector('.chapter-name');
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('scene-in');var idx=sections.indexOf(entry.target);if(idx>0){indicator.classList.add('visible');no.textContent=String(idx+1).padStart(2,'0');name.textContent=names[idx]}else indicator.classList.remove('visible')}})},{threshold:.16,rootMargin:'-7% 0px -26% 0px'});sections.forEach(function(s){io.observe(s)})
    }else sections.forEach(function(s){s.classList.add('scene-in')});
    var ticking=false;function update(){var mid=window.innerHeight*.52,active=null,dist=Infinity;sections.forEach(function(s){var r=s.getBoundingClientRect(),d=Math.abs((r.top+r.height*.45)-mid);if(r.bottom>0&&r.top<window.innerHeight&&d<dist){dist=d;active=s}});if(active){var idx=sections.indexOf(active),r=active.getBoundingClientRect();var p=Math.max(0,Math.min(1,(window.innerHeight-r.top)/(r.height+window.innerHeight*.2)));document.documentElement.style.setProperty('--scene-progress',p.toFixed(3));if(idx>0){indicator.classList.add('visible');no.textContent=String(idx+1).padStart(2,'0');name.textContent=names[idx]}else indicator.classList.remove('visible')}ticking=false}
    window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});update();
  }

  function addMediaMasks(){['.property-media','.journal-img','.location-tile-media','.journal-feature-media'].forEach(function(sel){document.querySelectorAll(sel).forEach(function(el){el.classList.add('scene-mask')})})}

  function addJournalDrag(){
    document.querySelectorAll('.journal-grid').forEach(function(track){
      var down=false,startX=0,startScroll=0,moved=false,max=0;
      function updateRail(){max=Math.max(1,track.scrollWidth-track.clientWidth);var p=Math.max(0,Math.min(1,track.scrollLeft/max));track.style.setProperty('--rail-progress',p.toFixed(3));var head=track.closest('.journal')&&track.closest('.journal').querySelector('.journal-drag-head');if(head)head.style.setProperty('--rail-progress',p.toFixed(3))}
      track.addEventListener('pointerdown',function(e){if(e.button!==0)return;down=true;moved=false;startX=e.clientX;startScroll=track.scrollLeft;track.classList.add('is-dragging');try{track.setPointerCapture(e.pointerId)}catch(_){}});
      track.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-startX;if(Math.abs(dx)>5)moved=true;track.scrollLeft=startScroll-dx*1.08;updateRail()});
      function end(e){if(!down)return;down=false;track.classList.remove('is-dragging');if(moved){track.dataset.justDragged='1';setTimeout(function(){delete track.dataset.justDragged},90)}try{track.releasePointerCapture(e.pointerId)}catch(_){}}
      track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);
      track.addEventListener('click',function(e){if(track.dataset.justDragged==='1'){e.preventDefault();e.stopPropagation()}},true);
      track.addEventListener('scroll',updateRail,{passive:true});
      track.addEventListener('wheel',function(e){if(coarse)return;var horizontal=Math.abs(e.deltaX)>Math.abs(e.deltaY);if(horizontal)return;var maxScroll=track.scrollWidth-track.clientWidth;if(maxScroll<5)return;var atStart=track.scrollLeft<=2,atEnd=track.scrollLeft>=maxScroll-2;if((e.deltaY<0&&atStart)||(e.deltaY>0&&atEnd))return;e.preventDefault();track.scrollLeft+=e.deltaY*.9;updateRail()},{passive:false});
      updateRail();window.addEventListener('resize',updateRail,{passive:true});
    });
  }

  function addDepth(){var items=[].slice.call(document.querySelectorAll('.property-card,.manifesto-detail,.location-tile,.concierge-right,.journal-feature-copy'));items.forEach(function(el,i){el.setAttribute('data-depth','');el.dataset.depthSpeed=String((i%4+1)*.009)});var ticking=false;function update(){var vh=window.innerHeight;items.forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var center=r.top+r.height/2-vh/2;var speed=parseFloat(el.dataset.depthSpeed)||.015;el.style.setProperty('--depth-y',(-center*speed).toFixed(2)+'px')});ticking=false}window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});update()}

  function smoothAnchors(){document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute('href');if(!id||id==='#')return;var target=document.querySelector(id);if(!target)return;e.preventDefault();var header=document.querySelector('.site-header');var off=(header?header.offsetHeight:0)+20;var y=target.getBoundingClientRect().top+window.pageYOffset-off;window.scrollTo({top:y,behavior:reduced?'auto':'smooth'})})}

  function pageTransitions(){
    var curtain=document.querySelector('.page-transition');if(!curtain)return;curtain.classList.add('entering');setTimeout(function(){curtain.classList.remove('entering')},900);
    document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a.page-link');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var href=a.getAttribute('href');if(!href||href.charAt(0)==='#'||a.target==='_blank')return;var url=new URL(href,window.location.href);if(url.origin!==window.location.origin)return;if(url.pathname===window.location.pathname&&url.hash)return;e.preventDefault();curtain.classList.add('leaving');setTimeout(function(){window.location.href=href},460)})
  }

  function smoothWheel(){if(reduced||coarse||window.innerWidth<960)return;var current=window.pageYOffset||0,target=current,running=false,internal=false;function maxY(){return Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}function tick(){var diff=target-current;current+=diff*.115;internal=true;window.scrollTo(0,current);internal=false;if(Math.abs(diff)>0.45){requestAnimationFrame(tick)}else{current=target;window.scrollTo(0,target);running=false}}window.addEventListener('scroll',function(){if(!internal&&!running){current=target=window.pageYOffset||0}},{passive:true});window.addEventListener('wheel',function(e){if(e.ctrlKey||e.metaKey)return;if(e.target.closest&&e.target.closest('.modal-shell,.journal-grid,select,textarea,input'))return;if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();var multiplier=e.deltaMode===1?26:e.deltaMode===2?window.innerHeight:1;target=Math.max(0,Math.min(maxY(),target+e.deltaY*multiplier));if(!running){current=window.pageYOffset||0;running=true;requestAnimationFrame(tick)}},{passive:false})}

  function recoverScrollSafety(){function unlock(){document.body.classList.remove('modal-open');document.body.style.overflow='';document.documentElement.style.overflow=''}document.addEventListener('click',unlock,true);window.addEventListener('pageshow',unlock,{passive:true});unlock()}
  function init(){enhanceScenes();addMediaMasks();addJournalDrag();addDepth();smoothAnchors();pageTransitions();recoverScrollSafety();smoothWheel()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){rafReady(init)});else rafReady(init);
})();
