import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2, Globe, MessageSquare, Palette,
  PenTool, Smartphone, X, TrendingUp, Video,
  ArrowRight, Play, Clock, BadgeCheck,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../components/BaseUrl";
import CTASection from "./CTASection";
import LiveDemoModal from "../components/LiveDemoModel";

const iconMap = { Palette, Globe, Code2, Smartphone, Video, PenTool, TrendingUp, MessageSquare };
const uspItems = [
  "Live Demo Before Purchase",
  "7-Day Money Back Guarantee",
  "Unlimited Redesign Requests",
  "Built with CMS, Custom Code & MERN Stack",
  "Dedicated Expert Consultation",
];

const HOME_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --cream: #f5f0eb;
    --ink: #1a1814;
    --ink-soft: #4a4540;
    --ink-muted: #8a857f;
    --green: #10b981;
    --green-dark: #059669;
    --border: rgba(26,24,20,0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .home-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    width: 100%;
  }

  /* ========================================
     HERO SECTION - FULL WIDTH
     ======================================== */
  .hero {
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    background: #faf7f4;
    padding-top: 96px;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    .hero {
      grid-template-columns: 1fr;
      min-height: auto;
      padding-top: 80px;
    }
  }

  @media (max-width: 640px) {
    .hero {
      padding-top: 64px;
    }
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 64px 80px 80px;
    position: relative;
  }

  @media (max-width: 1280px) {
    .hero-left {
      padding: 64px 40px;
    }
  }

  @media (max-width: 960px) {
    .hero-left {
      padding: 48px 32px;
    }
  }

  @media (max-width: 768px) {
    .hero-left {
      padding: 40px 24px;
    }
  }

  @media (max-width: 640px) {
    .hero-left {
      padding: 32px 20px;
    }
  }

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px 6px 6px;
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 100px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--green-dark);
    width: fit-content;
    margin-bottom: 32px;
    letter-spacing: 0.01em;
  }

  @media (max-width: 640px) {
    .hero-tag {
      font-size: 11px;
      padding: 5px 12px 5px 5px;
      margin-bottom: 24px;
    }
  }

  .hero-tag-dot {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--green);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 5vw, 68px);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.5px;
    color: var(--ink);
    margin-bottom: 28px;
  }

  @media (max-width: 640px) {
    .hero-title {
      margin-bottom: 20px;
    }
  }

  .hero-title em {
    font-style: italic;
    color: var(--green);
  }

  .hero-desc {
    font-size: 16px;
    font-weight: 300;
    color: var(--ink-soft);
    line-height: 1.75;
    max-width: 440px;
    margin-bottom: 48px;
  }

  @media (max-width: 768px) {
    .hero-desc {
      font-size: 15px;
      margin-bottom: 40px;
    }
  }

  @media (max-width: 640px) {
    .hero-desc {
      font-size: 14px;
      margin-bottom: 32px;
    }
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 64px;
  }

  @media (max-width: 640px) {
    .hero-actions {
      gap: 10px;
      margin-bottom: 48px;
    }
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: var(--ink);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.22s ease;
  }

  .btn-primary:hover {
    background: #2c2820;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(26, 24, 20, 0.2);
  }

  .btn-primary svg {
    transition: transform 0.18s;
  }

  .btn-primary:hover svg {
    transform: translateX(3px);
  }

  @media (max-width: 640px) {
    .btn-primary {
      padding: 11px 20px;
      font-size: 13px;
    }
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: transparent;
    color: var(--ink-soft);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid var(--border);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.22s ease;
  }

  .btn-outline:hover {
    border-color: rgba(26, 24, 20, 0.3);
    color: var(--ink);
    background: rgba(26, 24, 20, 0.03);
  }

  @media (max-width: 640px) {
    .btn-outline {
      padding: 11px 20px;
      font-size: 13px;
    }
  }

  .play-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .btn-outline:hover .play-circle {
    background: var(--green);
  }

  @media (max-width: 640px) {
    .play-circle {
      width: 36px;
      height: 36px;
    }
  }

  .hero-stats {
    display: flex;
    gap: 40px;
    padding-top: 32px;
    border-top: 1px solid var(--border);
  }

  @media (max-width: 768px) {
    .hero-stats {
      gap: 32px;
      padding-top: 24px;
    }
  }

  @media (max-width: 640px) {
    .hero-stats {
      gap: 24px;
      padding-top: 20px;
      flex-wrap: wrap;
    }
  }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1;
    margin-bottom: 4px;
  }

  @media (max-width: 640px) {
    .stat-num {
      font-size: 24px;
    }
  }

  .stat-label {
    font-size: 12px;
    font-weight: 400;
    color: var(--ink-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @media (max-width: 640px) {
    .stat-label {
      font-size: 11px;
    }
  }

  /* Hero Right */
  .hero-right {
    position: relative;
    background: #ede8e1;
    overflow: visible;
  }

  @media (max-width: 1024px) {
    .hero-right {
      height: 480px;
    }
  }

  @media (max-width: 640px) {
    .hero-right {
      height: 360px;
    }
  }

  .hero-right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 8s ease;
  }

  .hero-right-img-clip {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .hero-right:hover img {
    transform: scale(1.04);
  }

  /* Floating Card */
  .hero-float-card {
    position: absolute;
    bottom: 32px;
    left: -24px;
    background: #fff;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    gap: 14px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    animation: floatCard 3s ease-in-out infinite;
    z-index: 10;
  }

  @keyframes floatCard {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  @media (max-width: 768px) {
    .hero-float-card {
      bottom: 20px;
      left: -16px;
      padding: 12px 16px;
      gap: 10px;
    }
  }

  @media (max-width: 640px) {
    .hero-float-card {
      bottom: 16px;
      left: -12px;
      padding: 10px 14px;
      gap: 8px;
    }
  }

  .hero-float-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: linear-gradient(135deg, #10b981, #059669);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .hero-float-icon {
      width: 36px;
      height: 36px;
    }
  }

  .hero-float-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1;
    margin-bottom: 3px;
  }

  @media (max-width: 640px) {
    .hero-float-title {
      font-size: 12px;
    }
  }

  .hero-float-sub {
    font-size: 12px;
    color: var(--ink-muted);
  }

  @media (max-width: 640px) {
    .hero-float-sub {
      font-size: 11px;
    }
  }

  /* ========================================
     CATEGORIES SECTION - FULL WIDTH
     ======================================== */
  .section-categories {
    width: 100%;
    padding: 120px 20px;
    background: var(--cream);
  }

  @media (max-width: 768px) {
    .section-categories {
      padding: 80px 20px;
    }
  }

  @media (max-width: 640px) {
    .section-categories {
      padding: 60px 16px;
    }
  }

  .section-header {
    max-width: 900px;
    margin: 0 auto 72px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .section-header {
      margin-bottom: 56px;
    }
  }

  @media (max-width: 640px) {
    .section-header {
      margin-bottom: 40px;
    }
  }

  .section-eyebrow {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 3.5vw, 52px);
    font-weight: 600;
    color: var(--ink);
    line-height: 1.1;
    letter-spacing: -0.3px;
  }

  .section-sub {
    margin-top: 14px;
    font-size: 15px;
    font-weight: 300;
    color: var(--ink-muted);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 640px) {
    .section-sub {
      font-size: 14px;
    }
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    .categories-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      padding: 0;
    }
  }

  @media (max-width: 640px) {
    .categories-grid {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 0;
    }
  }

  .cat-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 640px) {
    .cat-card {
      padding: 24px 20px;
    }
  }

  .cat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.04), transparent);
    opacity: 0;
    transition: opacity 0.28s;
  }

  .cat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(26, 24, 20, 0.1);
    border-color: rgba(16, 185, 129, 0.25);
  }

  .cat-card:hover::before {
    opacity: 1;
  }

  .cat-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: #f5f0eb;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    transition: background 0.22s;
  }

  @media (max-width: 640px) {
    .cat-icon-wrap {
      width: 44px;
      height: 44px;
      margin-bottom: 16px;
    }
  }

  .cat-card:hover .cat-icon-wrap {
    background: rgba(16, 185, 129, 0.1);
  }

  .cat-card:hover .cat-icon-wrap svg {
    color: var(--green) !important;
  }

  .cat-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 6px;
  }

  @media (max-width: 640px) {
    .cat-name {
      font-size: 14px;
    }
  }

  .cat-desc {
    font-size: 13px;
    color: var(--ink-muted);
    line-height: 1.55;
  }

  @media (max-width: 640px) {
    .cat-desc {
      font-size: 12px;
    }
  }

  /* ========================================
     SERVICES SECTION - FULL WIDTH
     ======================================== */
  .section-services {
    width: 100%;
    padding: 120px 20px;
    background: #faf7f4;
  }

  @media (max-width: 768px) {
    .section-services {
      padding: 80px 20px;
    }
  }

  @media (max-width: 640px) {
    .section-services {
      padding: 60px 16px;
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 28px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      padding: 0;
    }
  }

  @media (max-width: 640px) {
    .services-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 0;
    }
  }

  .svc-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .svc-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 64px rgba(26, 24, 20, 0.12);
  }

  .svc-img-wrap {
    position: relative;
    height: 240px;
    overflow: hidden;
    background: #ede8e1;
  }

  @media (max-width: 640px) {
    .svc-img-wrap {
      height: 200px;
    }
  }

  .svc-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .svc-card:hover .svc-img-wrap img {
    transform: scale(1.06);
  }

  .svc-badge {
    position: absolute;
    top: 16px;
    font-size: 11.5px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 100px;
  }

  @media (max-width: 640px) {
    .svc-badge {
      font-size: 10px;
      padding: 4px 10px;
      top: 12px;
    }
  }

  .svc-badge-cat {
    left: 16px;
    background: rgba(255, 255, 255, 0.92);
    color: var(--ink-soft);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 640px) {
    .svc-badge-cat {
      left: 12px;
    }
  }

  .svc-badge-days {
    right: 16px;
    background: rgba(16, 185, 129, 0.9);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 5px;
    backdrop-filter: blur(8px);
  }

  @media (max-width: 640px) {
    .svc-badge-days {
      right: 12px;
      gap: 3px;
    }
  }

  .svc-discount {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: var(--ink);
    color: var(--cream);
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    letter-spacing: 0.04em;
  }

  @media (max-width: 640px) {
    .svc-discount {
      bottom: 12px;
      right: 12px;
      font-size: 10px;
      padding: 3px 8px;
    }
  }

  .svc-body {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 640px) {
    .svc-body {
      padding: 20px;
    }
  }

  .svc-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 8px;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 640px) {
    .svc-title {
      font-size: 18px;
    }
  }

  .svc-desc {
    font-size: 13.5px;
    color: var(--ink-muted);
    line-height: 1.6;
    margin-bottom: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 640px) {
    .svc-desc {
      font-size: 13px;
      margin-bottom: 16px;
    }
  }

  .svc-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
    gap: 12px;
  }

  @media (max-width: 640px) {
    .svc-meta {
      margin-bottom: 16px;
      padding-bottom: 16px;
    }
  }

  .svc-rating {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: var(--ink-soft);
  }

  @media (max-width: 640px) {
    .svc-rating {
      font-size: 12px;
    }
  }

  .svc-rating-star {
    color: #f59e0b;
    font-size: 14px;
  }

  .svc-rating-count {
    color: var(--ink-muted);
    font-size: 12px;
  }

  @media (max-width: 640px) {
    .svc-rating-count {
      font-size: 11px;
    }
  }

  .svc-pricing {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .svc-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1;
  }

  @media (max-width: 640px) {
    .svc-price {
      font-size: 22px;
    }
  }

  .svc-original {
    font-size: 13px;
    color: #c4bfba;
    text-decoration: line-through;
  }

  @media (max-width: 640px) {
    .svc-original {
      font-size: 12px;
    }
  }

  .svc-actions {
    display: flex;
    gap: 10px;
    margin-top: auto;
  }

  @media (max-width: 640px) {
    .svc-actions {
      gap: 8px;
    }
  }

  .svc-btn-preview {
    flex: 1;
    padding: 11px;
    background: var(--ink);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.02em;
  }

  .svc-btn-preview:hover {
    background: #2c2820;
  }

  @media (max-width: 640px) {
    .svc-btn-preview {
      font-size: 12px;
      padding: 9px;
    }
  }

  .svc-btn-details {
    flex: 1;
    padding: 11px;
    background: transparent;
    color: var(--ink-soft);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .svc-btn-details:hover {
    border-color: rgba(26, 24, 20, 0.25);
    color: var(--ink);
    background: rgba(26, 24, 20, 0.03);
  }

  @media (max-width: 640px) {
    .svc-btn-details {
      font-size: 12px;
      padding: 9px;
    }
  }

  a[style] {
    text-decoration: none !important;
  }
`;

// ─── HOW IT WORKS MODAL ──────────────────────────────────────────────────────
const HIW_CSS = `
  @keyframes hiwOverlayIn { from{opacity:0} to{opacity:1} }
  @keyframes hiwCardIn    { from{opacity:0;transform:translateY(-32px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

  .hiw-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(26,24,20,0.55);
    backdrop-filter: blur(6px);
    display: flex; align-items: flex-start; justify-content: center;
    padding: 80px 24px 40px;
    animation: hiwOverlayIn 0.22s ease;
    overflow-y: auto;
  }

  .hiw-card {
    background: #fff;
    border-radius: 22px;
    width: 100%; max-width: 680px;
    box-shadow: 0 32px 80px rgba(26,24,20,0.22);
    overflow: hidden;
    animation: hiwCardIn 0.3s cubic-bezier(0.34,1.4,0.64,1);
  }

  .hiw-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 26px 32px 22px;
    border-bottom: 1px solid rgba(26,24,20,0.08);
    background: linear-gradient(135deg, #faf7f4 0%, #fff 100%);
  }
  .hiw-head-left {}
  .hiw-eyebrow {
    font-size: 10.5px; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; color: #10b981; margin-bottom: 6px;
  }
  .hiw-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 600; color: #1a1814; line-height: 1.15;
  }
  .hiw-title em { font-style: italic; color: #10b981; }

  .hiw-close {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
    background: rgba(26,24,20,0.06); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #8a857f; transition: all 0.18s;
  }
  .hiw-close:hover { background: rgba(26,24,20,0.1); color: #1a1814; }

  .hiw-body { padding: 32px; }

  .hiw-steps { display: flex; flex-direction: column; }

  .hiw-step {
    display: flex; gap: 18px;
    opacity: 0; transform: translateY(10px);
    animation: hiwStepIn 0.35s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  @keyframes hiwStepIn { to { opacity:1; transform:translateY(0); } }

  /* stagger each step */
  .hiw-step:nth-child(1) { animation-delay: 0.08s; }
  .hiw-step:nth-child(2) { animation-delay: 0.16s; }
  .hiw-step:nth-child(3) { animation-delay: 0.24s; }
  .hiw-step:nth-child(4) { animation-delay: 0.32s; }
  .hiw-step:nth-child(5) { animation-delay: 0.40s; }
  .hiw-step:nth-child(6) { animation-delay: 0.48s; }

  .hiw-step-track { display: flex; flex-direction: column; align-items: center; }

  .hiw-num {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid rgba(16,185,129,0.3);
    background: rgba(16,185,129,0.06);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 600; color: #10b981;
    transition: all 0.2s;
  }
  .hiw-step:hover .hiw-num {
    background: #10b981; color: #fff; border-color: #10b981;
    box-shadow: 0 4px 14px rgba(16,185,129,0.3);
  }

  .hiw-connector {
    flex: 1; width: 1.5px; min-height: 28px;
    background: linear-gradient(to bottom, rgba(16,185,129,0.25), rgba(16,185,129,0.08));
    margin: 5px 0;
  }
  .hiw-step:last-child .hiw-connector { display: none; }

  .hiw-content { padding: 8px 0 28px 4px; flex: 1; }
  .hiw-step:last-child .hiw-content { padding-bottom: 0; }

  .hiw-step-title {
    font-size: 15px; font-weight: 600; color: #1a1814;
    margin-bottom: 4px; line-height: 1.3;
    transition: color 0.18s;
  }
  .hiw-step:hover .hiw-step-title { color: #10b981; }

  .hiw-step-desc { font-size: 13px; color: #8a857f; line-height: 1.6; }

  .hiw-step-icon {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
    background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.15);
    display: flex; align-items: center; justify-content: center;
    margin-top: 8px;
    transition: all 0.2s;
  }
  .hiw-step:hover .hiw-step-icon { background: rgba(16,185,129,0.14); }

  /* footer */
  .hiw-foot {
    padding: 18px 32px;
    background: #faf7f4;
    border-top: 1px solid rgba(26,24,20,0.07);
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 12px;
  }
  .hiw-foot-note { font-size: 12.5px; color: #8a857f; }
  .hiw-cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 24px; border-radius: 8px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600; border: none; cursor: pointer;
    box-shadow: 0 2px 10px rgba(16,185,129,0.28); transition: all 0.2s;
  }
  .hiw-cta-btn:hover { box-shadow: 0 4px 18px rgba(16,185,129,0.4); transform: translateY(-1px); }

  /* bullet points inside each step */
  .hiw-bullets {
    display: flex; flex-direction: column; gap: 6px;
    margin-top: 10px; padding-top: 10px;
    border-top: 1px solid rgba(26,24,20,0.06);
  }
  .hiw-bullet {
    display: flex; align-items: flex-start; gap: 8px;
    font-size: 12.5px; color: #6b6560; line-height: 1.5;
  }
  .hiw-bullet-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #10b981; flex-shrink: 0; margin-top: 6px;
  }
`;

const HIW_STEPS = [
  {
    title: "Browse & Select a Service",
    desc: "Explore ready-to-launch websites, apps, and software solutions tailored to your business needs.",
    icon: "🎨",
    bullets: [
      "Browse categories like websites, apps, and custom software",
      "Compare ready solutions based on your goals",
      "Review features, timelines, and pricing",
      "Shortlist services that fit your business",
    ],
  },
  {
    title: "View Live Demo",
    desc: "Preview the product experience before you commit so you know exactly what you're getting.",
    icon: "📋",
    bullets: [
      "Open working demos instantly",
      "Validate layout, features, and flow",
      "Review how the product fits your requirements",
      "Move forward with clarity and confidence",
    ],
  },
  {
    title: "Submit Your Requirements",
    desc: "Share your business goals, feature needs, and custom preferences with our expert team.",
    icon: "📅",
    bullets: [
      "Tell us what you want to customize",
      "Add notes on branding, workflow, or integrations",
      "Set delivery expectations and project scope",
      "Let us tailor the solution around your business",
    ],
  },
  {
    title: "Schedule a Meeting",
    desc: "Book a consultation to finalize scope, strategy, and delivery with the right tech stack.",
    icon: "⚡",
    bullets: [
      "Choose online or offline consultation",
      "Discuss requirements with dedicated experts",
      "Get strategic recommendations before development",
      "Confirm the roadmap with confidence",
    ],
  },
  {
    title: "Development Begins",
    desc: "Our team starts customizing and building your selected solution based on approved requirements.",
    icon: "📦",
    bullets: [
      "Work handled by developers and designers",
      "CMS, custom code, or MERN stack as needed",
      "Progress updates shared during delivery",
      "Unlimited redesign requests supported",
    ],
  },
  {
    title: "Delivery & Support",
    desc: "Receive your completed solution with support, revisions, and a risk-free post-delivery window.",
    icon: "🛡️",
    bullets: [
      "Source code delivered where included",
      "7-day money back guarantee for peace of mind",
      "Unlimited revision support after delivery",
      "Launch with a scalable, business-ready product",
    ],
  },
];



function HowItWorksModal({ onClose }) {
  // close on backdrop click
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <>
      <style>{HIW_CSS}</style>
      <div className="hiw-overlay" onClick={handleBackdrop}>
        <div className="hiw-card">

          {/* HEAD */}
          <div className="hiw-head">
            <div className="hiw-head-left">
              <p className="hiw-eyebrow">Our Process</p>
              <h2 className="hiw-title">How It <em>Works</em></h2>
            </div>
            <button className="hiw-close" onClick={onClose}>
              <X size={16} strokeWidth={2} />
            </button>
          </div>

          {/* STEPS */}
          <div className="hiw-body">
            <div className="hiw-steps">
              {HIW_STEPS.map((step, i) => (
                <div key={i} className="hiw-step">
                  <div className="hiw-step-track">
                    <div className="hiw-num">{i + 1}</div>
                    <div className="hiw-connector" />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1 }}>
                    <div className="hiw-content">
                      <div className="hiw-step-title">{step.title}</div>
                      <div className="hiw-step-desc">{step.desc}</div>
                      {step.bullets && (
                        <div className="hiw-bullets">
                          {step.bullets.map((b, j) => (
                            <div key={j} className="hiw-bullet">
                              <span className="hiw-bullet-dot" />
                              {b}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="hiw-step-icon">{step.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOT */}
          <div className="hiw-foot">
            <span className="hiw-foot-note">Ready to launch your next digital project?</span>
            <button className="hiw-cta-btn" onClick={onClose}>
              Get Started <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function Home() {
  const [category, setCategory]     = useState([]);
  const [services, setServices]     = useState([]);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoUrl, setDemoUrl]             = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const navigate = useNavigate();

  const fetchCategpory = async () => {
    try {
      const res = await axios.get(`${BASE_URL.url}/category`, { withCredentials: true });
      if (res.data.success) setCategory(res.data.category);
    } catch (e) { console.error(e); }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BASE_URL.url}/service`, { withCredentials: true });
      if (res.data.success) setServices(res.data.service);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchCategpory();
    fetchServices();
  }, []);

  const openDemo = (url) => {
    setDemoUrl(url || "https://maker-lane-co.lovable.app/");
    setShowDemoModal(true);
  };

  // Encode service data into URL so right-click → "Open in new tab" works
  const encodeService = (service) => {
    try { return btoa(encodeURIComponent(JSON.stringify(service))); } catch { return ""; }
  };
  const getServiceHref = (service) => {
    const encoded = encodeService(service);
    return encoded ? `/service-details?d=${encoded}` : "/service-details";
  };

  return (
    <>
      <style>{HOME_STYLES}</style>
      <div className="home-root">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-left">
            <span className="hero-tag">
              <span className="hero-tag-dot">✦</span>
              500+ Ready Projects
            </span>

            <h1 className="hero-title">
              Design. Develop.<br />
              Deliver — <em>Exactly</em><br />
              What You Need.
            </h1>

            <p className="hero-desc">
              Explore ready-to-launch websites, apps, and software solutions.
              Preview live demos, customize your requirements, and get your project started with confidence.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("/services")}>
                Browse Services <ArrowRight size={15} strokeWidth={2} />
              </button>
              <button className="btn-outline" onClick={() => navigate("/contact")}>
                <span className="play-circle">
                  <Play size={13} fill="#fff" color="#fff" />
                </span>
                Talk to an Expert
              </button>
            </div>

            <div className="hero-stats">
              {[
                { num: "500+", label: "Ready Projects" },
                { num: "1,200+", label: "Happy Clients" },
                { num: "4.9★", label: "Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-right-img-clip">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
                alt="Digital service showcase"
              />
            </div>
            <div className="hero-float-card">
              <div className="hero-float-icon">
                <BadgeCheck size={20} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <div className="hero-float-title">Starting from ₹3,999</div>
                <div className="hero-float-sub">Ready-to-launch solutions</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="section-categories">
          <div className="section-header">
            <span className="section-eyebrow">Why Servica?</span>
            <h2 className="section-title">Why Servica?</h2>
            <p className="section-sub">
              Live demo before purchase. 7-day money back guarantee. Unlimited redesign requests.
              Built with CMS, custom code, and MERN stack support with dedicated expert consultation.
            </p>
          </div>

          <div className="categories-grid">
            {uspItems.map((item) => (
              <div key={item} className="cat-card">
                <div className="cat-icon-wrap">
                  <BadgeCheck size={22} color="#6b6560" strokeWidth={1.8} />
                </div>
                <div className="cat-name">{item}</div>
                <div className="cat-desc">Built to make your buying decision easier, safer, and more flexible.</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="section-services">
          <div className="section-header">
            <span className="section-eyebrow">Featured Solutions</span>
            <h2 className="section-title">Curated Solutions for Every Business Need</h2>
            <p className="section-sub">From simple websites to complex applications — everything is ready, customizable, and scalable.</p>
          </div>

          <div className="services-grid">
            {services.map((service, i) => {
              const discount = service.originalPrice && service.basePrice
                ? Math.round(((service.originalPrice - service.basePrice) / service.originalPrice) * 100)
                : null;

              return (
                <a
                  key={i}
                  href={getServiceHref(service)}
                  onClick={(e) => { e.preventDefault(); navigate("/service-details", { state: service }); }}
                >
                  <div className="svc-card">
                    <div className="svc-img-wrap">
                      <img
                        src={service.image?.[0]}
                        alt={service.title}
                      />
                      {service.category && (
                        <span className="svc-badge svc-badge-cat">{service.category}</span>
                      )}
                      {service.deliveryTime && (
                        <span className="svc-badge svc-badge-days">
                          <Clock size={11} strokeWidth={2} />
                          {service.deliveryTime} Days
                        </span>
                      )}
                      {discount && (
                        <span className="svc-discount">{discount}% OFF</span>
                      )}
                    </div>

                    <div className="svc-body">
                      <h3 className="svc-title">{service.title}</h3>
                      <p className="svc-desc">{service.description}</p>

                      <div className="svc-meta">
                        <div className="svc-rating">
                          <span className="svc-rating-star">★</span>
                          {service.rating || 4.8}
                          <span className="svc-rating-count">({service.totalReviews || 32})</span>
                        </div>
                        <div className="svc-pricing">
                          <span className="svc-price">₹{service.basePrice}</span>
                          {service.originalPrice && (
                            <span className="svc-original">₹{service.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <div className="svc-actions">
                        <button
                          className="svc-btn-preview"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); openDemo(service.liveDemoUrl); }}
                        >
                          Live Preview
                        </button>
                        <button
                          className="svc-btn-details"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate("/service-details", { state: service }); }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ── DEMO MODAL ── */}
        {showDemoModal && (
          <LiveDemoModal
            url={demoUrl}
            title="Live Preview"
            onClose={() => setShowDemoModal(false)}
          />
        )}

        {/* ── HOW IT WORKS MODAL ── */}
        {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}

        <CTASection />
      </div>
    </>
  );
}

export default Home;