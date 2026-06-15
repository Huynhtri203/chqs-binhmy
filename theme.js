const THEME_STORAGE_KEY = 'siteTheme';

function getStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY);
}

function getPreferredTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeButton(mode) {
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  button.textContent = mode === 'dark' ? '☀️' : '🌙';
  button.title = mode === 'dark' ? 'Chế độ sáng' : 'Chế độ tối';
}

function applyTheme(mode) {
  const theme = mode === 'dark' ? 'dark' : 'light';
  document.body.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeButton(theme);
}

function toggleTheme() {
  applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
}

function initTheme() {
  const stored = getStoredTheme();
  const theme = stored || getPreferredTheme();
  applyTheme(theme);
  const button = document.getElementById('theme-toggle');
  if (button) button.addEventListener('click', toggleTheme);
}

document.addEventListener('DOMContentLoaded', initTheme);
