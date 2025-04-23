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
document.getElementById('buttonCaoMobile').addEventListener('click', function() {
  localStorage.setItem('checkboxCao', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonCao').addEventListener('click', function() {
  localStorage.setItem('checkboxCao', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoCaoAdulto').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoCaoAdulto', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoCaoAdultoHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoCaoAdulto', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoCaoFilhote').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoCaoFilhote', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoCaoFilhoteHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoCaoFilhote', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoCao').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoCao', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoCaoHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoCao', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonGatoMobile').addEventListener('click', function() {
  localStorage.setItem('checkboxGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonGato').addEventListener('click', function() {
  localStorage.setItem('checkboxGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoGato').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoGatoHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonAreiaGato').addEventListener('click', function() {
  localStorage.setItem('checkboxAreiaGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonAreiaGatoHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxAreiaGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoGato').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoGatoHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoGato', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonVariaveisMobile').addEventListener('click', function() {
  localStorage.setItem('checkboxEAPP', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonEAPP').addEventListener('click', function() {
  localStorage.setItem('checkboxEAPP', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoEquinioEporco').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoEquinioEporco', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoEquinioEporcoHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoEquinioEporco', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoAves').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoAves', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoAvesHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoAves', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoPeixes').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoPeixes', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonRacaoPeixes').addEventListener('click', function() {
  localStorage.setItem('checkboxRacaoPeixes', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoMobile').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentos', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentos').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentos', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoAdulto').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoAdulto', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoAdultoHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoAdulto', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoFilhote').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoFilhote', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoFilhoteHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoFilhote', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoCastrado').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoCastrado', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonMedicamentoCastradoHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxMedicamentoCastrado', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonAcessoriosMobile').addEventListener('click', function() {
  localStorage.setItem('checkboxAcessorios', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonAcessorios').addEventListener('click', function() {
  localStorage.setItem('checkboxAcessorios', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonCama').addEventListener('click', function() {
  localStorage.setItem('checkboxCama', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonCamaHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxCama', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonSanitario').addEventListener('click', function() {
  localStorage.setItem('checkboxSanitario', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonSanitarioHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxSanitario', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonColeira').addEventListener('click', function() {
  localStorage.setItem('checkboxColeira', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})
document.getElementById('buttonColeiraHeader').addEventListener('click', function() {
  localStorage.setItem('checkboxColeira', 'true')
  window.location.href = '/pages/usuario/produtos.html'
})

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

