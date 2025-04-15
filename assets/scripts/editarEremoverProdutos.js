document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const container = document.getElementById("product-container");
  const searchInput = document.getElementById("searchInput"); // certifique-se de que existe um input com esse ID
  let allProducts = []; // vai armazenar todos os produtos retornados

  // Faz a requisição para buscar os produtos
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

      allProducts = data; // salva os produtos para filtro posterior
      renderProducts(allProducts); // renderiza inicialmente todos os produtos
    })
    .catch((error) => console.error("Erro ao buscar os produtos:", error));

  // Função para renderizar produtos no DOM
  function renderProducts(products) {
    container.innerHTML = "";

    products.forEach((product) => {
      const id = product.produto.id;
      const name = product.produto.name;

      const productHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md border-b py-4 mb-5">
          <div class="flex justify-between flex-col gap-3 items-center md:flex-row">
            <div>
              <h4 class="font-semibold">${name}</h4>
            </div>
            <div class="flex gap-2 ">
              <a href="/pages/propietario/editarproduto.html?produtoId=${id}" class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Editar</a>
              <a class="bg-red-600 text-white p-2 rounded hover:bg-red-700">Remover</a>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productHTML;
    });
  }

  // Adiciona evento de busca ao campo de input
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
