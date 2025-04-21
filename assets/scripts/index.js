// carrossel
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const slides = carousel.children;
  let index = 0;

  function showSlide() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
    index = (index + 1) % slides.length;
  }

  setInterval(showSlide, 2000);
});


const toggleBtn = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

toggleBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});


// Esconde o banner se o usuário já aceitou os cookies
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookieBanner');
  const accepted = localStorage.getItem('cookieAccepted');
  if (accepted === 'true') {
    banner.style.display = 'none';
  }
});

// Aceita os cookies e esconde o banner
function acceptCookies() {
  localStorage.setItem('cookieAccepted', 'true');
  document.getElementById('cookieBanner').style.display = 'none';
}


