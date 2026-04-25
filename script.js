const body = document.body;
const toggle = document.getElementById('themeToggle');
const links = document.querySelectorAll('nav a, .see-all');
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Tambahkan di paling atas script.js
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Pastikan animasi hamburger tetap sinkron
    const bars = menuToggle.querySelectorAll('.bar');
    const isActive = navMenu.classList.contains('active');
    
    bars[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 6px)' : 'none';
    bars[1].style.opacity = isActive ? '0' : '1';
    bars[2].style.transform = isActive ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
  });
}

// THEME TOGGLE
if (localStorage.getItem('theme') === 'dark') body.classList.add('dark');
if (toggle) {
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const mode = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
  });
}

// PAGE TRANSITION
links.forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    body.classList.add('fade-out');
    setTimeout(() => (window.location.href = href), 400);
  });
});

// POPUP GALLERY
if (popup && popupImg && captionText && closeBtn) {
  document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
      popup.style.display = "flex";
      popupImg.src = img.src;
      captionText.innerText = img.nextElementSibling.innerText;
    });
  });
  closeBtn.addEventListener("click", () => popup.style.display = "none");
  popup.addEventListener("click", (e) => { if (e.target === popup) popup.style.display = "none"; });
}

// FADE-UP SCROLL
const fadeElements = document.querySelectorAll('.fade-up');
window.addEventListener('scroll', () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add('show');
  });
});

// CONTACT FORM (jika ada)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    e.target.reset();
  });
}
