(() => {
  const translations = {
    ar: {
      title: 'سفراء Red Hat Academy — GeekDZ', description: 'مبادرة سفراء Red Hat Academy داخل نادي GeekDZ: لينكس، أتمتة، حاويات، ذكاء اصطناعي وأمن سيبراني.',
      nav: { tracks: 'المسارات', benefits: 'المزايا', site: 'موقع GeekDZ', join: 'انضم إلى النادي' },
      hero: { eyebrow: 'سفراء Red Hat Academy · خنشلة', title: 'تعلّم لينكس <em>كما يعمل</em> في الشركات الحقيقية.', intro: 'نحن سفراء Red Hat Academy في جامعة عباس لغرور بخنشلة. ننقل مناهج Red Hat المجانية إلى طلبة الجامعة عبر نادي GeekDZ: دروس، مختبرات تطبيقية، وتحديات CTF.', benefits: 'مزايا الطلبة', explore: 'استعرض المسارات', note: 'تعلّم حقيقي. مهارات مطلوبة. مجتمع قريب منك.', caption: 'منهج رسمي، تجربة عملية' },
      stats: { academies: 'أكاديمية حول العالم', students: 'طالب تدرّبوا في البرنامج', discount: 'خصم على امتحانات الشهادة' },
      tracks: { kicker: '01 / منهجك يبدأ هنا', title: 'المناهج المتاحة', subtitle: 'مناهج Red Hat Academy الرسمية، مجانية لطلبة الجامعة عبر عضوية الأكاديمية.' },
      how: { kicker: '02 / طريق واضح', title: 'كيف تبدأ', subtitle: 'لا تحتاج خبرة سابقة. يكفي أن تكون طالبًا في الجامعة ولديك فضول.' },
      join: { kicker: '03 / خطوتك التالية', title: 'جاهز لتبدأ؟', text: 'تابع إعلانات الدفعات القادمة وتواصل معنا عبر قنوات النادي.', telegram: 'تيليغرام', instagram: 'إنستغرام', docs: 'وثائق GeekDZ' },
      footer: { club: 'نادي GeekDZ Tech · جامعة عباس لغرور، خنشلة، الجزائر', disclaimer: 'Red Hat وشعارها علامتان تجاريتان لشركة Red Hat, Inc. هذه مبادرة طلابية ولا تمثّل الشركة رسميًا.' },
      courses: [
        ['terminal','إدارة الأنظمة','نشر وإدارة وتأمين وأتمتة Red Hat Enterprise Linux.',[['RH104','أساسيات لينكس'],['RH124','إدارة الأنظمة I'],['RH134','إدارة الأنظمة II'],['RH294','الأتمتة مع Ansible']]],
        ['cloud','الحوسبة السحابية','الحاويات وKubernetes وOpenShift وOpenStack.',[['CL110','OpenStack للمشغّلين'],['DO101','مدخل إلى تطبيقات OpenShift'],['DO180','الحاويات وKubernetes'],['DO188','الحاويات مع Podman'],['DO457','أتمتة الشبكات مع Ansible',true]]],
        ['code','تطوير البرمجيات','مهارات المطوّر على منصات المؤسسات.',[['AD183','البرمجة بـ Java EE'],['AD141','مدخل إلى Python',true]]],
        ['ai','الذكاء الاصطناعي','مناهج جديدة أضافتها الأكاديمية.',[['AI262F','مدخل إلى Red Hat OpenShift AI',true]]],
        ['shield','الأمن السيبراني','أربع دورات من IBM ضمن البرنامج.',[['IBM','4 دورات في الأمن السيبراني',true]]]
      ],
      steps: [['سجّل في النادي','انضم إلى GeekDZ وأخبرنا بالمسار الذي يهمك.'],['تدرّب في المختبر','مختبرات تطبيقية مرنة على منصة Red Hat Academy.'],['اختبر وتوظّف','امتحانات الشهادة بنصف السعر، ثم ملفك على Talent Network.']],
      benefits: { kicker: 'المزايا · استثمر في مستقبلك', title: 'ماذا تكسب عندما <em>تنضم</em> إلينا؟', intro: 'كطالب في نادي GeekDZ تستفيد من برنامج Red Hat Academy في جامعتنا: تعلّم مجاني، شهادات بنصف السعر، وطريق مباشر نحو فرص العمل.', section: 'مزايا عضوية الأكاديمية', subtitle: 'أدوات عملية ومجتمع يساعدك على تحويل الفضول إلى مهارة.', items: [['كل الكورسات مجانية','عضوية الأكاديمية بلا تكلفة، فتصلك مناهج Red Hat الرسمية ومواردها مجانًا: لينكس، السحابة، الأتمتة، الذكاء الاصطناعي وغيرها.'],['مختبرات تطبيقية','بيئات مختبر مرنة تتدرب فيها بنفسك على منصة Red Hat Academy بمواد موحّدة ودعم من المدرّسين.'],['خصم 50% على امتحانات الشهادة','تُثبت مهارتك بشهادة Red Hat الرسمية بنصف السعر، وتحصل على شارات Credly للتحقق منها.'],['Red Hat Academy Talent Network','بوابة وظائف تربطك بشركات وشركاء Red Hat الباحثين عن مواهب مبتدئة.']], price: 'قبل الانضمام وبعده', priceSub: 'الفرق الذي تلمسه كطالب في النادي.', before: 'قبل الانضمام', after: 'بعد الانضمام', courses: 'الكورسات', paid: 'برسوم', free: 'مجانًا', exam: 'امتحان الشهادة', full: 'السعر الكامل', half: 'نصف السعر (50%-)', jobs: 'الوظائف', individual: 'بحث فردي', network: 'Talent Network' }
    },
    en: {
      title: 'Red Hat Academy Ambassadors — GeekDZ', description: 'Red Hat Academy ambassadors at GeekDZ, Abbes Laghrour University of Khenchela: free Linux, cloud, automation, AI and cybersecurity learning.',
      nav: { tracks: 'Tracks', benefits: 'Benefits', site: 'GeekDZ Site', join: 'Join the club' },
      hero: { eyebrow: 'Red Hat Academy Ambassadors · Khenchela', title: 'Learn Linux <em>the way it works</em> in real companies.', intro: "We are the Red Hat Academy ambassadors at Abbes Laghrour University of Khenchela. Through the GeekDZ club, we bring Red Hat's free curricula to university students: lessons, hands-on labs, and CTF challenges.", benefits: 'Student benefits', explore: 'Explore tracks', note: 'Real learning. In-demand skills. A community close to you.', caption: 'Official curriculum, practical experience' },
      stats: { academies: 'academies worldwide', students: 'students trained', discount: 'off certification exams' },
      tracks: { kicker: '01 / Start your curriculum', title: 'Available courses', subtitle: 'Official Red Hat Academy curricula, free for university students through academy membership.' },
      how: { kicker: '02 / A clear path', title: 'How to start', subtitle: 'No prior experience needed. Being a university student with curiosity is enough.' },
      join: { kicker: '03 / Your next step', title: 'Ready to start?', text: 'Follow upcoming cohort announcements and connect with us through the club channels.', telegram: 'Telegram', instagram: 'Instagram', docs: 'GeekDZ Docs' },
      footer: { club: 'GeekDZ Tech Club · Abbes Laghrour University, Khenchela, Algeria', disclaimer: 'Red Hat and its logo are trademarks of Red Hat, Inc. This is a student initiative and does not officially represent the company.' },
      courses: [
        ['terminal','Systems Administration','Deploy, manage, secure and automate Red Hat Enterprise Linux.',[['RH104','Linux Essentials'],['RH124','System Administration I'],['RH134','System Administration II'],['RH294','Automation with Ansible']]],
        ['cloud','Cloud Computing','Containers, Kubernetes, OpenShift and OpenStack.',[['CL110','OpenStack for Operators'],['DO101','Intro to OpenShift Applications'],['DO180','Containers and Kubernetes'],['DO188','Containers with Podman'],['DO457','Network Automation with Ansible',true]]],
        ['code','Software Development','Developer skills for enterprise platforms.',[['AD183','Java EE Programming'],['AD141','Intro to Python',true]]],
        ['ai','Artificial Intelligence','New curricula added by the academy.',[['AI262F','Intro to Red Hat OpenShift AI',true]]],
        ['shield','Cybersecurity','Four IBM courses included in the programme.',[['IBM','4 cybersecurity courses',true]]]
      ],
      steps: [['Join the club','Join GeekDZ and tell us which track interests you.'],['Practice in the lab','Flexible hands-on labs on the Red Hat Academy platform.'],['Certify and get hired','Certification exams at half price, then your profile on the Talent Network.']],
      benefits: { kicker: 'Benefits · Invest in your future', title: 'What do you gain when you <em>join</em> us?', intro: 'As a GeekDZ student, you get Red Hat Academy at your university: free learning, half-price certification exams, and a direct path to opportunity.', section: 'Academy membership benefits', subtitle: 'Practical tools and a community that turns curiosity into skill.', items: [['Every course is free','Academy membership costs nothing, giving you official Red Hat curricula and resources for Linux, cloud, automation, AI and more.'],['Hands-on labs','Flexible lab environments let you practise independently on the Red Hat Academy platform with structured material and support.'],['50% off certification exams','Prove your skills with an official Red Hat certification at half price and earn verifiable Credly badges.'],['Red Hat Academy Talent Network','A career portal connecting emerging talent with Red Hat partners and companies looking for new skills.']], price: 'Before and after joining', priceSub: 'The difference you get as a club student.', before: 'Before joining', after: 'After joining', courses: 'Courses', paid: 'Paid', free: 'Free', exam: 'Certification exam', full: 'Full price', half: 'Half price (50% off)', jobs: 'Jobs', individual: 'Individual search', network: 'Talent Network' }
    }
  };
  window.geekdzRedHatTranslations = translations;
  const root = document.documentElement;
  const get = key => key.split('.').reduce((value, part) => value && value[part], translations[currentLanguage]);
  let currentLanguage = localStorage.getItem('geekdz-redhat-language') || (navigator.language.toLowerCase().startsWith('en') ? 'en' : 'ar');
  const icon = name => `<svg class="course-icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  function renderCourses() {
    if (!document.getElementById('course-grid')) return;
    document.getElementById('course-grid').innerHTML = get('courses').map(([type, name, description, courses]) => `<article class="course-card reveal"><div class="course-head">${icon(type)}<div><h3>${name}</h3><p>${description}</p></div></div><ul class="course-list">${courses.map(([code, title, isNew]) => `<li><b class="course-code">${code}</b><span>${title}</span>${isNew ? '<span class="new-tag">NEW</span>' : ''}</li>`).join('')}</ul></article>`).join('');
  }
  function renderSteps() { if (!document.getElementById('steps')) return; document.getElementById('steps').innerHTML = get('steps').map(([title, text]) => `<article class="step reveal"><h3>${title}</h3><p>${text}</p></article>`).join(''); }
  function applyLanguage(language) {
    currentLanguage = language; localStorage.setItem('geekdz-redhat-language', language); root.lang = language; root.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = translations[language].title; document.querySelector('meta[name="description"]').content = translations[language].description;
    document.querySelectorAll('[data-i18n]').forEach(element => { const value = get(element.dataset.i18n); if (value !== undefined) element.innerHTML = value; });
    document.querySelectorAll('.lang-button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    renderCourses(); renderSteps(); observeReveals();
  }
  function animateCounter(element) { if (element.dataset.done) return; element.dataset.done = 'true'; const target = Number(element.dataset.target); const start = performance.now(); const tick = now => { const progress = Math.min((now - start) / 1400, 1); element.textContent = `${Math.floor((1 - Math.pow(1 - progress, 3)) * target).toLocaleString()}+`; if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }
  function observeReveals() { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 }); document.querySelectorAll('.reveal:not(.visible)').forEach(element => observer.observe(element)); }
  document.querySelectorAll('.lang-button').forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
  document.querySelectorAll('.stat-number').forEach(element => new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(element); entry.target.parentElement && entry.target.parentElement.querySelector('.stat-number')?.classList.add('counted'); } }), { threshold: .6 }).observe(element));
  const menuToggle = document.querySelector('.menu-toggle'); const menu = document.getElementById('primary-menu');
  menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('is-open'); menuToggle.setAttribute('aria-expanded', String(open)); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); }));
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
  new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55% 0px' }).observe(sections[0]);
  sections.slice(1).forEach(section => {
    new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px' }).observe(section);
  });
  applyLanguage(currentLanguage);
  const terminal = document.getElementById('terminal-output'); const terminalLines = ['<span class="prompt">[ambassador@geekdz ~]$</span> cat /etc/redhat-release','Red Hat Enterprise Linux release 9','<span class="prompt">[ambassador@geekdz ~]$</span> sudo dnf install <span class="accent">student-skills</span>','<span class="comment">Installing: linux, ansible, podman, ctf</span>','<span class="comment">Complete!</span>','<span class="prompt">[ambassador@geekdz ~]$</span> <span class="cursor"></span>'];
  if (terminal) terminal.innerHTML = terminalLines.join('\n');
})();
