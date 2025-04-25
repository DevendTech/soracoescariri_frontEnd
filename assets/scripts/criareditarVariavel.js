document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const searchInput = document.getElementById("searchInput");
  const alertaSucesso = document.getElementById("alertaSucesso");
  let allProducts = [];

  fetch("https://back.soracoescariri.com.br/api/getProducts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        alertaSucesso.classList.remove("hidden");
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
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch((error) => {
      alertaSucesso.classList.remove("hidden");
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
          <p class="text-xs font-semibold">Erro - Erro ao buscar produto.</p>
        </div>
      `
      setTimeout(() => {
        alertaSucesso.classList.add("hidden");
      }, 4000);
      console.error("Erro ao buscar os produtos:", error)
    })
  function renderProducts(products) {
    const container = document.getElementById("product-container");
    if (!container) {
      console.log("Elemento #product-container não encontrado");
      return;
    }

    container.innerHTML = "";

    products.forEach((product) => {
      const variantes = product.variantes || [];
      const name = product.produto.name;
      const id = product.produto.id;
      let firstVariantId = variantes.length > 0 ? variantes[0].id : "";

      const variantesHTML = variantes
        .map((variant, index) => {
          const hasDiscount = Number(variant.discount) > 0;
          return `
            <div class="flex space-x-2 border-[3px] rounded-xl select-none">
              <label class="radio flex flex-grow items-center justify-center md:items-baseline md:justify-baseline rounded-lg p-1 cursor-pointer">
                <input
                  type="radio"
                  name="radio-${id}"
                  value="${variant.id}"
                  class="peer hidden"
                  ${index === 0 ? "checked" : ""}
                />
                <span class="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#064E3B] peer-checked:to-[#064E3B] peer-checked:text-white border-2 border-emerald-700 p-2 md:w-40 rounded-lg transition duration-150 ease-in-out">
                  ${variant.weight} - R$ ${parseFloat(variant.price).toFixed(2)}
                </span>
                ${
                  hasDiscount
                    ? `<div class='divDiscount text-red-600 font-bold ml-2'> <img src="/assets/icons/desconto-25 .png" alt="desconto" class=""></div>`
                    : ``
                }
              </label>
            </div>
          `;
        })
        .join("");

      const productHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md border-b py-4 mb-5">
          <div class="flex justify-between flex-col gap-3 items-center md:flex-row">
            <div class="flex flex-col justify-center items-center md:items-baseline">
              <h4 class="font-semibold">${name}</h4>
              <div>${variantesHTML}</div>
            </div>

            <div class="flex gap-2">
              <a href="criarVariantes.html?productId=${id}&productName=${encodeURIComponent(name)}" 
                 class="flex justify-center items-center bg-green-900 text-white p-2 hover:bg-green-700 rounded"> 
                 Adicionar+
              </a>
              <a id="editar-${id}" 
                 href="editarVariantes.html?varianteId=${firstVariantId}&productName=${encodeURIComponent(name)}" 
                 class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"> 
                 Editar 
              </a>
              <button class="bg-red-600 text-white p-2 rounded hover:bg-red-700 remove-variante-btn" data-product-id="${id}">
                Remover
              </button>
            </div>
          </div>
        </div>
      `;

      container.innerHTML += productHTML;
    });

    addEventListeners();
  }

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter((product) =>
      product.produto.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
  });

  function addEventListeners() {
    document.addEventListener("change", function (event) {
      if (event.target.type === "radio") {
        const varianteId = event.target.value;
        const productId = event.target.name.split("-")[1];

        const editarLink = document.getElementById(`editar-${productId}`);
        if (editarLink) {
          let urlParams = new URLSearchParams(editarLink.href.split("?")[1]);
          let productName = decodeURIComponent(urlParams.get("productName") || "");
          editarLink.href = `editarVariantes.html?varianteId=${varianteId}&productName=${encodeURIComponent(productName)}`;
        }
      }
    });

    document.querySelectorAll(".remove-variante-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const body = document.querySelector("body");
        const divBackground = document.getElementById("background");
        const buttonSim = document.getElementById("buttonSim");
        const buttonNao = document.getElementById("buttonNao");
        const productId = this.getAttribute("data-product-id");
        const selectedVariante = document.querySelector(`input[name="radio-${productId}"]:checked`);

        if (!selectedVariante) {
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
                Alerta - Selecione uma variante.
              </p>
            </div>
          `
          setTimeout(() => {
            alertaSucesso.innerHTML = '';
            alertaSucesso.classList.add('hidden');
          }, 4000);
          return;
        }

        divBackground.classList.remove("hidden");
        divBackground.classList.add("flex");
        body.classList.add("overflow-hidden");

        const varianteId = selectedVariante.value;

        const confirmar = (e) => {
          e.preventDefault();

          fetch(`https://back.soracoescariri.com.br/api/user/deleteVariantes/${varianteId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                alertaSucesso.classList.remove("hidden");
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
                    <p class="text-xs font-semibold">Erro - Erro ao remover variante.</p>
                  </div>
                `
                setTimeout(() => {
                  alertaSucesso.classList.add("hidden");
                }, 4000);
                throw new Error("Erro ao remover variante");
              }
              return response.json();
            })
            .then(() => {
              selectedVariante.closest(".flex").remove();
              fecharModal();
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
                alertaSucesso.classList.add("hidden");
              }, 7000);
            })
            .catch((error) => {
              alertaSucesso.classList.remove("hidden");
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
                  <p class="text-xs font-semibold">Erro - Erro Interno do servidor.</p>
                </div>
              `
              setTimeout(() => {
                alertaSucesso.classList.add("hidden");
              }, 4000);
              console.error("Erro ao remover variante:", error);
            });
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
    });
  }
});
