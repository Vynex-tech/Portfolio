const $=s=>document.querySelector(s),clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(a-b)*-t;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
// word pull-up
document.querySelectorAll('[data-pull]').forEach(el=>{
 el.innerHTML=el.textContent.trim().split(/\s+/).map((w,i)=>`<span style="--i:${i}">${w}</span>`).join('');
});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.3});
document.querySelectorAll('.pull').forEach(e=>io.observe(e));
// marquee
const words=['Web design','Electronics','ESP32 / IoT','AI / ML','3D web','Photography','Video editing','Music'];
const row=words.map(w=>`<span>${w}</span>`).join('');$('#mq').innerHTML=row+row;
// projects
const P=[
 {t:'NER-SHIELD',a:'a1',d:'A landslide monitoring system that combines sensors, IoT nodes and AI to give early warnings before slopes fail.',g:['AI','IoT','Sensors','Early warning']},
 {t:'GEOOPT',a:'a2',d:'Optical fiber sensing with AI analysis, built on ESP32 hardware and LoRa links for long-range data.',g:['Optical fiber','AI','ESP32','LoRa']},
 {t:'Vignesh Digital Lab',a:'a3',d:'A cinematic, scroll-controlled portfolio and studio site built with React and Framer Motion.',g:['React','Framer Motion','Scroll animation']},
 {t:'Visual experiments',a:'a4',d:'Studies in 3D web, motion, photography and video editing, used to test ideas before they reach client work.',g:['3D web','Video','Photography']}];
const dlg=$('#dlg');
document.querySelectorAll('.pc').forEach(b=>b.addEventListener('click',()=>{
 const p=P[b.dataset.k];$('#dt').textContent=p.t;$('#dd').textContent=p.d;
 $('#dart').className='art '+p.a;$('#dg').innerHTML=p.g.map(x=>`<em>${x}</em>`).join('');dlg.showModal();
}));
$('#dx').onclick=()=>dlg.close();
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
// scroll engine
const prog=el=>{const r=el.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight))};
let ex=0,ext=0,wk=0,wkt=0,ticking=false;
const card=$('#card'),w1=$('#w1'),w2=$('#w2'),rev=$('#rev'),hint=$('#hint'),track=$('#track');
function read(){
 const H=document.documentElement;
 $('#bar').style.transform=`scaleX(${scrollY/(H.scrollHeight-innerHeight||1)})`;
 ext=prog($('#expand'));wkt=prog($('#work'));
}
function draw(){
 ex=RM?ext:ex+(ext-ex)*.12;wk=RM?wkt:wk+(wkt-wk)*.12;
 const m=innerWidth<768,W=Math.min(innerWidth*.95,300+ex*(m?650:1250)),Hh=400+ex*(m?200:400);
 card.style.width=W+'px';card.style.height=Hh+'px';
 const tx=ex*(m?55:38);w1.style.transform=`translateX(${-tx}vw)`;w2.style.transform=`translateX(${tx}vw)`;
 hint.style.opacity=1-ex*3;rev.classList.toggle('on',ex>.78);
 const max=track.scrollWidth-innerWidth;track.style.transform=`translateX(${-wk*max}px)`;
 requestAnimationFrame(draw);
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(()=>{read();ticking=false})}},{passive:true});
addEventListener('resize',read);read();draw();
// cursor
const cur=$('#cur');let cx=0,cy=0,mx=0,my=0;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
(function c(){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;cur.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(c)})();
document.querySelectorAll('a,button').forEach(e=>{e.addEventListener('pointerenter',()=>cur.classList.add('big'));e.addEventListener('pointerleave',()=>cur.classList.remove('big'))});
// nav sliding square indicator
(function(){
 const nav=document.getElementById('mainNav');
 const indicator=document.getElementById('navIndicator');
 const links=nav.querySelectorAll('.nav-link');
 function moveIndicator(el){
  const navRect=nav.getBoundingClientRect();
  const elRect=el.getBoundingClientRect();
  const pad=4;
  indicator.style.left=(elRect.left-navRect.left-pad)+'px';
  indicator.style.top=(elRect.top-navRect.top-pad)+'px';
  indicator.style.width=(elRect.width+pad*2)+'px';
  indicator.style.height=(elRect.height+pad*2)+'px';
  indicator.style.opacity='1';
 }
 function setActive(el){
  links.forEach(l=>l.classList.remove('active'));
  el.classList.add('active');
 }
 // position on the initial active link
 const initActive=nav.querySelector('.nav-link.active');
 if(initActive){requestAnimationFrame(()=>moveIndicator(initActive))}
 links.forEach(link=>{
  link.addEventListener('pointerenter',()=>moveIndicator(link));
  link.addEventListener('click',()=>{setActive(link);moveIndicator(link)});
 });
 nav.addEventListener('pointerleave',()=>{
  const active=nav.querySelector('.nav-link.active');
  if(active){moveIndicator(active)}else{indicator.style.opacity='0'}
 });
 window.addEventListener('resize',()=>{
  const active=nav.querySelector('.nav-link.active');
  if(active)moveIndicator(active);
 });
})();
