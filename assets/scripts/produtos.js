document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('product-container');
  const alertContainer = document.getElementById('alert-container');
  const inputSearch = document.querySelector('#search');
  let allProducts = [];
  
  // Elementos de filtro
  const filterCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][name="produtos"], ' +
    'input[type="checkbox"][name="animal"], ' +
    'input[type="checkbox"][name="idade"], ' +
    'input[type="checkbox"][name="price"]'
  );

  // Limpar filtros
  document.getElementById('clear-filters')?.addEventListener('click', () => {
    filterCheckboxes.forEach(cb => cb.checked = false);
    filterProducts();
  });

  // Verifica checkboxes marcados inicialmente
  function getActiveFilters() {
    return {
      produtos: Array.from(document.querySelectorAll('input[name="produtos"]:checked')).map(c => c.value),
      animal: Array.from(document.querySelectorAll('input[name="animal"]:checked')).map(c => c.value),
      idade: Array.from(document.querySelectorAll('input[name="idade"]:checked')).map(c => c.value),
      price: Array.from(document.querySelectorAll('input[name="price"]:checked')).map(c => c.value)
    };
  }

  // Inicializa com filtros ativos
  window.onload = function() {
    if(localStorage.getItem('checkboxCao') === 'true') {
      document.getElementById('cao').checked = true;
      localStorage.removeItem('checkboxCao')
    } else if(localStorage.getItem('checkboxRacaoCaoAdulto') === 'true'){
      document.getElementById('cao').checked = true;
      document.getElementById('racao').checked = true;
      document.getElementById('adulto').checked = true;
      localStorage.removeItem('checkboxRacaoCaoAdulto')
    } else if(localStorage.getItem('checkboxRacaoCaoFilhote') === 'true'){
      document.getElementById('cao').checked = true;
      document.getElementById('racao').checked = true;
      document.getElementById('filhote').checked = true;
      localStorage.removeItem('checkboxRacaoCaoFilhote')
    } else if(localStorage.getItem('checkboxMedicamentoCao') === 'true'){
      document.getElementById('cao').checked = true;
      document.getElementById('medicamentos').checked = true;
      localStorage.removeItem('checkboxMedicamentoCao')
    } else if(localStorage.getItem('checkboxGato') === 'true'){
      document.getElementById('gato').checked = true;
      localStorage.removeItem('checkboxGato')
    }  else if(localStorage.getItem('checkboxRacaoGato') === 'true'){
      document.getElementById('gato').checked = true;
      document.getElementById('racao').checked = true;
      localStorage.removeItem('checkboxRacaoGato')
    } else if(localStorage.getItem('checkboxAreiaGato') === 'true'){
      document.getElementById('gato').checked = true;
      // document.getElementById('areia').checked = true;
      localStorage.removeItem('checkboxAreiaGato')
    } else if(localStorage.getItem('checkboxMedicamentoGato') === 'true'){
      document.getElementById('gato').checked = true;
      document.getElementById('medicamentos').checked = true;
      localStorage.removeItem('checkboxMedicamentoGato')
    } else if(localStorage.getItem('checkboxEAPP') === 'true') {
      document.getElementById('equinos').checked = true;
      document.getElementById('aves').checked = true;
      document.getElementById('peixes').checked = true;
      document.getElementById('porcos').checked = true;
      localStorage.removeItem('checkboxEAPP')
    } else if(localStorage.getItem('checkboxRacaoEquinioEporco') === 'true') {
      document.getElementById('equinos').checked = true;
      document.getElementById('porcos').checked = true;
      document.getElementById('racao').checked = true;
      localStorage.removeItem('checkboxRacaoEquinioEporco');
    } else if(localStorage.getItem('checkboxRacaoAves') === 'true') {
      document.getElementById('aves').checked = true;
      document.getElementById('racao').checked = true;
      localStorage.removeItem('checkboxRacaoAves');
    } else if(localStorage.getItem('checkboxRacaoPeixes') === 'true') {
      document.getElementById('peixes').checked = true;
      document.getElementById('racao').checked = true;
      localStorage.removeItem('checkboxRacaoPeixes')
    } else if(localStorage.getItem('checkboxMedicamentos') === 'true'){
      document.getElementById('medicamentos').checked = true;
      localStorage.removeItem('checkboxMedicamentos')
    } else if(localStorage.getItem('checkboxAcessorios') === 'true'){
      document.getElementById('petshop').checked = true;
      localStorage.removeItem('checkboxAcessorios')
    }   
    
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
    });
  }

  // Renderiza produtos com atributos de filtro
  function renderProducts(products) {
    container.innerHTML = '';

    products.forEach(product => {
      const category = getProductCategory(product.produto.name);
      const animal = product.category || 'Cao';
      const price = product.variantes?.length > 0 
        ? Math.min(...product.variantes.map(v => parseFloat(v.price))) 
        : 0;
      const age = product.produto.name.toLowerCase().includes('filhote') ? 'filhote' : 'adulto';
      
      const imageUrl = product.produto.pathimage
        ? `https://back.soracoescariri.com.br${product.produto.pathimage}`
        : 'default.jpg';
      const variantes = product.variantes || [];

      const productHTML = `
        <div class="product-item w-44 md:w-60 bg-white rounded-xl shadow-lg p-3"
          data-category="${category}"
          data-animal="${animal}"
          data-age="${age}"
          data-price="${price}">
          <div class="relative">
            <img class="flex w-48 h-48 md:w-32 md:h-32 rounded-lg" src="${imageUrl}" alt="${product.produto.name || 'Produto'}">
          </div>
          <div class="mt-3">
            <h2 class="text-gray-700 font-medium text-xs">${product.produto.name || 'Nome do Produto'}</h2>
            <p class="text-red-500 text-xs line-through price-old-display">R$ 0,00</p>
            <div class="flex"> 
              <p class="text-xl font-bold text-gray-900 price-display">R$ ${price.toFixed(2)}</p>
            </div>
            <div class="flex gap-2 mt-2">
              <select class="variant-select px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                ${variantes.length > 0
                  ? variantes.map(v => `<option value='${JSON.stringify(v)}'>${v.weight}</option>`).join('')
                  : '<option value=\'{"weight": "Padrão", "price": "0"}\'>Padrão</option>'}
              </select>
            </div>
            <button class="add-to-cart w-full mt-3 py-1.5 bg-[#48887A] text-white text-sm font-bold rounded-md" data-product='${JSON.stringify(product)}'>COMPRAR</button>
          </div>
        </div>
      `;
      container.innerHTML += productHTML;
    });

    updateVariantSelectors();
    setupAddToCartButtons();
    filterProducts(); // Aplica filtros após renderizar
  }

  // Filtra produtos baseado nos checkboxes
  function filterProducts() {
    const activeFilters = getActiveFilters();
    const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);
  
    document.querySelectorAll('.product-item').forEach(item => {
      const matches = [
        activeFilters.produtos.length === 0 || activeFilters.produtos.includes(item.dataset.category),
        activeFilters.animal.length === 0 || activeFilters.animal.includes(item.dataset.animal),
        activeFilters.idade.length === 0 || activeFilters.idade.includes(item.dataset.age),
        activeFilters.price.length === 0 || checkPriceRange(parseFloat(item.dataset.price), activeFilters.price)
      ].every(Boolean);
  
      // Mostra o produto se: não houver filtros ativos OU se corresponder aos filtros
      item.style.display = (!hasActiveFilters || matches) ? 'block' : 'none';
    });
  }

  // Verifica faixa de preço
  function checkPriceRange(price, ranges) {
    return ranges.some(range => {
      if (range === '300+') return price >= 300;
      const [min, max] = range.split('-').map(Number);
      return price >= min && price <= max;
    });
  }

  // Determina categoria do produto
  function getProductCategory(productName) {
    const lowerName = productName.toLowerCase();
    if (/ração|ração|racao/i.test(lowerName)) return 'racao';
    if (/coleira|brinquedo|caminha|brinquedo/i.test(lowerName)) return 'acessorios';
    if (/remédio|medicamento|vermífugo|vermifugo/i.test(lowerName)) return 'medicamentos';
    return 'petshop';
  }

  // Atualiza preços quando variante muda
  function updateVariantSelectors() {
    document.querySelectorAll('.variant-select').forEach(select => {
      const priceElement = select.closest('.product-item').querySelector('.price-display');
      const priceOldDisplay = select.closest('.product-item').querySelector('.price-old-display');

      function updatePrice(variant) {
        if (Number(variant.discount) > 0) {
          const discountValue = variant.price * (1 - Number(variant.discount) / 100);
          const discountIcon = document.createElement('img');
          discountIcon.src = '/assets/icons/descontoverde.png';
          discountIcon.classList.add('this');
          priceElement.textContent = `R$ ${discountValue.toFixed(2)}`;
          priceElement.after(discountIcon);
          if (priceOldDisplay) priceOldDisplay.textContent = `R$ ${variant.price}`;
        } else {
          priceElement.textContent = `R$ ${variant.price}`;
          const selected = select.closest('.product-item');
          const discountRemove = selected.querySelector('.this');
          if (discountRemove) discountRemove.remove();
          if (priceOldDisplay) priceOldDisplay.textContent = '';
        }
      }

      updatePrice(JSON.parse(select.value));
      select.addEventListener('change', function() {
        updatePrice(JSON.parse(this.value));
      });
    });
  }

  // Configura botões de compra
  function setupAddToCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function() {
        const product = JSON.parse(button.getAttribute("data-product"));
        const select = button.closest('.product-item').querySelector('.variant-select');
        const variant = select ? JSON.parse(select.value) : { weight: "Padrão", price: "0" };

        showPopup(product, variant);
        
        let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
        const newItem = {
          produto: product.produto.name,
          preco: variant.price,
          quantidade: 1,
          peso: variant.weight,
          imagem: product.produto.pathimage ? `https://back.soracoescariri.com.br${product.produto.pathimage}` : 'default.jpg',
        };

        const existingItem = cart.find(p => p.produto === newItem.produto && p.peso === newItem.peso);
        if (existingItem) {
          existingItem.quantidade += 1;
        } else {
          cart.push(newItem);
        }

        localStorage.setItem("carrinho", JSON.stringify(cart));
        showSuccessAlert();
      });
    });
  }

  // Mostra alerta de sucesso
  function showSuccessAlert() {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="succsess-alert cursor-default flex items-center justify-between w-auto max-w-[400px] h-auto rounded-lg bg-[#232531] px-4 py-2 fixed top-1 z-10 left-1/2 transform -translate-x-1/2 shadow-lg">
        <div class="flex gap-2 items-center">
          <div class="text-[#2b9875] bg-white/5 backdrop-blur-xl p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <p class="text-white font-semibold">Produto adicionado ao carrinho!</p>
        </div>
        <button class="text-gray-400 hover:bg-white/10 p-2 rounded-md transition-colors ease-linear close-alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;
    alertContainer.querySelector('.close-alert').addEventListener('click', () => alertContainer.innerHTML = '');
    setTimeout(() => alertContainer.innerHTML = '', 3000);
  }

  // Mostra popup de detalhes
  function showPopup(product, variant) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    const overlay = document.getElementById('popup-overlay');

    const imageUrl = product.produto.pathimage
      ? `https://back.soracoescariri.com.br${product.produto.pathimage}`
      : 'default.jpg';

    popupContent.innerHTML = `
      <img src="${imageUrl}" alt="${product.produto.name}" class="w-full h-60 object-contain mb-4 rounded-lg">
      <h3 class="text-xl font-bold mb-2">${product.produto.name}</h3>
      <p class="text-gray-700 text-sm mb-1">Peso: ${variant.weight}</p>
      <p class="text-gray-800 text-lg font-semibold">Preço: R$ ${variant.price}</p>
      ${variant.discount && Number(variant.discount) > 0 ? `
        <p class="text-red-500 line-through text-sm">De: R$ ${parseFloat(variant.price).toFixed(2)}</p>
        <p class="text-green-600 text-md font-bold">Com desconto: R$ ${(variant.price * (1 - Number(variant.discount) / 100)).toFixed(2)}</p>
      ` : ''}
    `;

    popup.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
  }

  // Busca produtos
  function searchProducts() {
    const query = inputSearch.value.trim().toLowerCase();
    const filteredProducts = query === ""
      ? allProducts
      : allProducts.filter(product =>
          product.produto.name.toLowerCase().includes(query)
      );

    renderProducts(filteredProducts);
  }

  // Carrega produtos da API
  const categories = ['Cao','Gato','Equinos', 'Aves', 'Peixes', 'Porcos'];
  Promise.all(categories.map(category => 
    fetch(`https://back.soracoescariri.com.br/api/user/products/${category}`)
      .then(response => response.json())
      .then(products => products.map(p => ({ ...p, category }))) // Adiciona categoria ao produto
      .catch(error => console.error(`Erro ao buscar dados da categoria ${category}:`, error))
  ))
  .then(results => {
    allProducts = results.flat();
    renderProducts(allProducts);
  })
  .catch(error => console.error('Erro ao buscar dados:', error));

  // Event listeners
  if (inputSearch) {
    let searchTimeout;
    inputSearch.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(searchProducts, 300);
    });
  }
});

// Funções globais para o popup
function openPopup(contentHtml) {
  document.getElementById("popup").classList.remove("translate-x-full");
  document.getElementById("popup-overlay").classList.remove("hidden");
  if (contentHtml) {
    document.getElementById("popup-content").innerHTML = contentHtml;
  }
}

function closePopup() {
  document.getElementById("popup").classList.add("translate-x-full");
  document.getElementById("popup-overlay").classList.add("hidden");
}