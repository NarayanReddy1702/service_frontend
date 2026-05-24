import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --cream: #f5f0eb;
    --ink: #1a1814;
    --ink-soft: #4a4540;
    --ink-muted: #8a857f;
    --green: #10b981;
    --green-dark: #059669;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .footer-root {
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(180deg, #0a0a0a 0%, #0e0e0e 100%);
    color: rgba(245, 240, 235, 0.45);
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  /* Top border gradient */
  .footer-root::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent);
  }

  /* ============================================
     NEWSLETTER SECTION
     ============================================ */
  .footer-newsletter {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 48px 20px;
  }

  .footer-nl-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .footer-nl-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 32px;
  }

  .footer-nl-content {
    flex: 1;
    min-width: 250px;
  }

  .footer-nl-eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 8px;
    display: block;
  }

  .footer-nl-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    color: var(--cream);
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .footer-nl-subtitle {
    font-size: 13px;
    color: rgba(245, 240, 235, 0.3);
    margin-top: 6px;
  }

  .footer-nl-form {
    display: flex;
    gap: 0;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    overflow: hidden;
    transition: border-color 0.3s ease;
    flex-shrink: 0;
  }

  .footer-nl-form:focus-within {
    border-color: rgba(16, 185, 129, 0.4);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
  }

  .footer-nl-input {
    padding: 14px 18px;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--cream);
    width: 280px;
    flex: 1;
  }

  .footer-nl-input::placeholder {
    color: rgba(245, 240, 235, 0.2);
  }

  .footer-nl-btn {
    padding: 14px 24px;
    background: var(--green);
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .footer-nl-btn:hover {
    background: var(--green-dark);
  }

  .footer-nl-btn:active {
    transform: scale(0.98);
  }

  .footer-nl-btn svg {
    transition: transform 0.2s ease;
    width: 16px;
    height: 16px;
  }

  .footer-nl-btn:hover svg {
    transform: translateX(3px);
  }

  /* ============================================
     MAIN CONTENT GRID
     ============================================ */
  .footer-content {
    width: 100%;
    padding: 64px 20px 48px;
  }

  .footer-main-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .footer-main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px;
    width: 100%;
  }

  /* Responsive Grid */
  @media (max-width: 1200px) {
    .footer-main {
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 40px;
    }
  }

  @media (max-width: 960px) {
    .footer-main {
      grid-template-columns: 1fr 1fr;
      gap: 36px;
    }
  }

  @media (max-width: 640px) {
    .footer-main {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  /* ============================================
     BRAND SECTION
     ============================================ */
  .footer-brand {}

  .footer-logo {
    margin-bottom: 24px;
    border-radius: 12px;
    overflow: hidden;
    width: min(180px, 100%);
    display: block;
    transition: transform 0.3s ease;
  }

  .footer-logo:hover {
    transform: translateY(-2px);
  }

  .footer-logo img {
    display: block;
    width: 100%;
    height: auto;
  }

  .footer-tagline {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(245, 240, 235, 0.4);
    max-width: 320px;
    margin-bottom: 32px;
  }

  .footer-socials {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
  }

  .footer-social {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: rgba(245, 240, 235, 0.4);
  }

  .footer-social:hover {
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.3);
    color: var(--green);
    transform: translateY(-2px);
  }

  .footer-social svg {
    width: 16px;
    height: 16px;
    stroke-width: 1.5;
  }

  /* ============================================
     FOOTER COLUMNS
     ============================================ */
  .footer-col {}

  .footer-col-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--cream);
    margin-bottom: 24px;
    display: block;
  }

  .footer-col-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .footer-col-link {
    font-size: 13.5px;
    font-weight: 300;
    color: rgba(245, 240, 235, 0.4);
    cursor: pointer;
    transition: color 0.2s ease;
    width: fit-content;
    position: relative;
    padding-bottom: 2px;
  }

  .footer-col-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--green);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .footer-col-link:hover {
    color: var(--cream);
  }

  .footer-col-link:hover::after {
    transform: scaleX(1);
  }

  /* ============================================
     BOTTOM BAR
     ============================================ */
  .footer-bottom {
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 24px 20px;
    background: rgba(0, 0, 0, 0.3);
  }

  .footer-bottom-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .footer-bottom-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
  }

  .footer-copy {
    font-size: 12.5px;
    color: rgba(245, 240, 235, 0.25);
    white-space: nowrap;
  }

  .footer-badges {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-badge {
    font-size: 11px;
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(245, 240, 235, 0.3);
    background: rgba(16, 185, 129, 0.05);
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .footer-badge:hover {
    border-color: rgba(16, 185, 129, 0.3);
    color: var(--green);
  }

  .footer-credit {
    font-size: 12px;
    color: rgba(245, 240, 235, 0.2);
    white-space: nowrap;
  }

  .footer-credit span {
    color: #ef4444;
  }

  /* ============================================
     MOBILE RESPONSIVE
     ============================================ */
  @media (max-width: 768px) {
    .footer-newsletter {
      padding: 40px 16px;
    }

    .footer-nl-container {
      padding: 0;
    }

    .footer-nl-inner {
      flex-direction: column;
      gap: 24px;
    }

    .footer-nl-title {
      font-size: 22px;
    }

    .footer-nl-input {
      width: 100%;
      min-width: auto;
    }

    .footer-content {
      padding: 48px 16px 40px;
    }

    .footer-main-container {
      padding: 0;
    }

    .footer-bottom {
      padding: 20px 16px;
    }

    .footer-bottom-container {
      padding: 0;
    }

    .footer-bottom-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .footer-badges {
      justify-content: flex-start;
    }

    .footer-tagline {
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    .footer-newsletter {
      padding: 32px 12px;
    }

    .footer-nl-title {
      font-size: 20px;
    }

    .footer-content {
      padding: 40px 12px 32px;
    }

    .footer-main {
      gap: 28px;
    }

    .footer-nl-form {
      flex-direction: column;
      width: 100%;
    }

    .footer-nl-input {
      width: 100%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-bottom {
      padding: 16px 12px;
    }

    .footer-copy,
    .footer-credit {
      font-size: 11px;
    }

    .footer-badge {
      font-size: 10px;
      padding: 5px 10px;
    }

    .footer-socials {
      gap: 8px;
    }

    .footer-social {
      width: 36px;
      height: 36px;
    }
  }
`

const columns = [
  {
    title: "Services",
    links: ["Website Development", "App Development", "UI/UX Design", "Branding"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Support",
    links: ["Help Center", "Terms", "Privacy Policy"],
  },
]

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault()
    const email = e.target.querySelector('.footer-nl-input').value
    if (email) {
      console.log('Subscribing:', email)
      e.target.reset()
    }
  }

  return (
    <>
      <style>{STYLES}</style>
      <footer className="footer-root">

        {/* NEWSLETTER SECTION */}
        

        {/* MAIN CONTENT */}
        <div className="footer-content">
          <div className="footer-main-container">
            <div className="footer-main">
              {/* BRAND SECTION */}
              <div className="footer-brand">
                <a href="/" className="footer-logo">
                  <img src="./images/logo.jpeg" alt="Servica Logo" />
                </a>
                <p className="footer-tagline">
                  Servica connects businesses with ready-to-launch digital solutions — from websites to advanced software systems.
                </p>
                <div className="footer-socials">
                  {[
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Twitter, label: "Twitter" },
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Linkedin, label: "LinkedIn" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      className="footer-social"
                      title={label}
                      aria-label={label}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>

              {/* LINK COLUMNS */}
              {columns.map(col => (
                <div key={col.title} className="footer-col">
                  <span className="footer-col-title">{col.title}</span>
                  <ul className="footer-col-links">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="footer-col-link">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <div className="footer-bottom-inner">
              <p className="footer-copy">© 2026 Servica. All rights reserved.</p>
              <div className="footer-badges">
                <span className="footer-badge">500+ Ready Projects</span>
                <span className="footer-badge">4.9★ Rating</span>
              </div>
              <p className="footer-credit">
                Made with <span>♥</span> for businesses growing digitally.
              </p>
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}