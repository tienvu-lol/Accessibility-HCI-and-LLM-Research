"use strict";
const Threadwell = (() => {
 const tasks=[{title:"Outline the brief",state:"Upcoming",owner:"Mira",date:"Week 1"},{title:"Review the design",state:"In progress",owner:"Ellis",date:"Week 2"},{title:"Prepare the launch",state:"Complete",owner:"Noor",date:"Week 3"}];
 function matchesHelp(text,product,query,filter){return(filter==="all"||product===filter)&&text.toLowerCase().includes(query.trim().toLowerCase());}
 function projectMarkup(view){if(view==="board")return '<div class="board">'+tasks.map(t=>'<div class="task-column"><h3>'+t.state+'</h3><div class="task" data-section="sample-task" data-component="task-card"><strong>'+t.title+'</strong><span>'+t.owner+'</span></div></div>').join('')+'</div>';if(view==="timeline")return '<ol class="timeline">'+tasks.map(t=>'<li data-section="sample-task" data-component="task-row"><strong>'+t.date+': '+t.title+'</strong> — '+t.state+'</li>').join('')+'</ol>';return '<ul>'+tasks.map(t=>'<li class="task" data-section="sample-task" data-component="task-row"><strong>'+t.title+'</strong>'+t.state+' · '+t.owner+'</li>').join('')+'</ul>';}
 function init(){
 const menu=document.querySelector('.suite-toggle'),panel=document.getElementById('suite-menu');
 const close=()=>{if(menu){menu.setAttribute('aria-expanded','false');panel.hidden=true;}};
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));panel.hidden=!open;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){close();menu.focus();}if(e.key==='Escape'&&mobile?.getAttribute('aria-expanded')==='true'){mobile.setAttribute('aria-expanded','false');nav.classList.remove('mobile-open');mobile.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('header'))close();});
 const mobile=document.querySelector('.mobile-toggle'),nav=document.querySelector('nav[aria-label="Primary"]');
 mobile?.addEventListener('click',()=>{const open=mobile.getAttribute('aria-expanded')!=='true';mobile.setAttribute('aria-expanded',String(open));nav.classList.toggle('mobile-open',open);});
 const project=document.getElementById('project-view');if(project){project.innerHTML=projectMarkup('board');document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));project.innerHTML=projectMarkup(b.dataset.view);}));}
 const search=document.getElementById('help-search');if(search){let selected='all';const update=()=>{let count=0;document.querySelectorAll('[data-search]').forEach(d=>{const show=matchesHelp(d.dataset.search,d.dataset.product,document.getElementById('help-query').value,selected);d.hidden=!show;if(show)count++;else d.open=false;});document.getElementById('help-count').textContent=count+' sample topic'+(count===1?'':'s');document.getElementById('help-empty').hidden=count!==0;};search.addEventListener('submit',e=>{e.preventDefault();update();});document.getElementById('help-query').addEventListener('input',update);document.querySelectorAll('[data-help-product]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.helpProduct;document.querySelectorAll('[data-help-product]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));update();}));}
 }
 return {matchesHelp,projectMarkup,init};
})();
if(typeof document!=="undefined")document.addEventListener("DOMContentLoaded",Threadwell.init);
if(typeof module!=="undefined")module.exports=Threadwell;
