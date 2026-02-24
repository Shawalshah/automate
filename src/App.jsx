import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import {
  ArrowRight, Zap, Clock, ShieldCheck, TrendingUp, RefreshCw, Plug,
  BarChart3, MessageSquare, Target, Mail, Bot, Database, Lock, ShoppingCart,
  Share2, Building2, ChevronDown, ChevronRight, Check, Star, Play,
  Layers, Code2, Cpu, Globe, Send, Menu, X, Sparkles, ArrowUpRight,
  Sun, Moon
} from 'lucide-react'
import './App.css'

/* ─── Fade-in wrapper ─── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const id = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(id) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(id)
  }, [inView, end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Floating particles ─── */
function Particles() {
  const particles = useRef(
    [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      dur: 3 + Math.random() * 4,
      del: Math.random() * 3,
    }))
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ left: p.left, top: p.top, background: 'var(--particle-color)' }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del }}
        />
      ))}
    </div>
  )
}

/* ─── 3D Automation Network (Three.js) ─── */
import * as THREE from 'three'

function ThreeNetworkBg() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 25

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Groups
    const networkGroup = new THREE.Group()
    scene.add(networkGroup)

    // Objects
    const nodes = []
    const connections = []
    const particles = []

    // Materials - Modern Tech Style with Additive Blending
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0FB6D4,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    })
    
    const nodeGlowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0FB6D4, 
      transparent: true, 
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    })
    
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0FB6D4, 
      transparent: true, 
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    })
    
    const particleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    })

    // Geometries
    const nodeGeometry = new THREE.IcosahedronGeometry(0.2, 0)
    const glowGeometry = new THREE.IcosahedronGeometry(0.5, 1)
    const particleGeometry = new THREE.SphereGeometry(0.06, 4, 4)

    const nodeCount = 40
    
    // Create Nodes
    for (let i = 0; i < nodeCount; i++) {
      const group = new THREE.Group()
      
      // Core
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial.clone())
      group.add(mesh)
      
      // Glow/Shield
      const glow = new THREE.Mesh(glowGeometry, nodeGlowMaterial.clone())
      group.add(glow)

      // Position - distributed in a cloud
      group.position.x = (Math.random() - 0.5) * 55
      group.position.y = (Math.random() - 0.5) * 35
      group.position.z = (Math.random() - 0.5) * 25
      
      // Data
      group.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
        originalColor: new THREE.Color(Math.random() > 0.6 ? 0x0FB6D4 : 0x3b82f6) // Cyan or Blue
      }
      
      // Set color
      mesh.material.color = group.userData.originalColor
      glow.material.color = group.userData.originalColor

      networkGroup.add(group)
      nodes.push({ group, mesh, glow })
    }

    // Create Data Particles
    const particleCount = 30
    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(particleGeometry, particleMaterial)
      mesh.userData = {
        currentNodeIndex: Math.floor(Math.random() * nodeCount),
        targetNodeIndex: Math.floor(Math.random() * nodeCount),
        progress: 0,
        speed: 0.005 + Math.random() * 0.01
      }
      networkGroup.add(mesh)
      particles.push(mesh)
    }

    // Interaction
    let mouseX = 0
    let mouseY = 0
    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.0005
      mouseY = (event.clientY - windowHalfY) * 0.0005
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      // Rotate entire network slowly for kinetic feel
      networkGroup.rotation.y += 0.0003
      
      // Gentle mouse parallax
      networkGroup.rotation.x += (mouseY * 0.5 - networkGroup.rotation.x) * 0.02
      networkGroup.rotation.y += (mouseX * 0.5 - networkGroup.rotation.y) * 0.02

      // Animate Nodes
      nodes.forEach(node => {
        // Move
        node.group.position.add(node.group.userData.velocity)
        
        // Bounce bounds
        if (Math.abs(node.group.position.x) > 35) node.group.userData.velocity.x *= -1
        if (Math.abs(node.group.position.y) > 25) node.group.userData.velocity.y *= -1
        if (Math.abs(node.group.position.z) > 15) node.group.userData.velocity.z *= -1

        // Pulse effect
        const scale = 1 + Math.sin(time * 2 + node.group.userData.pulseOffset) * 0.15
        node.glow.scale.setScalar(scale)
        node.glow.rotation.y += 0.01
        node.glow.rotation.z += 0.005
      })

      // Draw Connections
      connections.forEach(line => networkGroup.remove(line))
      connections.length = 0

      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].group.position.distanceTo(nodes[j].group.position)
          if (dist < 12) { // Connection distance threshold
            const positions = new Float32Array([
              nodes[i].group.position.x, nodes[i].group.position.y, nodes[i].group.position.z,
              nodes[j].group.position.x, nodes[j].group.position.y, nodes[j].group.position.z
            ])
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            
            const material = connectionMaterial.clone()
            // Fade opacity based on distance
            material.opacity = (1 - (dist / 12)) * 0.15
            material.color = nodes[i].group.userData.originalColor // Inherit color
            
            const line = new THREE.Line(geometry, material)
            networkGroup.add(line)
            connections.push(line)
          }
        }
      }

      // Animate Particles
      particles.forEach(p => {
        // Ensure valid path
        if (p.userData.currentNodeIndex === p.userData.targetNodeIndex) {
           p.userData.targetNodeIndex = Math.floor(Math.random() * nodeCount)
           return
        }

        const from = nodes[p.userData.currentNodeIndex].group.position
        const to = nodes[p.userData.targetNodeIndex].group.position
        
        // Check if nodes are connected (distance check) - visually consistent
        if (from.distanceTo(to) > 14) {
           // If too far, instantly jump to a new random start to find a better path
           p.userData.currentNodeIndex = Math.floor(Math.random() * nodeCount)
           p.userData.progress = 0
           return
        }

        p.userData.progress += p.userData.speed
        
        if (p.userData.progress >= 1) {
          p.userData.progress = 0
          p.userData.currentNodeIndex = p.userData.targetNodeIndex
          p.userData.targetNodeIndex = Math.floor(Math.random() * nodeCount)
        }

        p.position.lerpVectors(from, to, p.userData.progress)
      })

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      // Dispose Geometries/Materials
      nodeGeometry.dispose()
      glowGeometry.dispose()
      particleGeometry.dispose()
      nodeMaterial.dispose()
      nodeGlowMaterial.dispose()
      connectionMaterial.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }} 
    />
  )
}

/* ─── Floating Automation Elements (2D Overlay) ─── */
function FloatingElements() {
  const elements = [
    { icon: Zap, color: '#3b82f6', x: 10, y: 20, delay: 0 },
    { icon: Database, color: '#8b5cf6', x: 85, y: 25, delay: 1 },
    { icon: RefreshCw, color: '#06b6d4', x: 20, y: 75, delay: 2 },
    { icon: Mail, color: '#f97316', x: 80, y: 70, delay: 3 },
    { icon: Check, color: '#22c55e', x: 50, y: 15, delay: 4 },
    { icon: Layers, color: '#ec4899', x: 15, y: 50, delay: 1.5 },
    { icon: ShieldCheck, color: '#10b981', x: 75, y: 45, delay: 3.5 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ 
            left: `${el.x}%`, 
            top: `${el.y}%`,
            color: el.color,
            opacity: 0.3
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay
          }}
        >
          <div className="p-3 rounded-2xl" style={{ background: `${el.color}10`, border: `1px solid ${el.color}20` }}>
            <el.icon size={24} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Animated flow diagram ─── */
function AutomationFlow() {
  const steps = [
    { icon: Cpu, label: 'Sensor Signal', color: '#3b82f6' },
    { icon: Bot, label: 'Anomaly Detected', color: '#8b5cf6' },
    { icon: Database, label: 'CMMS Ticket', color: '#06b6d4' },
    { icon: ShoppingCart, label: 'Parts Requested', color: '#10b981' },
    { icon: ShieldCheck, label: 'Uptime Restored', color: '#f59e0b' },
  ]
  return (
    <>
      {/* Desktop: horizontal flow with connectors */}
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <Reveal delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                className="glass-card-strong flex flex-col items-center gap-3 px-5 py-6 rounded-2xl min-w-[140px]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${step.color}25` }}
                >
                  <step.icon size={22} style={{ color: step.color }} />
                </div>
                <span className="text-xs font-medium text-muted">{step.label}</span>
              </motion.div>
            </Reveal>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                className="flex items-center mx-2"
              >
                <div className="w-10 h-px flow-connector" />
                <ChevronRight size={14} className="text-muted-light -ml-1" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden max-w-sm mx-auto">
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card-strong flex flex-col items-center gap-2 px-3 py-4 rounded-xl"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${step.color}25` }}
              >
                <step.icon size={18} style={{ color: step.color }} />
              </div>
              <span className="text-[11px] font-medium text-muted text-center">{step.label}</span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </>
  )
}

/* ─── Data ─── */
const painPoints = [
  { icon: Layers, title: 'Copy Paste Hell', problem: 'Your team wastes hours moving data between systems. Spreadsheets. CRMs. Emails. Manual entry everywhere.', solution: 'Data flows automatically between all your tools.' },
  { icon: Clock, title: 'Response Delays', problem: 'Customer inquiries sit for hours. Follow ups get forgotten. Your competitors respond while you\'re sleeping.', solution: 'Instant responses. Intelligent routing. 24/7 operation.' },
  { icon: ShieldCheck, title: 'Manual Approvals', problem: 'Everything needs human sign off. Workflows bottleneck. Simple tasks take days.', solution: 'Smart approval chains. Rule based decisions. Escalation only when needed.' },
  { icon: TrendingUp, title: 'Lost Opportunities', problem: 'Leads fall through cracks. Follow ups never happen. Your sales pipeline leaks revenue.', solution: 'Lead capture, scoring, nurturing all automatic.' },
  { icon: RefreshCw, title: 'Repetitive Admin', problem: 'Invoicing. Scheduling. Reporting. Data entry. High-paid talent doing low value work.', solution: 'Administrative tasks eliminated. Team focuses on strategy.' },
  { icon: Plug, title: 'Disconnected Systems', problem: '10 tools. Zero communication. Manual bridges everywhere. Information silos slow everything down.', solution: 'Everything talks to everything. One ecosystem.' },
]

const workflows = [
  { icon: Cpu, title: 'Condition Monitoring', desc: 'IoT signals, historian data, thresholds, anomaly detection, alert routing, escalation', color: '#3b82f6', iconBg: 'icon-bg-blue' },
  { icon: RefreshCw, title: 'Maintenance Orchestration', desc: 'CMMS tickets, approvals, technician dispatch, spare parts requests, closure verification', color: '#8b5cf6', iconBg: 'icon-bg-violet' },
  { icon: Layers, title: 'Production Visibility', desc: 'Line status, OEE reporting, downtime reasons, shift handover, audit trails', color: '#f59e0b', iconBg: 'icon-bg-amber' },
  { icon: ShieldCheck, title: 'Quality & Compliance', desc: 'Batch traceability, deviation workflows, controlled changes, approvals, reporting', color: '#06b6d4', iconBg: 'icon-bg-cyan' },
  { icon: Plug, title: 'System Integration', desc: 'SCADA/MES/ERP connectivity, OPC UA/MQTT, APIs, data synchronization, validation', color: '#ec4899', iconBg: 'icon-bg-pink' },
  { icon: Database, title: 'Data Pipelines', desc: 'ETL, data quality checks, standardization, dashboards, operational analytics', color: '#10b981', iconBg: 'icon-bg-emerald' },
  { icon: Lock, title: 'Governance & Access', desc: 'Role based access, approval gates, audit logs, change management, incident history', color: '#f97316', iconBg: 'icon-bg-orange' },
  { icon: ShoppingCart, title: 'Inventory & Spares', desc: 'Stock alerts, reorder triggers, vendor routing, receiving workflows, consumption logging', color: '#ef4444', iconBg: 'icon-bg-red' },
  { icon: BarChart3, title: 'Operations Reporting', desc: 'Daily production reports, SLA dashboards, KPI alerts, executive summaries', color: '#a855f7', iconBg: 'icon-bg-violet' },
  { icon: Building2, title: 'Multi-Site Rollout', desc: 'Standardized templates, site onboarding, training, monitoring, continuous improvement', color: '#14b8a6', iconBg: 'icon-bg-teal' },
]

const useCases = [
  {
    icon: Layers,
    title: 'Textile',
    points: ['Quality inspection workflows', 'Production planning sync', 'Predictive maintenance alerts', 'Reduced rework & wastage'],
    color: '#3b82f6',
  },
  {
    icon: ShieldCheck,
    title: 'Pharma',
    points: ['Compliance-ready automation', 'Batch traceability & audit logs', 'Deviation detection and routing', 'Controlled approvals'],
    color: '#10b981',
  },
  {
    icon: Share2,
    title: 'Logistics',
    points: ['Warehouse orchestration', 'Routing optimization triggers', 'Exception handling workflows', 'SLA monitoring & alerts'],
    color: '#8b5cf6',
  },
  {
    icon: Cpu,
    title: 'Manufacturing',
    points: ['OEE improvement loops', 'Downtime root-cause workflows', 'Maintenance ticket automation', 'Spare parts coordination'],
    color: '#f59e0b',
  },
]

const techStack = [
  { name: 'OPC UA', desc: 'Industrial connectivity', category: 'Integration', icon: Plug, color: '#3b82f6' },
  { name: 'MQTT', desc: 'IoT messaging', category: 'Integration', icon: Share2, color: '#8b5cf6' },
  { name: 'SCADA / HMI', desc: 'Operations visibility', category: 'Operations', icon: BarChart3, color: '#06b6d4' },
  { name: 'MES / ERP', desc: 'Production + planning', category: 'Operations', icon: Building2, color: '#10b981' },
  { name: 'Data Historian', desc: 'Time series storage', category: 'Data', icon: Database, color: '#f59e0b' },
  { name: 'n8n / Node-RED', desc: 'Orchestration', category: 'Automation', icon: RefreshCw, color: '#ec4899' },
  { name: 'AI Models', desc: 'Anomaly detection', category: 'AI', icon: Cpu, color: '#8b5cf6' },
  { name: 'Custom APIs', desc: 'Bespoke solutions', category: 'Custom', icon: Code2, color: '#3b82f6' },
]

const timeline = [
  { week: 'Week 1', title: 'Discovery & Mapping', items: ['Audit current processes', 'Identify automation opportunities', 'Map data flows', 'Prioritize by ROI'], deliverable: 'Automation roadmap with ROI projections' },
  { week: 'Week 2-3', title: 'Build & Integrate', items: ['Set up platforms', 'Build workflows in parallel', 'Connect systems & APIs', 'Implement error handling'], deliverable: 'Working automations (staging)' },
  { week: 'Week 3-4', title: 'Test & Optimize', items: ['End-to-end testing', 'Edge case handling', 'Performance optimization', 'User acceptance testing'], deliverable: 'Production-ready automations' },
  { week: 'Week 4', title: 'Deploy & Train', items: ['Production deployment', 'Team training', 'Documentation handoff', 'Monitoring setup'], deliverable: 'Live automations + trained team' },
]

const faqs = [
  { q: 'How long does automation implementation take?', a: 'Most projects go live within 2-4 weeks. Simple automations can be deployed in days, while complex multi-system integrations may take 4-6 weeks.' },
  { q: 'What if my tool doesn\'t have an integration?', a: 'We build custom API integrations. If your tool has an API (most do), we can connect it. For legacy systems, we create middleware bridges.' },
  { q: 'Can I change workflows after they\'re built?', a: 'Absolutely. All automations are designed to be modifiable. We provide documentation and training so your team can make adjustments.' },
  { q: 'What if an automation breaks?', a: 'We set up monitoring, alerts, and fallback workflows. You\'ll know immediately if something needs attention, and most issues self-recover.' },
  { q: 'What\'s the ROI timeline?', a: 'Most clients see positive ROI within the first month. The average time savings is 15-30 hours per week per team.' },
  { q: 'Do you provide ongoing maintenance?', a: 'Yes. Every project includes 30 days of optimization. Extended maintenance plans are available for continuous improvement.' },
]

/* ─── Pain Points - Neumorphism Horizontal Scroll ─── */
const painGlows = ['blue', 'amber', 'violet', 'emerald', 'pink', 'cyan']
const painColors = {
  blue: '#3b82f6', amber: '#f59e0b', violet: '#8b5cf6',
  emerald: '#10b981', pink: '#ec4899', cyan: '#06b6d4',
}

function PainPointsSection() {
  return (
    <section id="problems" className="relative py-24 px-6 neuro-section">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-sm font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'rgba(96,165,250,0.9)' }}
            >The Problem</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Manual Work <span style={{ color: 'var(--text-muted)' }}>Killing Your Growth</span>
            </h2>
            <p className="text-muted mt-6 max-w-2xl mx-auto text-lg">
              These common pain points are costing your team hours every week. We automate them all.
            </p>
          </div>
        </Reveal>

        {/* Simple 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((item, i) => {
            const glow = painGlows[i]
            const color = painColors[glow]
            return (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group pain-card relative overflow-hidden cursor-pointer h-full"
                  style={{ minHeight: 320 }}
                >
                  {/* Big ghost number */}
                  <span className="neuro-card-num select-none" style={{ fontSize: 'clamp(80px, 12vw, 140px)' }}>0{i + 1}</span>

                  <div className="relative z-10 h-full flex flex-col p-7">
                    {/* Top: icon + badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="flex items-center justify-center rounded-xl transition-all duration-300"
                        style={{
                          width: 52,
                          height: 52,
                          background: `${color}18`,
                          border: `1px solid ${color}25`
                        }}
                      >
                        <item.icon size={24} style={{ color }} />
                      </div>
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                        style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                      >
                        Pain {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {item.problem}
                      </p>
                    </div>

                    {/* Solution bar */}
                    <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-start gap-3">
                        <Check size={16} style={{ color: 'var(--accent-success)', marginTop: 2 }} />
                        <p className="text-sm font-medium" style={{ color: 'var(--accent-success)' }}>{item.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Accent glow blob */}
                  <div
                    className="neuro-accent-blob absolute -bottom-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`, filter: 'blur(25px)' }}
                  />
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Capabilities - 2 Column Grid ─── */
function CapabilitiesSection() {
  const count = workflows.length

  return (
    <section id="workflows" className="relative py-24 px-6 neuro-section">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-lg font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'rgba(96,165,250,0.9)' }}
            >Capabilities</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Every Workflow. <span style={{ color: 'var(--text-muted)' }}>Any Complexity.</span>
            </h2>
            <p className="text-muted mt-6 max-w-2xl mx-auto text-lg">
              End-to-end automation across every layer of your industrial operation.
            </p>
          </div>
        </Reveal>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workflows.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                className="neuro-card relative overflow-hidden cursor-pointer h-full"
                style={{ minHeight: 280 }}
              >
                {/* Big ghost number */}
                <span className="neuro-card-num select-none" style={{ fontSize: 'clamp(70px, 10vw, 130px)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10 h-full flex flex-col p-7">
                  {/* Top: icon + badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="flex items-center justify-center rounded-xl transition-all duration-300"
                      style={{
                        width: 52,
                        height: 52,
                        background: `${item.color}18`,
                        border: `1px solid ${item.color}25`
                      }}
                    >
                      <item.icon size={24} style={{ color: item.color }} />
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}30`
                      }}
                    >
                      {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.desc.split(', ').map((tag, j) => (
                        <span
                          key={j}
                          className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                          style={{
                            background: `${item.color}12`,
                            color: 'var(--text-muted)',
                            border: `1px solid ${item.color}20`
                          }}
                        >{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-1 rounded-full flex-1"
                        style={{ background: `linear-gradient(90deg, ${item.color}60, transparent)` }}
                      />
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: item.color }}
                      >Automated</span>
                    </div>
                  </div>
                </div>

                {/* Accent glow blob */}
                <div
                  className="neuro-accent-blob absolute -bottom-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${item.color}30 0%, transparent 70%)`, filter: 'blur(28px)' }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ─── MAIN APP ─── */
function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : ''
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const isLight = theme === 'light'

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      {/* ─── 3D Automation Network Background ─── */}
      <ThreeNetworkBg />
      <FloatingElements />

      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-nav rounded-2xl px-6 py-3">
          <a href="#" className="flex items-center no-underline">
            <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Mech<span className="gradient-text">links</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[{ label: 'Home', href: '#' }, { label: 'Workflows', href: '#workflows' }, { label: 'Use Cases', href: '#use-cases' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }].map(item => (
              <a key={item.label} href={item.href} className="text-sm no-underline text-muted transition-colors duration-300" style={{ '--tw-text-opacity': 1 }}>
                {item.label}
              </a>
            ))}
            <motion.button
              onClick={toggleTheme}
              className="theme-toggle"
              whileTap={{ scale: 0.9 }}
              title={isLight ? 'Switch to Dark' : 'Switch to Light'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  {isLight ? <Moon size={16} /> : <Sun size={16} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <a href="#contact" className="btn-primary px-5 py-2 text-sm font-medium rounded-full no-underline">
              Request Demo
            </a>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <motion.button onClick={toggleTheme} className="theme-toggle" whileTap={{ scale: 0.9 }}>
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </motion.button>
            <button onClick={() => setMobileMenu(!mobileMenu)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 mobile-menu rounded-2xl p-6 flex flex-col gap-4"
            >
              {[{ label: 'Home', href: '#' }, { label: 'Workflows', href: '#workflows' }, { label: 'Use Cases', href: '#use-cases' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }].map(item => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenu(false)} className="text-muted transition-colors no-underline">
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileMenu(false)} className="btn-primary px-5 py-2.5 text-sm font-medium rounded-full text-center no-underline">
                Request Demo
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── HERO ─── */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      >
        <Particles />
        <div className="absolute inset-0 glow-mixed" />
        <div className="absolute bottom-0 left-0 right-0 h-40 hero-fade-bottom" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full pill-badge mb-8" whileHover={{ scale: 1.03 }}>
              <Sparkles size={14} color="#60a5fa" />
              <span className="text-xs font-medium text-muted">Industrial Automation Platform</span>
            </motion.div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6" style={{ lineHeight: 0.95 }}>
              <span className="block">Automation That</span>
              <span className="block gradient-text">Reduces Downtime.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light text-muted">
              Improve operational efficiency, increase uptime, and integrate plant and warehouse systems with automation that monitors, routes, and executes in real time.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="group btn-primary px-8 py-4 rounded-full font-semibold text-sm flex items-center gap-2 no-underline">
                Request Demo
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#use-cases" className="btn-outline px-8 py-4 rounded-full font-medium text-sm no-underline">
                Explore Use Cases
              </a>
              <a href="#contact" className="btn-outline px-8 py-4 rounded-full font-medium text-sm no-underline">
                Book Consultation
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: 18, suffix: '%', label: 'Efficiency Gains' },
                { value: 22, suffix: '%', label: 'Downtime Reduced' },
                { value: 99, suffix: '%', label: 'Monitoring Uptime' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-light mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={20} className="text-muted-extra" />
        </motion.div>
      </motion.section>

      {/* ─── PAIN POINTS ─── */}
      <PainPointsSection />

      {/* ─── AUTOMATION FLOW DEMO ─── */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 glow-violet" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#8b5cf6', letterSpacing: '0.2em' }}>Live Example</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
                See Automation in Action
              </h2>
              <p className="text-muted mt-4 max-w-lg mx-auto font-light">
                Sensor signals → anomaly detection → maintenance ticket → parts request → uptime restored. Escalate only when needed.
              </p>
            </div>
          </Reveal>
          <AutomationFlow />
        </div>
      </section>

      <section id="use-cases" className="relative py-32 px-6">
        <div className="divider-line absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#3b82f6', letterSpacing: '0.2em' }}>Use Cases</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4">
                Built for Industrial Operations
              </h2>
              <p className="text-muted mt-6 max-w-2xl mx-auto font-light text-lg">
                Industry-specific automation that improves throughput, reduces downtime, and standardizes execution across sites.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <Reveal key={uc.title} delay={i * 0.06}>
                <div className="glass-card-strong p-8 rounded-3xl">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${uc.color}25` }}>
                        <uc.icon size={22} style={{ color: uc.color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{uc.title}</h3>
                        <p className="text-xs text-muted-light mt-1">Automation patterns tailored to your constraints and KPIs.</p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-muted-extra" />
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-3">
                    {uc.points.map((p, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Check size={14} style={{ color: 'var(--accent-success)' }} />
                        <span className="text-sm text-muted">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WORKFLOWS ─── */}
      <CapabilitiesSection />

      {/* ─── TECH STACK ─── */}
      <section id="stack" className="relative py-32 px-6">
        <div className="divider-line absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#06b6d4', letterSpacing: '0.2em' }}>Technology</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4">
                Our Automation Stack
              </h2>
              <p className="text-muted mt-6 max-w-lg mx-auto font-light text-lg">
                Integrations, orchestration, and AI - selected for reliability in production environments.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {techStack.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass-card-strong p-4 md:p-7 rounded-2xl md:rounded-3xl h-full cursor-pointer"
                >
                  <div
                    className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-5"
                    style={{ background: `${item.color}18` }}
                  >
                    <item.icon size={18} className="md:hidden" style={{ color: item.color }} />
                    <item.icon size={22} className="hidden md:block" style={{ color: item.color }} />
                  </div>
                  <span
                    className="inline-block text-[8px] md:text-[10px] font-semibold tracking-widest uppercase px-2 py-1 md:px-3 md:py-1.5 rounded-full"
                    style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}25` }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-sm md:text-lg font-semibold mt-2.5 md:mt-4 mb-1 md:mb-2">{item.name}</h3>
                  <p className="text-[11px] md:text-sm text-muted font-light leading-snug md:leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3 p-6 rounded-3xl deliverables-bar">
              {['Workflow Design', 'Integration Setup', 'Error Handling', 'Documentation', '30-Day Optimization'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 justify-center py-2">
                  <Check size={14} style={{ color: 'var(--accent-success)' }} />
                  <span className="text-xs text-muted">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="relative py-32 px-6">
        <div className="divider-line absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#10b981', letterSpacing: '0.2em' }}>About</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4">
                Enterprise-Ready Automation
              </h2>
              <p className="text-muted mt-6 max-w-2xl mx-auto font-light text-lg">
                MechLinks.ai connects systems, standardizes workflows, and adds intelligence to operations - so teams can move faster with fewer incidents.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              icon: Plug,
              title: 'Integration-First',
              desc: 'Connect existing systems and data sources with robust orchestration and clear error handling.'
            }, {
              icon: Zap,
              title: 'Operational Efficiency',
              desc: 'Reduce manual work, accelerate response times, and push standardized execution across sites.'
            }, {
              icon: Lock,
              title: 'Governed & Auditable',
              desc: 'Role-based access, approvals, and logs designed for production environments.'
            }].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06}>
                <div className="glass-card-strong p-8 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.12)' }}>
                    <card.icon size={22} style={{ color: 'rgba(96,165,250,0.9)' }} />
                  </div>
                  <h3 className="text-lg font-semibold mt-6">{card.title}</h3>
                  <p className="text-sm text-muted mt-3 font-light">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS TIMELINE ─── */}
      <section id="process" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--accent-success)', letterSpacing: '0.2em' }}>Process</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-4">
                From Manual to<br />
                <span className="text-muted-light">Automated</span>
              </h2>
              <p className="text-muted mt-6 max-w-lg mx-auto text-lg font-light">
                Fast. Tested. Actually working.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {timeline.map((phase, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="glass-card p-8 rounded-3xl h-full">
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#3b82f6' }}>{phase.week}</span>
                  <h3 className="text-xl font-bold mt-2 mb-4">{phase.title}</h3>
                  <div className="space-y-2.5 mb-5">
                    {phase.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border-2)' }} />
                        <span className="text-sm text-muted">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 card-inner-border">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-success)' }}>Deliverable</span>
                    <p className="text-sm text-muted mt-1">{phase.deliverable}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="relative py-32 px-6">
        <div className="divider-line absolute top-0 left-0 right-0" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold tracking-widest uppercase text-muted" style={{ letterSpacing: '0.2em' }}>FAQ</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4">
                Common Questions
              </h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="faq-item rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
                  >
                    <span className="text-sm font-medium pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={18} className="text-muted-light shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 glow-blue" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Reduce Downtime.<br />
              <span className="gradient-text">Standardize Execution.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted mt-6 max-w-xl mx-auto text-lg font-light">
              A focused assessment identifies your highest-impact automation opportunities and the integration path to production.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="group btn-primary px-10 py-5 rounded-full font-semibold text-sm flex items-center gap-2 no-underline">
                Contact Sales
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="btn-outline px-10 py-5 rounded-full font-medium text-sm no-underline">
                Book Consultation
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-muted-light">
              {['Process mapping & bottlenecks', 'Integration requirements', 'Downtime reduction opportunities', 'Governance & approvals', 'ROI and rollout plan'].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check size={12} style={{ color: 'var(--accent-success-dim)' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative py-32 px-6">
        <div className="divider-line absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Reveal>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#3b82f6', letterSpacing: '0.2em' }}>Get Started</span>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4">
                  Talk to Sales
                </h2>
                <p className="text-muted mt-4 font-light">
                  Tell us what you want to automate production, maintenance, logistics, or reporting and we'll propose an implementation plan.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-12 space-y-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">What Happens Next</h3>
                  {[
                    'We review your operational goals and constraints',
                    'Schedule a discovery call with stakeholders',
                    'Map systems, data flows, and approvals',
                    'Share prioritized automation opportunities & ROI',
                    'Align on rollout plan and delivery milestones',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full step-dot flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-muted">{i + 1}</span>
                      </div>
                      <span className="text-sm text-muted">{step}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-12 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Mail size={16} className="text-muted-light" />
                    <span>hello@mechlinks.ai</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Globe size={16} className="text-muted-light" />
                    <span>Global · Remote First</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Clock size={16} className="text-muted-light" />
                    <span>Response within 24 hours</span>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <form onSubmit={(e) => e.preventDefault()} className="glass-card-strong p-8 rounded-3xl">
                <div className="space-y-5">
                  {[
                    { key: 'name', label: 'Your Name', type: 'text' },
                    { key: 'email', label: 'Email Address', type: 'email' },
                    { key: 'company', label: 'Company Name', type: 'text' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-xs font-medium text-muted-light uppercase tracking-wider">{field.label}</label>
                      <input
                        type={field.type}
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="input-field w-full mt-2 px-4 py-3 rounded-xl text-sm"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-medium text-muted-light uppercase tracking-wider">What do you want to automate?</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="input-field w-full mt-2 px-4 py-3 rounded-xl text-sm resize-none"
                      placeholder="Describe your workflows, pain points, or goals..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    Request Demo
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative py-16 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Mech<span className="gradient-text">links</span>
              </span>
              <span className="text-xs text-muted-extra ml-3">Enterprise Industrial Automation</span>
            </div>
            <div className="flex items-center gap-8">
              {[
                { label: 'Workflows', href: '#workflows' },
                { label: 'Use Cases', href: '#use-cases' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map(link => (
                <a key={link.label} href={link.href} className="text-xs text-muted-light transition-colors no-underline">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-muted-extra">sales@mechlinks.ai</p>
              <p className="text-xs text-muted-extra mt-1">© 2026 Mechlinks. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
