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

document.getElementById('buttonCao').addEventListener('click', function() {
  localStorage.setItem('checkboxCao', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoCaoAdulto').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoCaoAdulto', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoCaoFilhote').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoCaoFilhote', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoCao').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoCao', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonGato').addEventListener('click', function() {
  localStorage.setItem('checkboxGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonEAPP').addEventListener('click', function() {
  localStorage.setItem('checkboxEAPP', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentos').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentos', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonAcessorios').addEventListener('click', function() {
  localStorage.setItem('checkboxAcessorios', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})