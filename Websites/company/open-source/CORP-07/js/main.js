document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Mortgage Calculator
  const calcForm = document.getElementById('mortgage-calc-form');
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const principal = parseFloat(document.getElementById('principal').value);
      const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
      const months = parseInt(document.getElementById('term').value) * 12;
      
      if (isNaN(principal) || isNaN(rate) || isNaN(months) || principal <= 0 || rate <= 0 || months <= 0) {
        alert('Please enter valid positive numbers for all fields.');
        return;
      }

      const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      document.getElementById('monthly-payment').textContent = '$' + monthlyPayment.toFixed(2);
      document.getElementById('result').classList.remove('hidden');
    });
  }

  // Help Search
  const searchInput = document.getElementById('help-search');
  const faqList = document.getElementById('faq-list');
  if (searchInput && faqList) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const items = faqList.querySelectorAll('li');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'list-item' : 'none';
      });
    });
  }
});
