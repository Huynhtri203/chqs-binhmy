/**
 * theme.js — Chuyển đổi sáng/tối mượt mà, sang trọng
 * Dành cho: Ban CHQS Xã Bình Mỹ — Cổng Thông Tin
 *
 * Tính năng:
 *  - Chuyển theme tức thì không nhấp nháy (script chạy trước khi render)
 *  - Hiệu ứng ripple lan tỏa từ nút toggle
 *  - Icon SVG thay thế emoji — sắc nét mọi màn hình
 *  - Tự nhận diện hệ thống (prefers-color-scheme) nếu chưa chọn
 *  - Lưu lựa chọn vào localStorage
 */

/* ── 1. ÁP DỤNG THEME TRƯỚC KHI TRANG RENDER (ngăn nháy sáng) ── */
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

/* ── 2. THÊM CSS TRANSITION SAU KHI DOM SẴN SÀNG ── */
document.addEventListener('DOMContentLoaded', () => {

  /* Inject transition CSS — chỉ chạy SAU khi theme đã áp dụng,
     tránh transition giả lúc load trang */
  const style = document.createElement('style');
  style.textContent = `
    html {
      transition:
        background-color 0.45s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.45s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .header {
      transition:
        background 0.45s cubic-bezier(0.4, 0, 0.2, 1),
        border-color 0.45s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s ease;
    }
    .glass-card, .stat-card, .saas-footer,
    .footer-bottom, .footer-container,
    .btn-saas, .btn-lang-header, .header-divider,
    .footer-col, .footer-brand, .footer-contact-info {
      transition:
        background 0.45s cubic-bezier(0.4, 0, 0.2, 1),
        border-color 0.45s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.45s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.45s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ── Ripple overlay ── */
    .theme-ripple {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: scale(0);
      will-change: transform, opacity;
    }
    .theme-ripple.expanding {
      animation: rippleExpand 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    @keyframes rippleExpand {
      0%   { transform: scale(0); opacity: 0.18; }
      60%  { opacity: 0.12; }
      100% { transform: scale(1); opacity: 0; }
    }

    /* ── Icon rotate khi đổi theme ── */
    #theme-toggle svg {
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
    }
    #theme-toggle.switching svg {
      transform: rotate(180deg) scale(0.6);
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  /* ── 3. ICONS SVG (sắc nét, không phụ thuộc font emoji) ── */
  const SUN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`;

  const MOON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  /* ── 4. KHỞI TẠO NÚT TOGGLE ── */
  function initToggleButton() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.innerHTML = currentTheme === 'dark' ? SUN_ICON : MOON_ICON;
    btn.setAttribute('aria-label', currentTheme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');

    btn.addEventListener('click', handleToggle);
  }

  /* ── 5. XỬ LÝ TOGGLE VỚI RIPPLE ── */
  function handleToggle(e) {
    const btn = e.currentTarget;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    /* Ripple màu phù hợp với theme đang chuyển sang */
    const rippleColor = nextTheme === 'dark'
      ? 'rgba(10, 10, 10, 0.15)'
      : 'rgba(248, 250, 252, 0.2)';

    spawnRipple(btn, rippleColor);
    rotateIcon(btn, nextTheme);

    /* Áp dụng theme + lưu */
    setTimeout(() => {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    }, 80); /* nhỏ trễ để ripple và icon rotate cùng khởi động */
  }

  /* ── 6. HIỆU ỨNG RIPPLE ── */
  function spawnRipple(btn, color) {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    /* Đường kính đủ bao phủ toàn màn hình */
    const maxDist = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );
    const size = maxDist * 2.2;

    const ripple = document.createElement('div');
    ripple.className = 'theme-ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${cx - size / 2}px;
      top: ${cy - size / 2}px;
      background: ${color};
    `;
    document.body.appendChild(ripple);

    /* Trigger reflow rồi chạy animation */
    ripple.getBoundingClientRect();
    ripple.classList.add('expanding');

    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }

  /* ── 7. ROTATE ICON KHI ĐỔI ── */
  function rotateIcon(btn, nextTheme) {
    btn.classList.add('switching');

    setTimeout(() => {
      btn.innerHTML = nextTheme === 'dark' ? SUN_ICON : MOON_ICON;
      btn.setAttribute('aria-label', nextTheme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
      btn.classList.remove('switching');
    }, 250);
  }

  /* ── 8. KHỞI ĐỘNG ── */
  initToggleButton();

  /* Nếu auth box được render lại (sau đăng nhập), gắn lại listener */
  const authBox = document.getElementById('header-auth-box');
  if (authBox) {
    const observer = new MutationObserver(() => {
      initToggleButton();
    });
    observer.observe(authBox, { childList: true, subtree: false });
  }
});