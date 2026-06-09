const WA = '6285117606183';

// ── Custom cursor ─────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .card, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

// ── Nav CTA scroll to products ────────────────────────────────────
document.getElementById('navCta').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// ── Modal ─────────────────────────────────────────────────────────
function openModal(type) {
  const overlay = document.getElementById('modal-' + type);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(type) {
  const overlay = document.getElementById('modal-' + type);
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  const alert = document.getElementById('alert-' + type);
  if (alert) { alert.className = 'alert'; alert.textContent = ''; }
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      closeModal(overlay.id.replace('modal-', ''));
    }
  });
});

// Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(o => {
      closeModal(o.id.replace('modal-', ''));
    });
  }
});

// ── Alert ────────────────────────────────────────────────────────
function showAlert(type, msg) {
  const el = document.getElementById('alert-' + type);
  el.textContent = msg;
  el.className = 'alert error';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Submit ────────────────────────────────────────────────────────
function submitOrder(type) {
  let msg = '';
  let valid = true;

  if (type === 'redeem') {
    const name  = document.getElementById('redeem-name').value.trim();
    const phone = document.getElementById('redeem-phone').value.trim();
    if (!name || !phone) { valid = false; }
    else msg = `Min saya mau pesen redeem code Minecraft min 🎫\n\n*Data Pembeli:*\nNama: ${name}\nNo. Telp: ${phone}`;
  }

  else if (type === 'skin') {
    const name    = document.getElementById('skin-name').value.trim();
    const phone   = document.getElementById('skin-phone').value.trim();
    const stype   = document.getElementById('skin-type').value;
    const ssize   = document.getElementById('skin-size').value;
    const sgender = document.getElementById('skin-gender').value;
    const sdesc   = document.getElementById('skin-desc').value.trim();
    if (!name || !phone || !stype || !ssize || !sgender || !sdesc) { valid = false; }
    else msg = `Min saya mau pesen custom skin 🎨\n\n*Data Pembeli:*\nNama: ${name}\nNo. Telp: ${phone}\n\n*Request Skin:*\nTipe: ${stype}\nUkuran: ${ssize}\nGender: ${sgender}\n\n${sdesc}`;
  }

  else if (type === 'mcpe') {
    const name  = document.getElementById('mcpe-name').value.trim();
    const phone = document.getElementById('mcpe-phone').value.trim();
    const gmail = document.getElementById('mcpe-gmail').value.trim();
    if (!name || !phone || !gmail) { valid = false; }
    else msg = `Min saya mau pesen Minecraft PE 📱\n\n*Data Pembeli:*\nNama: ${name}\nNo. Telp: ${phone}\nGmail: ${gmail}`;
  }

  else if (type === 'bundle') {
    const name    = document.getElementById('bundle-name').value.trim();
    const phone   = document.getElementById('bundle-phone').value.trim();
    const stype   = document.getElementById('bundle-skin-type').value;
    const ssize   = document.getElementById('bundle-skin-size').value;
    const sgender = document.getElementById('bundle-skin-gender').value;
    const sdesc   = document.getElementById('bundle-skin-desc').value.trim();
    if (!name || !phone || !stype || !ssize || !sgender || !sdesc) { valid = false; }
    else msg = `Min saya mau pesen bundle 💎\n\n*Data Pembeli:*\nNama: ${name}\nNo. Telp: ${phone}\n\n*Request Skin:*\nTipe: ${stype}\nUkuran: ${ssize}\nGender: ${sgender}\n\n${sdesc}`;
  }

  if (!valid) {
    showAlert(type, '❌ Harap isi semua field yang wajib diisi!');
    return;
  }

  window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank');
  closeModal(type);
}

// ── Scroll reveal ─────────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
