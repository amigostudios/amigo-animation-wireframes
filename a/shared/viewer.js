/* The work viewer (11-26, same behavior as option B's): tap or click a piece to watch it big, with sound and controls.
   Previous / next buttons, arrow keys, swipe sideways on a phone, swipe down or Esc or a click outside to close.
   Viewer.open(list, i, from): list = [{clip,title,credit}] (a drawn stand-in when clip is empty), from = the element to refocus. */
(function(){
'use strict';
const ARROW='<svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path d="M1 6h15M11 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
let V=null,L=[],I=0,from=null,art=null;
function build(){
  V=document.createElement('div');V.className='vw';V.setAttribute('role','dialog');V.setAttribute('aria-modal','true');V.setAttribute('aria-label','Work viewer');V.hidden=true;
  V.innerHTML=`<div class="vw-in"><div class="vw-st"></div><div class="vw-bar"><button class="vw-b vw-p" type="button" aria-label="Previous piece">${ARROW}</button><p class="vw-cap"><b></b><span></span></p><small class="vw-n"></small><button class="vw-b vw-n2" type="button" aria-label="Next piece">${ARROW}</button></div></div>
  <button class="vw-x" type="button" aria-label="Close"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path></svg></button>`;
  document.body.appendChild(V);
  V.querySelector('.vw-x').addEventListener('click',close);
  V.addEventListener('click',e=>{if(e.target===V||e.target.classList.contains('vw-in'))close()});
  V.querySelector('.vw-p').addEventListener('click',()=>show(I-1));V.querySelector('.vw-n2').addEventListener('click',()=>show(I+1));
  addEventListener('keydown',e=>{if(V.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(I-1);if(e.key==='ArrowRight')show(I+1)});
  let sx=null,sy=0;V.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
  V.addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;sx=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4)show(I+(dx<0?1:-1));else if(dy>90&&Math.abs(dy)>Math.abs(dx)*1.4)close()},{passive:true});
}
function stop(){const st=V.querySelector('.vw-st'),v=st.querySelector('video');if(v){v.pause();v.removeAttribute('src');v.load()}if(art&&art.pause)art.pause();art=null;st.innerHTML=''}
function show(i){const n=L.length;I=((i%n)+n)%n;const w=L[I],st=V.querySelector('.vw-st');stop();
  if(w.clip){const v=document.createElement('video');v.src='../shared/media/clips/'+w.clip+'.mp4';v.poster='../shared/media/clips/'+w.clip+'.jpg';v.controls=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');st.appendChild(v);v.muted=false;v.play().catch(()=>{v.muted=true;v.play().catch(()=>{})})}
  else{const c=document.createElement('canvas');st.appendChild(c);art=new Kit.Art(c,[w],{});art.size&&art.size();art.play()}
  V.querySelector('.vw-cap b').textContent=w.clip?w.title:'[Piece]';V.querySelector('.vw-cap span').textContent=w.clip?w.credit:'[Credit]';V.querySelector('.vw-n').textContent=(I+1)+' / '+n;
  V.querySelectorAll('.vw-b').forEach(b=>b.hidden=n<2)}
function open(list,i,el){if(!V)build();L=list;from=el||null;show(i);V.hidden=false;requestAnimationFrame(()=>V.classList.add('on'));document.documentElement.classList.add('vw-lock');V.querySelector('.vw-x').focus({preventScroll:true})}
function close(){if(!V||V.hidden)return;V.classList.remove('on');document.documentElement.classList.remove('vw-lock');setTimeout(()=>{V.hidden=true;stop()},Kit.still?0:300);if(from)from.focus({preventScroll:true})}
window.Viewer={open,close};
})();
