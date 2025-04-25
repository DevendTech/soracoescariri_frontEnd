document.addEventListener("DOMContentLoaded", function () {
  const formAdicionarVariantes = document.getElementById('form-adicionar-variantes');
  const inputDesconto = document.getElementById('input-desconto');
  const radiosDesconto = document.querySelectorAll('input[name="desconto-radio"]');
  const container = document.getElementById('container');
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const variantId = urlParams.get("varianteId");
  const productname = urlParams.get("productName");
  const alertaSucesso = document.getElementById('alertaSucesso');

  container.innerHTML = `
    <label class="block text-gray-700">Produto</label>
    <p class="mt-1 block w-full p-2">${productname}</p>
  `;

  function carregarDadosVariante() {
    if (!variantId) {
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
          <p class="text-xs font-semibold">Erro - Erro ao carregar variante.</p>
        </div>
      `
      setTimeout(() => {
        document.getElementById("alertaSucesso").classList.add("hidden");
      }, 4000);
      console.error("ID da variante não encontrado na URL.");
      return;
    }

    fetch(`https://back.soracoescariri.com.br/api/user/getVariantesById/${variantId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Dados da variante:", data);
        
        document.getElementById('variant-weight').value = data.weight || '';
        document.getElementById('variant-price').value = data.price || '';
        
        const temDesconto = data.discount > 0;
        const radioSim = document.querySelector('input[name="desconto-radio"][value="SIM"]');
        const radioNao = document.querySelector('input[name="desconto-radio"][value="NAO"]');
        
        if (temDesconto) {
          radioSim.checked = true;
          inputDesconto.value = data.discount;
          inputDesconto.disabled = false;
          inputDesconto.classList.remove('bg-gray-400');
        } else {
          radioNao.checked = true;
          inputDesconto.value = '0';
          inputDesconto.disabled = true;
          inputDesconto.classList.add('bg-gray-400');
        }
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
            <p class="text-xs font-semibold">Erro - Erro Interno ao carregar variante.</p>
          </div>
        `
        setTimeout(() => {
          dalertaSucesso.classList.add("hidden");
        }, 4000);
          console.error("Erro ao carregar variante:", error);
        });
  }

  function verificarDesconto() {
    const radioSelecionado = document.querySelector('input[name="desconto-radio"]:checked');
    
    if (!radioSelecionado) return;

    if (radioSelecionado.value === "NAO") {
      inputDesconto.disabled = true;
      inputDesconto.classList.add('bg-gray-400');
      inputDesconto.value = '';
    } else {
      inputDesconto.disabled = false;
      inputDesconto.classList.remove('bg-gray-400');
    }
  }

  radiosDesconto.forEach(radio => {
    radio.addEventListener("change", function() {
      verificarDesconto();
      inputDesconto.dispatchEvent(new Event('input'));
    });
  });

  formAdicionarVariantes.addEventListener('submit', function (event) {
    event.preventDefault();

    const weight = document.getElementById('variant-weight').value.trim();
    const price = document.getElementById('variant-price').value.trim();
    const temDesconto = document.querySelector('input[name="desconto-radio"]:checked').value === "SIM";
    const discount = temDesconto ? document.getElementById('input-desconto').value.trim() : 0;

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

    if (temDesconto && (!discount || isNaN(discount) || discount < 0)) {
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
            Alerta - Insira um valor de desconto válido.
          </p>
        </div>
      `
      setTimeout(() => {
        alertaSucesso.innerHTML = '';
        alertaSucesso.classList.add('hidden');
    }, 4000);
      return;
    }

    fetch(`https://back.soracoescariri.com.br/api/user/updateVariants/${variantId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        weight: weight,
        price: price,
        stock: 0,
        discount: parseFloat(discount) || 0
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
      })
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
            <p class="text-xs font-semibold">Sucesso - Produto cadastrado com sucesso!</p>
          </div>
        `
        setTimeout(() => {
          alertaSucesso.classList.add("hidden");
          window.history.back();
        }, 4000);
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
            <p class="text-xs font-semibold">Erro - Erro interno de servidor.</p>
          </div>
        `
        setTimeout(() => {
          dalertaSucesso.classList.add("hidden");
        }, 4000);
        console.error("Erro ao atualizar variante:", error);
      });
  });

  carregarDadosVariante();
});