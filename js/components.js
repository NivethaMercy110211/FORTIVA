/* ============================================================
   FORTIVA — components.js — Shared HTML Components
   ============================================================ */

/* ── SVG Logo Mark ── */
const LOGO_SVG = `<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22 2L38 10V26C38 34.8 31 42 22 42C13 42 6 34.8 6 26V10L22 2Z" fill="#203B4A" stroke="#B49464" stroke-width="1.5"/>
  <path d="M22 6L34 13V26C34 33.2 28.6 39.2 22 39.2C15.4 39.2 10 33.2 10 26V13L22 6Z" fill="#162D39"/>
  <text x="22" y="28" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif" font-size="16" font-weight="800" fill="#B49464" letter-spacing="1">F</text>
</svg>`;

/* ── Site Header HTML ── */
function renderHeader(activePage = '') {
  const pages = [
    { id: 'home1', label: 'Home', href: 'index.html', sub: [
      { label: 'Home 1 — Residential', href: 'index.html', icon: 'fa-home' },
      { label: 'Home 2 — Engineering', href: 'home2.html', icon: 'fa-cog' }
    ]},
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'products', label: 'Products', href: 'products.html' },
    { id: 'installation', label: 'Installation', href: 'installation.html' },
    { id: 'pricing', label: 'Pricing', href: 'pricing.html' },
    { id: 'security', label: 'Security Guide', href: 'security-guide.html' },

    { id: 'contact', label: 'Contact', href: 'contact.html' }
  ];

  return `
  <!-- Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Site Header -->
  <header class="site-header" role="banner">
    <div class="container">
      <div class="header-inner">
        <!-- Logo -->
        <a href="index.html" class="header-logo" aria-label="FORTIVA — Home">
          <div class="logo-mark">${LOGO_SVG}</div>
          <div class="logo-text">
            <span class="logo-brand">Fortiva</span>
            <span class="logo-tagline">Safe &amp; Vault Solutions</span>
          </div>
        </a>

        <!-- Main Navigation -->
        <nav class="header-nav" role="navigation" aria-label="Main navigation">
          ${pages.map(page => page.sub ? `
          <div class="nav-item" role="none">
            <a href="${page.href}" class="nav-link${activePage === page.id ? ' active' : ''}" aria-haspopup="true" aria-expanded="false" id="nav-${page.id}">
              ${page.label} <i class="fas fa-chevron-down chevron" aria-hidden="true"></i>
            </a>
            <div class="nav-dropdown" role="menu" aria-labelledby="nav-${page.id}">
              ${page.sub.map(sub => `
              <a href="${sub.href}" class="dropdown-link" role="menuitem">
                <i class="fas ${sub.icon}" aria-hidden="true"></i> ${sub.label}
              </a>`).join('')}
            </div>
          </div>` : `
          <div class="nav-item">
            <a href="${page.href}" class="nav-link${activePage === page.id ? ' active' : ''}">${page.label}</a>
          </div>`).join('')}
        </nav>

        <!-- Header Actions -->
        <div class="header-actions">
          <button class="toggle-btn" data-theme-toggle title="Toggle dark mode" aria-label="Toggle dark mode" id="btn-theme-desktop">
            <i class="fas fa-moon" aria-hidden="true"></i>
          </button>
          <button class="toggle-btn" data-rtl-toggle title="Toggle RTL" aria-label="Toggle RTL mode" id="btn-rtl-desktop">
            <i class="fas fa-align-right" aria-hidden="true"></i>
          </button>
          <a href="book-consultation.html" class="btn btn-primary btn-sm" id="btn-book-consultation">
            <i class="fas fa-calendar-check" aria-hidden="true"></i> Book Consultation
          </a>
          <button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <nav class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile navigation" aria-hidden="true">
      <div class="mobile-nav-links">
        <a href="index.html" class="mobile-nav-link" data-submenu="mobile-home-sub">
          Home <i class="fas fa-chevron-down chevron" aria-hidden="true"></i>
        </a>
        <ul class="mobile-submenu" id="mobile-home-sub">
          <li><a href="index.html" class="mobile-sub-link">Home 1 — Residential</a></li>
          <li><a href="home2.html" class="mobile-sub-link">Home 2 — Engineering</a></li>
        </ul>
        <a href="about.html" class="mobile-nav-link">About</a>
        <a href="products.html" class="mobile-nav-link">Products</a>
        <a href="installation.html" class="mobile-nav-link">Installation</a>
        <a href="pricing.html" class="mobile-nav-link">Pricing Guide</a>
        <a href="security-guide.html" class="mobile-nav-link">Security Guide</a>

        <a href="contact.html" class="mobile-nav-link">Contact</a>
      </div>
      <div class="mobile-menu-footer">
        <a href="book-consultation.html" class="btn btn-primary btn-block">
          <i class="fas fa-calendar-check" aria-hidden="true"></i> Book Consultation
        </a>
        <div class="mobile-toggles">
          <span class="mobile-toggle-label">Theme:</span>
          <button class="toggle-btn" data-theme-toggle aria-label="Toggle dark mode" id="btn-theme-mobile">
            <i class="fas fa-moon" aria-hidden="true"></i>
          </button>
          <span class="mobile-toggle-label" style="margin-left:16px;">Direction:</span>
          <button class="toggle-btn" data-rtl-toggle aria-label="Toggle RTL" id="btn-rtl-mobile">
            <i class="fas fa-align-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </nav>
  </header>
  <!-- Drawer Overlay -->
  <div class="drawer-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:350;opacity:0;pointer-events:none;transition:opacity 0.3s;"></div>
  `;
}

/* ── Site Footer HTML ── */
function renderFooter() {
  return `
  <!-- Pre-Footer CTA -->
  <section class="footer-cta-section" aria-labelledby="footer-cta-title">
    <img src="assets/images/cta/cta-home1.jpg" alt="" class="cta-section__bg" aria-hidden="true" loading="lazy">
    <div class="cta-section__overlay"></div>
    <div class="container">
      <div class="footer-cta-inner">
        <span class="cta-section__eyebrow">Start Your Journey</span>
        <h2 id="footer-cta-title">Protect What Matters Most.</h2>
        <p>Schedule a complimentary consultation with our residential security specialists. We'll help you find the right safe and installation solution for your home.</p>
        <div class="cta-group" style="justify-content:center;">
          <a href="book-consultation.html" class="btn btn-brass btn-lg" id="footer-cta-btn-primary">
            <i class="fas fa-calendar-check" aria-hidden="true"></i> Book a Consultation
          </a>
          <a href="products.html" class="btn btn-outline-white btn-lg" id="footer-cta-btn-secondary">
            <i class="fas fa-th-large" aria-hidden="true"></i> Explore Products
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Site Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-brand">
          <a href="index.html" class="header-logo" aria-label="FORTIVA — Home" style="margin-bottom:16px;display:inline-flex;">
            <div class="logo-mark">${LOGO_SVG}</div>
            <div class="logo-text">
              <span class="logo-brand">Fortiva</span>
              <span class="logo-tagline">Safe &amp; Vault Solutions</span>
            </div>
          </a>
          <p class="footer-brand-desc">Premium residential safe and vault installation services. Protecting what matters most with engineered precision and professional care.</p>
          <ul class="footer-contact-list" aria-label="Contact information">
            <li class="footer-contact-item">
              <i class="fas fa-phone" aria-hidden="true"></i>
              <a href="tel:+441234567890">+44 (0) 1234 567 890</a>
            </li>
            <li class="footer-contact-item">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              <a href="mailto:enquiries@fortiva.co.uk">enquiries@fortiva.co.uk</a>
            </li>
            <li class="footer-contact-item">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
              <span>12 Meridian House, London, EC2A 4PT</span>
            </li>
          </ul>
          <div class="footer-social" role="list" aria-label="Social media links">
            <a href="#" class="social-link" role="listitem" aria-label="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
            <a href="#" class="social-link" role="listitem" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
            <a href="#" class="social-link" role="listitem" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="#" class="social-link" role="listitem" aria-label="Twitter/X"><i class="fab fa-x-twitter" aria-hidden="true"></i></a>
          </div>
        </div>

        <!-- Services Column -->
        <div>
          <h3 class="footer-col-title">Our Services</h3>
          <ul class="footer-nav-list">
            <li><a href="products.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Home Safes</a></li>
            <li><a href="products.html?cat=fire"><i class="fas fa-chevron-right" aria-hidden="true"></i> Fire-Resistant Safes</a></li>
            <li><a href="products.html?cat=document"><i class="fas fa-chevron-right" aria-hidden="true"></i> Document Safes</a></li>
            <li><a href="products.html?cat=jewelry"><i class="fas fa-chevron-right" aria-hidden="true"></i> Jewelry &amp; Valuables</a></li>
            <li><a href="products.html?cat=vault"><i class="fas fa-chevron-right" aria-hidden="true"></i> Vault Solutions</a></li>
            <li><a href="installation.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Professional Installation</a></li>
            <li><a href="book-consultation.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Security Consultation</a></li>
          </ul>
        </div>

        <!-- Company Column -->
        <div>
          <h3 class="footer-col-title">Company</h3>
          <ul class="footer-nav-list">
            <li><a href="about.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> About Fortiva</a></li>
            <li><a href="about.html#team"><i class="fas fa-chevron-right" aria-hidden="true"></i> Our Team</a></li>
            <li><a href="about.html#approach"><i class="fas fa-chevron-right" aria-hidden="true"></i> Our Approach</a></li>
            <li><a href="security-guide.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Security Guide</a></li>
            <li><a href="pricing.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Pricing Guide</a></li>
            <li><a href="faq.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> FAQ</a></li>
            <li><a href="contact.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Contact Us</a></li>
          </ul>
        </div>

        <!-- Info Column -->
        <div>
          <h3 class="footer-col-title">Information</h3>
          <ul class="footer-nav-list">
            <li><a href="security-guide.html#ratings"><i class="fas fa-chevron-right" aria-hidden="true"></i> Security Ratings</a></li>
            <li><a href="security-guide.html#locks"><i class="fas fa-chevron-right" aria-hidden="true"></i> Lock Types Guide</a></li>
            <li><a href="security-guide.html#fire"><i class="fas fa-chevron-right" aria-hidden="true"></i> Fire Resistance</a></li>
            <li><a href="installation.html#process"><i class="fas fa-chevron-right" aria-hidden="true"></i> Installation Process</a></li>
            <li><a href="pricing.html#faq"><i class="fas fa-chevron-right" aria-hidden="true"></i> Pricing FAQ</a></li>
            <li><a href="#"><i class="fas fa-chevron-right" aria-hidden="true"></i> Privacy Policy</a></li>
            <li><a href="#"><i class="fas fa-chevron-right" aria-hidden="true"></i> Terms of Service</a></li>
          </ul>
          <!-- Operating Hours -->
          <div style="margin-top:24px;">
            <h3 class="footer-col-title">Hours</h3>
            <p style="font-size:0.8rem;color:rgba(255,255,255,0.5);line-height:1.9;margin:0;">
              Mon–Fri: 8:00 AM – 6:00 PM<br>
              Saturday: 9:00 AM – 4:00 PM<br>
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="footer-copy">&copy; ${new Date().getFullYear()} Fortiva Safe &amp; Vault Solutions Ltd. All rights reserved.</p>
        <nav class="footer-legal" aria-label="Legal links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </nav>
      </div>
    </div>
  </footer>
  `;
}

/* ── Head Meta Tags ── */
function renderHead(title, description, page) {
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | FORTIVA Safe &amp; Vault Solutions</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${title} | FORTIVA">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <link rel="canonical" href="${page}.html">

  <!-- Preconnect Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">

  <!-- Bootstrap 5 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

  <!-- FORTIVA CSS -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/buttons.css">
  <link rel="stylesheet" href="css/header.css">
  <link rel="stylesheet" href="css/footer.css">
  <link rel="stylesheet" href="css/editorial.css">
  <link rel="stylesheet" href="css/products.css">
  <link rel="stylesheet" href="css/forms.css">
  <link rel="stylesheet" href="css/dark-theme.css">
  <link rel="stylesheet" href="css/rtl.css">
  <link rel="stylesheet" href="css/desktop.css">
  <link rel="stylesheet" href="css/tablet.css">
  <link rel="stylesheet" href="css/mobile.css">
  `;
}

/* ── Scripts Footer ── */
function renderScripts() {
  return `
  <!-- Bootstrap Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- FORTIVA Components -->
  <script src="js/components.js"></script>
  <!-- FORTIVA Main -->
  <script src="js/main.js"></script>
  `;
}
