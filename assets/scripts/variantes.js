document.addEventListener("DOMContentLoaded", function () {
  const formAdicionarVariantes = document.getElementById('form-adicionar-variantes');
  const inputDesconto = document.querySelector('#input-desconto');
  const select = document.querySelectorAll('input[name="desconto-radio"]');
  const container = document.getElementById('container')
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");
  const productname = urlParams.get("productName")

  container.innerHTML = "";

  const productHTML = `
    <label class="block text-gray-700">Produto</label>
    <p class="mt-1 block w-full p-2 ">${productname}</p>
  `
  container.innerHTML += productHTML;

  

  function verificarDesconto() {
    const selectNow = document.querySelector('input[name="desconto-radio"]:checked').value;
    if (selectNow === "NAO") {
      inputDesconto.disabled = true;
      inputDesconto.classList.add('bg-gray-400');
    } else {
      inputDesconto.disabled = false;
      inputDesconto.classList.remove('bg-gray-400');
    }
  }

  verificarDesconto();
  select.forEach(select => {
    select.addEventListener("change", verificarDesconto);
  });

  formAdicionarVariantes.addEventListener('submit', function (event) {
    event.preventDefault();

    const weight = document.getElementById('variant-weight').value;
    const price = document.getElementById('variant-price').value;
    const discount = document.querySelector('input[name="desconto-radio"]:checked').value === "SIM" ? document.getElementById('input-desconto').value : 0;

    if (!weight || !price) {
      alert("Por favor, preencha todos os campos da variante.");
      return;
    }

    fetch('https://back.soracoescariri.com.br/api/user/variants', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        weight: weight,
        price: price,
        stock: 0,
        discount: discount
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Variante adicionada:", data);
        alert("Variante adicionada com sucesso!");
        formAdicionarVariantes.reset();
      })
      .catch(error => {
        console.error("Erro ao adicionar variante:", error);
        alert("Erro ao adicionar variante. Tente novamente.");
      });
  });
});
