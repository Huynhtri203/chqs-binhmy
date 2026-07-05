/* ═══════════════════════════════════════════════════════════════
   SHARED HEADER JS — sao chép NGUYÊN BẢN logic header từ index.html
   Include file này SAU khi header HTML đã có trong DOM (đặt trước
   theme.js / lang.js đều được, script này chỉ đụng tới phần header).
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ───────── 1. Menu mobile (hamburger) + dropdown trên mobile ───────── */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('main-nav');
  const dropdownItems = document.querySelectorAll('.nav-item:has(.dropdown)');

  function closeMenu() {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.remove('mobile-open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    dropdownItems.forEach(item => item.classList.remove('open'));
  }

  function openMenu() {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.add('mobile-open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu();
      else openMenu();
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeMenu();
      });
    });
  }

  dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
      const clickedInsideDropdown = event.target.closest('.dropdown');
      if (window.innerWidth <= 768 && !clickedInsideDropdown) {
        event.preventDefault();
        dropdownItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  /* ───────── 2. Tài khoản đăng nhập (pill + panel) ───────── */
  const userFullname = localStorage.getItem('user_fullname');
  const authBox = document.getElementById('header-auth-box');

  function getUserInitials(name) {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  function closeAccountPanel() {
    const panel = document.getElementById('account-panel');
    const overlay = document.getElementById('account-overlay');
    const trigger = document.getElementById('account-trigger');
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('panel-open');
  }

  function renderAccountHeader(fullname) {
    const initials = getUserInitials(fullname);
    const role = localStorage.getItem('user_role') || 'Cán bộ';
    const hasHistory = localStorage.getItem('user_access_history') === 'true';

    if (!authBox) return;
    authBox.innerHTML = `
      <button id="theme-toggle" class="btn-icon-header" title="Đổi giao diện">☀️</button>
      <button id="lang-toggle" class="btn-lang-header">🇬🇧 EN</button>
      <div class="header-divider"></div>
      <button id="account-trigger" class="account-pill" type="button" aria-haspopup="true" aria-expanded="false">
        <span class="account-avatar">${initials}</span>
        <span class="account-name">${fullname}</span>
        <span class="account-chevron">▾</span>
      </button>
    `;

    const panelAvatar = document.getElementById('panel-avatar');
    const panelFullname = document.getElementById('panel-fullname');
    const panelRole = document.getElementById('panel-role');
    if (panelAvatar) panelAvatar.textContent = initials;
    if (panelFullname) panelFullname.textContent = fullname;
    if (panelRole) panelRole.textContent = role;

    const historyBtn = document.getElementById('account-history-btn');
    if (historyBtn) {
      historyBtn.style.display = hasHistory ? 'flex' : 'none';
    }

    const trigger = document.getElementById('account-trigger');
    const overlay = document.getElementById('account-overlay');
    const panel = document.getElementById('account-panel');
    const logoutBtn = document.getElementById('signout-btn');
    const profileBtn = document.getElementById('account-profile-btn');
    const pwBtn = document.getElementById('account-password-btn');
    const themeBtn = document.getElementById('account-theme-btn');

    if (trigger && panel && overlay) {
      trigger.addEventListener('click', () => {
        const open = !panel.classList.contains('open');
        panel.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('panel-open', open);
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeAccountPanel);
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        if (window.supabaseApp) {
          await window.supabaseApp.auth.signOut();
        }
        localStorage.removeItem('user_fullname');
        localStorage.removeItem('user_role');
        closeAccountPanel();
        window.location.reload();
      });
    }

    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        window.location.href = 'profile.html';
      });
    }

    if (pwBtn) {
      pwBtn.addEventListener('click', () => {
        window.location.href = 'auth.html?mode=login';
      });
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        document.getElementById('theme-toggle')?.click();
        closeAccountPanel();
      });
    }

    document.addEventListener('click', (event) => {
      if (!panel || !trigger) return;
      if (!panel.classList.contains('open')) return;
      if (trigger.contains(event.target) || panel.contains(event.target) || overlay.contains(event.target)) return;
      closeAccountPanel();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeAccountPanel();
      }
    });
  }

  if (userFullname && authBox) {
    renderAccountHeader(userFullname);
  }
});