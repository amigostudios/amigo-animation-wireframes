/* Site header, matched to the amigosd.com rebuild (Header.tsx), same as option B (line.js siteHeader, 11-26):
   cactus logo top left, Work Sans links with a clay underline and a clay "Start a project" pill; a dark bar fades in
   once scrolled; it tucks away scrolling down and comes back on the first scroll up.
   Phones: burger -> full-screen clay menu with the four specialties as pictures.
   A keeps its in-page .top bar as a spacer (its contents hide once this header is in). */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const spec=!!document.getElementById('page'),full=new URLSearchParams(location.search).get('v')==='full'?'?v=full':'';
const home=spec?'../main/index.html'+full:'',h=k=>home+'#'+k;
const DOORS=[['commercials','Commercials','airport'],['ui','UI and explainers','zebra_scheduling'],['3d','3D','jiffy_hook'],['packages','Packages','zebra_inventory']];
function build(){
  if($('.nh'))return;
  const hd=document.createElement('header');hd.className='nh';
  hd.innerHTML=`<a class="nh-logo" href="${spec?home:'#top'}" aria-label="Amigo Animation, home"><img src="../shared/media/amigo-logo.png" alt="" width="89" height="86"></a>
    <nav aria-label="Main"><ul class="nh-nav">${[['Work','work'],['What we make','doors'],['Team','about']].map(([t,k])=>`<li><a class="nt" href="${h(k)}">${t}</a></li>`).join('')}<li><a class="nh-cta" href="${h('start')}">Start a project</a></li></ul></nav>
    <button class="nh-burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nh-menu"><span></span></button>`;
  const mm=document.createElement('div');mm.className='nh-menu';mm.id='nh-menu';mm.setAttribute('role','dialog');mm.setAttribute('aria-modal','true');mm.setAttribute('aria-label','Menu');mm.setAttribute('aria-hidden','true');
  mm.innerHTML=`<button class="nh-x" type="button" aria-label="Close menu"><span></span></button><nav aria-label="Menu">
    <a class="m-link" style="--i:0" href="${h('work')}">Work</a><a class="m-link" style="--i:1" href="${h('doors')}">What we make</a>
    <ul class="m-work">${DOORS.map(([k,n,t],i)=>`<li style="--i:${2+i*.5}"><a href="../${k}/index.html${full}"><img src="../shared/media/clips/${t}.jpg" alt="" width="440" height="248" loading="lazy"><span>${n}</span></a></li>`).join('')}</ul>
    <a class="m-link" style="--i:4.5" href="${h('about')}">Team</a></nav>
    <div class="m-foot" style="--i:5.5"><a class="m-cta" href="${h('start')}">Start a project</a><p><span>[Phone]</span><span>[Email]</span></p></div>`;
  document.body.prepend(mm);document.body.prepend(hd);document.documentElement.classList.add('has-nh');
  const burger=$('.nh-burger',hd),x=$('.nh-x',mm);
  const set=on=>{mm.classList.toggle('open',on);mm.setAttribute('aria-hidden',!on);burger.setAttribute('aria-expanded',on);document.documentElement.classList.toggle('vw-lock',on);(on?x:burger).focus({preventScroll:true})};
  burger.addEventListener('click',()=>set(true));x.addEventListener('click',()=>set(false));
  $$('a',mm).forEach(a=>a.addEventListener('click',()=>set(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&mm.classList.contains('open'))set(false)});
  let last=scrollY,raf=0;
  const read=()=>{raf=0;const y=scrollY;hd.classList.toggle('scrolled',y>24);if(y<160)hd.classList.remove('away');else if(y>last+6)hd.classList.add('away');else if(y<last-6)hd.classList.remove('away');last=y};
  read();addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(read)},{passive:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
