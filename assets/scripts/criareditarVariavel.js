document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const searchInput = document.getElementById("searchInput");
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
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch((error) => console.error("Erro ao buscar os produtos:", error));

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
        const productId = this.getAttribute("data-product-id");
        const selectedVariante = document.querySelector(`input[name="radio-${productId}"]:checked`);

        if (!selectedVariante) {
          alert("Por favor, selecione uma variante para remover.");
          return;
        }

        const varianteId = selectedVariante.value;
        const confirmacao = confirm("Tem certeza que deseja remover esta variante?");
        if (!confirmacao) return;

        fetch(`https://back.soracoescariri.com.br/api/user/deleteVariantes/${varianteId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erro ao remover variante");
            }
            return response.json();
          })
          .then(() => {
            selectedVariante.closest(".flex").remove();
          })
          .catch((error) => console.error("Erro ao remover variante:", error));
      });
    });
  }
});
