'use strict';
(() => {
  const all = (selector) => Array.from(document.querySelectorAll(selector));
  const byId = (id) => document.getElementById(id);
  // Inline, intentionally small fictional dataset; no network or storage.
  const records = [
    {title:'Aster Environmental Agency',url:'index.html',words:'home environmental resources water careers grants'},
    {title:'Environmental topics',url:'topics.html',words:'air water science health chemicals land waste greener living'},
    {title:'About AEA',url:'about.html',words:'headquarters offices regions careers grants accessibility privacy science'},
    {title:'Browse news releases',url:'news.html',words:'news water air coast materials language releases'},
    {title:'Contact us about enforcement',url:'contact-enforcement.html',words:'question enforcement website problem demo contact'}
  ];
  const findRecords = (query) => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return words.length ? records.filter((r) => words.every((w) => (r.title+' '+r.words).toLowerCase().includes(w))) : [];
  };
  const toggles = all('[data-toggle]');
  const setPanel = (button, open, restore) => {
    const panel = byId(button.dataset.toggle);
    if (!panel) return;
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    if (open && button.dataset.toggle === 'search-panel') byId('site-query').focus();
    if (!open && restore) button.focus();
  };
  toggles.forEach((button) => button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    if (open && ['primary-menu','search-panel'].includes(button.dataset.toggle)) {
      toggles.filter((b) => b !== button && ['primary-menu','search-panel'].includes(b.dataset.toggle)).forEach((b) => setPanel(b,false,false));
    }
    setPanel(button,open,false);
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const containing = toggles.find((b) => b.getAttribute('aria-expanded') === 'true' && (byId(b.dataset.toggle).contains(document.activeElement) || b === document.activeElement));
    const button = containing || toggles.find((b) => b.getAttribute('aria-expanded') === 'true' && ['primary-menu','search-panel'].includes(b.dataset.toggle));
    if (button) {setPanel(button,false,true); event.preventDefault();}
  });
  const searchForm = byId('search-form');
  if (searchForm) searchForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const query = byId('site-query').value.trim();
    const results = findRecords(query);
    const list = byId('search-results');
    list.replaceChildren();
    results.forEach((record) => {
      const item = document.createElement('li');
      item.dataset.section='site-search-results'; item.dataset.component='search-result';
      const link = document.createElement('a'); link.href=record.url; link.textContent=record.title;
      item.append(link); list.append(item);
    });
    byId('search-status').textContent = !query ? 'Enter one or more search words.' : results.length ? `${results.length} local page${results.length===1?'':'s'} found.` : 'No local pages match. Try water, science or enforcement.';
  });
  const slides = [
    {title:'A clearer picture of our water',copy:'Explore how fictional communities learn about watersheds, from upland streams to the coast.',link:'topics.html#water',label:'Explore water resources →'},
    {title:'Science begins with a question',copy:'Discover how a sample field notebook separates observations, methods and questions.',link:'topics.html#science',label:'Explore science resources →'},
    {title:'Materials have a story',copy:'Follow an imagined community as it considers repair, reuse and the life of everyday materials.',link:'topics.html#land',label:'Explore land and materials →'}
  ];
  let slide = 0;
  const showSlide = (step) => {
    slide = (slide+step+slides.length)%slides.length;
    const data=slides[slide];
    byId('feature-title').textContent=data.title; byId('feature-copy').textContent=data.copy;
    byId('feature-link').href=data.link; byId('feature-link').textContent=data.label;
    byId('slide-status').textContent=`Feature ${slide+1} of ${slides.length}`;
  };
  if (byId('slide-next')) {
    byId('slide-next').addEventListener('click',()=>showSlide(1));
    byId('slide-prev').addEventListener('click',()=>showSlide(-1));
  }
  const filterForm = byId('news-filter');
  const dimensions=['subject','date','office','region','language'];
  const filterNews = () => {
    let count=0;
    all('[data-component="news-card"]').forEach((article) => {
      const match=dimensions.every((key) => !byId('news-'+key).value || byId('news-'+key).value===article.dataset[key]);
      article.hidden=!match; if(match) count++;
    });
    byId('news-status').textContent=count ? `${count} fictional release${count===1?'':'s'} shown.` : 'No fictional releases match these filters. Reset filters or try another region.';
  };
  if(filterForm){
    filterForm.addEventListener('submit',(event)=>{event.preventDefault();filterNews();});
    filterForm.addEventListener('reset',()=>{dimensions.forEach((key)=>{byId('news-'+key).value='';});filterNews();});
  }
  const questionForm=byId('question-form');
  if(questionForm) questionForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const email=byId('demo-email'),topic=byId('demo-topic'),message=byId('demo-message');
    const errors=[
      [email, 'email-error',email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? 'Enter a sample email such as reader@example.test, or leave this optional field empty.' : ''],
      [topic,'topic-error',!topic.value ? 'Choose a topic for your sample question.' : ''],
      [message,'message-error',message.value.trim().length<10 || message.value.trim().length>1000 ? 'Enter a fictional question between 10 and 1000 characters.' : '']
    ];
    errors.forEach(([field,id,text])=>{byId(id).textContent=text;field.setAttribute('aria-invalid',String(Boolean(text)));});
    const invalid=errors.filter((entry)=>entry[2]);
    const feedback=byId('form-feedback');
    if(invalid.length){feedback.textContent=`Please correct ${invalid.length} field${invalid.length===1?'':'s'}. Nothing was sent.`;invalid[0][0].focus();}
    else{feedback.textContent='Demo confirmation: your sample question passed local validation. Nothing was sent, saved or received by an agency.';feedback.focus();}
  });
})();
