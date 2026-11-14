'use strict';
// Everything uses local inline samples. No network requests or storage.
const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#primary-navigation');
const navGroups = [...mainNav.querySelectorAll('details')];
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('is-open', !expanded);
  if (expanded) navGroups.forEach(group => { group.open = false; });
});
navGroups.forEach(group => group.addEventListener('toggle', () => {
  if (group.open) navGroups.filter(other => other !== group).forEach(other => { other.open = false; });
}));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openGroup = navGroups.find(group => group.open);
  if (openGroup) {
    openGroup.open = false;
    openGroup.querySelector('summary').focus();
  } else if (menuButton.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!mainNav.contains(event.target) && event.target !== menuButton && !menuButton.contains(event.target)) {
    navGroups.forEach(group => { group.open = false; });
  }
});
const majorSearch = document.querySelector('#major-search');
if (majorSearch) {
  const field = document.querySelector('#field-filter');
  const campus = document.querySelector('#campus-filter');
  const cards = [...document.querySelectorAll('.program-card')];
  const filter = () => {
    const query = majorSearch.value.trim().toLowerCase();
    let count = 0;
    cards.forEach(card => {
      const match = card.dataset.title.includes(query) && (!field.value || card.dataset.field === field.value) && (!campus.value || card.dataset.campus === campus.value);
      card.hidden = !match;
      if (match) count++;
    });
    document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'program' : 'programs'} found`;
    document.querySelector('#no-programs').hidden = count !== 0;
  };
  majorSearch.addEventListener('input', filter);
  field.addEventListener('change', filter);
  campus.addEventListener('change', filter);
  document.querySelector('#reset-filters').addEventListener('click', () => {
    majorSearch.value = ''; field.value = ''; campus.value = ''; filter(); majorSearch.focus();
  });
}
const dialog = document.querySelector('#request-dialog');
if (dialog) {
  const form = document.querySelector('#demo-form');
  const errors = document.querySelector('#form-errors');
  const success = document.querySelector('#demo-success');
  let opener;
  const clearErrors = () => {
    errors.textContent = '';
    form.querySelectorAll('.field-error').forEach(error => { error.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute('aria-invalid'));
  };
  document.querySelectorAll('[data-open-dialog]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    form.reset(); clearErrors(); form.hidden = false; success.hidden = true; success.textContent = '';
    dialog.showModal();
    dialog.querySelector('.close-dialog').focus();
  }));
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { form.reset(); if (opener) opener.focus(); });
  form.addEventListener('submit', event => {
    event.preventDefault(); clearErrors();
    const name = form.elements.name;
    const email = form.elements.email;
    const date = form.elements.date;
    const issues = [];
    const flag = (input, id, message) => {
      input.setAttribute('aria-invalid', 'true');
      document.getElementById(id).textContent = message; issues.push(message);
    };
    if (!name.value.trim()) flag(name, 'name-error', 'Enter an invented sample name.');
    if (!email.value.trim() || !email.validity.valid) flag(email, 'email-error', 'Enter an email in the format name@example.org.');
    if (date && !date.value) flag(date, 'date-error', 'Choose a sample visit date.');
    if (issues.length) {
      errors.textContent = `Please correct ${issues.length} ${issues.length === 1 ? 'field' : 'fields'} below. ${issues.join(' ')}`;
      errors.focus(); return;
    }
    form.hidden = true; success.hidden = false;
    const heading = document.createElement('h3');
    heading.textContent = form.dataset.kind === 'visit' ? 'Sample request preview — not registered' : 'Your local preparation checklist';
    const detail = document.createElement('p');
    if (form.dataset.kind === 'visit') {
      detail.textContent = `${name.value.trim()}, your fictional preference is ${form.elements.choice.value} on ${date.value}. No visit is booked. No information has been sent or stored.`;
    } else {
      detail.textContent = `${name.value.trim()}, for the ${form.elements.choice.value.toLowerCase()} sample route: gather academic records, explore a major, compare campus options, and review the illustrative timeline. No application has been created or submitted.`;
    }
    success.replaceChildren(heading, detail);
    success.setAttribute('tabindex', '-1'); success.focus();
  });
}
