/* ============================================================
   FORTIVA — main.js — Global Interactive Features
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* Add responsive labels to comparison-table cells without duplicating copy. */
  document.querySelectorAll('.size-compare-table').forEach(table => {
    const labels = Array.from(table.querySelectorAll('thead th'))
      .map(header => header.textContent.trim());
    table.querySelectorAll('tbody tr').forEach(row => {
      Array.from(row.children).forEach((cell, index) => {
        if (labels[index]) cell.setAttribute('data-label', labels[index]);
      });
    });
  });

  const footerGrid = document.querySelector('.site-footer .footer-grid');
  if (footerGrid && footerGrid.children.length >= 4) {
    const brandColumn = footerGrid.children[0];
    const servicesColumn = footerGrid.children[1];
    const companyColumn = footerGrid.children[2];
    const hoursColumn = footerGrid.children[3];
    const contactList = footerGrid.querySelector('.footer-contact-list');
    const headerLogo = document.querySelector('.header-logo');

    brandColumn.innerHTML = '';
    if (headerLogo) {
      const footerLogo = headerLogo.cloneNode(true);
      footerLogo.classList.add('footer-logo');
      footerLogo.removeAttribute('aria-current');
      brandColumn.appendChild(footerLogo);
    }
    brandColumn.insertAdjacentHTML('beforeend', `
      <p class="footer-brand-desc">Premium residential safe and vault installation. Protecting what matters most with engineered precision and professional care.</p>
      <div class="footer-social" aria-label="Fortiva social links">
        <a href="#" class="social-link" aria-label="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
        <a href="#" class="social-link" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
        <a href="#" class="social-link" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
      </div>`);

    servicesColumn.innerHTML = `
      <h3 class="footer-col-title">Our Services</h3>
      <ul class="footer-nav-list">
        <li><a href="products.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Home Safes</a></li>
        <li><a href="products.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Fire-Resistant Safes</a></li>
        <li><a href="products.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Document Safes</a></li>
        <li><a href="service-details.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Vault Solutions</a></li>
        <li><a href="installation.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Professional Installation</a></li>
      </ul>`;

    companyColumn.innerHTML = `
      <h3 class="footer-col-title">Company</h3>
      <ul class="footer-nav-list">
        <li><a href="about.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> About Fortiva</a></li>
        <li><a href="security-guide.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Security Guide</a></li>
        <li><a href="pricing.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Pricing Guide</a></li>
        <li><a href="faq.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> FAQ</a></li>
        <li><a href="contact.html"><i class="fas fa-chevron-right" aria-hidden="true"></i> Contact</a></li>
      </ul>`;

    hoursColumn.innerHTML = `
      <h3 class="footer-col-title">Opening Hours</h3>
      <p class="footer-hours">Mon–Fri: 8:00 AM – 6:00 PM<br>Saturday: 9:00 AM – 4:00 PM<br>Sunday: Closed</p>`;

    if (contactList) {
      contactList.classList.add('footer-contact-list--hours');
      hoursColumn.appendChild(contactList);
    }
  }

  /* ── Theme Toggle ── */
  const THEME_KEY = 'fortiva-theme';
  const themeToggles = document.querySelectorAll('[data-theme-toggle]');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Initialize theme
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggles.forEach(btn => btn.addEventListener('click', toggleTheme));

  /* ── RTL Toggle ── */
  const RTL_KEY = 'fortiva-dir';
  const rtlToggles = document.querySelectorAll('[data-rtl-toggle]');

  function setDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(RTL_KEY, dir);
    rtlToggles.forEach(btn => {
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      const icon = btn.querySelector('i');
      if (icon) icon.className = dir === 'rtl' ? 'fas fa-align-left' : 'fas fa-align-right';
    });
  }

  function toggleDir() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    setDir(current === 'rtl' ? 'ltr' : 'rtl');
  }

  const savedDir = localStorage.getItem(RTL_KEY) || 'ltr';
  setDir(savedDir);
  rtlToggles.forEach(btn => btn.addEventListener('click', toggleDir));

  /* ── Scroll to Top Floating Button ── */
  let scrollTopBtn = document.getElementById('btn-scroll-top');
  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'btn-scroll-top';
    scrollTopBtn.className = 'btn-scroll-top';
    scrollTopBtn.setAttribute('type', 'button');
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top of page');
    scrollTopBtn.setAttribute('title', 'Scroll to top');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
    document.body.appendChild(scrollTopBtn);
  }

  const onWindowScrollTop = () => {
    if (window.scrollY > 280) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onWindowScrollTop, { passive: true });
  onWindowScrollTop();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ── Header Scroll Behavior ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Menu ── */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    const closeMobileMenu = () => {
      mobileMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    mobileMenu.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('hashchange', closeMobileMenu);
    window.addEventListener('pageshow', closeMobileMenu);
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991) closeMobileMenu();
    });

    // Mobile submenu toggles
    document.querySelectorAll('.mobile-nav-link[data-submenu]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.submenu;
        const submenu = document.getElementById(targetId);
        if (submenu) {
          submenu.classList.toggle('open');
          const icon = link.querySelector('i.chevron');
          if (icon) icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
        }
      });
    });

    /* Clear stale inline locking restored by mobile browser history. */
    if (!mobileMenu.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }

  /* ── Active Nav Link ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = href ? new URL(href, window.location.href).pathname.split('/').pop() || 'index.html' : '';
    const isCurrentPage = linkPath === currentPath;
    link.classList.toggle('active', isCurrentPage);
    if (isCurrentPage) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  /* ════════════════════════════════════════════════════════════
     UNIVERSAL SECTION & BANNER ANIMATION ENGINE (ALL PAGES)
     ════════════════════════════════════════════════════════════ */
  const bannerSelectors = [
    '.page-image-banner',
    '.page-image-cta',
    '.booking-hero',
    '.install-hero',
    '.hero-showcase',
    '.hero-fullbleed',
    '.about-hero',
    '.products-hero',
    '.installation-hero',
    '.pricing-hero',
    '.security-hero',
    '.service-hero',
    '.faq-hero',
    '.contact-hero',
    '.hero'
  ];

  const sectionSelectors = [
    'section',
    '.section',
    '.cta-section',
    '.consultation-wrap',
    '.site-footer'
  ];

  const bannerElements = Array.from(document.querySelectorAll(bannerSelectors.join(',')));
  const allSectionElements = Array.from(document.querySelectorAll(sectionSelectors.join(',')))
    .filter(el => !bannerElements.includes(el));

  bannerElements.forEach(banner => banner.classList.add('banner-motion'));
  allSectionElements.forEach((section, sectionIndex) => {
    section.classList.add('section-motion');
    section.style.setProperty('--section-order', sectionIndex);

    /* Mark every card-like grid child for a consistent staggered entrance. */
    const grids = section.querySelectorAll([
      '[class*="grid"]',
      '.process-steps',
      '.journey-timeline',
      '.accordion',
      '.footer-grid',
      '.footer-bottom'
    ].join(','));

    grids.forEach(grid => {
      Array.from(grid.children).forEach((item, itemIndex) => {
        item.classList.add('motion-card');
        item.style.setProperty('--motion-index', Math.min(itemIndex, 9));
      });
    });
  });

  /* Footer columns and legal row are animated even when their class names vary. */
  document.querySelectorAll('.site-footer .footer-grid > *, .site-footer .footer-bottom > *')
    .forEach((item, index) => {
      item.classList.add('motion-card');
      item.style.setProperty('--motion-index', Math.min(index, 7));
    });

  const sectionMotionTargets = [...bannerElements, ...allSectionElements];
  document.documentElement.classList.add('motion-ready');

  function checkInitialMotion() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    sectionMotionTargets.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.92 || index === 0) {
        requestAnimationFrame(() => el.classList.add('motion-visible'));
      }
    });
  }

  /* ── Scroll Reveal ── */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const sectionMotionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-visible');
          sectionMotionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

    sectionMotionTargets.forEach(section => sectionMotionObserver.observe(section));
    setTimeout(checkInitialMotion, 50);
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    sectionMotionTargets.forEach(section => section.classList.add('motion-visible'));
  }

  /* ── Toast Notification ── */
  window.showToast = function(message, type = 'info', duration = 4000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
    const colors = { success: '#27ae60', error: '#c0392b', info: var_brass(), warning: '#f39c12' };

    function var_brass() { return getComputedStyle(document.documentElement).getPropertyValue('--brass').trim(); }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fas ${icons[type] || icons.info}" style="color:${colors[type] || colors.info};font-size:1.2rem;flex-shrink:0;"></i>
      <span style="font-size:0.875rem;font-weight:600;color:var(--text-heading);flex:1;">${message}</span>
      <button onclick="this.closest('.toast').remove()" style="background:none;border:none;cursor:pointer;color:var(--text-body);padding:0;font-size:0.8rem;flex-shrink:0;">
        <i class="fas fa-times"></i>
      </button>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
    if (duration > 0) setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, duration);
    return toast;
  };

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!question || !answer) return;

    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.35s';
    answer.style.padding = '0';

    question.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 32 + 'px' : '0';
      answer.style.padding = isOpen ? 'var(--space-md) 0 var(--space-lg)' : '0';
      if (icon) icon.style.transform = isOpen ? 'rotate(45deg)' : '';
    });
  });

  /* ── Filter Group Accordion ── */
  document.querySelectorAll('.filter-group').forEach((group, i) => {
    const toggle = group.querySelector('.filter-group-toggle');
    if (!toggle) return;
    group.classList.toggle('open', i === 0);
    toggle.addEventListener('click', () => {
      const shouldOpen = !group.classList.contains('open');
      document.querySelectorAll('.filter-group.open').forEach(openGroup => {
        if (openGroup !== group) openGroup.classList.remove('open');
      });
      group.classList.toggle('open', shouldOpen);
    });
  });

  /* ── Mobile Filters Toggle ── */
  const filterMobileToggle = document.querySelector('.filter-mobile-toggle');
  const filtersPanel = document.querySelector('.filters-panel');
  const filtersMobileClose = document.querySelector('.filters-mobile-close');

  if (filterMobileToggle && filtersPanel) {
    filterMobileToggle.addEventListener('click', () => {
      filtersPanel.classList.toggle('mobile-open');
      const isOpen = filtersPanel.classList.contains('mobile-open');
      filterMobileToggle.setAttribute('aria-expanded', String(isOpen));
      filterMobileToggle.textContent = isOpen ? '✕ Close Filters' : '⚙ Filter & Sort';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (filtersMobileClose) {
      filtersMobileClose.addEventListener('click', () => {
        filtersPanel.classList.remove('mobile-open');
        filterMobileToggle.setAttribute('aria-expanded', 'false');
        filterMobileToggle.innerHTML = '<i class="fas fa-sliders-h" aria-hidden="true"></i> Filter &amp; Sort Products';
        document.body.style.overflow = '';
        filterMobileToggle.focus();
      });
    }
  }

  /* ── Spec Drawer ── */
  const specDrawer = document.querySelector('.spec-drawer');
  const specDrawerClose = document.querySelector('.spec-drawer__close');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  function openSpecDrawer(productData) {
    if (!specDrawer) return;
    // Populate drawer with product data
    const drawer = specDrawer;
    if (productData) {
      const nameEl = drawer.querySelector('.spec-drawer__product-name');
      if (nameEl) nameEl.textContent = productData.name || '';
      const imgEl = drawer.querySelector('.spec-drawer__image img');
      if (imgEl && productData.image) { imgEl.src = productData.image; imgEl.alt = productData.name || ''; }
    }
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (drawerOverlay) drawerOverlay.classList.add('visible');
  }

  function closeSpecDrawer() {
    if (!specDrawer) return;
    specDrawer.classList.remove('open');
    document.body.style.overflow = '';
    if (drawerOverlay) drawerOverlay.classList.remove('visible');
  }

  if (specDrawerClose) specDrawerClose.addEventListener('click', closeSpecDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeSpecDrawer);

  document.querySelectorAll('[data-spec-drawer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const productData = {
        name: btn.dataset.productName,
        image: btn.dataset.productImage
      };
      openSpecDrawer(productData);
    });
  });

  /* ── Product Filter Logic ── */
  const filtersForm = document.getElementById('filters-form');
  const productsGrid = document.getElementById('products-grid');
  const productCountEl = document.querySelector('.toolbar-count strong');
  const searchInput = document.getElementById('filter-search');
  const priceMinInput = document.getElementById('price-min');
  const priceMaxInput = document.getElementById('price-max');
  const pricePills = document.querySelectorAll('.price-preset-pill');

  function filterProducts() {
    if (!productsGrid) return;
    const cards = productsGrid.querySelectorAll('[data-product-card]');
    const checkedTypes = [...document.querySelectorAll('.filter-type:checked')].map(el => el.value);
    const checkedLocks = [...document.querySelectorAll('.filter-lock:checked')].map(el => el.value);
    const checkedInstall = [...document.querySelectorAll('.filter-install:checked')].map(el => el.value);
    const priceMin = parseFloat(priceMinInput?.value || '0') || 0;
    const priceMax = parseFloat(priceMaxInput?.value || '999999') || 999999;
    const searchQuery = (searchInput?.value || '').trim().toLowerCase();

    let visible = 0;
    cards.forEach(card => {
      const cardType = (card.dataset.type || '').toLowerCase();
      const cardLock = (card.dataset.lock || '').toLowerCase();
      const cardInstall = (card.dataset.install || '').toLowerCase();
      const cardPrice = parseFloat(card.dataset.price || '0') || 0;
      const cardName = (card.dataset.name || '').toLowerCase();
      const cardDesc = (card.querySelector('.product-card__desc')?.textContent || '').toLowerCase();

      const typeOk = checkedTypes.length === 0 || checkedTypes.some(t => cardType.includes(t));
      const lockOk = checkedLocks.length === 0 || checkedLocks.some(l => cardLock.includes(l));
      const installOk = checkedInstall.length === 0 || checkedInstall.some(i => cardInstall.includes(i));
      const priceOk = cardPrice === 0 || (cardPrice >= priceMin && cardPrice <= priceMax);
      const searchOk = !searchQuery || cardName.includes(searchQuery) || cardDesc.includes(searchQuery) || cardType.includes(searchQuery);

      const show = typeOk && lockOk && installOk && priceOk && searchOk;
      card.style.display = show ? '' : 'none';
      card.classList.remove('grid-last-odd');
      if (show) visible++;
    });

    const visibleCards = [...cards].filter(c => c.style.display !== 'none');
    if (visibleCards.length % 2 === 1) {
      visibleCards[visibleCards.length - 1].classList.add('grid-last-odd');
    }
    if (productCountEl) productCountEl.textContent = visible;

    // Show/hide empty state
    const emptyEl = productsGrid.querySelector('.products-empty');
    if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';

    updateActiveFilters();
  }

  function getReadableFilterLabel(input) {
    const label = input.closest('label');
    if (label) {
      const text = label.textContent.replace(/\(\d+\)/g, '').replace(/[£\d,k\/]+/g, '').trim();
      return text || input.value;
    }
    return input.value;
  }

  function updateActiveFilters() {
    const container = document.querySelector('.active-filters');
    if (!container) return;
    const checked = document.querySelectorAll('.filters-form input:checked');
    const hasSearch = (searchInput?.value || '').trim().length > 0;
    container.innerHTML = '';

    if (hasSearch) {
      const tag = document.createElement('span');
      tag.className = 'active-filter-tag';
      tag.innerHTML = `Search: "${searchInput.value.trim()}" <button class="active-filter-remove" aria-label="Clear search"><i class="fas fa-times"></i></button>`;
      tag.querySelector('.active-filter-remove').addEventListener('click', () => {
        searchInput.value = '';
        filterProducts();
      });
      container.appendChild(tag);
    }

    checked.forEach(input => {
      const tag = document.createElement('span');
      tag.className = 'active-filter-tag';
      const cleanLabel = getReadableFilterLabel(input);
      tag.innerHTML = `${cleanLabel} <button class="active-filter-remove" aria-label="Remove filter"><i class="fas fa-times"></i></button>`;
      tag.querySelector('.active-filter-remove').addEventListener('click', () => {
        input.checked = false;
        filterProducts();
      });
      container.appendChild(tag);
    });
  }

  document.querySelectorAll('.filter-type, .filter-lock, .filter-install').forEach(input => {
    input.addEventListener('change', filterProducts);
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }

  if (priceMinInput) priceMinInput.addEventListener('input', () => {
    pricePills.forEach(p => p.classList.remove('active'));
    filterProducts();
  });
  if (priceMaxInput) priceMaxInput.addEventListener('input', () => {
    pricePills.forEach(p => p.classList.remove('active'));
    filterProducts();
  });

  // Price Preset Pills
  pricePills.forEach(pill => {
    pill.addEventListener('click', () => {
      pricePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const min = pill.getAttribute('data-min');
      const max = pill.getAttribute('data-max');
      if (priceMinInput) priceMinInput.value = min === '0' ? '' : min;
      if (priceMaxInput) priceMaxInput.value = max === '999999' ? '' : max;
      filterProducts();
    });
  });

  // Reset Filters
  const resetBtns = document.querySelectorAll('.filters-clear, #filters-reset-btn');
  resetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filters-form input[type="checkbox"]').forEach(i => i.checked = false);
      if (searchInput) searchInput.value = '';
      if (priceMinInput) priceMinInput.value = '';
      if (priceMaxInput) priceMaxInput.value = '';
      pricePills.forEach(p => p.classList.toggle('active', p.getAttribute('data-min') === '0' && p.getAttribute('data-max') === '999999'));
      filterProducts();
    });
  });

  /* ── Sort Products ── */
  const sortSelect = document.getElementById('products-sort');
  if (sortSelect && productsGrid) {
    sortSelect.addEventListener('change', () => {
      const cards = [...productsGrid.querySelectorAll('[data-product-card]')];
      const val = sortSelect.value;
      cards.sort((a, b) => {
        if (val === 'price-asc') return (parseFloat(a.dataset.price) || 999999) - (parseFloat(b.dataset.price) || 999999);
        if (val === 'price-desc') return (parseFloat(b.dataset.price) || 0) - (parseFloat(a.dataset.price) || 0);
        if (val === 'name') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        return 0;
      });
      cards.forEach(c => productsGrid.appendChild(c));
    });
  }

  /* ── View Toggle (Grid / List) ── */
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (productsGrid) {
        productsGrid.classList.toggle('list-view', btn.dataset.view === 'list');
      }
    });
  });

  /* ── Compare Bar ── */
  const compareBar = document.querySelector('.compare-bar');
  const compareBarItems = document.querySelector('.compare-bar-items');
  const compareBtnOpen = document.getElementById('btn-compare-open');
  let compareList = [];

  function updateCompareBar() {
    if (!compareBar) return;
    compareBar.classList.toggle('visible', compareList.length >= 2);
    if (compareBarItems) {
      compareBarItems.innerHTML = compareList.map(p => `
        <div class="compare-bar-item">
          <span>${p.name}</span>
          <button class="compare-bar-remove" data-id="${p.id}" aria-label="Remove ${p.name}">
            <i class="fas fa-times"></i>
          </button>
        </div>`).join('');

      compareBarItems.querySelectorAll('.compare-bar-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          compareList = compareList.filter(p => p.id !== id);
          const compareCheckbox = document.querySelector(`.product-card__compare[data-id="${id}"]`);
          if (compareCheckbox) compareCheckbox.classList.remove('selected');
          updateCompareBar();
        });
      });
    }
    if (compareBtnOpen) compareBtnOpen.disabled = compareList.length < 2;
  }

  document.querySelectorAll('.product-card__compare').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      if (btn.classList.contains('selected')) {
        compareList = compareList.filter(p => p.id !== id);
        btn.classList.remove('selected');
      } else if (compareList.length < 3) {
        compareList.push({ id, name });
        btn.classList.add('selected');
      } else {
        showToast('You can compare up to 3 products at a time.', 'warning');
      }
      updateCompareBar();
    });
  });

  /* ── Form Validation ── */
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        const errorEl = group?.querySelector('.form-error');
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
          field.classList.remove('success');
          if (errorEl) { errorEl.style.display = 'flex'; }
        } else {
          field.classList.remove('error');
          field.classList.add('success');
          if (errorEl) { errorEl.style.display = 'none'; }
        }
      });

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value);
        if (!emailOk) {
          valid = false;
          emailField.classList.add('error');
          const group = emailField.closest('.form-group');
          const errorEl = group?.querySelector('.form-error');
          if (errorEl) { errorEl.textContent = 'Please enter a valid email address.'; errorEl.style.display = 'flex'; }
        }
      }

      if (valid) {
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) { submitBtn.classList.add('loading'); submitBtn.disabled = true; }

        // Simulate submission
        setTimeout(() => {
          const successMsg = form.querySelector('.form-success-msg');
          if (successMsg) {
            form.querySelectorAll('.form-body').forEach(el => el.style.display = 'none');
            successMsg.classList.add('show');
          } else {
            showToast('Your enquiry has been received. We\'ll contact you shortly.', 'success');
          }
          if (submitBtn) { submitBtn.classList.remove('loading'); submitBtn.disabled = false; }
          form.reset();
          form.querySelectorAll('.form-control').forEach(f => { f.classList.remove('success'); f.classList.remove('error'); });
        }, 1200);
      } else {
        showToast('Please complete all required fields.', 'error');
      }
    });

    // Real-time validation on blur
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur', () => {
        const group = field.closest('.form-group');
        const errorEl = group?.querySelector('.form-error');
        if (!field.value.trim()) {
          field.classList.add('error');
          field.classList.remove('success');
          if (errorEl) { errorEl.style.display = 'flex'; }
        } else {
          field.classList.remove('error');
          field.classList.add('success');
          if (errorEl) { errorEl.style.display = 'none'; }
        }
      });
    });
  });

  /* ── Quote Builder Steps ── */
  const quoteSteps = document.querySelectorAll('.quote-step');
  const quoteContents = document.querySelectorAll('.quote-step-content');
  let currentStep = 0;

  function goToStep(step) {
    if (step < 0 || step >= quoteSteps.length) return;
    quoteSteps.forEach((s, i) => {
      s.classList.toggle('active', i === step);
      s.classList.toggle('done', i < step);
    });
    quoteContents.forEach((c, i) => c.classList.toggle('active', i === step));
    currentStep = step;
  }

  document.querySelectorAll('[data-quote-next]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep + 1));
  });

  document.querySelectorAll('[data-quote-prev]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep - 1));
  });

  if (quoteSteps.length) goToStep(0);

  /* ── Safe Finder Tool ── */
  const finderCards = document.querySelectorAll('.finder-option-card');
  const finderNextBtn = document.querySelector('[data-finder-next]');
  let finderStep = 0;
  const finderSteps = document.querySelectorAll('.finder-step');
  const finderSelections = {};

  finderCards.forEach(card => {
    card.addEventListener('click', () => {
      const group = card.closest('.finder-options');
      group?.querySelectorAll('.finder-option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const stepEl = card.closest('.finder-step');
      if (stepEl) finderSelections[stepEl.dataset.step] = card.dataset.value;
    });
  });

  function advanceFinderStep() {
    if (!finderSteps.length) return;
    finderSteps[finderStep]?.classList.remove('active');
    finderStep++;
    if (finderStep < finderSteps.length) {
      finderSteps[finderStep]?.classList.add('active');
    } else {
      showFinderResults();
    }
  }

  function showFinderResults() {
    const resultsEl = document.getElementById('finder-results');
    if (resultsEl) {
      resultsEl.style.display = 'block';
      document.querySelector('.finder-body')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.querySelector('[data-finder-next]')?.addEventListener('click', advanceFinderStep);
  if (finderSteps.length) finderSteps[0]?.classList.add('active');

  /* ── Size Visualizer ── */
  const safeSelect = document.getElementById('visualizer-safe-select');
  const visualizerSafe = document.getElementById('visualizer-safe');
  const visualizerDims = document.getElementById('visualizer-dims');

  const safeSizes = {
    compact: {
      w: 45,
      h: 60,
      label: 'Compact\n35×25×25 cm',
      title: 'Fortiva Aegis Grade II',
      category: 'Residential Compact Class',
      badge: 'Compact • Up to 25L',
      capacity: 'Up to 25 Litres',
      dims: '35 × 25 × 25 cm',
      weight: '15–30 kg',
      image: 'assets/images/safes/safe-compact.jpg',
      alt: 'Compact Safe Model — Fortiva Aegis Grade II',
      link: 'products.html?category=residential',
      fits: [
        'Fine jewelry, luxury watches & velvet boxes',
        'Passports, birth certificates & title deeds',
        'Hardware crypto wallets, SSDs & USB drives',
        'Emergency cash reserves & personal heirlooms'
      ]
    },
    medium: {
      w: 70,
      h: 90,
      label: 'Medium\n50×40×35 cm',
      title: 'Fortiva Sentinel Grade I',
      category: 'Residential Executive Class',
      badge: 'Medium • 25–80L',
      capacity: '25–80 Litres',
      dims: '50 × 40 × 35 cm',
      weight: '30–80 kg',
      image: 'assets/images/safes/safe-sentinel.jpg',
      alt: 'Medium Safe Lineup — Fortiva Sentinel Grade I',
      link: 'products.html?category=residential',
      fits: [
        'A4 legal document files, deeds & binders',
        'Multi-unit motorized watch winder modules',
        'Camera lenses, electronics & backup storage',
        'Family asset boxes, coin collections & bullion'
      ]
    },
    large: {
      w: 100,
      h: 130,
      label: 'Large\n70×55×50 cm',
      title: 'Fortiva PyroShield 120',
      category: 'Estate Fire & Burglary Class',
      badge: 'Large • 80–200L',
      capacity: '80–200 Litres',
      dims: '70 × 55 × 50 cm',
      weight: '80–250 kg',
      image: 'assets/images/safes/safe-murus.jpg',
      alt: 'Large Safe Installation — Fortiva PyroShield 120',
      link: 'products.html?category=fire',
      fits: [
        'Archival lever-arch files & extensive contracts',
        'High-value bullion stacks & numismatic vaults',
        'Luxury designer handbags & collector compartments',
        'Multiple multi-tier watch winder cabinets'
      ]
    },
    xl: {
      w: 130,
      h: 160,
      label: 'X-Large\n90×70×60 cm',
      title: 'Fortiva Sovereign Grade III / Vault',
      category: 'Private Vault Grade Class',
      badge: 'X-Large • 200L+ Vault',
      capacity: '200+ Litres',
      dims: '100+ × 70 × 60 cm',
      weight: '250–650+ kg',
      image: 'assets/images/safes/safe-imperium.jpg',
      alt: 'X-Large Sovereign Safe Vault — Fortiva Sovereign Grade III',
      link: 'products.html?category=commercial',
      fits: [
        'Multi-generational family heirloom collections',
        'Bespoke luxury watch winding suites (12+ rotors)',
        'Extensive legal archives, gold reserves & fine art',
        'Custom modular interior drawer configurations'
      ]
    }
  };

  function updateVisualizer(size) {
    if (!safeSizes[size]) return;
    const s = safeSizes[size];

    if (visualizerSafe) {
      visualizerSafe.style.width = s.w + 'px';
      visualizerSafe.style.height = s.h + 'px';
    }
    if (visualizerDims) visualizerDims.textContent = s.label;

    // Optional spotlight card elements (home2.html)
    const spotImg = document.getElementById('visualizer-spotlight-img');
    const spotBadge = document.getElementById('visualizer-spotlight-badge');
    const spotTitle = document.getElementById('visualizer-spotlight-title');
    const spotCat = document.getElementById('visualizer-spotlight-category');
    const spotCap = document.getElementById('visualizer-spotlight-capacity');
    const spotDims = document.getElementById('visualizer-spotlight-dims');
    const spotWeight = document.getElementById('visualizer-spotlight-weight');
    const spotFits = document.getElementById('visualizer-spotlight-fits');
    const spotLink = document.getElementById('visualizer-spotlight-link');

    if (spotImg && spotImg.src !== s.image) {
      spotImg.style.opacity = '0.3';
      setTimeout(() => {
        spotImg.src = s.image;
        spotImg.alt = s.alt;
        spotImg.style.opacity = '1';
      }, 120);
    }
    if (spotBadge) spotBadge.textContent = s.badge;
    if (spotTitle) spotTitle.textContent = s.title;
    if (spotCat) spotCat.textContent = s.category;
    if (spotCap) spotCap.innerHTML = `<i class="fas fa-box-open" style="color:var(--brass-text);margin-right:5px;"></i>${s.capacity}`;
    if (spotDims) spotDims.innerHTML = `<i class="fas fa-ruler-combined" style="color:var(--brass-text);margin-right:5px;"></i>${s.dims}`;
    if (spotWeight) spotWeight.innerHTML = `<i class="fas fa-weight-hanging" style="color:var(--brass-text);margin-right:5px;"></i>${s.weight}`;
    if (spotLink) spotLink.href = s.link;

    if (spotFits && Array.isArray(s.fits)) {
      spotFits.innerHTML = s.fits.map(f => `<li class="visualizer-fits-item"><i class="fas fa-check" aria-hidden="true"></i> ${f}</li>`).join('');
    }

    // Synchronize 4-card showcase active state
    document.querySelectorAll('.size-showcase-card').forEach(card => {
      const cardSize = card.getAttribute('data-size');
      const isSelected = cardSize === size;
      card.classList.toggle('is-active', isSelected);
      const btn = card.querySelector('.size-card-select-btn');
      if (btn) {
        if (isSelected) {
          btn.className = 'btn btn-primary btn-sm w-100 size-card-select-btn';
        } else {
          btn.className = 'btn btn-outline btn-sm w-100 size-card-select-btn';
        }
      }
    });

    document.querySelectorAll('.visualizer-size-option').forEach(option => {
      const isSelected = option.getAttribute('data-visualizer-size') === size;
      option.classList.toggle('is-active', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });
  }

  safeSelect?.addEventListener('change', () => updateVisualizer(safeSelect.value));

  document.querySelectorAll('.visualizer-size-option').forEach(option => {
    option.addEventListener('click', () => {
      const chosenSize = option.getAttribute('data-visualizer-size');
      if (!chosenSize || !safeSelect) return;
      safeSelect.value = chosenSize;
      updateVisualizer(chosenSize);
    });
  });

  // Connect showcase cards to visualizer
  document.querySelectorAll('.size-showcase-card').forEach(card => {
    card.addEventListener('click', () => {
      const chosenSize = card.getAttribute('data-size');
      if (chosenSize && safeSelect) {
        safeSelect.value = chosenSize;
        updateVisualizer(chosenSize);
      }
    });
  });

  if (safeSelect) updateVisualizer(safeSelect.value || 'medium');

  /* ── Installation Journey Timeline ── */
  const journeyItems = document.querySelectorAll('.journey-item');
  journeyItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      journeyItems.forEach(j => j.classList.remove('active'));
      item.classList.add('active');
    });
    if (i === 0) item.classList.add('active');
  });

  /* ── Pricing Estimate Calculator ── */
  const estimateForm = document.getElementById('estimate-form');
  const estimateResult = document.getElementById('estimate-result');

  if (estimateForm) {
    estimateForm.addEventListener('change', () => {
      const safeType = estimateForm.querySelector('[name="est-type"]')?.value;
      const size = estimateForm.querySelector('[name="est-size"]')?.value;
      const installType = estimateForm.querySelector('[name="est-install"]')?.value;

      if (safeType && size && estimateResult) {
        const base = { home: 200, fire: 350, document: 280, jewelry: 320, floor: 450, wall: 380, vault: 800 };
        const sizeMulti = { compact: 1, medium: 1.5, large: 2.2, xl: 3 };
        const installAdj = { freestanding: 0, floor: 300, wall: 250, vault: 'quote' };
        const basePrice = (base[safeType] || 200) * (sizeMulti[size] || 1);
        const installCost = installAdj[installType];

        if (installCost === 'quote') {
          estimateResult.innerHTML = `<div class="estimate-range">Vault installations require a site assessment. <a href="book-consultation.html" class="btn-arrow">Request a Quote <i class="fas fa-arrow-right"></i></a></div>`;
        } else {
          const low = Math.round(basePrice + (installCost || 0));
          const high = Math.round(low * 1.4);
          estimateResult.innerHTML = `
            <div class="estimate-range">
              <div class="estimate-disclaimer">Preliminary estimate — not a confirmed quotation</div>
              <div class="estimate-values">
                <span class="estimate-label">Indicative range</span>
                <span class="estimate-price">£${low.toLocaleString()} – £${high.toLocaleString()}</span>
              </div>
              <p class="estimate-note">Actual pricing depends on your selected product, site conditions, installation complexity and location. <a href="book-consultation.html">Request a personalized quote</a> for accurate pricing.</p>
            </div>`;
        }
        estimateResult.style.display = 'block';
      }
    });
  }

  /* ── Tab Navigation ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tabs]');
      const targetId = btn.dataset.tab;
      group?.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
      group?.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === targetId));
    });
  });

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Number Counter Animation ── */
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count) || 0;
          const duration = 1800;
          const start = performance.now();
          const isDecimal = target % 1 !== 0;

          function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
          }
          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
  }

  /* ── Home 1 Innovative Hero Architectural Showcase ── */
  const heroShowcase = document.getElementById('home1-hero');
  if (heroShowcase) {
    const configTabs = heroShowcase.querySelectorAll('.hero-config-tab');
    const heroImg = document.getElementById('hero-showcase-img');
    const heroImgWrap = heroShowcase.querySelector('.hero-stage-img-wrap');
    const modelTag = document.getElementById('hero-model-tag');
    const gradeTag = document.getElementById('hero-grade-tag');
    const eyebrowEl = document.getElementById('hero-config-eyebrow');
    const descEl = document.getElementById('hero-config-desc');
    const cashValEl = document.getElementById('hud-cash-val');
    const valRatingEl = document.getElementById('hud-val-rating');
    const fireRatingEl = document.getElementById('hud-fire-rating');

    // Hotspot elements
    const hotspotBolts = document.getElementById('hotspot-bolts');
    const hotspotLock = document.getElementById('hotspot-lock');
    const hotspotInterior = document.getElementById('hotspot-interior');
    const hotspotBoltsTitle = document.getElementById('hotspot-bolts-title');
    const hotspotBoltsDesc = document.getElementById('hotspot-bolts-desc');
    const hotspotLockTitle = document.getElementById('hotspot-lock-title');
    const hotspotLockDesc = document.getElementById('hotspot-lock-desc');
    const hotspotInteriorTitle = document.getElementById('hotspot-interior-title');
    const hotspotInteriorDesc = document.getElementById('hotspot-interior-desc');

    const heroConfigs = {
      study: {
        eyebrow: "Executive Residential Security • Grade II",
        desc: "Precision-crafted British and European certified safes integrated seamlessly into luxury residential cabinetry. High-security steel defense engineered without compromising your interior aesthetics.",
        image: "assets/images/hero/hero-home1.jpg",
        alt: "Fortiva Series IV Executive Safe inside luxury study cabinetry",
        modelTag: "Fortiva Series IV • Executive Class",
        gradeTag: "Grade II Certified",
        cashVal: "£17,500",
        valRating: "£175,000",
        fireRating: "60 Min",
        hotspots: {
          bolts: { top: "45%", left: "78%", title: "32mm Solid Steel Bolts", desc: "Hardened multi-directional steel bolts resisting pry and hydraulic spreaders." },
          lock: { top: "35%", left: "74%", title: "VdS Class 2 Biometric & Dial", desc: "Live-tissue optical fingerprint scanner combined with electronic time delay." },
          interior: { top: "48%", left: "54%", title: "Motorized Watch Winders", desc: "Programmable Swiss/German winders with magnetic shielding and velvet trays." }
        }
      },
      dressing: {
        eyebrow: "Concealed Wardrobe Solutions • Grade I",
        desc: "Flawlessly flush-mounted safes tailored for luxury dressing rooms and bespoke master wardrobes. Velvet-lined modular compartments for high jewelry, timepieces, and family heirlooms.",
        image: "assets/images/interiors/dressing-room-safe.jpg",
        alt: "Fortiva Aegis Slimline Safe integrated into bespoke dressing room",
        modelTag: "Fortiva Aegis Slimline • Wardrobe",
        gradeTag: "Grade I Certified",
        cashVal: "£10,000",
        valRating: "£100,000",
        fireRating: "30 Min",
        hotspots: {
          bolts: { top: "52%", left: "72%", title: "Flush Interlocking Rebate", desc: "Precision rebated door edge preventing crowbar or wedge leverage in tight spaces." },
          lock: { top: "38%", left: "62%", title: "Backlit Digital Touchpad", desc: "Stealth touch interface with silent duress code and anti-peep digit scrambling." },
          interior: { top: "60%", left: "46%", title: "Velvet Jewelry Suites", desc: "Hand-crafted Italian suede drawers custom partitioned for precious gems." }
        }
      },
      vault: {
        eyebrow: "Private Strongroom Engineering • Grade III–IV",
        desc: "Modular vault rooms and monolithic high-security safes for substantial art collections, bullion, and private estate reserves. Built with multi-layer barrier matrix materials.",
        image: "assets/images/vaults/vault-room-interior.jpg",
        alt: "Fortiva Sovereign Grade III Private Strongroom Vault",
        modelTag: "Fortiva Sovereign • Private Strongroom",
        gradeTag: "Grade III Certified",
        cashVal: "£35,000",
        valRating: "£350,000",
        fireRating: "120 Min",
        hotspots: {
          bolts: { top: "50%", left: "75%", title: "4-Way Anti-Drive Bolts", desc: "38mm manganese steel bolts extending into heavy continuous frame pockets." },
          lock: { top: "40%", left: "68%", title: "Dual Redundant VdS Locks", desc: "Independent electronic and mechanical combination locks with live relockers." },
          interior: { top: "56%", left: "50%", title: "Armored Composite Barrier", desc: "Monolithic barrier resisting diamond core drills, thermal cutting, and disc cutters." }
        }
      }
    };

    function applyConfig(configKey) {
      const config = heroConfigs[configKey];
      if (!config) return;

      // Update tabs
      configTabs.forEach(t => {
        const isSelected = t.getAttribute('data-config') === configKey;
        t.classList.toggle('active', isSelected);
        t.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      });

      // Crossfade hero photo
      if (heroImg && heroImg.src !== config.image) {
        if (heroImgWrap) {
          heroImgWrap.classList.remove('is-wiping');
          void heroImgWrap.offsetWidth;
          heroImgWrap.classList.add('is-wiping');
        }
        heroImg.style.opacity = '0.2';
        heroImg.style.transform = 'scale(0.98)';
        setTimeout(() => {
          heroImg.src = config.image;
          heroImg.alt = config.alt;
          heroImg.style.opacity = '1';
          heroImg.style.transform = 'scale(1)';
        }, 160);
      }

      // Update copy & badges with micro-fade
      if (eyebrowEl) eyebrowEl.textContent = config.eyebrow;
      if (descEl) descEl.textContent = config.desc;
      if (modelTag) modelTag.textContent = config.modelTag;
      if (gradeTag) gradeTag.textContent = config.gradeTag;
      if (cashValEl) cashValEl.textContent = config.cashVal;
      if (valRatingEl) valRatingEl.textContent = config.valRating;
      if (fireRatingEl) fireRatingEl.textContent = config.fireRating;

      // Update hotspots
      if (hotspotBolts && config.hotspots.bolts) {
        hotspotBolts.style.top = config.hotspots.bolts.top;
        hotspotBolts.style.left = config.hotspots.bolts.left;
        if (hotspotBoltsTitle) hotspotBoltsTitle.textContent = config.hotspots.bolts.title;
        if (hotspotBoltsDesc) hotspotBoltsDesc.textContent = config.hotspots.bolts.desc;
      }
      if (hotspotLock && config.hotspots.lock) {
        hotspotLock.style.top = config.hotspots.lock.top;
        hotspotLock.style.left = config.hotspots.lock.left;
        if (hotspotLockTitle) hotspotLockTitle.textContent = config.hotspots.lock.title;
        if (hotspotLockDesc) hotspotLockDesc.textContent = config.hotspots.lock.desc;
      }
      if (hotspotInterior && config.hotspots.interior) {
        hotspotInterior.style.top = config.hotspots.interior.top;
        hotspotInterior.style.left = config.hotspots.interior.left;
        if (hotspotInteriorTitle) hotspotInteriorTitle.textContent = config.hotspots.interior.title;
        if (hotspotInteriorDesc) hotspotInteriorDesc.textContent = config.hotspots.interior.desc;
      }
    }

    configTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const configKey = tab.getAttribute('data-config');
        applyConfig(configKey);
      });
    });

    const rotatingConfigs = Object.keys(heroConfigs);
    let rotatingConfigIndex = 0;
    setInterval(() => {
      rotatingConfigIndex = (rotatingConfigIndex + 1) % rotatingConfigs.length;
      applyConfig(rotatingConfigs[rotatingConfigIndex]);
    }, 5200);

    // Hotspot interaction for mobile tap & keyboard
    const allHotspots = heroShowcase.querySelectorAll('.hero-hotspot');
    const positionMobileHotspotPopover = (spot) => {
      if (!spot || window.innerWidth > 640) return;

      const stage = spot.closest('.hero-stage-card');
      const popover = spot.querySelector('.hotspot-popover');
      if (!stage || !popover) return;

      const stageRect = stage.getBoundingClientRect();
      const spotRect = spot.getBoundingClientRect();
      const popoverWidth = Math.min(260, window.innerWidth - 32);
      const safeInset = 8;
      const idealViewportLeft = spotRect.left + (spotRect.width / 2) - (popoverWidth / 2);
      const minViewportLeft = Math.max(stageRect.left + safeInset, safeInset);
      const maxViewportLeft = Math.min(
        stageRect.right - popoverWidth - safeInset,
        window.innerWidth - popoverWidth - safeInset
      );
      const clampedViewportLeft = Math.min(
        Math.max(idealViewportLeft, minViewportLeft),
        Math.max(minViewportLeft, maxViewportLeft)
      );

      spot.style.setProperty('--mobile-popover-left', `${clampedViewportLeft - spotRect.left}px`);
      spot.classList.remove('popover-below');
      const initialPopoverRect = popover.getBoundingClientRect();
      if (initialPopoverRect.top < stageRect.top + safeInset) {
        spot.classList.add('popover-below');
      }
    };

    allHotspots.forEach(spot => {
      spot.setAttribute('aria-expanded', 'false');
      spot.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = spot.classList.contains('is-open');
        allHotspots.forEach(s => {
          s.classList.remove('is-open');
          s.classList.remove('popover-below');
          s.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          spot.classList.add('is-open');
          spot.setAttribute('aria-expanded', 'true');
          positionMobileHotspotPopover(spot);
        }
      });
      spot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const willOpen = !spot.classList.contains('is-open');
          allHotspots.forEach(s => {
            s.classList.remove('is-open');
            s.classList.remove('popover-below');
            s.setAttribute('aria-expanded', 'false');
          });
          if (willOpen) {
            spot.classList.add('is-open');
            spot.setAttribute('aria-expanded', 'true');
            positionMobileHotspotPopover(spot);
          }
        }
      });
    });

    document.addEventListener('click', () => {
      allHotspots.forEach(s => {
        s.classList.remove('is-open');
        s.classList.remove('popover-below');
        s.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('resize', () => {
      const openSpot = heroShowcase.querySelector('.hero-hotspot.is-open');
      if (openSpot) positionMobileHotspotPopover(openSpot);
    });

  }

  /* ── Interactive Card Cursor Spotlight Tracking ── */
  const interactiveCards = document.querySelectorAll(
    '.card, .product-card, .spec-card, .anatomy-cell, .space-card, .size-showcase-card, .maintenance-card, .bento-cell, .journey-item'
  );

  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ── Hero Stage Card 3D Subtle Tilt ── */
  const stageCard = document.querySelector('.hero-stage-card');
  if (stageCard && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    stageCard.addEventListener('mousemove', (e) => {
      const rect = stageCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;
      stageCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    stageCard.addEventListener('mouseleave', () => {
      stageCard.style.transform = '';
    });
  }

});
