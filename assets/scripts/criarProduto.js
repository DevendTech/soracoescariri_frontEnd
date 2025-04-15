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
                  document.getElementById("alertaSucesso").classList.remove("hidden");
                  setTimeout(() => {
                      document.getElementById("alertaSucesso").classList.add("hidden");
                  }, 3000);
                  form.reset();
              }
          }).catch(err => console.error(err));
      }
  });
});

function fecharAlerta() {
  document.getElementById("alertaSucesso").classList.add("hidden");
}