// Immersive 3D Scene for GeekDZ - Elite Cyber-Intelligence Club
// Dark futuristic aesthetic with neon-blue highlights

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

    const THREE = window.THREE

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.FogExp2(0x000000, 0.02)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 15)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x0a0a1a, 0.3)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00d4ff, 1.5, 50)
    pointLight1.position.set(5, 5, 5)
    pointLight1.castShadow = true
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x0066ff, 1, 50)
    pointLight2.position.set(-5, -5, 5)
    pointLight2.castShadow = true
    scene.add(pointLight2)

    const spotLight = new THREE.SpotLight(0x00d4ff, 2, 30, Math.PI / 6, 0.5, 1)
    spotLight.position.set(0, 10, 10)
    spotLight.castShadow = true
    scene.add(spotLight)

    // Central glowing logo (using geometry to represent logo)
    const logoGroup = new THREE.Group()
    
    // Hexagonal frame
    const hexGeometry = new THREE.RingGeometry(2.5, 3, 6)
    const hexMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8
    })
    const hexFrame = new THREE.Mesh(hexGeometry, hexMaterial)
    hexFrame.rotation.z = Math.PI / 2
    logoGroup.add(hexFrame)

    // Central core
    const coreGeometry = new THREE.CircleGeometry(0.3, 32)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.5
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    logoGroup.add(core)

    // Glowing network lines (fan-like structure)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.9,
      linewidth: 2
    })
    
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI * 2) / 4
      const points = []
      points.push(new THREE.Vector3(0, 0, 0))
      points.push(new THREE.Vector3(
        Math.cos(angle) * 2.2,
        Math.sin(angle) * 2.2,
        0
      ))
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(lineGeometry, lineMaterial)
      logoGroup.add(line)

      // Glowing dots at the end
      const dotGeometry = new THREE.CircleGeometry(0.15, 16)
      const dotMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff,
        emissiveIntensity: 1.5
      })
      const dot = new THREE.Mesh(dotGeometry, dotMaterial)
      dot.position.set(
        Math.cos(angle) * 2.2,
        Math.sin(angle) * 2.2,
        0
      )
      logoGroup.add(dot)
    }

    // Add glow effect to logo
    const glowGeometry = new THREE.RingGeometry(3.2, 3.5, 6)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    glow.rotation.z = Math.PI / 2
    logoGroup.add(glow)

    scene.add(logoGroup)

    // Holographic particles around logo
    const particleCount = 300
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = 5 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      const color = new THREE.Color(0x00d4ff)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 0.1 + 0.05
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Floating geometric shapes
    const shapes = []
    const shapeCount = 15

    for (let i = 0; i < shapeCount; i++) {
      let geometry, material
      const shapeType = Math.floor(Math.random() * 3)

      if (shapeType === 0) {
        geometry = new THREE.TetrahedronGeometry(0.5, 0)
      } else if (shapeType === 1) {
        geometry = new THREE.OctahedronGeometry(0.4, 0)
      } else {
        geometry = new THREE.IcosahedronGeometry(0.3, 0)
      }

      material = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6,
        metalness: 0.8,
        roughness: 0.2
      })

      const shape = new THREE.Mesh(geometry, material)
      shape.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      shape.castShadow = true
      shape.receiveShadow = true
      scene.add(shape)
      shapes.push({
        mesh: shape,
        speed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        rotation: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        }
      })
    }

    // Digital shards
    const shardCount = 30
    const shards = []

    for (let i = 0; i < shardCount; i++) {
      const shardGeometry = new THREE.BufferGeometry()
      const vertices = new Float32Array([
        0, 0, 0,
        Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5,
        Math.random() * 0.5, -Math.random() * 0.5, Math.random() * 0.5
      ])
      shardGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))

      const shardMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      })

      const shard = new THREE.Mesh(shardGeometry, shardMaterial)
      shard.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      )
      scene.add(shard)
      shards.push({
        mesh: shard,
        speed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        }
      })
    }

    // Animated data streams
    const streamCount = 8
    const streams = []

    for (let i = 0; i < streamCount; i++) {
      const streamGeometry = new THREE.BufferGeometry()
      const streamPoints = []
      const segments = 20

      for (let j = 0; j <= segments; j++) {
        const t = j / segments
        streamPoints.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15 - t * 10,
            (Math.random() - 0.5) * 15
          )
        )
      }

      streamGeometry.setFromPoints(streamPoints)

      const streamMaterial = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.3
      })

      const stream = new THREE.Line(streamGeometry, streamMaterial)
      scene.add(stream)
      streams.push({
        line: stream,
        offset: Math.random() * Math.PI * 2
      })
    }

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let currentRotationX = 0
    let currentRotationY = 0

    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      targetRotationX = mouseY * 0.3
      targetRotationY = mouseX * 0.3
    })

    // Animation variables
    let time = 0
    const clock = new THREE.Clock()

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      time = clock.getElapsedTime()

      // Update particle material time
      particleMaterial.uniforms.time.value = time

      // Smooth camera rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05
      currentRotationY += (targetRotationY - currentRotationY) * 0.05

      // Orbiting camera
      const radius = 15
      const orbitSpeed = 0.2
      camera.position.x = Math.cos(time * orbitSpeed) * radius + currentRotationY * 2
      camera.position.y = Math.sin(time * orbitSpeed * 0.5) * radius * 0.5 + currentRotationX * 2
      camera.position.z = Math.sin(time * orbitSpeed) * radius
      camera.lookAt(logoGroup.position)

      // Rotate logo slowly
      logoGroup.rotation.y += 0.005
      logoGroup.rotation.z = Math.sin(time * 0.5) * 0.1

      // Animate particles
      const particlePositions = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const radius = 5 + Math.sin(time + i) * 2
        const theta = (i / particleCount) * Math.PI * 2 + time * 0.5
        const phi = (i / particleCount) * Math.PI

        particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
        particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + Math.sin(time + i) * 0.5
        particlePositions[i3 + 2] = radius * Math.cos(phi)
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      // Animate geometric shapes
      shapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotation.x
        shape.mesh.rotation.y += shape.rotation.y
        shape.mesh.rotation.z += shape.rotation.z

        shape.mesh.position.x += shape.speed.x
        shape.mesh.position.y += shape.speed.y
        shape.mesh.position.z += shape.speed.z

        // Boundary check
        if (Math.abs(shape.mesh.position.x) > 15) shape.speed.x *= -1
        if (Math.abs(shape.mesh.position.y) > 15) shape.speed.y *= -1
        if (Math.abs(shape.mesh.position.z) > 15) shape.speed.z *= -1

        // Pulsing glow
        const pulse = Math.sin(time * 2 + shape.mesh.position.x) * 0.3 + 0.7
        shape.mesh.material.emissiveIntensity = 0.5 * pulse
      })

      // Animate shards
      shards.forEach((shard) => {
        shard.mesh.rotation.x += 0.01
        shard.mesh.rotation.y += 0.01
        shard.mesh.position.x += shard.speed.x
        shard.mesh.position.y += shard.speed.y
        shard.mesh.position.z += shard.speed.z

        // Boundary check and reset
        if (Math.abs(shard.mesh.position.x) > 20 || 
            Math.abs(shard.mesh.position.y) > 20 || 
            Math.abs(shard.mesh.position.z) > 20) {
          shard.mesh.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          )
        }
      })

      // Animate data streams
      streams.forEach((stream, index) => {
        const positions = stream.line.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time + stream.offset + index) * 0.1
        }
        stream.line.geometry.attributes.position.needsUpdate = true
      })

      // Animate lights
      pointLight1.position.x = Math.sin(time) * 5
      pointLight1.position.y = Math.cos(time) * 5
      pointLight2.position.x = Math.cos(time) * -5
      pointLight2.position.y = Math.sin(time) * -5

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    // Pause animation when page is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // Animation will pause naturally
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
