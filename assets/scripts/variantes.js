document.addEventListener("DOMContentLoaded", function () {
  const formAdicionarVariantes = document.getElementById('form-adicionar-variantes');
  const inputDesconto = document.querySelector('#input-desconto');
  const select = document.querySelectorAll('input[name="desconto-radio"]');
  const container = document.getElementById('container')
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");
  const productname = urlParams.get("productName")
  const checkedNao = document.getElementById('checkedNao')
  const alertaSucesso = document.getElementById('alertaSucesso')

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
      alertaSucesso.classList.remove('hidden');
      alertaSucesso.innerHTML = `
        <div
        role="alert"
        class="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-yellow-200 dark:hover:bg-yellow-800 transform hover:scale-105"
        >
          <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-5 w-5 flex-shrink-0 mr-2 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
          >
            <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
            ></path>
          </svg>
          <p class="text-xs font-semibold">
          Alerta - Preencha os campos corretamente.
          </p>
        </div>
      `
      setTimeout(() => {
        alertaSucesso.innerHTML = '';
        alertaSucesso.classList.add('hidden');
      }, 4000);
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
        alertaSucesso.classList.remove("hidden");
        alertaSucesso.classList.add("flex");
        alertaSucesso.innerHTML = `
          <div
          role="alert"
          class="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
          >
            <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            class="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            >
              <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
              ></path>
            </svg>
            <p class="text-xs font-semibold">Sucesso - Variante criada com sucesso!</p>
          </div>
        `
        setTimeout(() => {
          alertaSucesso.classList.add("hidden");
          checkedNao.checked = true;
        }, 4000);
        inputDesconto.disabled = true;
        inputDesconto.classList.add('bg-gray-400');
        formAdicionarVariantes.reset();
      })
      .catch(error => {
        alertaSucesso.classList.remove("hidden");
        alertaSucesso.classList.add("flex");
        alertaSucesso.innerHTML = `
          <div
          role="alert"
          class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
          >
            <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            class="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            >
              <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
              ></path>
            </svg>
            <p class="text-xs font-semibold">Erro - Erro interno do servidor.</p>
          </div>
        `
        setTimeout(() => {
          alertaSucesso.classList.add("hidden");
        }, 4000);
      });
  });
});
