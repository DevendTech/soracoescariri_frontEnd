document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const container = document.getElementById("product-container");
  const searchInput = document.getElementById("searchInput");
  const alertaSucesso = document.getElementById("alertaSucesso");
  let allProducts = [];

  // Requisição para buscar produtos
  fetch("https://back.soracoescariri.com.br/api/getProducts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!container) {
        console.log("Elemento #product-container não encontrado");
        return;
      }

      allProducts = data;
      renderProducts(allProducts);
    })
    .catch((error) => console.error("Erro ao buscar os produtos:", error));

  // Função para renderizar os produtos
  function renderProducts(products) {
    container.innerHTML = "";

    products.forEach((product) => {
      const id = product.produto.id;
      const name = product.produto.name;

      const productElement = document.createElement("div");
      productElement.className = "bg-white p-6 rounded-lg shadow-md border-b py-4 mb-5";
      productElement.dataset.id = id;

      productElement.innerHTML = `
        <div class="flex justify-between flex-col gap-3 items-center md:flex-row">
          <div>
            <h4 class="font-semibold">${name}</h4>
          </div>
          <div class="flex gap-2">
            <a href="/pages/propietario/editarproduto.html?produtoId=${id}" class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Editar</a>
            <a target="_blank" class="bg-red-600 text-white p-2 rounded hover:bg-red-700 remove">Remover</a>
          </div>
        </div>
      `;

      // Adiciona evento de clique ao botão "Remover"
      const removeButton = productElement.querySelector('.remove');
      removeButton.addEventListener('click', () => {
        const body = document.querySelector("body");
        const divBackground = document.getElementById("background");
        const buttonSim = document.getElementById("buttonSim");
        const buttonNao = document.getElementById("buttonNao");
        
        divBackground.classList.remove("hidden");
        divBackground.classList.add("flex");
        body.classList.add("overflow-hidden");
        
        const confirmar = (e) => {
          e.preventDefault();
          excludeProduct(id);
          fecharModal();
        };

        const cancelar = (e) => {
          e.preventDefault();
          fecharModal();
        };

        const fecharModal = () => {
          divBackground.classList.remove("flex");
          divBackground.classList.add("hidden");
          body.classList.remove("overflow-hidden");
          buttonSim.removeEventListener("click", confirmar);
          buttonNao.removeEventListener("click", cancelar);
        };

        buttonSim.addEventListener("click", confirmar);
        buttonNao.addEventListener("click", cancelar);

      });

      container.appendChild(productElement);
    });
  }

  // Função para excluir o produto
  async function excludeProduct(id) {
    
    try {
      const response = await fetch(`https://back.soracoescariri.com.br/api/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        alertaSucesso.classList.remove("hidden");
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
            <p class="text-xs font-semibold">Sucesso - Produto excluido com sucesso!</p>
          </div>
        `
        setTimeout(() => {
          document.getElementById("alertaSucesso").classList.add("hidden");
        }, 7000);
        // Atualiza lista após exclusão
        allProducts = allProducts.filter((p) => p.produto.id != id);
        renderProducts(allProducts);
      } else {
        console.error(`Erro ao excluir produto: ${response.status}`);
      }
    } catch (error) {
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
        document.getElementById("alertaSucesso").classList.add("hidden");
      }, 4000);
      console.error("Erro na requisição de exclusão:", error);
    }
  }

  // Evento de busca em tempo real
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = allProducts.filter((product) =>
        product.produto.name.toLowerCase().includes(searchTerm)
      );
      renderProducts(filteredProducts);
    });
  }
});
