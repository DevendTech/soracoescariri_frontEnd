document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('product-container');
  const alertContainer = document.getElementById('alert-container');
  const inputSearch = document.querySelector('#search');
  let allProducts = [];

  // Elementos de filtro
  const filterCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][name="categoria"], ' +
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
      categoria: Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(c => c.value),
      produtos: Array.from(document.querySelectorAll('input[name="produtos"]:checked')).map(c => c.value),
      animal: Array.from(document.querySelectorAll('input[name="animal"]:checked')).map(c => c.value),
      idade: Array.from(document.querySelectorAll('input[name="idade"]:checked')).map(c => c.value),
      price: Array.from(document.querySelectorAll('input[name="price"]:checked')).map(c => c.value)
    };
  }

  // Inicializa com filtros ativos
  window.onload = function () {
    if (localStorage.getItem('checkboxCao') === 'true') {
      document.getElementById('cao').checked = true;
      localStorage.removeItem('checkboxCao')
    } else if (localStorage.getItem('checkboxRacaoCaoAdulto') === 'true') {
      document.getElementById('cao').checked = true;
      document.getElementById('racao').checked = true;
      document.getElementById('adulto').checked = true;
      localStorage.removeItem('checkboxRacaoCaoAdulto')
    } else if (localStorage.getItem('checkboxRacaoCaoFilhote') === 'true') {
      document.getElementById('cao').checked = true;
      document.getElementById('racao').checked = true;
      document.getElementById('filhote').checked = true;
      localStorage.removeItem('checkboxRacaoCaoFilhote')
    } else if (localStorage.getItem('checkboxMedicamentoCao') === 'true') {
      document.getElementById('cao').checked = true;
      document.getElementById('medicamentos').checked = true;
      localStorage.removeItem('checkboxMedicamentoCao')
    } else if (localStorage.getItem('checkboxGato') === 'true') {
      document.getElementById('gato').checked = true;
      localStorage.removeItem('checkboxGato')
    } else if (localStorage.getItem('checkboxRacaoGato') === 'true') {
      document.getElementById('gato').checked = true;
      document.getElementById('racao').checked = true;
      localStorage.removeItem('checkboxRacaoGato')
    } else if (localStorage.getItem('checkboxAreiaGato') === 'true') {
      document.getElementById('gato').checked = true;
      document.getElementById('areia').checked = true;
      localStorage.removeItem('checkboxAreiaGato')
    } else if (localStorage.getItem('checkboxMedicamentoGato') === 'true') {
      document.getElementById('gato').checked = true;
      document.getElementById('medicamentos').checked = true;
      localStorage.removeItem('checkboxMedicamentoGato')
    } else if (localStorage.getItem('checkboxEAPP') === 'true') {
      document.getElementById('equinos').checked = true;
      document.getElementById('aves').checked = true;
      document.getElementById('peixes').checked = true;
      document.getElementById('porcos').checked = true;
      localStorage.removeItem('checkboxEAPP')
    } else if (localStorage.getItem('checkboxRacaoEquinioEporco') === 'true') {
      document.getElementById('equinos').checked = true;
      document.getElementById('porcos').checked = true;
      document.getElementById('racao').checked = true;
      localStorage.removeItem('checkboxRacaoEquinioEporco');
    } else if (localStorage.getItem('checkboxRacaoAves') === 'true') {
      document.getElementById('aves').checked = true;
      document.getElementById('racao').checked = true;
      localStorage.removeItem('checkboxRacaoAves');
    } else if (localStorage.getItem('checkboxRacaoPeixes') === 'true') {
      document.getElementById('peixes').checked = true;
      document.getElementById('racao').checked = true;
      localStorage.removeItem('checkboxRacaoPeixes')
    } else if (localStorage.getItem('checkboxMedicamentos') === 'true') {
      document.getElementById('medicamentos').checked = true;
      localStorage.removeItem('checkboxMedicamentos')
    } else if (localStorage.getItem('checkboxMedicamentoAdulto') === 'true') {
      document.getElementById('medicamentos').checked = true;
      document.getElementById('adulto').checked = true;
      localStorage.removeItem('checkboxMedicamentoAdulto');
    } else if (localStorage.getItem('checkboxMedicamentoFilhote') === 'true') {
      document.getElementById('medicamentos').checked = true;
      document.getElementById('filhote').checked = true;
      localStorage.removeItem('checkboxMedicamentoFilhote');
    } else if (localStorage.getItem('checkboxMedicamentoCastrado') === 'true') {
      document.getElementById('medicamentos').checked = true;
      // document.getElementById('gatocastrado').checked = true;
      localStorage.removeItem('checkboxMedicamentoCastrado');
    } else if (localStorage.getItem('checkboxAcessorios') === 'true') {
      document.getElementById('petshop').checked = true;
      localStorage.removeItem('checkboxAcessorios')
    } else if (localStorage.getItem('checkboxCama') === 'true') {
      document.getElementById('acessorios').checked = true;
      document.getElementById('cama').checked = true;
      localStorage.removeItem('checkboxCama')
    } else if (localStorage.getItem('checkboxSanitario') === 'true') {
      document.getElementById('acessorios').checked = true;
      document.getElementById('sanitario').checked = true;
      localStorage.removeItem('checkboxSanitario')
    } else if (localStorage.getItem('checkboxColeira') === 'true') {
      document.getElementById('acessorios').checked = true;
      document.getElementById('coleira').checked = true;
      localStorage.removeItem('checkboxColeira')
    }

    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
    });
    // Inicializa contador do carrinho
    updateCartCount();
  }

  // Atualiza contador do carrinho
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
      countElement.textContent = totalItems;
      countElement.classList.toggle('hidden', totalItems === 0);
    }
  }

  // Adiciona evento ao botão do carrinho
  document.getElementById('cart-button')?.addEventListener('click', function (e) {
    e.preventDefault();
    showCartPopup();
  });

  // Renderiza produtos com atributos de filtro
  function renderProducts(products) {
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    products.forEach(product => {
      console.log(product)
      const category = getProductCategory(product.produto.product_category);
      console.log(category)
      const produto = getProducts(product.produto.name);
      const animal = product.category;
      const price = product.variantes?.length > 0
        ? Math.min(...product.variantes.map(v => parseFloat(v.price)))
        : 0;
      const age = product.produto.name.toLowerCase().includes('filhote') ? 'filhote' : 'adulto';
      const imageUrl = product.produto.pathimage
        ? `https://back.soracoescariri.com.br${product.produto.pathimage}`
        : 'default.jpg';
      const variantes = product.variantes || [];

      const productElement = document.createElement('div');
      productElement.className = 'product-item w-44 md:w-60 bg-white rounded-xl shadow-lg p-3';
      productElement.dataset.category = category;
      productElement.dataset.produto = produto;
      productElement.dataset.animal = animal;
      productElement.dataset.age = age;
      productElement.dataset.price = price;

      productElement.innerHTML = `
       <div class="flex flex-col w-full h-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
        <div class="relative pt-[100%]">
             <img 
              class="absolute top-0 left-0 w-full h-full object-contain p-4" 
              src="${imageUrl}" 
              alt="${product.produto.name || 'Produto'}"
              onerror="this.src='placeholder-image-url.jpg'"
            >
        </div>
        <div class="p-1 flex flex-col flex-grow">
          <h2 class="text-sm font-medium text-gray-800 mb-1 line-clamp-2 min-h-[2.5rem]">${product.produto.name || 'Nome do Produto'}</h2>
          <p class="text-red-500 text-xs line-through price-old-display">R$ 0,00</p>
          <div class="flex"> 
            <p class="text-xl font-bold text-gray-900 price-display">R$ ${price.toFixed(2)}</p>
          </div>
          <div class=""w-20 mt-2 px-2 py-2 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#48887A]">
            <select class="variant-select px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
              ${variantes.length > 0
          ? variantes.map(v => `<option value='${JSON.stringify(v)}'>${v.weight}</option>`).join('')
          : '<option value=\'{"weight": "Padrão", "price": "0"}\'>Padrão</option>'}
            </select>
          </div>
          <button class="add-to-cart cursor-pointer w-full mt-3 py-1.5 bg-[#48887A] text-white text-sm font-bold rounded-md" data-product='${JSON.stringify(product)}'>COMPRAR</button>
        </div>
      </div>
      `;

      fragment.appendChild(productElement);
    });

    container.appendChild(fragment);

    updateVariantSelectors();
    setupAddToCartButtons();
    filterProducts();
  }

  // Filtra produtos baseado nos checkboxes
  function filterProducts() {
    const activeFilters = getActiveFilters();
    const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);

    document.querySelectorAll('.product-item').forEach(item => {
      const matches = [
        activeFilters.categoria.length === 0 || activeFilters.categoria.includes(item.dataset.category),
        activeFilters.produtos.length === 0 || activeFilters.produtos.includes(item.dataset.produto),
        activeFilters.animal.length === 0 || activeFilters.animal.includes(item.dataset.animal),
        activeFilters.idade.length === 0 || activeFilters.idade.includes(item.dataset.age),
        activeFilters.price.length === 0 || checkPriceRange(parseFloat(item.dataset.price), activeFilters.price)
      ].every(Boolean);


      item.style.display = (!hasActiveFilters || matches) ? 'block' : 'none';
    });
  }

  // Verifica faixa de preço
  function checkPriceRange(price, ranges) {
    if (!price) return false;
    return ranges.some(range => {
      if (range === '300+') return price >= 300;
      const [min, max] = range.split('-').map(Number);
      return price >= min && price <= max;
    });
  }

  // Função corrigida para determinar categoria do produto
  function getProductCategory(productCategory) {
    if (!productCategory) return 'outros';

    const lowerName = productCategory.toLowerCase();

    if (/ração|racao|ração/i.test(lowerName)) return 'racao';
    if (/areia|granulado|absorbente|argila|sanitária|sanitaria/i.test(lowerName)) return 'areia';
    if (/medicamento|medicamentos|vermífugo|vermifugo|antipulgas/i.test(lowerName)) return 'medicamentos';
    if (/acessório|acessorios|acessorio|coleira|brinquedo|comedouro|bebedouro/i.test(lowerName)) return 'acessorios';
    if (/petshop|pet shop|banho|tosa|higiene/i.test(lowerName)) return 'petshop';

    return 'outros';
  }

  // Identifica tipo de produto
  function getProducts(nameProduct) {
    if (!nameProduct) return 'outros';

    const lowerName = nameProduct.toLowerCase();
    if (/areia|granulado|absorvente|argila|sanitária|sanitaria/i.test(lowerName)) return 'areia';
    if (/cama|forração|forracao|forro|colchão|colchao/i.test(lowerName)) return 'cama';
    if (/Coleira/i.test(lowerName)) return 'coleira';

    return 'outros';
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
      select.addEventListener('change', function () {
        updatePrice(JSON.parse(this.value));
      });
    });
  }

  // Configura botões de compra com carrinho completo
  function setupAddToCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const product = JSON.parse(button.getAttribute("data-product"));
        const select = button.closest('.product-item').querySelector('.variant-select');
        const variant = select ? JSON.parse(select.value) : { weight: "Padrão", price: "0" };

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
        showCartPopup(); // Mostra o popup completo do carrinho
        updateCartCount();
      });
    });
  }

  // Mostra popup completo do carrinho
  function showCartPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    const popupContent = document.getElementById('popup-content');
    let cart = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Calcular o total
    const total = cart.reduce((sum, item) => {
      return sum + (parseFloat(item.preco) * item.quantidade);
    }, 0);

    if (cart.length === 0) {
      popupContent.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
      const itemsHtml = cart.map((item, index) => {
        return `
          <div class="cart-item flex items-center gap-4 mb-4" data-index="${index}">
            <img src="${item.imagem}" class="w-16 h-16 object-cover rounded" alt="${item.produto}">
            <div class="flex-1">
              <p class="font-semibold">${item.produto}</p>
              <p class="text-sm text-gray-600">Peso: ${item.peso}</p>
            </div>
            <div class="flex items-center gap-2">
              <button class="decrement px-2 py-1 bg-gray-200 rounded">–</button>
              <span class="quantity px-2">${item.quantidade}</span>
              <button class="increment px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
            <p class="w-20 text-right font-bold">R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
          </div>
        `;
      }).join('');

      popupContent.innerHTML = `
        <div class="w-full max-w-md bg-white rounded-xl p-4 shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-[#48887A]">MEU CARRINHO</h2>
            <button id="closePopup" class="text-gray-500 text-xl">&times;</button>
          </div>
          ${itemsHtml}
          <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <h2 class="text-lg font-bold text-[#48887A]">Total:</h2>
            <p class="text-xl font-bold">R$ ${total.toFixed(2)}</p>
          </div>
        </div>
      `;

      // Eventos de fechar
      document.getElementById('closePopup').onclick = closePopup;
      overlay.onclick = closePopup;

      // Eventos de incremento/decremento
      popupContent.querySelectorAll('.increment').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = +btn.closest('.cart-item').dataset.index;
          cart[idx].quantidade++;
          localStorage.setItem('carrinho', JSON.stringify(cart));
          updateCartCount();
          showCartPopup();
        });
      });

      popupContent.querySelectorAll('.decrement').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = +btn.closest('.cart-item').dataset.index;
          if (cart[idx].quantidade > 1) {
            cart[idx].quantidade--;
          } else {
            cart.splice(idx, 1);
          }
          localStorage.setItem('carrinho', JSON.stringify(cart));
          updateCartCount();
          showCartPopup();
        });
      });
    }

    popup.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
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
  const categories = ['Cao', 'Gato', 'Equinos', 'Aves', 'Peixes', 'Porcos'];
  Promise.all(categories.map(category =>
    fetch(`https://back.soracoescariri.com.br/api/user/products/${category}`)
      .then(response => response.json())
      .then(products => products.map(p => ({ ...p, category })))
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

// Função para alternar a visibilidade do filtro mobile
function toggleFilterSidebar() {
  const sidebar = document.getElementById('filter-sidebar-mobile');
  const overlay = document.getElementById('filter-overlay');

  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}
// Fechar ao clicar no overlay
document.getElementById('filter-overlay').addEventListener('click', toggleFilterSidebar);

// Fechar ao selecionar opção (mobile)
document.querySelectorAll('#filter-sidebar-mobile input[type="checkbox"]').forEach(item => {
  item.addEventListener('change', () => {
    if (window.innerWidth < 768) {
      toggleFilterSidebar();
    }
  });
});

// Limpar filtros mobile
document.getElementById('clear-filters-mobile').addEventListener('click', () => {
  document.querySelectorAll('#filter-sidebar-mobile input[type="checkbox"]').forEach(cb => cb.checked = false);
  filterProducts();
});
// Fechar filtro ao selecionar opção (mobile)
document.querySelectorAll('#category-filter-form input, #price-filter-form input').forEach(item => {
  item.addEventListener('change', () => {
    if (window.innerWidth < 768) {
      toggleFilterSidebar();
    }
  });
});
// Fechar ao clicar no overlay
document.getElementById('filter-overlay').addEventListener('click', toggleFilterSidebar);

// Adicionar evento ao botão de filtro
document.getElementById('filter-toggle').addEventListener('click', toggleFilterSidebar);