document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const container = document.getElementById("product-container");
  const searchInput = document.getElementById("searchInput");
  let allProducts = [];

  // Requisição para buscar produtos
  fetch("http://localhost:3333/api/getProducts", {
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
            <a class="bg-red-600 text-white p-2 rounded hover:bg-red-700 remove">Remover</a>
          </div>
        </div>
      `;

      // Adiciona evento de clique ao botão "Remover"
      const removeButton = productElement.querySelector('.remove');
      removeButton.addEventListener('click', () => excludeProduct(id));

      container.appendChild(productElement);
    });
  }

  // Função para excluir o produto
  async function excludeProduct(id) {
    try {
      const response = await fetch(`http://localhost:3333/api/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        // Atualiza lista após exclusão
        allProducts = allProducts.filter((p) => p.produto.id != id);
        renderProducts(allProducts);
      } else {
        console.error(`Erro ao excluir produto: ${response.status}`);
      }
    } catch (error) {
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
