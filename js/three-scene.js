// Three.js Scene Setup for GeekDZ Landing Page
// Creates an interactive particle network animation

;(() => {
  // Check for WebGL support
  function checkWebGLSupport() {
    try {
      const canvas = document.createElement("canvas")
      return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")))
    } catch (e) {
      return false
    }
  }

  // Show fallback message if WebGL is not supported
  if (!checkWebGLSupport()) {
    const fallback = document.getElementById("webgl-fallback")
    if (fallback) {
      fallback.style.display = "block"
      setTimeout(() => {
        fallback.style.display = "none"
      }, 5000)
    }
    return
  }

  // Wait for Three.js to load
  function initThreeScene() {
    if (typeof window.THREE === "undefined") {
      setTimeout(initThreeScene, 100)
      return
    }

    const canvas = document.getElementById("three-canvas")
    if (!canvas) return

    // Scene setup
    const scene = new window.THREE.Scene()
    const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new window.THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Particle system
    const particleCount = 100
    const particles = new window.THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = []

    // Initialize particles with random positions and velocities
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      })
    }

    particles.setAttribute("position", new window.THREE.BufferAttribute(positions, 3))

    // Particle material
    const particleMaterial = new window.THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.5,
      transparent: true,
      opacity: 0.8,
      blending: window.THREE.AdditiveBlending,
    })

    const particleSystem = new window.THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Create lines between nearby particles
    const lineMaterial = new window.THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.2,
      blending: window.THREE.AdditiveBlending,
    })

    const lineGeometry = new window.THREE.BufferGeometry()
    const linePositions = new Float32Array(particleCount * particleCount * 6)
    lineGeometry.setAttribute("position", new window.THREE.BufferAttribute(linePositions, 3))
    const lines = new window.THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse interaction
    const mouse = { x: 0, y: 0 }
    let mouseX = 0
    let mouseY = 0

    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    })

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)

      const positions = particleSystem.geometry.attributes.position.array
      const linePositions = lines.geometry.attributes.position.array
      let lineIndex = 0

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Apply velocity
        positions[i3] += velocities[i].x
        positions[i3 + 1] += velocities[i].y
        positions[i3 + 2] += velocities[i].z

        // Boundary check and bounce
        if (Math.abs(positions[i3]) > 25) velocities[i].x *= -1
        if (Math.abs(positions[i3 + 1]) > 25) velocities[i].y *= -1
        if (Math.abs(positions[i3 + 2]) > 25) velocities[i].z *= -1

        // Mouse interaction
        const dx = mouseX * 10 - positions[i3]
        const dy = mouseY * 10 - positions[i3 + 1]
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 5) {
          positions[i3] += dx * 0.01
          positions[i3 + 1] += dy * 0.01
        }
      }

      // Update lines between nearby particles
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 8) {
            linePositions[lineIndex++] = positions[i * 3]
            linePositions[lineIndex++] = positions[i * 3 + 1]
            linePositions[lineIndex++] = positions[i * 3 + 2]
            linePositions[lineIndex++] = positions[j * 3]
            linePositions[lineIndex++] = positions[j * 3 + 1]
            linePositions[lineIndex++] = positions[j * 3 + 2]
          }
        }
      }

      // Fill remaining line positions with zeros
      for (let i = lineIndex; i < linePositions.length; i++) {
        linePositions[i] = 0
      }

      particleSystem.geometry.attributes.position.needsUpdate = true
      lines.geometry.attributes.position.needsUpdate = true

      // Rotate scene slightly
      particleSystem.rotation.y += 0.001
      particleSystem.rotation.x += 0.0005

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    // Pause animation when page is not visible (performance optimization)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        renderer.setAnimationLoop(null)
      } else {
        renderer.setAnimationLoop(animate)
      }
    })
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThreeScene)
  } else {
    initThreeScene()
  }
})()
