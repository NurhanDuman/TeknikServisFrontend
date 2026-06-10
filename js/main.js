/* ================================
   ServisTakip – main.js
================================ */

// ── Admin dropdown toggle ─────────────────────────────────────────
// Global scope'ta tanımlı — inline onclick="adminToggle()" çalışsın
function adminToggle() {
  var submenu = document.getElementById('adminSubmenu');
  var chevron = document.getElementById('adminChevron');
  if (!submenu) return;
  submenu.classList.toggle('acik');
  if (chevron) {
    chevron.style.transform = submenu.classList.contains('acik')
      ? 'rotate(180deg)'
      : 'rotate(0deg)';
  }
}

document.addEventListener('DOMContentLoaded', function () {

  // ── Aktif sayfayı tespit et ──────────────────────────────────────
  var currentPage = window.location.pathname.split('/').pop();

  // Ana menü linkleri
  document.querySelectorAll('.sidebar-menu li a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.split('/').pop() === currentPage) {
      link.closest('li').classList.add('active');
    }
  });

  // Submenu linkleri — aktifse Admin Panel'i otomatik aç
  var isAdminPage = false;
  document.querySelectorAll('.submenu-item').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.split('/').pop() === currentPage) {
      link.classList.add('active');
      isAdminPage = true;
    }
  });

  if (isAdminPage) {
    var submenu = document.getElementById('adminSubmenu');
    var chevron = document.getElementById('adminChevron');
    if (submenu) submenu.classList.add('acik');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }

});

// ── Toast bildirimi ───────────────────────────────────────────────
function showToast(message, duration) {
  duration = duration || 3500;
  var existing = document.getElementById('global-toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.id = 'global-toast';
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px)';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(function () { toast.remove(); }, 300);
  }, duration);
}

// ── Modal yardımcıları ────────────────────────────────────────────
function openModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function (m) {
      m.classList.remove('open');
    });
  }
});