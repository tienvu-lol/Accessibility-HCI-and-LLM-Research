"use strict";
const agencies = [
 {name:"Civic Records Office",category:"Government",text:"Public records and document stewardship."},
 {name:"Community Learning Council",category:"Community",text:"Libraries and lifelong learning."},
 {name:"Family Resource Bureau",category:"Community",text:"Community support information."},
 {name:"Forest and River Agency",category:"Environment",text:"Trails, forests and waterways."},
 {name:"Public Service Commission",category:"Government",text:"Government organization and service standards."},
 {name:"Regional Travel Office",category:"Environment",text:"Regional travel and outdoor access."}
];
const searchRecords = [
 {name:"Services & resources",text:"Education health business travel",url:"services.html"},
 {name:"Agencies",text:"Find an agency office directory",url:"agencies.html"},
 {name:"State government",text:"Executive legislative judicial branches",url:"government.html"},
 {name:"Government services",text:"Civic participation public records",url:"service-category.html"},
 ...agencies.map(a=>({name:a.name,text:a.text,url:"agencies.html"}))
];
function filterAgencies(query,categories){const q=query.trim().toLowerCase();return agencies.filter(a=>(!categories.length||categories.includes(a.category))&&(a.name+" "+a.text).toLowerCase().includes(q));}
function findRecords(query){const q=query.trim().toLowerCase();return q?searchRecords.filter(r=>(r.name+" "+r.text).toLowerCase().includes(q)):[];}
function makeResult(item,kind){const article=document.createElement("article");article.dataset.section=kind+"-result";article.dataset.component="directory-result";const heading=document.createElement("h3");const link=document.createElement("a");link.href=item.url||"government.html";link.textContent=item.name;heading.append(link);const p=document.createElement("p");p.textContent=item.category?item.category+" · "+item.text:item.text;article.append(heading,p);return article;}
function init(){
 const toggle=document.querySelector("#menu-toggle"),nav=document.querySelector("#primary-nav");
 function closeMenu(){nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");}
 toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")!=="true";toggle.setAttribute("aria-expanded",String(open));nav.classList.toggle("is-open",open);});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){document.querySelectorAll("details[open]").forEach(d=>{d.open=false;d.querySelector("summary").focus();});if(toggle.getAttribute("aria-expanded")==="true"){closeMenu();toggle.focus();}}});
 const search=document.querySelector("#search-form");if(search)search.addEventListener("submit",e=>{e.preventDefault();const q=document.querySelector("#search-query").value;const results=findRecords(q);document.querySelector("#search-results").replaceChildren(...results.map(r=>makeResult(r,"search")));document.querySelector("#search-status").textContent=q.trim()?(results.length?results.length+" local sample results.":"No local sample results. Try records, learning or travel."):"Enter a keyword to search the local sample.";});
 const filters=document.querySelector("#agency-filters");if(filters){const update=()=>{const chosen=Array.from(filters.querySelectorAll("input:checked"),e=>e.value),found=filterAgencies(document.querySelector("#agency-query").value,chosen);document.querySelector("#agency-results").replaceChildren(...found.map(r=>makeResult(r,"agency")));document.querySelector("#agency-status").textContent=found.length?found.length+" of "+agencies.length+" fictional agencies.":"No agencies match. Clear a filter or try another keyword.";};filters.addEventListener("input",update);filters.addEventListener("submit",e=>e.preventDefault());filters.addEventListener("reset",()=>setTimeout(update,0));update();}
 const dialog=document.querySelector("#feedback-dialog"),open=document.querySelector("#feedback-open"),close=document.querySelector("#feedback-close");
 open.addEventListener("click",()=>{dialog.showModal();document.querySelector("#feedback-text").focus();});close.addEventListener("click",()=>dialog.close());dialog.addEventListener("close",()=>open.focus());
 document.querySelector("#feedback-form").addEventListener("submit",e=>{e.preventDefault();const field=document.querySelector("#feedback-text"),error=document.querySelector("#feedback-error"),status=document.querySelector("#feedback-status");if(field.value.trim().length<10){error.textContent="Enter at least 10 characters to try the feedback exercise.";field.setAttribute("aria-invalid","true");status.textContent="";field.focus();return;}error.textContent="";field.removeAttribute("aria-invalid");status.textContent="Demo feedback complete. Nothing was sent or saved.";field.value="";});
}
if(typeof document!=="undefined")document.addEventListener("DOMContentLoaded",init);
if(typeof module!=="undefined")module.exports={agencies,searchRecords,filterAgencies,findRecords,makeResult,init};
