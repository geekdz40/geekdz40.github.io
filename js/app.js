// GeekDZ 3D Website - Interactive Elements
// Handles modal, members, counters, and UI animations

;(() => {
  // ===================================
  // Join Us Button - Redirect to external link
  // ===================================
  const joinButton = document.getElementById("join-button")
  
  // Join Us button now redirects to external link (handled by anchor tag href)
  // No modal functionality needed

  // ===================================
  // Modal Functionality (for other uses)
  // ===================================
  const modalOverlay = document.getElementById("modal-overlay")
  const modalClose = document.getElementById("modal-close")

  // Close modal when close button is clicked
  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", () => {
      modalOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Close modal when clicking outside
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Close modal with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
      modalOverlay.classList.remove("active")
      document.body.style.overflow = ""
    }
  })

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
        const headerHeight = header ? header.offsetHeight : 0
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains("active")) {
          mobileMenuToggle.setAttribute("aria-expanded", "false")
          navMenu.classList.remove("active")
        }
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
      allMembers = data.members || []

      if (membersGrid) {
        if (allMembers.length === 0) {
          displayNoResults()
        } else {
          displayMembers(allMembers)
        }
      }
    } catch (error) {
      console.error("Error loading members:", error)
      if (membersGrid) {
        displayNoResults()
      }
    }
  }

  function displayNoResults() {
    if (!membersGrid) return
    membersGrid.innerHTML = `
      <div class="loading" style="grid-column: 1 / -1;">
        <p style="color: var(--color-text-secondary);">No results found</p>
      </div>
    `
  }

  function displayMembers(members) {
    if (!membersGrid) return

    if (members.length === 0) {
      displayNoResults()
      return
    }

    membersGrid.innerHTML = members
      .map(
        (member, index) => `
      <article class="member-card" style="animation-delay: ${index * 0.1}s">
        <img 
          src="${member.avatar || '/placeholder-user.jpg'}" 
          alt="${member.name} photo"
          class="member-avatar"
          loading="lazy"
          onerror="this.src='/placeholder-user.jpg'"
        />
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${getRoleInEnglish(member.role)}</p>
        <p class="member-bio">${member.bio || ""}</p>
      </article>
    `,
      )
      .join("")
  }

  function getRoleInEnglish(role) {
    const roles = {
      president: "President",
      "vice-president": "Vice President",
      member: "Member",
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
  // Animated Counters
  // ===================================
  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current) + "+"
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target + "+"
      }
    }

    updateCounter()
  }

  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted")
          animateCounter(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  document.querySelectorAll(".stat-number").forEach((counter) => {
    counterObserver.observe(counter)
  })

  // ===================================
  // Icon Hover Effects
  // ===================================
  const floatingIcons = document.querySelectorAll(".icon-float")

  floatingIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.1)"
    })

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // ===================================
  // Parallax Effect for Floating Elements
  // ===================================
  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20

    // Apply subtle parallax to icons
    floatingIcons.forEach((icon, index) => {
      const offsetX = mouseX * (0.05 + index * 0.01)
      const offsetY = mouseY * (0.05 + index * 0.01)
      const currentTransform = icon.style.transform || ""
      if (!currentTransform.includes("scale")) {
        icon.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      }
    })
  })

  // ===================================
  // Circuit Board Animation
  // ===================================
  const circuitLines = document.querySelectorAll(".circuit-line")
  const circuitNodes = document.querySelectorAll(".circuit-node")

  // Animate circuit lines with staggered delays
  circuitLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.1}s`
  })

  // Animate circuit nodes with staggered delays
  circuitNodes.forEach((node, index) => {
    node.style.animationDelay = `${index * 0.2}s`
  })

  // ===================================
  // Intersection Observer for Section Animations
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
    section.style.transform = "translateY(30px)"
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
  // Keyboard Navigation Enhancement
  // ===================================
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu or modal
    if (e.key === "Escape") {
      if (navMenu && navMenu.classList.contains("active")) {
        if (mobileMenuToggle) {
          mobileMenuToggle.setAttribute("aria-expanded", "false")
        }
        navMenu.classList.remove("active")
      }
      if (modalOverlay && modalOverlay.classList.contains("active")) {
        modalOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
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
