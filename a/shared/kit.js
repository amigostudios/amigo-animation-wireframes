/* Amigo Animation demos: shared kit.
   Field  = the Shape Kit tile field from the prototype (dark grey at rest, Shape morph with neighbors, Amigo color on touch),
            plus the wake ring and the spread used when the reel opens.
   Art    = drawn, moving stand-ins for the reel and the work. No real work and no generated imagery.
   Kit.*  = small helpers shared by every page (grain, torn edges, reveal, easing). */
(function(){
'use strict';
const D=window.AM_DATA;
const still=matchMedia('(prefers-reduced-motion: reduce)').matches,touchy=matchMedia('(hover: none)').matches;
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease=t=>{t=clamp(t);return t*t*(3-2*t)};
const easeOut=t=>1-Math.pow(1-clamp(t),3);
const easeIO=t=>{t=clamp(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
const back=t=>{t=clamp(t);const c=1.7;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
const hx=h=>h[0]==='#'?[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)):h.match(/[\d.]+/g).slice(0,3).map(Number),cache={};
const mix=(a,b,t)=>{if(t<=0)return a;if(t>=1)return b;const A=cache[a]||(cache[a]=hx(a)),B=cache[b]||(cache[b]=hx(b));return `rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join()})`};
const COL={ground:'#1E1D1C',deep:'#161514',raise:'#2B2A28',line:'#3A3836',ink:'#F1EFEB',dim:'#B4B0AA',terra:'#BA6441',cream:'#F3E9DA',night:'#291F18',ochre:'#BB6C2A',rust:'#8E4427',sun:'#EDA93A',pink:'#E8A98F',pacific:'#143F4E',sea:'#8FC1C9'};

/* ---------- tile field ---------- */
const MARK=[new Path2D(D.L),new Path2D(D.R)];
const DG=[['#1E1D1C','#4A4845'],['#2B2A28','#6B6864'],['#1E1D1C','#8D8983'],['#3A3836','#1E1D1C'],['#2B2A28','#C4C0BA'],['#1E1D1C','#34322F'],['#242322','#8D8983']];
const AM=[['#BA6441','#F3E9DA'],['#291F18','#BA6441'],['#F3E9DA','#291F18'],['#BB6C2A','#291F18'],['#8E4427','#F3E9DA'],['#291F18','#F3E9DA']];
const RP={disc:[.14,.14,.72,.72,.36,.36,.36,.36],arch:[.14,.14,.72,.86,.36,.36,0,0],cap:[.1,.3,.8,.4,.2,.2,.2,.2],q1:[0,0,1,1,0,0,1,0],q2:[0,0,1,1,0,0,0,1],q3:[0,0,1,1,1,0,0,0],q4:[0,0,1,1,0,1,0,0],h1:[0,.5,1,.5,.5,.5,0,0],h3:[0,0,1,.5,0,0,.5,.5]};
const ROUND=Object.keys(RP),KINDS=['disc','arch','cap','q1','stri','q3','zig','dn','h1','q2','ar','q4','stri','wave','disc','zig','mk','cap','q1','ar','dn','arch','q3','stri','h1','disc','wave','q4','cap','q2'];
const LUMP=[[0,.9,.1,.8,.2,.72],[.3,.64,.4,.58,.5,.58],[.58,.58,.66,.6,.72,.66],[.74,.68,.76,.7,.78,.72],[.8,.74,.83,.76,.86,.78],[.88,.8,.9,.81,.93,.82],[.95,.83,.98,.85,1,.86]],BREAK=[[0,.86,.08,.74,.18,.62],[.3,.46,.42,.16,.58,.14],[.76,.12,.92,.26,.93,.46],[.88,.4,.82,.34,.74,.36],[.62,.38,.5,.48,.52,.62],[.54,.76,.62,.84,.72,.84],[.82,.84,.92,.82,1,.78]];
function rr(g,p,x,y,s){g.beginPath();g.roundRect(x+p[0]*s,y+p[1]*s,p[2]*s,p[3]*s,[p[4]*s,p[5]*s,p[6]*s,p[7]*s])}
function wavePath(g,x,y,s,m){g.beginPath();g.moveTo(x,y+s);for(let n=0;n<7;n++){const a=LUMP[n],b=BREAK[n],p=a.map((v,q)=>v+(b[q]-v)*m);g.bezierCurveTo(x+p[0]*s,y+Math.min(1,p[1])*s,x+p[2]*s,y+Math.min(1,p[3])*s,x+p[4]*s,y+Math.min(1,p[5])*s)}g.lineTo(x+s,y+s);g.closePath()}
function shape(g,k,x,y,s,fg,hole,ch){g.fillStyle=fg;if(RP[k]){rr(g,RP[k],x,y,s);g.fill();return}
  if(k==='blank')return;
  if(k==='ch'){g.font=`${(s*1.02).toFixed(1)}px Oaxaca,Impact,sans-serif`;g.textAlign='center';g.textBaseline='alphabetic';g.fillText(ch,x+s/2,y+s*.845);return}
  if(k==='stri'){for(let a=0;a<4;a++)g.fillRect(x-.5,y+s*(a/4+.0625),s+1,s/8)}
  else if(k==='zig'){g.strokeStyle=fg;g.lineWidth=s*.045;g.lineJoin='round';for(let a=0;a<3;a++){g.beginPath();for(let q=0;q<=8;q++){const X=x-s*.05+s*1.1*q/8,Y=y+s*(.25+a*.25)+(q%2?-s*.06:s*.06);q?g.lineTo(X,Y):g.moveTo(X,Y)}g.stroke()}}
  else if(k==='dn'){g.beginPath();g.arc(x+s/2,y+s/2,s*.38,0,Math.PI*2);g.closePath();g.moveTo(x+s/2+s*.15,y+s/2);g.arc(x+s/2,y+s/2,s*.15,0,Math.PI*2,true);g.closePath();g.fill('evenodd')}
  else if(k==='ar'){rr(g,RP.arch,x,y,s);g.fill();g.fillStyle=hole;g.beginPath();g.roundRect(x+s*.32,y+s*.34,s*.36,s*.67,[s*.18,s*.18,0,0]);g.fill()}
  else if(k==='mk'){const q=s*.82/104;g.save();g.translate(x+s/2,y+s/2);g.scale(q,q);g.translate(-53,-50);g.fill(MARK[0]);g.fill(MARK[1]);g.restore()}}
/* greys for the letter tiles: mostly light letters on dark, with a light tile now and then so the row reads as tiles, not a line of type */
const LG=[['#2B2A28','#E4E1DC'],['#1E1D1C','#C4C0BA'],['#C4C0BA','#1E1D1C'],['#3A3836','#F1EFEB'],['#1E1D1C','#E4E1DC'],['#2B2A28','#C4C0BA'],['#8D8983','#1E1D1C']];
const strength=d=>d===0?1:d<=1.01?.8:.55;
/* tile behavior: 'slide' = Slide swap (a colored tile pushes the grey one out, in the direction the cursor is moving), 'morph' = Shape morph.
   Slide is the default since 11-23; add ?tiles=morph to a page's address to see morph again. */
const TILE_MODE=(new URLSearchParams(location.search).get('tiles')||'slide')==='morph'?'morph':'slide';

class Field{
  /* opt.grid(width) -> {C,R,B} where B={x,y,w,h} is the reel window in tiles (or null). opt.slot = element laid over B.
     opt.sleep = tiles beyond the first ring stay hidden until wake(). opt.kinds = fixed list of kinds, in order. */
  constructor(canvas,opt={}){this.c=canvas;this.g=canvas.getContext('2d');this.o=opt;this.tiles=[];this.cx=this.cy=-999;this.hoverT=null;this.dirty=true;this.acc=0;this.last=0;this.now=0;this.spread=0;this.spreadTo=0;this.woke=!opt.sleep;
    this.mode=opt.mode||TILE_MODE;this.dir=[1,0];const P=e=>{const b=canvas.getBoundingClientRect(),X=(e.clientX-b.left)*(this.W/b.width),Y=(e.clientY-b.top)*(this.H/b.height);if(this.cx>-900&&Math.hypot(X-this.cx,Y-this.cy)>.5)this.dir=[X-this.cx,Y-this.cy];this.cx=X;this.cy=Y},off=()=>{this.cx=this.cy=-999};
    canvas.addEventListener('pointermove',P);canvas.addEventListener('pointerdown',P);canvas.addEventListener('pointerleave',off);canvas.addEventListener('pointercancel',off);
    if(touchy){canvas.addEventListener('pointerup',()=>setTimeout(off,600));
      if(!still)setInterval(()=>{const b=canvas.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight||!this.tiles.length||document.hidden||!this.woke)return;const t=this.tiles[Math.floor(Math.random()*this.tiles.length)];this.cx=(t.i+.5)*this.S;this.cy=(t.j+.5)*this.S;setTimeout(off,1100)},2200)}
    new ResizeObserver(()=>this.layout()).observe(canvas.parentElement);this.layout();
    const loop=t=>{requestAnimationFrame(loop);this.frame(t)};requestAnimationFrame(loop)}
  ring(t){const B=this.B;if(!B)return Math.round(Math.hypot(t.i-(this.C-1)/2,t.j-(this.R-1)/2));const dx=Math.max(B.x-t.i,0,t.i-(B.x+B.w-1)),dy=Math.max(B.y-t.j,0,t.j-(B.y+B.h-1));return Math.max(dx,dy)}
  layout(){const c=this.c,w=c.parentElement.clientWidth;if(!w)return;const d=Math.min(2,devicePixelRatio||1),G=this.o.grid(w);if(this.C===G.C&&this.R===G.R&&this.cssW===w)return;this.cssW=w;
    this.C=G.C;this.R=G.R;this.B=G.B||null;const B=this.B;this.S=w*d/G.C;this.W=Math.round(w*d);this.H=Math.round(this.S*G.R);c.width=this.W;c.height=this.H;c.style.height=(this.H/d)+'px';
    const sl=this.o.slot;if(sl&&B){sl.style.left=(B.x/G.C*100)+'%';sl.style.top=(B.y/G.R*100)+'%';sl.style.width=(B.w/G.C*100)+'%';sl.style.height=(B.h/G.R*100)+'%'}
    const r=rng(this.o.seed||11),at={},K=this.o.kinds,LT=G.letters||null;let n=0;this.tiles=[];
    for(let j=0;j<G.R;j++)for(let i=0;i<G.C;i++){if(B&&i>=B.x&&i<B.x+B.w&&j>=B.y&&j<B.y+B.h)continue;const ch=LT&&LT[i+','+j];const kind=ch?'ch':K?K[n%K.length]:KINDS[n%KINDS.length];if(!ch)n++;let gp,ap,tr=0;
      do{gp=DG[Math.floor(r()*DG.length)]}while(tr++<30&&(at[(i-1)+','+j]?.g===gp||at[i+','+(j-1)]?.g===gp));tr=0;
      do{ap=AM[Math.floor(r()*AM.length)]}while(tr++<30&&(at[(i-1)+','+j]?.a===ap||at[i+','+(j-1)]?.a===ap));
      if(kind==='wave'){gp=['#2B2A28','#C4C0BA'];ap=['#143F4E','#F3E9DA']}
      if(ch)gp=LG[(i+j*2)%LG.length];
      const alt=ROUND[Math.floor(r()*ROUND.length)],t={i,j,kind,alt:alt===kind?'disc':alt,g:gp,a:ap,H:0,w:0,wAt:0,dl:0,m:0,mv:0,c:0,pAt:-1,pEnd:-1,v:1,vv:0,show:1,face:{k:ch&&!this.spelled?'blank':kind,col:false},next:null,st:1,dx:1,dy:0,ch};
      t.rg=this.ring(t);if(!this.woke&&t.rg>1&&!ch){t.v=0;t.show=0}at[i+','+j]=t;this.tiles.push(t)}
    this.hoverT=null;this.dirty=true}
  /* Slide swap: the new face pushes the old one out. With a cursor it follows the cursor's direction; in the wake ring it runs outward from the reel. */
  /* the letter tiles arrive one by one, each sliding up into its square */
  spell(gap=70){this.spelled=true;this.tiles.filter(t=>t.ch).forEach((t,k)=>setTimeout(()=>{if(this.mode==='slide')this.swap(t,{k:'ch',col:false},null,[0,-1]);this.dirty=true},still?0:k*gap))}
  swap(t,face,hover,force){if(t.next)t.face=t.next;t.next=face;t.st=still?1:0;let dx=this.dir[0],dy=this.dir[1];if(force){dx=force[0];dy=force[1]}else if(!hover){const B=this.B,bx=B?B.x+B.w/2:this.C/2,by=B?B.y+B.h/2:this.R/2;dx=t.i+.5-bx;dy=(t.j+.5-by)*1.6}
    if(Math.abs(dx)>=Math.abs(dy)){t.dx=dx>=0?1:-1;t.dy=0}else{t.dx=0;t.dy=dy>=0?1:-1}if(still){t.face=face;t.next=null}}
  /* a ring of color runs out from the reel, one row of tiles at a time, then settles to grey */
  wake(){if(this.woke)return;this.woke=true;const t0=performance.now()+60;for(const t of this.tiles){const at=t0+t.rg*(still?0:70);t.pAt=at;t.pEnd=at+(still?0:430);t.showAt=at}}
  pulse(){const t0=performance.now();for(const t of this.tiles){t.pAt=t0+t.rg*70;t.pEnd=t.pAt+380}}
  frame(time){const c=this.c,b0=c.getBoundingClientRect();if(b0.bottom<-50||b0.top>innerHeight+50){this.last=time;return}
    const now=this.now=time;this.acc+=Math.min(100,time-this.last||16);this.last=time;const S=this.S,tiles=this.tiles;
    let nt=null;if(this.cx>-900&&this.woke){const h=this.hoverT,u=this.cx/S,v=this.cy/S,p=.14;if(h&&u>=h.i-p&&u<h.i+1+p&&v>=h.j-p&&v<h.j+1+p)nt=h;else{const i=Math.floor(u),j=Math.floor(v);nt=tiles.find(q=>q.i===i&&q.j===j)||null}}
    this.hoverT=nt;
    for(const t of tiles){let w=0,d=0;if(nt){d=Math.hypot(t.i-nt.i,t.j-nt.j);if(d<=1.5001)w=strength(d)}
      if(w!==t.w){t.w=w;t.wAt=now+(w>0?d*55:(t.dl||0)*30);if(w>0)t.dl=d}
      let H=now>=t.wAt?t.w:t.Hh||0;t.Hh=H;if(t.pAt>=0&&now>=t.pAt&&now<t.pEnd)H=Math.max(H,1);
      if(t.showAt&&now>=t.showAt){t.show=1;t.showAt=0}
      if(t.H!==H){const was=t.H;t.H=H;this.dirty=true;if(this.mode==='slide'&&(!was)!==(!H))this.swap(t,H?{k:t.kind==='wave'||t.kind==='ch'?t.kind:t.alt,col:true}:{k:t.kind,col:false},nt)}}
    let n=0;while(this.acc>=16.67&&n<5){
      if(Math.abs(this.spreadTo-this.spread)>.001){this.spread+=(this.spreadTo-this.spread)*.16;this.dirty=true}else this.spread=this.spreadTo;
      for(const t of tiles){
        if(t.v!==t.show){if(still){t.v=t.show}else{t.vv+=(t.show-t.v)*.16;t.vv*=.68;t.v+=t.vv;if(Math.abs(t.show-t.v)<.002&&Math.abs(t.vv)<.002){t.v=t.show;t.vv=0}}this.dirty=true}
        if(this.mode==='slide'){if(t.next){t.st=Math.min(1,t.st+.055);if(t.st>=1){t.face=t.next;t.next=null}this.dirty=true}continue}
        if(still){if(t.m!==t.H||t.c!==t.H){t.m=t.c=t.H;t.mv=0;this.dirty=true}continue}
        if(Math.abs(t.mv)<.0006&&Math.abs(t.H-t.m)<.0006&&Math.abs(t.H-t.c)<.002){if(t.m!==t.H||t.c!==t.H||t.mv){t.m=t.c=t.H;t.mv=0;this.dirty=true}continue}
        t.mv+=(t.H-t.m)*.14;t.mv*=.7;t.m+=t.mv;t.c+=(t.H-t.c)*(t.H>t.c?.22:.05);this.dirty=true}
      this.acc-=16.67;n++}
    if(n===5)this.acc=0;
    if(!this.dirty)return;this.dirty=false;this.draw()}
  /* one whole tile face: grey or Amigo color, at any offset */
  face(t,f,x,y){const g=this.g,S=this.S,c=f.col?t.a:t.g;g.fillStyle=c[0];g.fillRect(x-.5,y-.5,S+1,S+1);if(f.k==='wave'){g.fillStyle=c[1];wavePath(g,x,y,S,f.col?1:0);g.fill()}else shape(g,f.k,x,y,S,c[1],c[0],t.ch)}
  draw(){const g=this.g,S=this.S,B=this.B,sp=this.spread;g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,this.W,this.H);
    const bx=B?(B.x+B.w/2):this.C/2,by=B?(B.y+B.h/2):this.R/2;
    for(const t of this.tiles){if(t.v<=.01)continue;let x=t.i*S,y=t.j*S;
      if(sp>0){const dx=t.i+.5-bx,dy=t.j+.5-by,l=Math.hypot(dx,dy)||1;x+=dx/l*sp*S*1.1;y+=dy/l*sp*S*1.1}
      const b=mix(t.g[0],t.a[0],t.c),f=mix(t.g[1],t.a[1],t.c),v=Math.max(0,t.v);
      g.save();g.globalAlpha=clamp(v*1.4)*(1-sp*.85);if(v<.999){const k=.62+.38*v;g.translate(x+S/2,y+S/2);g.scale(k,k);g.translate(-x-S/2,-y-S/2)}
      g.beginPath();g.rect(x,y,S,S);g.clip();
      if(this.mode==='slide'){const e=t.st<1?1-Math.pow(1-t.st,3):1;if(t.next){this.face(t,t.face,x+t.dx*e*S,y+t.dy*e*S);this.face(t,t.next,x+t.dx*(e-1)*S,y+t.dy*(e-1)*S)}else this.face(t,t.face,x,y);g.restore();continue}
      g.fillStyle=b;g.fillRect(x,y,S,S);
      if(t.kind==='wave'){g.fillStyle=f;const sq=Math.max(.8,1+t.mv*.5);g.translate(x+S/2,y+S);g.scale(1/sq,sq);g.translate(-x-S/2,-y-S);wavePath(g,x,y,S,t.m);g.fill()}
      else if(RP[t.kind]){const A=RP[t.kind],Bp=RP[t.alt==='q1'||!RP[t.alt]?'disc':t.alt],p=A.map((q,k)=>Math.max(0,q+(Bp[k]-q)*t.m)),sq=Math.max(.7,1+t.mv*.9);g.fillStyle=f;g.translate(x+S/2,y+S/2);g.scale(1/sq,sq);g.translate(-x-S/2,-y-S/2);rr(g,p,x,y,S);g.fill()}
      else{const s=1-t.mv*.8;g.translate(x+S/2,y+S/2);g.scale(s,s);g.translate(-x-S/2,-y-S/2);shape(g,t.kind,x,y,S,f,b,t.ch)}
      g.restore()}}
}

/* ---------- drawn stand-in art ---------- */
const PAL=[
 {s1:'#E9A23B',s2:'#E8A98F',a:'#BA6441',b:'#8E4427',c:'#BB6C2A',d:'#291F18',l:'#F3E9DA'},
 {s1:'#8FC1C9',s2:'#D5E3DA',a:'#143F4E',b:'#0F3040',c:'#3E7C8A',d:'#10262E',l:'#F3E9DA'},
 {s1:'#8E4427',s2:'#BB6C2A',a:'#291F18',b:'#17110D',c:'#5A2C1A',d:'#17110D',l:'#EDA93A'},
 {s1:'#F3E9DA',s2:'#EAD9BF',a:'#BB6C2A',b:'#BA6441',c:'#8E4427',d:'#291F18',l:'#FFFFFF'}];
const MESA=D.MESA.map(d=>new Path2D(d));
function cactus(g,x,y,h,col){const w=h*.105;g.save();g.strokeStyle=col;g.lineCap='round';g.lineJoin='round';g.lineWidth=w;
  g.beginPath();g.moveTo(x,y);g.lineTo(x,y-h+w/2);g.stroke();g.lineWidth=w*.82;
  g.beginPath();g.moveTo(x,y-h*.4);g.lineTo(x-h*.22,y-h*.4);g.arcTo(x-h*.3,y-h*.4,x-h*.3,y-h*.5,h*.09);g.lineTo(x-h*.3,y-h*.66);g.stroke();
  g.beginPath();g.moveTo(x,y-h*.52);g.lineTo(x+h*.2,y-h*.52);g.arcTo(x+h*.29,y-h*.52,x+h*.29,y-h*.62,h*.09);g.lineTo(x+h*.29,y-h*.8);g.stroke();g.restore()}
function zig(g,x,y,w,n,h,col,lw,ph){g.save();g.strokeStyle=col;g.lineWidth=lw;g.lineJoin='round';g.lineCap='round';g.beginPath();const st=w/n;for(let i=-2;i<=n+2;i++){const X=x+(i+ph)*st,Y=y+(i%2?-h:h)*.5;i===-2?g.moveTo(X,Y):g.lineTo(X,Y)}g.stroke();g.restore()}
const loop=(t,per)=>((t%per)+per)%per/per;
const pp=(t,per)=>{const u=loop(t,per);return u<.5?u*2:2-u*2};
const SC={
  desert(g,w,h,t,p){const sky=g.createLinearGradient(0,0,0,h);sky.addColorStop(0,p.s1);sky.addColorStop(.66,p.s2);sky.addColorStop(1,p.s2);g.fillStyle=sky;g.fillRect(0,0,w,h);
    const up=easeIO(pp(t,14));g.fillStyle=p.l;g.beginPath();g.arc(w*.58,h*(.64-.2*up),h*.22,0,7);g.fill();
    g.save();g.beginPath();g.rect(0,0,w,h*.78);g.clip();
    let s=h*.5/929;g.save();g.translate(w*.62,h*.78-1546.6*s);g.scale(s,s);g.translate(-551.6,0);g.fillStyle=p.a;g.fill(MESA[0]);g.fillStyle=p.b;g.fill(MESA[1]);g.restore();
    s=h*.34/929;g.save();g.translate(w*.3,h*.78-1546.6*s);g.scale(-s,s);g.translate(-1606.3,0);g.fillStyle=p.c;g.fill(MESA[0]);g.fillStyle=p.b;g.fill(MESA[1]);g.restore();g.restore();
    g.fillStyle=p.d;g.fillRect(0,h*.78,w,h*.23);cactus(g,w*.16,h*.8,h*.42,p.d);cactus(g,w*.86,h*.8,h*.26,p.d);
    zig(g,0,h*.885,w,26,h*.035,p.a,h*.012,loop(t,1.6)*2)},
  wave(g,w,h,t,p){const warm=p.s1==='#E9A23B',sea=warm?'#143F4E':p.a;g.fillStyle=warm?'#8FC1C9':p.s1;g.fillRect(0,0,w,h);
    g.fillStyle=p.l;g.beginPath();g.arc(w*.17,h*.22,h*.1,0,7);g.fill();
    const u=loop(t,5.2),m=u<.5?back(u/.5):1-easeIO((u-.5)/.5),s=h*.95,x=w*.52-s*.5,y=h*.8-s*.77,k=ease((m-.5)/.5);
    if(k>0){g.fillStyle=sea;g.beginPath();g.arc(x+s*.705,y+s*.6,s*.245*k,0,7);g.fill()}
    g.fillStyle=p.l;wavePath(g,x,y,s,m);g.fill();
    g.fillStyle=sea;g.fillRect(0,h*.8,w,h);zig(g,0,h*.9,w,22,h*.03,p.l,h*.01,loop(t,2)*2)},
  /* a drawn interface: list rows, a shape that morphs when the toggle flips, a cursor that does the flipping */
  ui(g,w,h,t,p){g.fillStyle=p.a;g.fillRect(0,0,w,h);const u=loop(t,6),W=Math.min(w*.74,h*1.25),Hh=W*.62,x=(w-W)/2,y=(h-Hh)/2,r=W*.03;
    const on=u>.34&&u<.84,k=on?back((u-.34)/.12):1-easeIO((u-.84)/.1);const kk=u<.34?0:clamp(k,-.2,1.2);
    g.fillStyle=p.d;g.globalAlpha=.25;g.beginPath();g.roundRect(x+W*.02,y+W*.03,W,Hh,r);g.fill();g.globalAlpha=1;
    g.fillStyle=p.l;g.beginPath();g.roundRect(x,y,W,Hh,r);g.fill();
    g.fillStyle=p.d;for(let i=0;i<3;i++){g.beginPath();g.arc(x+W*(.05+i*.04),y+W*.05,W*.012,0,7);g.fill()}
    g.globalAlpha=.14;g.fillRect(x,y+W*.095,W,W*.004);g.globalAlpha=1;
    for(let i=0;i<4;i++){const e=easeOut((u-.04-i*.05)/.16),rw=W*(.3-.03*(i%2))*e;g.globalAlpha=.16;g.fillStyle=p.d;g.beginPath();g.roundRect(x+W*.06,y+W*(.15+i*.085),rw,W*.045,W*.0225);g.fill();
      g.globalAlpha=1;g.fillStyle=i===1?p.a:p.c;g.beginPath();g.arc(x+W*.083,y+W*(.1725+i*.085),W*.0225*e,0,7);g.fill()}
    const cx=x+W*.7,cy=y+W*.3,S=W*.17,A=RP.disc,Bp=RP.arch,q=A.map((v,i)=>Math.max(0,v+(Bp[i]-v)*kk));g.fillStyle=mix(p.c,p.a,clamp(kk));rr(g,q,cx-S*1.05,cy-S*1.05,S*2.1);g.fill();
    const tx=x+W*.615,ty=y+W*.515,tw=W*.17,th=W*.07;g.fillStyle=mix('#C9BBA6',p.d,clamp(kk));g.beginPath();g.roundRect(tx,ty,tw,th,th/2);g.fill();
    g.fillStyle=p.l;g.beginPath();g.arc(tx+th/2+(tw-th)*clamp(kk,-.05,1.05),ty+th/2,th*.38,0,7);g.fill();
    const c1=easeIO((u-.14)/.18),c2=easeIO((u-.9)/.1),px=x+W*(.3+.42*c1-.42*c2),py=y+W*(.5+.07*c1-.07*c2),cs=W*.05*(1-.18*Math.max(0,1-Math.abs(u-.34)/.03));
    g.save();g.translate(px,py);g.scale(cs,cs);g.fillStyle=p.d;g.strokeStyle=p.l;g.lineWidth=.14;g.lineJoin='round';g.beginPath();g.moveTo(0,0);g.lineTo(0,1.2);g.lineTo(.32,.9);g.lineTo(.56,1.42);g.lineTo(.78,1.32);g.lineTo(.54,.82);g.lineTo(.95,.82);g.closePath();g.fill();g.stroke();g.restore()},
  /* bars and a counter ring: the dashboard beat of a UI film */
  chart(g,w,h,t,p){g.fillStyle=p.l;g.fillRect(0,0,w,h);const u=loop(t,5),n=6,bw=w*.06,gap=w*.03,x0=w*.08,base=h*.8;
    g.fillStyle=p.d;g.globalAlpha=.14;for(let i=0;i<4;i++)g.fillRect(x0,base-h*.16*i-1,w*.51,2);g.globalAlpha=1;
    const hs=[.3,.46,.38,.62,.52,.74];for(let i=0;i<n;i++){const e=u<.82?back((u-.06-i*.06)/.22):1-easeIO((u-.86)/.12),bh=h*hs[i]*.78*Math.max(0,e);g.fillStyle=i===n-1?p.a:i%2?p.c:p.d;g.beginPath();g.roundRect(x0+i*(bw+gap),base-bh,bw,bh,[bw/2,bw/2,0,0]);g.fill()}
    const cx=w*.81,cy=h*.42,R=Math.min(w*.09,h*.19),e=u<.82?easeOut((u-.2)/.5):1-easeIO((u-.86)/.12);g.lineWidth=R*.34;g.lineCap='round';g.strokeStyle=mix(p.l,p.d,.14);g.beginPath();g.arc(cx,cy,R,0,7);g.stroke();
    g.strokeStyle=p.a;g.beginPath();g.arc(cx,cy,R,-Math.PI/2,-Math.PI/2+Math.PI*1.5*Math.max(.001,e));g.stroke();
    g.fillStyle=p.d;g.beginPath();g.roundRect(cx-R,h*.72,R*2*Math.max(0,e),h*.04,h*.02);g.fill();g.globalAlpha=.3;g.beginPath();g.roundRect(cx-R,h*.8,R*1.3*Math.max(0,e),h*.04,h*.02);g.fill();g.globalAlpha=1},
  /* three phone screens passing: an onboarding flow */
  flow(g,w,h,t,p){g.fillStyle=p.c;g.fillRect(0,0,w,h);const u=loop(t,6),ph=h*.74,pw=ph*.5,gap=pw*1.28,idx=Math.floor(u*3),f=easeIO(clamp((u*3-idx-.62)/.38)),sh=(idx+f)*gap;
    for(let i=-1;i<5;i++){const k=((i%3)+3)%3,x=w/2-pw/2+i*gap-sh,d=Math.abs(x+pw/2-w/2)/gap,sc=1-.14*clamp(d),y=(h-ph*sc)/2;if(x>w||x+pw<0)continue;
      g.save();g.translate(x+pw/2,h/2);g.scale(sc,sc);g.translate(-pw/2,-ph/2);g.fillStyle=p.d;g.beginPath();g.roundRect(0,0,pw,ph,pw*.14);g.fill();
      g.fillStyle=k===1?p.a:p.l;g.beginPath();g.roundRect(pw*.05,pw*.05,pw*.9,ph-pw*.1,pw*.1);g.fill();const fg=k===1?p.l:p.d,ac=k===1?p.d:p.a;
      const kind=['disc','arch','q3'][k],S=pw*.62,lv=1-clamp(d*1.4);g.fillStyle=ac;g.save();g.translate(pw/2,ph*.36);g.scale(.8+.2*lv,.8+.2*lv);rr(g,RP[kind],-S/2,-S/2,S);g.fill();g.restore();
      g.fillStyle=fg;g.beginPath();g.roundRect(pw*.2,ph*.62,pw*.6,ph*.035,ph*.02);g.fill();g.globalAlpha=.4;g.beginPath();g.roundRect(pw*.28,ph*.685,pw*.44,ph*.028,ph*.02);g.fill();g.globalAlpha=1;
      g.fillStyle=ac;g.beginPath();g.roundRect(pw*.24,ph*.79,pw*.52,ph*.075,ph*.04);g.fill();
      for(let q=0;q<3;q++){g.fillStyle=fg;g.globalAlpha=q===k?1:.3;g.beginPath();g.arc(pw*(.42+q*.08),ph*.925,pw*.018,0,7);g.fill()}g.globalAlpha=1;g.restore()}},
  /* shaded solids on a turntable: the 3D stand-in */
  orb(g,w,h,t,p){const bg=g.createRadialGradient(w/2,h*.62,0,w/2,h*.62,Math.max(w,h)*.7);bg.addColorStop(0,mix(p.d,p.c,.55));bg.addColorStop(1,p.d);g.fillStyle=bg;g.fillRect(0,0,w,h);
    const cx=w/2,cy=h*.56,RX=Math.min(w*.27,h*.46),RY=RX*.24,a0=t*.7;g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(cx,cy+h*.2,RX*1.5,RY*1.5,0,0,7);g.fill();
    g.strokeStyle=mix(p.d,p.l,.3);g.lineWidth=Math.max(1.5,h*.008);g.beginPath();g.ellipse(cx,cy+h*.2,RX*1.5,RY*1.5,0,0,7);g.stroke();
    const cols=[COL.cream,COL.terra,COL.sun],items=[0,1,2].map(i=>{const a=a0+i*Math.PI*2/3;return{i,x:cx+Math.cos(a)*RX,y:cy+Math.sin(a)*RY,z:Math.sin(a)}}).sort((a,b)=>a.z-b.z);
    for(const it of items){const s=h*.36*(1+.2*it.z),x=it.x,y=it.y,col=cols[it.i],dk=mix(col,'#000000',.62),lt=mix(col,'#FFFFFF',.4);
      g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y+s*.56,s*.5,s*.11,0,0,7);g.fill();
      if(it.i===0){const lg=g.createRadialGradient(x-s*.18,y-s*.2,s*.04,x,y,s*.62);lg.addColorStop(0,lt);lg.addColorStop(.5,col);lg.addColorStop(1,dk);g.fillStyle=lg;g.beginPath();g.arc(x,y,s*.5,0,7);g.fill()}
      else if(it.i===1){const lin=g.createLinearGradient(x-s*.36,0,x+s*.36,0);lin.addColorStop(0,mix(col,'#000000',.4));lin.addColorStop(.32,lt);lin.addColorStop(1,dk);g.fillStyle=lin;g.beginPath();g.moveTo(x-s*.36,y-s*.44);g.lineTo(x-s*.36,y+s*.46);g.ellipse(x,y+s*.46,s*.36,s*.1,0,Math.PI,0,true);g.lineTo(x+s*.36,y-s*.44);g.closePath();g.fill();g.fillStyle=mix(col,'#FFFFFF',.55);g.beginPath();g.ellipse(x,y-s*.44,s*.36,s*.1,0,0,7);g.fill()}
      else{const lin=g.createLinearGradient(x-s*.42,0,x+s*.42,0);lin.addColorStop(0,mix(col,'#000000',.35));lin.addColorStop(.38,lt);lin.addColorStop(1,dk);g.fillStyle=lin;g.beginPath();g.moveTo(x,y-s*.56);g.lineTo(x+s*.42,y+s*.46);g.ellipse(x,y+s*.46,s*.42,s*.11,0,0,Math.PI);g.closePath();g.fill()}}},
  /* the kit itself, morphing in a wave */
  kit(g,w,h,t,p){g.fillStyle=p.d;g.fillRect(0,0,w,h);const R=3,S=h/R,C=Math.ceil(w/S),ox=(w-C*S)/2,ks=['disc','arch','q1','cap','q3','h1','q2','disc','q4'],cs=[[p.a,p.l],[p.d,p.a],[p.l,p.d],[p.c,p.d]];
    for(let j=0;j<R;j++)for(let i=0;i<C;i++){const n=i*3+j*5,[b,f]=cs[(i+j*2)%4],x=ox+i*S,y=j*S,m=ease(pp(t-(i+j)*.22,3.4)*1.6-.3);g.fillStyle=b;g.fillRect(x-.5,y-.5,S+1,S+1);
      const A=RP[ks[n%9]],Bp=RP[ks[(n+4)%9]],q=A.map((v,k)=>Math.max(0,v+(Bp[k]-v)*m));g.fillStyle=f;rr(g,q,x,y,S);g.fill()}},
  /* numbered steps joined by a drawn line: the explainer beat */
  steps(g,w,h,t,p){g.fillStyle=p.d;g.fillRect(0,0,w,h);const u=loop(t,6),n=3,R=Math.min(h*.17,w*.09),y=h*.46,xs=[.2,.5,.8].map(v=>w*v),out=1-easeIO((u-.88)/.1);
    g.strokeStyle=p.a;g.lineWidth=R*.16;g.lineCap='round';g.setLineDash([R*.02,R*.36]);const e=easeIO((u-.1)/.55)*out;g.beginPath();g.moveTo(xs[0],y);g.lineTo(xs[0]+(xs[2]-xs[0])*e,y);g.stroke();g.setLineDash([]);
    const ks=['disc','arch','cap'];for(let i=0;i<n;i++){const k=back((u-.06-i*.24)/.16)*out,S=R*2.3*Math.max(0,k);g.fillStyle=p.d;g.beginPath();g.arc(xs[i],y,R*1.3*clamp(k),0,7);g.fill();g.fillStyle=[p.l,p.s1,p.a][i];rr(g,RP[ks[i]],xs[i]-S/2,y-S/2,S);g.fill();
      const e2=easeOut((u-.14-i*.24)/.14)*out;g.fillStyle=p.l;g.beginPath();g.roundRect(xs[i]-R*.9*e2,y+R*1.75,R*1.8*e2,h*.035,h*.02);g.fill();g.globalAlpha=.4;g.beginPath();g.roundRect(xs[i]-R*.6*e2,y+R*1.75+h*.065,R*1.2*e2,h*.028,h*.02);g.fill();g.globalAlpha=1}}
};
/* ---------- lathe: shaded solids of revolution with a label that turns ---------- */
const sph=(n=56)=>Array.from({length:n+1},(_,i)=>{const y=i/n;return[y,Math.sqrt(Math.max(0,.25-(y-.5)*(y-.5)))]});
const PROD={
  can:{h:.62,p:[[0,.235],[.025,.262],[.05,.27],[.95,.27],[.975,.262],[1,.24]],band:[.16,.84],cap:1,body:'#C4C0BA',lab:['#BA6441','#F3E9DA','#291F18']},
  bottle:{h:.92,p:[[0,.062],[.085,.062],[.09,.075],[.115,.075],[.12,.058],[.27,.058],[.36,.13],[.43,.168],[.47,.175],[.97,.175],[1,.16]],band:[.55,.86],cap:1,body:'#3E7C8A',lab:['#F3E9DA','#143F4E','#BB6C2A']},
  jar:{h:.5,p:[[0,.33],[.14,.33],[.15,.29],[.2,.29],[.27,.37],[.33,.39],[.95,.39],[1,.35]],band:[.42,.86],cap:1,body:'#E8A98F',lab:['#291F18','#EDA93A','#F3E9DA']},
  orb:{h:.5,p:sph(),band:[.3,.7],cap:0,body:'#EDA93A',lab:['#8E4427','#F3E9DA','#291F18']},
  cup:{h:.5,p:[[0,.36],[.03,.37],[1,.25]],band:[.2,.8],cap:1,body:'#F3E9DA',lab:['#BB6C2A','#291F18','#BA6441']},
  vase:{h:.74,p:[[0,.12],[.04,.105],[.12,.1],[.22,.13],[.34,.21],[.46,.27],[.56,.285],[.68,.26],[.82,.2],[.94,.15],[1,.14]],band:[.4,.72],cap:1,body:'#BA6441',lab:['#F3E9DA','#291F18','#EDA93A']},
  spray:{h:.84,p:[[0,.07],[.1,.07],[.105,.1],[.17,.1],[.175,.085],[.24,.085],[.3,.15],[.34,.165],[.97,.165],[1,.15]],band:[.44,.88],cap:1,body:'#291F18',lab:['#EDA93A','#291F18','#F3E9DA']},
  tin:{h:.3,p:[[0,.46],[.2,.46],[.22,.44],[.96,.44],[1,.42]],band:[.36,.86],cap:1,body:'#8E4427',lab:['#F3E9DA','#BA6441','#291F18']}
};
const lum=h=>{const c=cache[h]||(cache[h]=hx(h));return(.3*c[0]+.59*c[1]+.11*c[2])/255};
const greyOf=h=>mix('#1E1D1C','#C4C0BA',clamp(lum(h)*.95));
const rAt=(P,y)=>{for(let i=1;i<P.length;i++)if(y<=P[i][0]){const a=P[i-1],b=P[i],f=(y-a[0])/((b[0]-a[0])||1);return a[1]+(b[1]-a[1])*f}return P[P.length-1][1]};
/* label art, wrapped around the body: u runs around (0..1), v runs down the band (0..1) */
function tex(u,v,asp){u=((u%1)+1)%1;const du=(Math.min(Math.abs(u-.25),1-Math.abs(u-.25)))*asp,dv=v-.5;if(du*du+dv*dv<.105)return 1;if(u>.56&&u<.94){const b=Math.floor(v*7);return b%2===1&&b<6?2:0}return 0}
function lathe(g,cx,base,ph,pr,rot,c){const P=pr.p,top=base-ph,col=h=>mix(greyOf(h),h,c),r0=P[0][1]*ph,rb=P[P.length-1][1]*ph,ey=.2;
  g.save();g.fillStyle='rgba(0,0,0,.34)';g.beginPath();g.ellipse(cx+ph*.04,base+rb*ey*.3,rb*1.25,rb*ey*1.1,0,0,7);g.fill();
  const path=new Path2D();path.moveTo(cx+r0,top);for(const q of P)path.lineTo(cx+q[1]*ph,top+q[0]*ph);path.ellipse(cx,base,rb,rb*ey,0,0,Math.PI);for(let i=P.length-1;i>=0;i--)path.lineTo(cx-P[i][1]*ph,top+P[i][0]*ph);path.closePath();
  g.fillStyle=col(pr.body);g.fill(path);g.save();g.clip(path);
  /* label: each row is painted from exact edges of the art (a disc and a block of stripes), wrapped round the body */
  const y0=pr.band[0],y1=pr.band[1],rows=Math.max(8,Math.round((y1-y0)*ph/1.5)),rm=rAt(P,(y0+y1)/2)*ph,asp=2*Math.PI*rm/((y1-y0)*ph),L=pr.lab.map(col),TAU=Math.PI*2,HP=Math.PI/2;
  const seg=(u1,u2,r,yy,hh,k)=>{let t1=TAU*u1-rot,t2=TAU*u2-rot;const m=(t1+t2)/2,sh=Math.round(m/TAU)*TAU;t1-=sh;t2-=sh;t1=Math.max(t1,-HP);t2=Math.min(t2,HP);if(t2<=t1)return;g.fillStyle=L[k];const xa=cx+Math.sin(t1)*r,xb=cx+Math.sin(t2)*r;g.fillRect(xa,yy,xb-xa,hh)};
  for(let j=0;j<rows;j++){const v=(j+.5)/rows,y=y0+(y1-y0)*j/rows,r=rAt(P,y+(y1-y0)*.5/rows)*ph,yy=Math.round(top+y*ph),hh=Math.round(top+(y0+(y1-y0)*(j+1)/rows)*ph)-yy,dv=v-.5,q=.105-dv*dv;if(hh<=0)continue;
    g.fillStyle=L[0];g.fillRect(cx-r,yy,r*2,hh);if(q>0){const a=Math.sqrt(q)/asp;seg(.25-a,.25+a,r,yy,hh,1)}const bd=Math.floor(v*7);if(bd%2===1&&bd<6)seg(.58,.92,r,yy,hh,2)}
  const R=Math.max(...P.map(q=>q[1]))*ph,sh=g.createLinearGradient(cx-R,0,cx+R,0);sh.addColorStop(0,'rgba(0,0,0,.5)');sh.addColorStop(.16,'rgba(0,0,0,.12)');sh.addColorStop(.3,'rgba(255,255,255,.3)');sh.addColorStop(.42,'rgba(255,255,255,.04)');sh.addColorStop(.7,'rgba(0,0,0,.16)');sh.addColorStop(1,'rgba(0,0,0,.62)');g.fillStyle=sh;g.fillRect(cx-R-2,top-4,R*2+4,ph+rb+8);
  if(!pr.cap){const lg=g.createRadialGradient(cx-R*.35,top+ph*.3,R*.05,cx,top+ph*.5,R*1.1);lg.addColorStop(0,'rgba(255,255,255,.4)');lg.addColorStop(.45,'rgba(255,255,255,0)');lg.addColorStop(1,'rgba(0,0,0,.3)');g.fillStyle=lg;g.fillRect(cx-R,top,R*2,ph)}
  g.restore();if(pr.cap){g.fillStyle=mix(col(pr.body),'#FFFFFF',.34);g.beginPath();g.ellipse(cx,top,r0,r0*ey,0,0,7);g.fill();g.fillStyle=mix(col(pr.body),'#000000',.2);g.beginPath();g.ellipse(cx,top+r0*.02,r0*.78,r0*ey*.74,0,0,7);g.fill()}
  g.restore()}
SC.spin=function(g,w,h,t,p){const bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,p.s1);bg.addColorStop(.68,p.s2);bg.addColorStop(.68,p.b);bg.addColorStop(1,p.a);g.fillStyle=bg;g.fillRect(0,0,w,h);
  const pr=PROD[p===PAL[1]?'bottle':p===PAL[2]?'vase':p===PAL[3]?'jar':'can'],ph=h*.78*pr.h/.92*1.0;lathe(g,w/2,h*.86,Math.min(ph,h*.74),pr,t*1.1,1)};
/* Art: a canvas that plays one or more scenes. With several scenes it cuts between them with a kit shape opening from the middle. */
class Art{
  constructor(canvas,scenes,opt={}){this.c=canvas;this.g=canvas.getContext('2d');this.sc=scenes.map(s=>typeof s==='string'?{k:s,p:0}:s);this.o=opt;this.per=opt.per||4.6;this.t=opt.offset||0;this.on=false;this.last=0;this.seen=true;
    new ResizeObserver(()=>this.size()).observe(canvas);new IntersectionObserver(e=>{this.seen=e[0].isIntersecting;if(this.seen&&this.on)this.kick()}).observe(canvas);this.size()}
  size(){const c=this.c,d=Math.min(2,devicePixelRatio||1),w=Math.round(c.clientWidth*d),h=Math.round(c.clientHeight*d);if(!w||!h)return;if(c.width!==w||c.height!==h){c.width=w;c.height=h}this.draw()}
  get index(){return Math.floor(this.t/this.per)%this.sc.length}
  seek(i){this.t=i*this.per+.001;this.draw()}
  set(i){this.idx=i;this.t=0;this.draw()}
  draw(){const g=this.g,w=this.c.width,h=this.c.height,n=this.sc.length,T=this.t,hold=this.o.hold,i=hold?(this.idx||0):Math.floor(T/this.per)%n,lt=hold?T:T%this.per,cur=this.sc[i];if(!w)return;
    g.setTransform(1,0,0,1,0,0);
    if(!hold&&n>1&&lt<.7&&T>this.per*.5){const prev=this.sc[(i+n-1)%n];SC[prev.k](g,w,h,this.per+lt,PAL[prev.p||0]);const k=easeIO(lt/.7),R=Math.hypot(w,h)*.52*k;g.save();g.beginPath();g.arc(w/2,h/2,R+Math.min(w,h)*.03,0,7);g.fillStyle=COL.cream;g.fill();g.beginPath();g.arc(w/2,h/2,R,0,7);g.clip();SC[cur.k](g,w,h,lt,PAL[cur.p||0]);g.restore()}
    else SC[cur.k](g,w,h,lt,PAL[cur.p||0]);
    if(this.o.onFrame)this.o.onFrame(i,lt/this.per)}
  kick(){if(this.raf||still)return;this.last=0;const f=ts=>{if(!this.on||!this.seen){this.raf=0;return}this.raf=requestAnimationFrame(f);if(this.last)this.t+=Math.min(.05,(ts-this.last)/1000);this.last=ts;this.draw()};this.raf=requestAnimationFrame(f)}
  play(){this.on=true;this.kick()}
  pause(){this.on=false}
}

/* Clip: a real piece of work as a muted, looping excerpt. Same play / pause shape as Art, so either can sit in a slot. */
class Clip{
  constructor(canvas,name,opt={}){const v=this.el=this.v=document.createElement('video'),base=opt.base||'../shared/media/clips/';v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload=opt.preload||'metadata';v.poster=base+name+'.jpg';v.src=base+name+'.mp4';
    if(opt.label){v.setAttribute('role','img');v.setAttribute('aria-label',opt.label)}canvas.replaceWith(v);this.on=false;this.seen=true;
    new IntersectionObserver(e=>{this.seen=e[0].isIntersecting;this.sync()}).observe(v)}
  sync(){if(this.on&&this.seen&&!still)this.v.play().catch(()=>{});else this.v.pause()}
  play(){this.on=true;this.sync()}pause(){this.on=false;this.sync()}size(){}draw(){}
}
/* media(canvas,item): item.clip is a real excerpt, anything else is a drawn stand-in scene */
function media(canvas,item,opt={}){if(item.clip)return new Clip(canvas,item.clip,{...opt,label:item.title?item.title+', '+item.credit:undefined});const a=new Art(canvas,[item],opt);a.el=canvas;return a}
/* ---------- page helpers ---------- */
function grain(){const n=384,cv=document.createElement('canvas');cv.width=cv.height=n;const x=cv.getContext('2d'),im=x.createImageData(n,n),r=rng(3);for(let i=0;i<im.data.length;i+=4){const v=(r()+r())*127.5;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}x.putImageData(im,0,0);const u=cv.toDataURL(),sz=n/Math.min(2,devicePixelRatio||1);document.querySelectorAll('.grainy').forEach(e=>{e.style.backgroundImage=`url(${u})`;e.style.backgroundSize=`${sz}px`})}
function tears(){document.querySelectorAll('svg.tear').forEach(sv=>{const r=rng(+sv.dataset.tear||4),W=1600,H=70;sv.setAttribute('viewBox',`0 0 ${W} ${H}`);sv.setAttribute('preserveAspectRatio','none');const a=[],b=[];let y=26,v=0;for(let x=0;x<=W;x+=7){v+=(r()-.5)*5;v*=.86;y=Math.max(8,Math.min(42,y+v));const n=(r()-.5)*2.4;a.push(`${x},${(y+n).toFixed(1)}`);(sv._a=sv._a||[]).push([x/W,(y+n)/H]);b.push(`${x},${(y+n+5+r()*7).toFixed(1)}`)}
  sv.innerHTML=`<polygon fill="#F7F0E4" points="0,${H} ${a.join(' ')} ${W},${H}"></polygon><polygon fill="#1E1D1C" points="0,${H} ${b.join(' ')} ${W},${H}"></polygon>`})}
/* run fn once when el is a given share on screen */
function once(el,fn,th=.3){if(!el)return;const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){io.disconnect();fn(el)}},{threshold:th});io.observe(el)}
/* .rv elements rise in once; words() splits a heading so it can arrive word by word */
function reveals(){document.querySelectorAll('.rv').forEach(e=>once(e,x=>x.classList.add('in'),.15))}
function words(el){const parts=el.textContent.trim().split(/\s+/);el.setAttribute('aria-label',el.textContent.trim());el.innerHTML=parts.map((w,i)=>`<span class="w" aria-hidden="true" style="--i:${i}"><span>${w}</span></span>`).join(' ')}
/* Oaxaca's G reads as a C, so headings borrow the G from the Amigo wordmark */
function fixG(root=document){root.querySelectorAll('h1,h2,h3,.oax').forEach(h=>{if(!/[Gg]/.test(h.textContent)||h.dataset.g)return;h.dataset.g=1;if(!h.hasAttribute('aria-label'))h.setAttribute('aria-label',h.textContent.trim());
  const tw=document.createTreeWalker(h,NodeFilter.SHOW_TEXT),nodes=[];while(tw.nextNode())nodes.push(tw.currentNode);
  for(const n of nodes){if(!/[Gg]/.test(n.nodeValue))continue;const f=document.createDocumentFragment();n.nodeValue.split(/([Gg])/).forEach(part=>{if(/^[Gg]$/.test(part)){const s=document.createElement('span');s.className='gg';s.innerHTML=`<svg viewBox="261.6 16.6 44.8 46.8" aria-hidden="true"><path fill="currentColor" d="${D.G}"></path></svg>`;f.appendChild(s)}else if(part)f.appendChild(document.createTextNode(part))});n.parentNode.replaceChild(f,n)}})}
function logo(size=58){return `<svg width="${size}" height="${Math.round(size*.965)}" viewBox="0 0 106 101" aria-hidden="true"><path fill="#F3E9DA" d="${D.OUTER}"></path><g class="arms"><path fill="#BA6441" d="${D.L}"></path><path fill="#BA6441" d="${D.R}"></path></g></svg>`}
function mountLogos(){document.querySelectorAll('[data-logo]').forEach(e=>{e.innerHTML=logo(+e.dataset.logo||58)})}
/* the real projects used as placeholder picks (Austin, 11-20-2026) */
const WORK={airport:{clip:'airport',title:'Holiday Spot',credit:'San Diego Airport'},zebra_inventory:{clip:'zebra_inventory',title:'Workcloud Inventory Visibility',credit:'Zebra'},zebra_timekeeping:{clip:'zebra_timekeeping',title:'Workcloud Timekeeping',credit:'Zebra'},zebra_scheduling:{clip:'zebra_scheduling',title:'Workcloud Scheduling',credit:'Zebra'},jiffy_hook:{clip:'jiffy_hook',title:'Hook to Wormhole',credit:'Jiffy Learning'},jiffy_starborn:{clip:'jiffy_starborn',title:'Star Born',credit:'Jiffy Learning'}};
window.Kit={WORK,Field,Art,Clip,media,SC,PAL,RP,COL,PROD,lathe,rr,wavePath,shape,mix,rng,clamp,ease,easeOut,easeIO,back,still,touchy,grain,tears,once,reveals,words,logo,mountLogos,fixG};
})();
