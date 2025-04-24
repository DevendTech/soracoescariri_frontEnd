document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#produtoForm");
  form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData();
      const nomeProduto = document.querySelector('[data-produto="nome"]');
      const descricaoProduto = document.querySelector('[data-produto="descricao"]');
      const categoriaProduto = document.querySelector('[data-produto="categoriaProduto"]');
      const categoriaAnimal = document.querySelector('[data-produto="categoriaAnimal"]');
      const imagemProduto = document.querySelector('[data-produto="imagem"]');
      const alertaSucesso = document.getElementById("alertaSucesso");
      
      if (nomeProduto && descricaoProduto && categoriaProduto && categoriaAnimal && imagemProduto.files.length > 0) {
          formData.append("productImage", imagemProduto.files[0]);
          formData.append("name", nomeProduto.value);
          formData.append("description", descricaoProduto.value);
          formData.append("product_category", categoriaProduto.value);
          formData.append("animal_category", categoriaAnimal.value);
          
          fetch("https://back.soracoescariri.com.br/api/createProduct", {
              method: "POST",
              body: formData
          }).then((response) => {
              if (response.status === 201) {
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
                      document.getElementById("alertaSucesso").classList.add("hidden");
                  }, 4000);
                  form.reset();
              } else {
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
                        <p class="text-xs font-semibold">Erro - Erro ao criar o produto.</p>
                    </div>
                `
                setTimeout(() => {
                    document.getElementById("alertaSucesso").classList.add("hidden");
                }, 4000);
              }
          }).catch(err => console.error(err));
      }
  });
});
