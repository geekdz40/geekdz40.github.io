// GeekDZ — app.js
// Handles: mobile menu, smooth scroll, members, counters, section reveal, modal

;(() => {
  // ===================================
  // Mobile Menu
  // ===================================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle')
  const navMenu = document.querySelector('.nav-menu')

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true'
      mobileMenuToggle.setAttribute('aria-expanded', String(!isExpanded))
      navMenu.classList.toggle('active')
    })

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.setAttribute('aria-expanded', 'false')
        navMenu.classList.remove('active')
      })
    })

    document.addEventListener('click', e => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false')
        navMenu.classList.remove('active')
      }
    })
  }

  // ===================================
  // Sticky Header
  // ===================================
  const header = document.querySelector('.header')

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.pageYOffset > 80)
    }
  }, { passive: true })

  // ===================================
  // Smooth Scroll
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      const headerHeight = header ? header.offsetHeight : 0
      window.scrollTo({
        top: target.offsetTop - headerHeight - 16,
        behavior: 'smooth'
      })
    })
  })

  // ===================================
  // Modal
  // ===================================
  const modalOverlay = document.getElementById('modal-overlay')
  const modalClose = document.getElementById('modal-close')

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active')
      document.body.style.overflow = ''
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal)
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal()
    })
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal()
      if (navMenu && navMenu.classList.contains('active')) {
        mobileMenuToggle?.setAttribute('aria-expanded', 'false')
        navMenu.classList.remove('active')
      }
    }
  })

  // ===================================
  // Load Members from JSON
  // ===================================
  const membersGrid = document.getElementById('members-grid')
  let allMembers = []

  // Inline fallback members (shown if /data/members.json is unreachable)
  const fallbackMembers = [
    { name: 'إياد سغيري', role: 'president', bio: 'رئيس النادي', avatar: '/placeholder-user.jpg' },
    { name: 'طه أمين الدين لعصامي', role: 'member', bio: 'رئيس فوج السايبر سكيوريتي', avatar: '/placeholder-user.jpg' },
    { name: 'شروق غانمي', role: 'member', bio: 'رئيسة فوج البحث', avatar: '/placeholder-user.jpg' },
    { name: 'منيب عقون', role: 'member', bio: 'رئيس فوج البلوكتشاين', avatar: '/placeholder-user.jpg' },
    { name: 'نصاح عبد المومن', role: 'member', bio: 'رئيس فوج تطوير الويب', avatar: '/placeholder-user.jpg' }
  ]

  async function loadMembers() {
    try {
      const response = await fetch('/data/members.json')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      allMembers = data.members || []
    } catch {
      allMembers = fallbackMembers
    }
    displayMembers(allMembers)
  }

  function displayMembers(members) {
    if (!membersGrid) return

    if (!members.length) {
      membersGrid.innerHTML = `<div class="loading"><p style="color:var(--color-text-muted)">No members found.</p></div>`
      return
    }

    membersGrid.innerHTML = members.map((m, i) => `
      <article class="member-card" style="animation-delay:${i * 0.08}s">
        <img
          src="${m.avatar || '/placeholder-user.jpg'}"
          alt="${m.name}"
          class="member-avatar"
          loading="lazy"
          onerror="this.src='/placeholder-user.jpg'"
        />
        <h3 class="member-name">${m.name}</h3>
        <p class="member-role">${roleLabel(m.role)}</p>
        <p class="member-bio">${m.bio || ''}</p>
      </article>
    `).join('')
  }

  function roleLabel(role) {
    return { president: 'President', 'vice-president': 'Vice President', member: 'Member' }[role] || role
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      const filter = btn.getAttribute('data-filter')
      displayMembers(filter === 'all' ? allMembers : allMembers.filter(m => m.role === filter))
    })
  })

  // ===================================
  // Animated Counters
  // ===================================
  function animateCounter(el) {
    if (el.classList.contains('counted')) return
    el.classList.add('counted')

    const target = parseInt(el.getAttribute('data-target'), 10)
    const duration = 1800
    const start = performance.now()

    function update(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * target)
      el.textContent = current + '+'
      if (progress < 1) requestAnimationFrame(update)
      else el.textContent = target + '+'
    }

    requestAnimationFrame(update)
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCounter(entry.target)
    })
  }, { threshold: 0.4 })

  document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el))

  // ===================================
  // Section Reveal on Scroll
  // ===================================
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        sectionObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('section:not(.hero-section)').forEach(s => sectionObserver.observe(s))

  // ===================================
  // Activity card tilt on hover (subtle)
  // ===================================
  document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = ''
    })
  })

  // ===================================
  // Init
  // ===================================
  function init() {
    document.body.classList.add('loaded')
    loadMembers()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
