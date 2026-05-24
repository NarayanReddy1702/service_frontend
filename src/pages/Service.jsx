'use client'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../components/BaseUrl"
import { Clock, SlidersHorizontal } from "lucide-react"
import LiveDemoModal from '../components/LiveDemoModel'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --cream: #f5f0eb;
    --cream-2: #faf7f4;
    --ink: #1a1814;
    --ink-soft: #4a4540;
    --ink-muted: #8a857f;
    --green: #10b981;
    --green-dark: #059669;
    --border: rgba(26,24,20,0.09);
  }

  * { box-sizing: border-box; }

  .svc-page {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream-2);
    min-height: 100vh;
    width: 100%;
  }

  /* ── PAGE HEADER ── */
  .svc-page-header {
    background: var(--ink);
    padding: 96px 24px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .svc-page-header::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 60% 0%, rgba(16,185,129,0.15) 0%, transparent 65%);
    pointer-events: none;
  }
  .svc-page-eyebrow {
    display: inline-block;
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--green); margin-bottom: 16px;
  }
  .svc-page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 5vw, 58px);
    font-weight: 600; color: #f5f0eb;
    line-height: 1.1; letter-spacing: -0.3px;
    margin: 0 0 14px;
  }
  .svc-page-sub {
    font-size: 15px; font-weight: 300;
    color: rgba(245,240,235,0.5);
    max-width: 520px; margin: 0 auto;
    line-height: 1.7;
  }

  @media (max-width: 640px) {
    .svc-page-header { padding: 72px 20px 44px; }
    .svc-page-sub { font-size: 14px; }
  }

  /* ── FILTER BAR ── */
  .filter-bar {
    background: #fff;
    border-bottom: 1px solid var(--border);
    padding: 0 clamp(16px, 3vw, 40px);
    position: sticky; top: 72px; z-index: 100;
    width: 100%;
  }
  .filter-inner {
    width: 100%;
    display: flex; align-items: center; gap: 8px;
    overflow-x: auto; padding: 14px 0;
    scrollbar-width: none;
  }
  .filter-inner::-webkit-scrollbar { display: none; }
  .filter-icon {
    display: flex; align-items: center; gap: 6px;
    flex-shrink: 0; padding: 8px 14px;
    border-radius: 8px; background: var(--cream);
    font-size: 13px; font-weight: 500; color: var(--ink-soft);
    border: 1px solid var(--border);
  }
  .filter-chip {
    flex-shrink: 0; padding: 8px 18px;
    border-radius: 100px;
    font-size: 13px; font-weight: 400;
    border: 1px solid var(--border);
    background: transparent; color: var(--ink-soft);
    cursor: pointer; transition: all 0.2s ease;
    white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
  }
  .filter-chip:hover { border-color: rgba(26,24,20,0.25); color: var(--ink); }
  .filter-chip.active {
    background: var(--ink); color: var(--cream);
    border-color: var(--ink); font-weight: 500;
  }

  /* ── GRID ── */
  .svc-grid-wrap {
    width: 100%;
    padding: 40px clamp(16px, 3vw, 40px) 80px;
  }
  .svc-count {
    font-size: 13px; color: var(--ink-muted); margin-bottom: 24px;
  }
  .svc-count span { color: var(--ink); font-weight: 600; }

  .svc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: 24px;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    .svc-grid { grid-template-columns: 1fr; gap: 16px; }
    .svc-grid-wrap { padding: 28px 16px 60px; }
  }

  /* ── CARD ── */
  .svc-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .svc-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 56px rgba(26,24,20,0.11);
  }

  .svc-img-wrap {
    position: relative; height: 220px;
    overflow: hidden; background: #ede8e1;
    flex-shrink: 0;
  }
  .svc-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    display: block;
  }
  .svc-card:hover .svc-img-wrap img { transform: scale(1.06); }

  @media (max-width: 480px) { .svc-img-wrap { height: 190px; } }

  .badge {
    position: absolute;
    font-size: 11px; font-weight: 500;
    padding: 5px 11px; border-radius: 100px;
  }
  .badge-cat {
    top: 14px; left: 14px;
    background: rgba(255,255,255,0.92); color: var(--ink-soft);
    backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,0.06);
  }
  .badge-days {
    top: 14px; right: 14px;
    background: rgba(16,185,129,0.88); color: #fff;
    display: flex; align-items: center; gap: 5px;
  }
  .badge-discount {
    bottom: 14px; right: 14px;
    background: var(--ink); color: var(--cream);
    border-radius: 4px; letter-spacing: 0.04em;
  }

  .svc-body {
    padding: 20px;
    display: flex; flex-direction: column;
    flex: 1;
  }

  .svc-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px; font-weight: 600; color: var(--ink);
    line-height: 1.3; margin-bottom: 8px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .svc-desc {
    font-size: 13px; color: var(--ink-muted); line-height: 1.6;
    margin-bottom: 16px;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
    flex: 1;
  }
  .svc-meta {
    display: flex; align-items: center;
    justify-content: space-between;
    margin-bottom: 16px; padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .svc-rating {
    display: flex; align-items: center; gap: 5px;
    font-size: 13px; color: var(--ink-soft);
  }
  .svc-star { color: #f59e0b; }
  .svc-rating-count { color: var(--ink-muted); font-size: 12px; }

  .svc-pricing { display: flex; align-items: baseline; gap: 8px; }
  .svc-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 600; color: var(--ink);
  }
  .svc-original {
    font-size: 12px; color: #c4bfba;
    text-decoration: line-through;
  }

  .svc-actions { display: flex; gap: 10px; }
  .btn-dark {
    flex: 1; padding: 10px 14px;
    background: var(--ink); color: var(--cream);
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    border: none; border-radius: 6px; cursor: pointer;
    transition: background 0.2s; letter-spacing: 0.02em;
  }
  .btn-dark:hover { background: #2c2820; }
  .btn-ghost {
    flex: 1; padding: 10px 14px;
    background: transparent; color: var(--ink-soft);
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
    border: 1px solid var(--border); border-radius: 6px; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(26,24,20,0.25); color: var(--ink); }

  /* ── EMPTY / LOADING ── */
  .svc-empty {
    text-align: center; padding: 80px 24px; color: var(--ink-muted);
  }
  .svc-empty h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 500; color: var(--ink-soft);
    margin-bottom: 8px;
  }

  /* ── SKELETON ── */
  .svc-skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: 24px;
  }
  @media (max-width: 480px) { .svc-skeleton-grid { grid-template-columns: 1fr; } }
  .svc-skeleton-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  .svc-skeleton-img {
    height: 220px;
    background: linear-gradient(90deg, #ede8e1 25%, #e5e0d8 50%, #ede8e1 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }
  .svc-skeleton-body { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
  .svc-skeleton-line {
    height: 14px; border-radius: 6px;
    background: linear-gradient(90deg, #ede8e1 25%, #e5e0d8 50%, #ede8e1 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

function encodeService(service) {
  try { return btoa(encodeURIComponent(JSON.stringify(service))) } catch { return "" }
}

function SkeletonCard() {
  return (
    <div className="svc-skeleton-card">
      <div className="svc-skeleton-img" />
      <div className="svc-skeleton-body">
        <div className="svc-skeleton-line" style={{ width: "70%" }} />
        <div className="svc-skeleton-line" style={{ width: "90%" }} />
        <div className="svc-skeleton-line" style={{ width: "55%" }} />
      </div>
    </div>
  )
}

function Service() {
  const navigate = useNavigate()
  const location = useLocation()
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])
  const [activeCategory, setActiveCategory] = useState(location.state?.category || "All Services")
  const [demoModal, setDemoModal] = useState({ open: false, url: "" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BASE_URL.url}/category`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setCategories(res.data.category.map(c => c.name))
        }
      }).catch(console.error)
  }, [])

  useEffect(() => {
    setLoading(true)
    axios.get(`${BASE_URL.url}/service`, { withCredentials: true })
      .then(res => { if (res.data.success) setServices(res.data.service) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const allCategories = ["All Services", ...categories]

  const filtered = activeCategory === "All Services"
    ? services
    : services.filter(s => s.category === activeCategory)

  const openDemo = (url) => setDemoModal({ open: true, url: url || "https://maker-lane-co.lovable.app/" })

  const handleCardClick = (e, service) => {
    e.preventDefault()
    navigate("/service-details", { state: service })
  }

  const getServiceHref = (service) => {
    const encoded = encodeService(service)
    return encoded ? `/service-details?d=${encoded}` : "/service-details"
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="svc-page">

        {/* PAGE HEADER */}
        <div className="svc-page-header">
          <p className="svc-page-eyebrow">Browse Services</p>
          <h1 className="svc-page-title">Browse Digital Services</h1>
          <p className="svc-page-sub">Find the perfect website, app, or software solution tailored to your business goals.</p>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <div className="filter-inner">
            <div className="filter-icon">
              <SlidersHorizontal size={14} strokeWidth={2} />
              <span>Filter</span>
            </div>
            {allCategories.map(cat => (
              <button
                key={cat}
                className={`filter-chip${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="svc-grid-wrap">

          {!loading && (
            <p className="svc-count">
              Showing <span>{filtered.length}</span> {filtered.length === 1 ? "service" : "services"}
              {activeCategory !== "All Services" && <> in <span>{activeCategory}</span></>}
            </p>
          )}

          {loading ? (
            <div className="svc-skeleton-grid">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="svc-empty">
              <h3>No services found</h3>
              <p>Try selecting a different category</p>
            </div>
          ) : (
            <div className="svc-grid">
              {filtered.map((service, i) => {
                const discount = service.originalPrice && service.basePrice
                  ? Math.round(((service.originalPrice - service.basePrice) / service.originalPrice) * 100)
                  : null
                return (
                  <a
                    key={i}
                    href={getServiceHref(service)}
                    onClick={(e) => handleCardClick(e, service)}
                    style={{ textDecoration: "none", display: "block", height: "100%" }}
                  >
                    <div className="svc-card">
                      <div className="svc-img-wrap">
                        <img src={service.image?.[0]} alt={service.title} loading="lazy" />
                        {service.category && <span className="badge badge-cat">{service.category}</span>}
                        {service.deliveryTime && (
                          <span className="badge badge-days">
                            <Clock size={11} strokeWidth={2} />{service.deliveryTime}d
                          </span>
                        )}
                        {discount && <span className="badge badge-discount">{discount}% OFF</span>}
                      </div>
                      <div className="svc-body">
                        <h3 className="svc-title">{service.title}</h3>
                        <p className="svc-desc">{service.description}</p>
                        <div className="svc-meta">
                          <div className="svc-rating">
                            <span className="svc-star">★</span>
                            {service.rating || 4.8}
                            <span className="svc-rating-count">({service.totalReviews || 32})</span>
                          </div>
                          <div className="svc-pricing">
                            <span className="svc-price">₹{service.basePrice || service.price}</span>
                            {service.originalPrice && <span className="svc-original">₹{service.originalPrice}</span>}
                          </div>
                        </div>
                        <div className="svc-actions">
                          <button
                            className="btn-dark"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); openDemo(service.liveDemoUrl) }}
                          >
                            Live Preview
                          </button>
                          <button
                            className="btn-ghost"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate("/service-details", { state: service }) }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>

        {/* DEMO MODAL */}
        {demoModal.open && (
          <LiveDemoModal
            url={demoModal.url}
            title="Live Preview"
            onClose={() => setDemoModal({ open: false, url: "" })}
          />
        )}
      </div>
    </>
  )
}

export default Service