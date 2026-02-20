import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion'
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
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
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
              className="hidden md:flex items-center mx-2"
            >
              <div className="w-10 h-px flow-connector" />
              <ChevronRight size={14} className="text-muted-light -ml-1" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
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
  { name: 'OPC UA', desc: 'Industrial connectivity', category: 'Integration' },
  { name: 'MQTT', desc: 'IoT messaging', category: 'Integration' },
  { name: 'SCADA / HMI', desc: 'Operations visibility', category: 'Operations' },
  { name: 'MES / ERP', desc: 'Production + planning', category: 'Operations' },
  { name: 'Data Historian', desc: 'Time series storage', category: 'Data' },
  { name: 'n8n / Node-RED', desc: 'Orchestration', category: 'Automation' },
  { name: 'AI Models', desc: 'Anomaly detection', category: 'AI' },
  { name: 'Custom APIs', desc: 'Bespoke solutions', category: 'Custom' },
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
  blue:    '#3b82f6', amber: '#f59e0b', violet: '#8b5cf6',
  emerald: '#10b981', pink:  '#ec4899', cyan:   '#06b6d4',
}

function PainPointsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const count = painPoints.length
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(count - 1) * 100}vw`])
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', v => {
    const n = Math.max(0, Math.min(1, v))
    setActive(Math.round(n * (count - 1)))
  })

  return (
    <section ref={sectionRef} id="problems" style={{ height: `${(count + 1) * 100}vh` }} className="relative neuro-section">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
          <motion.span
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: 'rgba(96,165,250,0.9)' }}
          >The Problem</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Manual Work <span style={{ color: 'var(--text-muted)' }}>Killing Your Growth</span>
          </motion.h2>
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-3 mt-5">
            {painPoints.map((_, i) => (
              <div
                key={i}
                className={`neuro-progress-dot ${i === active ? 'neuro-progress-dot-active' : ''}`}
                style={{
                  width: i === active ? 32 : 10, height: 10,
                  background: i === active ? painColors[painGlows[i]] : undefined,
                  boxShadow: i === active ? `0 0 12px ${painColors[painGlows[i]]}80` : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* Scrolling cards */}
        <div className="flex-1 flex items-center overflow-hidden px-0">
          <motion.div style={{ x }} className="flex will-change-transform">
            {painPoints.map((item, i) => {
              const glow = painGlows[i]
              const color = painColors[glow]
              return (
                <div key={i} style={{ width: '100vw', flexShrink: 0 }} className="flex items-center justify-center px-6 sm:px-12">
                  <motion.div
                    className={`neuro-card w-full relative overflow-hidden ${i === active ? 'neuro-card-active' : ''}`}
                    style={{ maxWidth: 780, height: 'clamp(380px, 58vh, 520px)' }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Big ghost number */}
                    <span className="neuro-card-num select-none">0{i + 1}</span>

                    <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-10">
                      {/* Top: icon + badge */}
                      <div className="flex items-start justify-between">
                        <div className="neuro-inset flex items-center justify-center" style={{ width: 72, height: 72, background: `${color}12` }}>
                          <item.icon size={28} style={{ color }} />
                        </div>
                        <div className="neuro-badge px-4 py-1.5">
                          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                            Pain {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)', maxWidth: 520 }}>
                          {item.problem}
                        </p>
                      </div>

                      {/* Solution bar */}
                      <div>
                        <div className="neuro-divider mb-5" />
                        <div className="flex items-start gap-3">
                          <div className="neuro-inset mt-0.5 flex items-center justify-center shrink-0" style={{ width: 28, height: 28 }}>
                            <Check size={14} style={{ color: 'var(--accent-success)' }} />
                          </div>
                          <p className="text-sm sm:text-base font-semibold" style={{ color: 'var(--accent-success)' }}>{item.solution}</p>
                        </div>
                      </div>
                    </div>

                    {/* Accent glow blob */}
                    <div
                      className="neuro-accent-blob absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${color}35 0%, transparent 70%)`, filter: 'blur(30px)' }}
                    />
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="flex-shrink-0 flex items-center justify-center gap-3 pb-8">
          <div className="neuro-scroll-hint px-5 py-2 flex items-center gap-2">
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </motion.div>
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              Scroll to explore &nbsp;{active + 1} / {count}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Capabilities - Neumorphism Horizontal Scroll ─── */
function CapabilitiesSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const count = workflows.length
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(count - 1) * 100}vw`])
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', v => {
    const n = Math.max(0, Math.min(1, v))
    setActive(Math.round(n * (count - 1)))
  })

  return (
    <section ref={sectionRef} id="workflows" style={{ height: `${(count + 1) * 100}vh` }} className="relative neuro-section">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 text-center pt-20 pb-6 px-6">
          <motion.span
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: 'rgba(96,165,250,0.9)' }}
          >Capabilities</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Every Workflow. <span style={{ color: 'var(--text-muted)' }}>Any Complexity.</span>
          </motion.h2>
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            {workflows.map((wf, i) => (
              <div
                key={i}
                className={`neuro-progress-dot ${i === active ? 'neuro-progress-dot-active' : ''}`}
                style={{
                  width: i === active ? 28 : 8, height: 8,
                  background: i === active ? wf.color : undefined,
                  boxShadow: i === active ? `0 0 10px ${wf.color}80` : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* Scrolling cards */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex will-change-transform">
            {workflows.map((item, i) => (
              <div key={i} style={{ width: '100vw', flexShrink: 0 }} className="flex items-center justify-center px-6 sm:px-12">
                <motion.div
                  className={`neuro-card w-full relative overflow-hidden ${i === active ? 'neuro-card-active' : ''}`}
                  style={{ maxWidth: 720, height: 'clamp(360px, 55vh, 500px)' }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Big ghost number */}
                  <span className="neuro-card-num select-none">{String(i + 1).padStart(2, '0')}</span>

                  <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-10">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className={`neuro-inset flex items-center justify-center ${item.iconBg}`} style={{ width: 72, height: 72 }}>
                        <item.icon size={28} style={{ color: item.color }} />
                      </div>
                      <div className="neuro-badge px-4 py-1.5">
                        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                          {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.desc.split(', ').map((tag, j) => (
                          <span
                            key={j}
                            className="neuro-badge text-xs px-3 py-1 font-medium"
                            style={{ color: 'var(--text-muted)' }}
                          >{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div>
                      <div className="neuro-divider mb-5" />
                      <div className="flex items-center gap-3">
                        <div className="h-1 rounded-full flex-1" style={{ background: `linear-gradient(90deg, ${item.color}60, transparent)` }} />
                        <span className="text-xs font-semibold uppercase tracking-wider neuro-accent-text" style={{ color: item.color }}>Automated</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="neuro-accent-blob absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${item.color}35 0%, transparent 70%)`, filter: 'blur(30px)' }}
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="flex-shrink-0 flex items-center justify-center gap-3 pb-8">
          <div className="neuro-scroll-hint px-5 py-2 flex items-center gap-2">
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </motion.div>
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              Scroll to explore &nbsp;{active + 1} / {count}
            </span>
          </div>
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
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : ''
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const isLight = theme === 'light'

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
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
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#3b82f6', letterSpacing: '0.2em' }}>Use Cases</span>
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
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#06b6d4', letterSpacing: '0.2em' }}>Technology</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4">
                Our Automation Stack
              </h2>
              <p className="text-muted mt-6 max-w-lg mx-auto font-light text-lg">
                Integrations, orchestration, and AI - selected for reliability in production environments.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group glass-card-strong p-6 rounded-2xl text-center">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-extra">{item.category}</span>
                  <h3 className="text-base font-semibold mt-2">{item.name}</h3>
                  <p className="text-xs text-muted-light mt-1">{item.desc}</p>
                </div>
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
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#10b981', letterSpacing: '0.2em' }}>About</span>
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
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent-success)', letterSpacing: '0.2em' }}>Process</span>
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
              <span className="text-xs font-semibold tracking-widest uppercase text-muted" style={{ letterSpacing: '0.2em' }}>FAQ</span>
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
