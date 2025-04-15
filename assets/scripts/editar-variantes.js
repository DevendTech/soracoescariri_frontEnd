document.addEventListener("DOMContentLoaded", function () {
  const formAdicionarVariantes = document.getElementById('form-adicionar-variantes');
  const inputDesconto = document.querySelector('#input-desconto');
  const select = document.querySelectorAll('input[name="desconto-radio"]');
  const container = document.getElementById('container')
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const variantId = urlParams.get("varianteId");
  const productname = urlParams.get("productName");

  container.innerHTML = "";

  const productHTML = `
    <label class="block text-gray-700">Produto</label>
    <p class="mt-1 block w-full p-2 ">${productname}</p>
  `;
  container.innerHTML += productHTML;

  // Função para buscar os dados da variante
  function carregarDadosVariante() {
    if (!variantId) {
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
      .then(response => response.json())
      .then(data => {
        console.log("Dados da variante:", data);
        document.getElementById('variant-weight').value = data.weight || '';
        document.getElementById('variant-price').value = data.price || '';
        document.getElementById('input-desconto').value = data.discount || 0;

        if (data.discount > 0) {
          document.querySelector('input[value="SIM"]').checked = true;
          inputDesconto.disabled = false;
          inputDesconto.classList.remove('bg-gray-400');
        } else {
          document.querySelector('input[value="NAO"]').checked = true;
          inputDesconto.disabled = true;
          inputDesconto.classList.add('bg-gray-400');
        }
      })
      .catch(error => {
        console.error("Erro ao carregar variante:", error);
        alert("Erro ao carregar os dados da variante.");
      });
  }

  carregarDadosVariante();

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
        discount: discount
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Variante atualizada:", data);
        alert("Variante atualizada com sucesso!");
      })
      .catch(error => {
        console.error("Erro ao atualizar variante:", error);
        alert("Erro ao atualizar variante. Tente novamente.");
      });
  });
});
