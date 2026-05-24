"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Clock, ChevronLeft, Phone, Check, Zap, Star, Shield, RotateCcw, Headphones } from "lucide-react"
import TimeSolt from "../components/TimeSolt"
import axios from "axios"
import { BASE_URL } from "../components/BaseUrl"
import { toast } from "sonner"
import LiveDemoModal from "../components/LiveDemoModel"

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream:      #f7f3ef;
    --cream-2:    #faf8f5;
    --white:      #ffffff;
    --ink:        #18160f;
    --ink-soft:   #46423a;
    --ink-muted:  #8c877f;
    --green:      #10b981;
    --green-dark: #059669;
    --green-bg:   rgba(16,185,129,0.08);
    --red-bg:     rgba(239,68,68,0.08);
    --red:        #dc2626;
    --border:     rgba(24,22,15,0.08);
    --shadow-sm:  0 1px 3px rgba(24,22,15,0.06), 0 1px 2px rgba(24,22,15,0.04);
    --shadow-md:  0 4px 16px rgba(24,22,15,0.08), 0 2px 6px rgba(24,22,15,0.04);
    --shadow-lg:  0 12px 40px rgba(24,22,15,0.12), 0 4px 12px rgba(24,22,15,0.06);
    --radius:     14px;
    --ff-serif:   'Cormorant Garamond', Georgia, serif;
    --ff-sans:    'DM Sans', system-ui, sans-serif;
  }

  .sd { font-family: var(--ff-sans); background: var(--cream-2); min-height: 100vh; color: var(--ink); }

  /* ── BREADCRUMB ── */
  .sd-nav {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    padding: 0 clamp(16px, 4vw, 48px);
    height: 52px;
    display: flex; align-items: center;
    position: sticky; top: 72px; z-index: 50;
  }
  .sd-back {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500; color: var(--ink-muted);
    background: none; border: none; cursor: pointer;
    font-family: var(--ff-sans); transition: color .15s;
    padding: 0;
  }
  .sd-back:hover { color: var(--ink); }

  /* ── PAGE BODY ── */
  .sd-body {
    padding: clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px) 100px;
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: clamp(24px, 3vw, 48px);
    align-items: start;
    width: 100%;
  }
  @media (max-width: 1080px) {
    .sd-body {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .sd-right { order: -1; }
  }

  /* ══════════════════════════════════
     LEFT COLUMN
  ══════════════════════════════════ */
  .sd-left { min-width: 0; display: flex; flex-direction: column; gap: 28px;margin-top:50px }

  /* GALLERY */
  .sd-gallery { display: flex; flex-direction: column; gap: 10px; }

  .sd-main-img-wrap {
    position: relative;
    width: 100%; aspect-ratio: 16/9;
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--cream);
    box-shadow: var(--shadow-md);
  }
  .sd-main-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity .2s;
  }
  .sd-img-badges {
    position: absolute; top: 14px; left: 14px;
    display: flex; gap: 7px; flex-wrap: wrap;
  }
  .sd-badge {
    font-size: 11px; font-weight: 500;
    padding: 4px 11px; border-radius: 100px;
    backdrop-filter: blur(10px);
    letter-spacing: .02em;
  }
  .sd-badge-cat  { background: rgba(255,255,255,0.88); color: var(--ink-soft); border: 1px solid rgba(255,255,255,0.4); }
  .sd-badge-sale { background: rgba(220,38,38,0.85);   color: #fff; }
  .sd-badge-rate {
    position: absolute; top: 14px; right: 14px;
    background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.4);
    display: flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 600; color: var(--ink);
    padding: 5px 11px; border-radius: 100px;
  }
  .sd-star { color: #f59e0b; }

  .sd-thumbs {
    display: flex; gap: 8px; overflow-x: auto;
    scrollbar-width: none; padding-bottom: 2px;
  }
  .sd-thumbs::-webkit-scrollbar { display: none; }
  .sd-thumb {
    width: 72px; height: 54px; flex-shrink: 0;
    border-radius: 8px; overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer; transition: all .18s;
    opacity: .5;
  }
  .sd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .sd-thumb:hover { opacity: .8; }
  .sd-thumb.active { border-color: var(--green); opacity: 1; }

  /* SERVICE HEADER */
  .sd-header {}
  .sd-category-row {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 10px;
  }
  .sd-chip {
    font-size: 11.5px; font-weight: 500;
    padding: 4px 12px; border-radius: 100px;
    border: 1px solid var(--border);
  }
  .sd-chip-green { background: var(--green-bg); color: var(--green-dark); border-color: rgba(16,185,129,.2); }
  .sd-chip-red   { background: var(--red-bg);   color: var(--red);        border-color: rgba(220,38,38,.15); }
  .sd-chip-plain { background: var(--cream);     color: var(--ink-muted); }

  .sd-title {
    font-family: var(--ff-serif);
    font-size: clamp(26px, 3.2vw, 40px);
    font-weight: 600; line-height: 1.15;
    letter-spacing: -.3px; color: var(--ink);
    margin-bottom: 14px;
  }
  .sd-meta-row {
    display: flex; align-items: center; gap: 16px;
    flex-wrap: wrap; font-size: 13px; color: var(--ink-muted);
  }
  .sd-meta-item { display: flex; align-items: center; gap: 5px; }
  .sd-meta-item svg { color: var(--green); }

  /* DIVIDER */
  .sd-divider { height: 1px; background: var(--border); }

  /* DESC */
  .sd-desc {
    font-size: 15px; font-weight: 300;
    color: var(--ink-soft); line-height: 1.85;
  }

  /* SECTION */
  .sd-section {}
  .sd-section-label {
    font-family: var(--ff-serif);
    font-size: 21px; font-weight: 600; color: var(--ink);
    margin-bottom: 16px;
  }

  /* FEATURE GRID */
  .sd-feat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }
  .sd-feat-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 13px 15px;
    background: var(--white); border: 1px solid var(--border);
    border-radius: 10px; font-size: 13.5px; color: var(--ink-soft);
    line-height: 1.45;
    transition: border-color .15s, box-shadow .15s;
  }
  .sd-feat-item:hover { border-color: rgba(16,185,129,.3); box-shadow: 0 2px 8px rgba(16,185,129,.08); }
  .sd-feat-dot {
    width: 20px; height: 20px; flex-shrink: 0;
    border-radius: 50%; background: var(--green-bg);
    display: flex; align-items: center; justify-content: center;
    margin-top: 1px;
  }

  /* TRUST STRIP */
  .sd-trust {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  @media (max-width: 640px) { .sd-trust { grid-template-columns: 1fr 1fr; } }
  .sd-trust-item {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px 14px;
    display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
  }
  .sd-trust-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--green-bg);
    display: flex; align-items: center; justify-content: center;
    color: var(--green);
  }
  .sd-trust-label { font-size: 12px; font-weight: 600; color: var(--ink); line-height: 1.3; }
  .sd-trust-sub   { font-size: 11px; color: var(--ink-muted); line-height: 1.4; }

  /* PREVIEW BTN */
  .sd-demo-btn {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 13px 28px;
    background: var(--ink); color: var(--cream);
    font-family: var(--ff-sans); font-size: 14px; font-weight: 500;
    border: none; border-radius: 9px; cursor: pointer;
    transition: all .22s ease;
  }
  .sd-demo-btn:hover { background: #2c2820; transform: translateY(-1px); box-shadow: var(--shadow-md); }

  /* ══════════════════════════════════
     RIGHT COLUMN — STICKY SIDEBAR
  ══════════════════════════════════ */
  .sd-right {
    position: sticky;
    top: calc(72px + 52px + 24px);
    display: flex; flex-direction: column; gap: 14px;
  }
  @media (max-width: 1080px) { .sd-right { position: static; } }

  /* PRICE CARD */
  .sd-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }

  /* PLAN TABS */
  .sd-tabs {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid var(--border);
  }
  .sd-tab {
    padding: 14px 8px;
    font-size: 12.5px; font-weight: 400; color: var(--ink-muted);
    background: none; border: none;
    border-bottom: 2.5px solid transparent; margin-bottom: -1px;
    cursor: pointer; font-family: var(--ff-sans);
    transition: all .18s; text-align: center;
    letter-spacing: .01em;
  }
  .sd-tab.active { font-weight: 600; color: var(--ink); border-bottom-color: var(--ink); }
  .sd-tab:hover:not(.active) { color: var(--ink-soft); background: var(--cream-2); }

  .sd-card-body { padding: 22px 22px 24px; }

  .sd-plan-name { font-size: 12px; font-weight: 500; color: var(--ink-muted); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 4px; }
  .sd-svc-name  { font-size: 14.5px; font-weight: 600; color: var(--ink); margin-bottom: 14px; line-height: 1.3; }

  .sd-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px; }
  .sd-price {
    font-family: var(--ff-serif);
    font-size: 42px; font-weight: 600; color: var(--ink); line-height: 1;
  }
  .sd-price-note { font-size: 12px; color: var(--ink-muted); }

  /* DELIVERY PILLS */
  .sd-pills { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 18px; }
  .sd-pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 500; color: var(--ink-soft);
    background: var(--cream); border: 1px solid var(--border);
    border-radius: 100px; padding: 5px 11px;
  }
  .sd-pill svg { color: var(--green); }

  /* INCLUDED */
  .sd-included-toggle {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 13px; font-weight: 600; color: var(--ink);
    cursor: pointer; background: none; border: none; width: 100%;
    font-family: var(--ff-sans); padding: 10px 0;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    margin-bottom: 14px;
  }
  .sd-chevron {
    font-size: 16px; color: var(--ink-muted);
    transition: transform .2s; display: inline-block;
  }
  .sd-chevron.open { transform: rotate(90deg); }

  .sd-inc-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .sd-inc-item { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--ink-soft); }

  /* CTA */
  .sd-cta {
    width: 100%; padding: 15px;
    background: var(--ink); color: #fff;
    font-family: var(--ff-sans); font-size: 14.5px; font-weight: 600;
    border: none; border-radius: 11px; cursor: pointer;
    letter-spacing: .02em; margin-bottom: 10px;
    transition: all .22s ease;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .sd-cta:hover { background: #2c2820; transform: translateY(-1px); box-shadow: var(--shadow-md); }

  .sd-contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
  .sd-contact-btn {
    padding: 10px 12px;
    background: transparent; color: var(--ink-soft);
    font-family: var(--ff-sans); font-size: 12.5px; font-weight: 500;
    border: 1px solid var(--border); border-radius: 9px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: all .2s; text-decoration: none;
  }
  .sd-contact-btn:hover { border-color: rgba(24,22,15,.22); color: var(--ink); background: var(--cream-2); }
  .sd-wa:hover { border-color: #25D366; color: #16a34a; background: rgba(37,211,102,.05); }
  .sd-call:hover { border-color: var(--green); color: var(--green-dark); background: var(--green-bg); }

  .sd-consult-btn {
    width: 100%; padding: 11px;
    background: transparent; color: var(--ink-muted);
    font-family: var(--ff-sans); font-size: 13px; font-weight: 400;
    border: 1px solid var(--border); border-radius: 9px; cursor: pointer;
    transition: all .2s;
  }
  .sd-consult-btn:hover { border-color: var(--green); color: var(--green-dark); background: var(--green-bg); }

  /* GUARANTEE CARD */
  .sd-guarantee {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px 18px;
    display: flex; align-items: flex-start; gap: 12px;
    box-shadow: var(--shadow-sm);
  }
  .sd-guarantee-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    border-radius: 10px; background: var(--green-bg);
    display: flex; align-items: center; justify-content: center;
    color: var(--green);
  }
  .sd-guarantee-text h4 { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 3px; }
  .sd-guarantee-text p  { font-size: 12px; color: var(--ink-muted); line-height: 1.5; }

  /* MOBILE BOTTOM BAR */
  .sd-mobile-bar {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    background: var(--white); border-top: 1px solid var(--border);
    padding: 12px 20px 20px;
    gap: 12px; align-items: center;
    z-index: 200;
    box-shadow: 0 -4px 20px rgba(24,22,15,.1);
  }
  @media (max-width: 1080px) { .sd-mobile-bar { display: flex; } }
  .sd-mobile-price {
    font-family: var(--ff-serif);
    font-size: 26px; font-weight: 600; color: var(--ink);
    flex-shrink: 0; white-space: nowrap;
  }
  .sd-mobile-cta {
    flex: 1; padding: 13px;
    background: var(--ink); color: #fff;
    font-family: var(--ff-sans); font-size: 14px; font-weight: 600;
    border: none; border-radius: 10px; cursor: pointer;
    white-space: nowrap;
  }
`

function ServiceDetails() {
  const location = useLocation()
  const navigate = useNavigate()

  let service = location?.state || null
  if (!service) {
    try {
      const params = new URLSearchParams(location.search)
      const d = params.get("d")
      if (d) service = JSON.parse(decodeURIComponent(atob(d)))
    } catch { service = null }
  }

  const [activeImage, setActiveImage] = useState(service?.image?.[0])
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [activePlan, setActivePlan] = useState("Basic")
  const [showIncluded, setShowIncluded] = useState(true)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [meetingData, setMeetingData] = useState(null)

  if (!service) {
    return (
      <>
        <style>{STYLES}</style>
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "'DM Sans',sans-serif" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#18160f" }}>No service found</p>
          <button onClick={() => navigate(-1)} style={{ padding: "10px 24px", border: "1px solid rgba(24,22,15,0.12)", borderRadius: 8, cursor: "pointer", background: "transparent", fontSize: 14 }}>← Go Back</button>
        </div>
      </>
    )
  }

  const basePrice = Number(String(service.price || service.basePrice || 0).replace(/[^\d.]/g, "")) || 0
  const packages = {
    Basic:    { label: "Basic",    price: basePrice,        desc: "Essential package for getting started.", features: ["3-7 Days Delivery", "Unlimited Revisions", "Source Code Included", "Free Consultation"] },
    Standard: { label: "Standard", price: basePrice + 500,  desc: "Best for growing businesses with more needs.", features: ["3-7 Days Delivery", "Unlimited Revisions", "Source Code Included", "Free Consultation", "Priority Support"] },
    Premium:  { label: "Premium",  price: basePrice + 1000, desc: "Full-featured solution with premium support.", features: ["3-7 Days Delivery", "Unlimited Revisions", "Source Code Included", "Free Consultation", "Priority Support", "Dedicated Manager"] },
  }

  const handleScheduleMeeting = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL.url}/meeting-scheduling`,
        { meetingDate: selectedDate, time: selectedTime },
        { headers: { Authorization: `Bearer ${BASE_URL.token}` }, withCredentials: true }
      )
      if (res.data.success) { toast.success(res.data.message); setMeetingData(res.data?.meeting); return true }
      else { toast.error(res.data.message); return false }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to schedule meeting")
      return false
    }
  }

  const highlights = ["Dashboard & Analytics", "Admin Panel", "Custom Workflow Design", "API Integration", "Mobile Responsive", "Scalable Architecture"]
  const demoUrl = service.liveDemoUrl || "https://maker-lane-co.lovable.app/"
  const token = localStorage.getItem("token")
  const pkg = packages[activePlan]

  return (
    <>
      <style>{STYLES}</style>
      <div className="sd">

        {/* NAV BAR */}
        <div className="sd-nav">
          <button className="sd-back" onClick={() => navigate(-1)}>
            <ChevronLeft size={15} strokeWidth={2.2} />
            Back to Designs
          </button>
        </div>

        {/* PAGE BODY */}
        <div className="sd-body">

          {/* ── LEFT ── */}
          <div className="sd-left">

            {/* GALLERY */}
            <div className="sd-gallery">
              <div className="sd-main-img-wrap">
                <img src={activeImage} alt={service.title} className="sd-main-img" />
                <div className="sd-img-badges">
                  {service.category && <span className="sd-badge sd-badge-cat">{service.category}</span>}
                  <span className="sd-badge sd-badge-sale">Limited Offer</span>
                </div>
                <div className="sd-badge-rate">
                  <span className="sd-star">★</span>
                  {service.rating || 4.8}
                  <span style={{ color: "var(--ink-muted)", fontWeight: 400, fontSize: 11 }}>({service.totalReviews || 32})</span>
                </div>
              </div>
              {service.image?.length > 1 && (
                <div className="sd-thumbs">
                  {service.image.map((img, i) => (
                    <div key={i} className={`sd-thumb${activeImage === img ? " active" : ""}`} onClick={() => setActiveImage(img)}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TITLE BLOCK */}
            <div className="sd-header">
              <div className="sd-category-row">
                {service.category && <span className="sd-chip sd-chip-green">{service.category}</span>}
                <span className="sd-chip sd-chip-red">🔥 Limited Offer</span>
                {service.deliveryTime && <span className="sd-chip sd-chip-plain">⚡ {service.deliveryTime}-day delivery</span>}
              </div>
              <h1 className="sd-title">{service.title}</h1>
              <div className="sd-meta-row">
                <span className="sd-meta-item"><Star size={13} fill="#f59e0b" color="#f59e0b" />{service.rating || 4.8} rating</span>
                <span className="sd-meta-item"><Clock size={13} />3–7 day delivery</span>
                <span className="sd-meta-item"><Check size={13} />Unlimited revisions</span>
              </div>
            </div>

            <div className="sd-divider" />

            {/* DESCRIPTION */}
            <div className="sd-section">
              <h2 className="sd-section-label">About This Service</h2>
              <p className="sd-desc">
                {service.description || "A powerful, scalable ERP solution designed to manage operations, automate workflows, and grow your business efficiently."}
              </p>
            </div>

            {/* HIGHLIGHTS */}
            <div className="sd-section">
              <h2 className="sd-section-label">Key Highlights</h2>
              <div className="sd-feat-grid">
                {highlights.map(h => (
                  <div key={h} className="sd-feat-item">
                    <div className="sd-feat-dot"><Check size={10} color="var(--green)" strokeWidth={2.5} /></div>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE DEMO */}
            <div className="sd-section">
              <h2 className="sd-section-label">See It Live</h2>
              <p className="sd-desc" style={{ marginBottom: 16 }}>Experience the full product before making any commitment.</p>
              <button className="sd-demo-btn" onClick={() => setShowDemoModal(true)}>
                <Zap size={14} strokeWidth={2} />
                View Live Demo
              </button>
            </div>

            {/* TRUST STRIP */}
            <div className="sd-section">
              <h2 className="sd-section-label">Why Choose Us</h2>
              <div className="sd-trust">
                {[
                  { icon: <Shield size={16} />,      label: "7-Day Refund",       sub: "Full refund if not satisfied" },
                  { icon: <RotateCcw size={16} />,   label: "Free Revisions",     sub: "Unlimited redesign requests" },
                  { icon: <Check size={16} />,        label: "We Deliver",         sub: "Built until you're happy" },
                  { icon: <Headphones size={16} />,   label: "24/7 Support",       sub: "Always here to help" },
                ].map(t => (
                  <div key={t.label} className="sd-trust-item">
                    <div className="sd-trust-icon">{t.icon}</div>
                    <div>
                      <div className="sd-trust-label">{t.label}</div>
                      <div className="sd-trust-sub">{t.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT: STICKY SIDEBAR ── */}
          <div className="sd-right">

            {/* PRICE CARD */}
            <div className="sd-card">
              <div className="sd-tabs">
                {Object.keys(packages).map(plan => (
                  <button
                    key={plan}
                    className={`sd-tab${activePlan === plan ? " active" : ""}`}
                    onClick={() => setActivePlan(plan)}
                  >{plan}</button>
                ))}
              </div>

              <div className="sd-card-body">
                <div className="sd-plan-name">{pkg.label} Plan</div>
                <div className="sd-svc-name">{service.title}</div>

                <div className="sd-price-row">
                  <span className="sd-price">₹{pkg.price.toLocaleString("en-IN")}</span>
                  <span className="sd-price-note">one-time</span>
                </div>

                <div className="sd-pills">
                  <span className="sd-pill"><Clock size={11} />3-7 Days</span>
                  <span className="sd-pill"><Check size={11} />Unlimited Revisions</span>
                  <span className="sd-pill"><Check size={11} />Source Code</span>
                </div>

                <button className="sd-included-toggle" onClick={() => setShowIncluded(v => !v)}>
                  What's Included
                  <span className={`sd-chevron${showIncluded ? " open" : ""}`}>›</span>
                </button>

                {showIncluded && (
                  <ul className="sd-inc-list">
                    {pkg.features.map(f => (
                      <li key={f} className="sd-inc-item">
                        <div className="sd-feat-dot"><Check size={10} color="var(--green)" strokeWidth={2.5} /></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <button className="sd-cta" onClick={() => token ? setShowScheduleModal(true) : navigate("/login")}>
                  Continue →
                </button>

                <div className="sd-contact-row">
                  <a href="https://wa.me/917849082680" target="_blank" rel="noreferrer" className="sd-contact-btn sd-wa">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#25D366" }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a href="tel:+917849082680" className="sd-contact-btn sd-call">
                    <Phone size={13} strokeWidth={1.8} /> Call Us
                  </a>
                </div>

                <button className="sd-consult-btn" onClick={() => token ? setShowScheduleModal(true) : navigate("/login")}>
                  📅 Book Free Consultation
                </button>
              </div>
            </div>

            {/* GUARANTEE CARD */}
            <div className="sd-guarantee">
              <div className="sd-guarantee-icon"><Shield size={18} /></div>
              <div className="sd-guarantee-text">
                <h4>Money-Back Guarantee</h4>
                <p>Not satisfied? Get a full refund within 7 days of delivery, no questions asked.</p>
              </div>
            </div>

          </div>
        </div>

        {/* MOBILE BOTTOM BAR */}
        <div className="sd-mobile-bar">
          <span className="sd-mobile-price">₹{pkg.price.toLocaleString("en-IN")}</span>
          <button className="sd-mobile-cta" onClick={() => token ? setShowScheduleModal(true) : navigate("/login")}>
            Continue →
          </button>
        </div>

        {/* MODALS */}
        {showScheduleModal && (
          <TimeSolt
            meetingData={meetingData}
            handleScheduleMeeting={handleScheduleMeeting}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onClose={() => setShowScheduleModal(false)}
            activePlan={activePlan}
            price={packages[activePlan].price}
          />
        )}
        {showDemoModal && (
          <LiveDemoModal
            url={demoUrl}
            title={`Live Preview — ${service.title}`}
            onClose={() => setShowDemoModal(false)}
          />
        )}
      </div>
    </>
  )
}

export default ServiceDetails