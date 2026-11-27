/* Specialty page template. Since 11-26 it carries option B's content: full-bleed header video (placeholder for all four),
   name + intro, What you get, Work, How it goes (illustrated with Hook to Wormhole), the other specialties as buttons, and the closing line.
   ?v=full adds the signature section (different on each page) before a small work grid. Each page passes its own copy, art and signature markup. */
(function(){
'use strict';
const ALL=[{k:'commercials',n:'Commercials',i:'k-arch'},{k:'ui',n:'UI and explainers',i:'k-cap'},{k:'3d',n:'3D',i:'k-disc'},{k:'packages',n:'Packages',i:'k-q'}];
const play='<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M5 2l12 8-12 8z"></path></svg>';
/* Simple V1 (Austin, 11-25: simpler is good for V1): no signature section, one big showcase of work instead.
   Layout idea from jamesprola.com: two large pieces, then rows of three, title and credit under each, click to watch.
   Everything shown is a placeholder: the real excerpts already picked plus drawn stand-ins. */
/* Simple is the default since 11-25 (Austin approved). ?v=full brings back the signature sections. */
const SIMPLE=new URLSearchParams(location.search).get('v')!=='full',Q=SIMPLE?'':'?v=full';
const FILL=[{k:'desert',p:0},{k:'wave',p:0},{k:'orb',p:0},{k:'steps',p:0},{k:'spin',p:0},{k:'flow',p:0},{k:'kit',p:0},{k:'chart',p:0}];
const tile=(w,i)=>`<button type="button" class="tile${i<2?' big':''} rv" style="--d:${i%3}" data-i="${i}" aria-label="Watch ${w.clip?w.title+', '+w.credit:'this piece'}"><span class="th"><canvas role="img" aria-label="${w.clip?'Excerpt':'Drawn stand-in for a piece of work'}"></canvas><span class="pl">${play}</span></span><span class="cap"><b>${w.clip?w.title:'[Piece]'}</b><span>${w.clip?w.credit:'[Credit]'}</span></span></button>`;
const piece=w=>`<a class="piece" href="#w-h"><span class="sh"><canvas role="img" aria-label="Drawn stand-in for a piece of work"></canvas></span><span class="lab">${w.clip?w.title+' · '+w.credit:'[Piece] · [Credit]'}</span></a>`;
function build(cfg){
  const me=ALL.find(a=>a.k===cfg.key),others=ALL.filter(a=>a.k!==cfg.key);
  document.title=me.n+' · Amigo Animation';
  const show=SIMPLE?(cfg.show||[...cfg.work.filter(w=>w.clip),...FILL].slice(0,8)):[];
  const ARR='<b class="ar" aria-hidden="true"><svg width="16" height="12" viewBox="0 0 18 12"><path d="M1 6h15M11 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></b>';
  const SEE={commercials:'See commercials',ui:'See UI work','3d':'See 3D work',packages:'See packages'};
  /* How it goes, illustrated with one real job (Hook to Wormhole, Jiffy Learning): still wireframe, storyboard panel, final render. Same as option B. */
  const wire=(()=>{const W=320,H=180,cx=172,cy=86;let r='';for(let i=0;i<7;i++){const k=Math.pow(.66,i);r+=`<rect x="${(cx-150*k).toFixed(1)}" y="${(cy-84*k).toFixed(1)}" width="${(300*k).toFixed(1)}" height="${(168*k).toFixed(1)}" rx="${(26*k).toFixed(1)}"/>`}
    const rays=[[0,0],[W,0],[0,H],[W,H],[W/2,0],[0,H*.55]].map(([x,y])=>`<path d="M${x} ${y}L${cx} ${cy}"/>`).join('');return`<svg class="wire" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${rays}${r}</svg>`})();
  const PV=[wire,'<img src="../shared/media/process/board.jpg" alt="Storyboard panel: the wormhole" loading="lazy">','<video src="../shared/media/process/final.mp4" poster="../shared/media/process/final.jpg" muted loop playsinline preload="metadata" aria-label="Final render: the wormhole"></video>'];
  document.getElementById('page').innerHTML=`
<header class="shead" id="top"><video class="hv" src="../shared/media/clips/starborn_bg.mp4" poster="../shared/media/clips/starborn_bg.jpg" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video>
  <div class="top pad"><a class="logo" href="../main/index.html${Q}" aria-label="Amigo Animation home" data-logo="58"></a>
  <nav class="main" aria-label="Main"><a href="../main/index.html${Q}#work">Work</a><a href="../main/index.html${Q}#doors" aria-current="page">What we make</a><a href="../main/index.html${Q}#about">Team</a><a class="go" href="../main/index.html${Q}#start">Start a project</a></nav></div>
  <div class="intro pad" id="intro"><h1 id="name">${cfg.title}</h1><p class="one">[One line]</p><p class="two">[Who this is for and the problem it solves, in two sentences.]</p></div>
  <svg class="tear b" data-tear="6" aria-hidden="true"></svg><div class="grainy" aria-hidden="true"></div></header>
<main>
<section aria-labelledby="g-h"><div class="head pad"><h2 id="g-h" class="rv">What you get</h2></div>
  <div class="c3">${[0,1,2].map(i=>`<div class="rv" style="--d:${i}"><i class="${['k-arch','k-disc','k-q'][i]}"></i><span class="n">0${i+1}</span><strong>[Deliverable]</strong><p>[One line]</p></div>`).join('')}</div></section>
${SIMPLE?`<section aria-labelledby="w-h"><div class="head pad"><h2 id="w-h" class="rv">Work</h2><span class="rv" style="--d:1">Placeholders until the pieces are picked</span></div>
  <div class="show pad" id="show">${show.map(tile).join('')}</div></section>`:`<section aria-labelledby="s-h"><div class="head pad"><h2 id="s-h" class="rv">${cfg.sigTitle}</h2><span class="rv" style="--d:1">${cfg.sigNote}</span></div>
  <div class="sig" id="sig">${cfg.sig}<div class="grainy" aria-hidden="true"></div></div></section>
<section aria-labelledby="w-h"><div class="head pad"><h2 id="w-h" class="rv">Work</h2><span class="rv" style="--d:1">${cfg.workNote||'Drawn stand-ins until the pieces are picked'}</span></div>
  <div class="grid6" id="grid">${cfg.work.map(piece).join('')}</div></section>`}
<section aria-labelledby="h-h"><div class="head pad"><h2 id="h-h" class="rv">How it goes</h2><span class="rv" style="--d:1">Shown with one real job, Hook to Wormhole for Jiffy Learning</span></div>
  <div class="c3 how">${['Concept','Storyboard and style frames','Animation and delivery'].map((s,i)=>`<div class="rv" style="--d:${i*2}"><figure class="pv pv${i}">${PV[i]}</figure><span class="n">0${i+1}</span><strong>${s}</strong><p>[One line]</p></div>`).join('')}</div></section>
<section aria-labelledby="o-h"><div class="head pad"><h2 id="o-h" class="rv">Other specialties</h2></div>
<nav class="other" aria-labelledby="o-h">${others.map((o,i)=>`<a class="rv" style="--d:${i}" href="../${o.k}/index.html${Q}"><i class="${o.i}"></i><span><strong>${o.n}</strong><small>[One line]</small></span><em class="pillgo"><span>${SEE[o.k]}</span>${ARR}</em></a>`).join('')}</nav></section>
<section class="cta pad"><h2 id="cta-h">Have one of these in mind?</h2><a class="btn rv" href="../main/index.html${Q}#start">Start a project <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17M13 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a></section>
</main>
<footer class="pad"><span>Amigo Productions, Oceanside CA</span></footer>`;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],still=Kit.still;
  Kit.mountLogos();Kit.grain();Kit.tears();
  /* name rises letter by letter, like ANIMATION on the main page */
  const nm=$('#name');nm.setAttribute('aria-label',cfg.title);nm.innerHTML=cfg.title.split(' ').map(w=>`<span class="w" aria-hidden="true">${[...w].map(c=>`<span>${c}</span>`).join('')}</span>`).join(' ');
  $$('#name .w>span').forEach((s,i)=>s.style.setProperty('--i',i));nm.querySelectorAll('.w>span').forEach(s=>s.style.transitionDelay=`calc(${s.style.getPropertyValue('--i')} * 45ms + .15s)`);
  (document.fonts?document.fonts.ready:Promise.resolve()).then(()=>setTimeout(()=>{nm.classList.add('in');document.body.classList.add('go')},150));
  /* header video: placeholder for all four (Star Born, cropped clear of its captions); it drifts slower than the page */
  const hv=$('.hv'),hd=$('.shead');if(still)hv.pause();else hv.play().catch(()=>{});
  if(!still)addEventListener('scroll',()=>requestAnimationFrame(()=>{const y=scrollY;if(y<hd.offsetHeight+80)hv.style.transform=`translate3d(0,${(y*.3).toFixed(1)}px,0)`}),{passive:true});
  /* the process render plays only while it is on screen */
  const fv=$('.pv2 video');if(fv&&'IntersectionObserver' in window)new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&!still?fv.play().catch(()=>{}):fv.pause())).observe(fv);
  /* work grid (?v=full): still until touched, then it plays. On a phone each plays while it is on screen. */
  $$('#grid .piece').forEach((el,i)=>{const a=Kit.media(el.querySelector('canvas'),cfg.work[i],{offset:1.2+i*.9});el.classList.add('open');
    if(Kit.touchy)a.play();else{el.addEventListener('pointerenter',()=>a.play());el.addEventListener('pointerleave',()=>a.pause());el.addEventListener('focus',()=>a.play());el.addEventListener('blur',()=>a.pause())}});
  /* showcase: tiles play on hover (on a phone, while on screen); a click opens the viewer (sound, previous / next, swipe, Esc) */
  if(SIMPLE){$$('#show .tile').forEach((el,i)=>{const w=show[i],a=Kit.media(el.querySelector('canvas'),w,{offset:1.2+i*.9});
      if(Kit.touchy)a.play();else{el.addEventListener('pointerenter',()=>a.play());el.addEventListener('pointerleave',()=>a.pause());el.addEventListener('focus',()=>a.play());el.addEventListener('blur',()=>a.pause())}
      el.addEventListener('click',()=>Viewer.open(show,i,el))})}
  Kit.words($('#cta-h'));Kit.fixG();Kit.once($('#cta-h'),e=>e.classList.add('in'),.5);
  Kit.reveals();
  return{$,$$,simple:SIMPLE};
}
window.Spec={build};
})();
