// Main JavaScript for GeekDZ Landing Page
// Handles navigation, member loading, filtering, and interactions

;(() => {
  // ===================================
  // Mobile Menu Toggle
  // ===================================
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true"
      mobileMenuToggle.setAttribute("aria-expanded", !isExpanded)
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        navMenu.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        navMenu.classList.remove("active")
      }
    })
  }

  // ===================================
  // Sticky Header on Scroll
  // ===================================
  const header = document.querySelector(".header")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    lastScroll = currentScroll
  })

  // ===================================
  // Smooth Scroll for Navigation Links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const headerHeight = header.offsetHeight
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ===================================
  // Load Members from JSON
  // ===================================
  let allMembers = []
  const membersGrid = document.getElementById("members-grid")

  async function loadMembers() {
    try {
      const response = await fetch("/data/members.json")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      allMembers = data.members

      if (membersGrid) {
        displayMembers(allMembers)
      }
    } catch (error) {
      console.error("Error loading members:", error)
      if (membersGrid) {
        membersGrid.innerHTML = `
          <div class="loading">
            <p style="color: var(--color-text-secondary);">
              عذراً، حدث خطأ في تحميل بيانات الأعضاء. يرجى المحاولة لاحقاً.
            </p>
          </div>
        `
      }
    }
  }

  function displayMembers(members) {
    if (!membersGrid) return

    if (members.length === 0) {
      membersGrid.innerHTML = `
        <div class="loading">
          <p style="color: var(--color-text-secondary);">لا توجد نتائج</p>
        </div>
      `
      return
    }

    membersGrid.innerHTML = members
      .map(
        (member, index) => `
      <article class="member-card" style="animation-delay: ${index * 0.1}s">
        <img 
          src="${member.avatar}" 
          alt="صورة ${member.name}"
          class="member-avatar"
          loading="lazy"
        />
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${getRoleInArabic(member.role)}</p>
        <p class="member-bio">${member.bio}</p>
      </article>
    `,
      )
      .join("")
  }

  function getRoleInArabic(role) {
    const roles = {
      president: "الرئيس",
      "vice-president": "نائب الرئيس",
      member: "عضو",
    }
    return roles[role] || role
  }

  // ===================================
  // Filter Members
  // ===================================
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filter members
      const filter = button.getAttribute("data-filter")

      if (filter === "all") {
        displayMembers(allMembers)
      } else {
        const filtered = allMembers.filter((member) => member.role === filter)
        displayMembers(filtered)
      }
    })
  })

  // ===================================
  // Intersection Observer for Animations
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe sections for fade-in animation
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })

  // ===================================
  // Activity Cards Hover Effect
  // ===================================
  const activityCards = document.querySelectorAll(".activity-card")

  activityCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // ===================================
  // Lazy Loading Images
  // ===================================
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src || img.src
          img.classList.add("loaded")
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // ===================================
  // Keyboard Navigation Enhancement
  // ===================================
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
      if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute("aria-expanded", "false")
      }
      navMenu.classList.remove("active")
    }
  })

  // ===================================
  // Initialize on DOM Ready
  // ===================================
  function init() {
    loadMembers()

    // Add loaded class to body for CSS transitions
    document.body.classList.add("loaded")
  }

  // Run initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
})()
