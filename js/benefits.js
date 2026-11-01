(() => {
  const source = window.geekdzRedHatTranslations;
  const root = document.documentElement;
  let language = localStorage.getItem('geekdz-redhat-language') || (navigator.language.toLowerCase().startsWith('en') ? 'en' : 'ar');
  const apply = () => {
    const data = source[language];
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = `${data.benefits.title.replace(/<[^>]+>/g, '')} — Red Hat Academy | GeekDZ`;
    document.querySelector('meta[name="description"]').content = data.benefits.intro;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = element.dataset.i18n.split('.').reduce((result, part) => result && result[part], data);
      if (value) element.innerHTML = value;
    });
    document.querySelectorAll('.lang-button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    document.getElementById('benefit-grid').innerHTML = data.benefits.items.map((item, index) => `<article class="benefit-card reveal"><span class="benefit-number">0${index + 1}</span><div><h3>${item[0]}</h3><p>${item[1]}</p></div></article>`).join('');
    observe();
  };
  const observe = () => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal:not(.visible)').forEach(element => observer.observe(element));
  };
  document.querySelectorAll('.lang-button').forEach(button => button.addEventListener('click', () => { language = button.dataset.lang; localStorage.setItem('geekdz-redhat-language', language); apply(); }));
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');
  toggle.addEventListener('click', () => { const open = menu.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
  apply();
})();
