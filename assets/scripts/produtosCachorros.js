document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('product-container');
  const alertContainer = document.getElementById('alert-container');
  const inputSearch = document.querySelector('#search');
  let allProducts = [];
  console.log(1)

  function renderProducts(products) {
    container.innerHTML = '';

    products.forEach(product => {
      const imageUrl = product.produto.pathimage
        ? `https://back.soracoescariri.com.br${product.produto.pathimage}`
        : 'default.jpg';
      const variantes = product.variantes || [];

      let minPrice = variantes.length > 0
        ? Math.min(...variantes.map(v => parseFloat(v.price)))
        : 0;

      const productHTML = `
          <div class=" w-44 md:w-64 bg-white rounded-xl shadow-lg p-5  ">
            <div class="flex justify-center items-center">
              <img class="flex w-40 h-44 md:w-48 md:h-48 rounded-lg" src="${imageUrl}" alt="${product.produto.name || 'Produto'}" >
            </div>
            <div class="mt-3">
              <h2 class="text-gray-700 font-medium text-xs">${product.produto.name || 'Nome do Produto'}</h2>
              <p class="text-red-500 text-xs line-through price-old-display">R$ 0,00</p>
              <div class="flex"> 
              <p class="text-xl font-bold text-gray-900 price-display">R$ ${minPrice.toFixed(2)}</p>
              </div>
              <div class="flex gap-2 mt-2">
                <select class="variant-select px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                  ${variantes.length > 0
          ? variantes.map(v => `<option value='${JSON.stringify(v)}'>${v.weight}</option>`).join('')
          : '<option value=\'{"weight": "Padrão", "price": "0"}\'>Padrão</option>'}
                </select>
              </div>
              <button class="add-to-cart w-full cursor-pointer mt-3 py-1.5 bg-[#48887A] text-white text-sm font-bold rounded-md" data-product='${JSON.stringify(product)}'>COMPRAR</button>
            </div>
          </div>
        `;

      container.innerHTML += productHTML;
    });

    updateVariantSelectors();
    setupAddToCartButtons();
  }

  function updateVariantSelectors() {
    document.querySelectorAll('.variant-select').forEach(select => {
      const priceElement = select.closest('.w-44').querySelector('.price-display');
      const priceOldDisplay = select.closest('.w-44').querySelector('.price-old-display');

      function updatePrice(variant) {
        if (Number(variant.discount) > 0) {
          const discountValue = variant.price * (1 - Number(variant.discount) / 100);
          const discountIcon = document.createElement('img')
          discountIcon.src = '/assets/icons/descontoverde.png'
          discountIcon.classList.add('this')
          priceElement.textContent = `R$ ${discountValue.toFixed(2)}`;
          priceElement.after(discountIcon)
          if (priceOldDisplay) priceOldDisplay.textContent = `R$ ${variant.price}`;
        } else {
          priceElement.textContent = `R$ ${variant.price}`;
          const selected = select.closest('.w-44')

          const discountRemove = selected.querySelector('.mt-3').querySelector('.flex').querySelector('.this')
          if (discountRemove) discountRemove.remove()

          if (priceOldDisplay) priceOldDisplay.textContent = '';
        }
      }

      updatePrice(JSON.parse(select.value));

      select.addEventListener('change', function () {
        updatePrice(JSON.parse(this.value));
      });
    });
  }

  function setupAddToCartButtons() {
    document.querySelectorAll(".w-44").forEach(card => {
      const button = card.querySelector(".add-to-cart");
      const select = card.querySelector(".variant-select");

      button.addEventListener("click", function () {
        // atualiza o carrinho
        let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
        const product = JSON.parse(button.dataset.product);
        const variant = select ? JSON.parse(select.value) : { weight: "Padrão", price: "0" };
        const newItem = {
          produto: product.produto.name,
          preco: variant.price,
          quantidade: 1,
          peso: variant.weight,
          imagem: product.produto.pathimage
            ? `https://back.soracoescariri.com.br${product.produto.pathimage}`
            : 'default.jpg',
        };
        const existing = cart.find((p, i) => p.produto === newItem.produto && p.peso === newItem.peso);
        if (existing) existing.quantidade += 1;
        else cart.push(newItem);
        localStorage.setItem("carrinho", JSON.stringify(cart));

        // exibe todo o carrinho
        showPopup();
        showSuccessAlert();
      });
    });
  }
  // Função para exibir alerta
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
  function showPopup() {
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
          showPopup();
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
          showPopup();
        });
      });

      // Evento para o botão de finalizar compra (opcional)
      document.getElementById('checkoutBtn')?.addEventListener('click', () => {
        alert('Redirecionando para o checkout...');
        // Aqui você pode adicionar a lógica de redirecionamento
      });
    }

    popup.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
  }

  function searchProducts() {
    const query = inputSearch.value.trim().toLowerCase();
    const filteredProducts = query === ""
      ? allProducts
      : allProducts.filter(product =>
        product.produto.name.toLowerCase().includes(query)
      );

    renderProducts(filteredProducts);
  }

  fetch('https://back.soracoescariri.com.br/api/user/products/Cão')
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch(error => console.error('Erro ao buscar dados:', error));

  if (inputSearch) {
    inputSearch.addEventListener('input', searchProducts);
  }
});

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
// Função para alternar a visibilidade do filtro
function toggleFilterSidebar() {
  const sidebar = document.getElementById('filter-sidebar');
  const overlay = document.getElementById('filter-overlay');
  const button = document.getElementById('filter-toggle');

  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');

  if (sidebar.classList.contains('-translate-x-full')) {
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" y1="21" x2="4" y2="14"></line>
        <line x1="4" y1="10" x2="4" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="3"></line>
        <line x1="20" y1="21" x2="20" y2="16"></line>
        <line x1="20" y1="12" x2="20" y2="3"></line>
        <line x1="1" y1="14" x2="7" y2="14"></line>
        <line x1="9" y1="8" x2="15" y2="8"></line>
        <line x1="17" y1="16" x2="23" y2="16"></line>
      </svg>
      Filtrar
    `;
  } else {
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      Fechar
    `;
  }
}
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

// Função para fechar popup
function closePopup() {
  document.getElementById('popup').classList.add('translate-x-full');
  document.getElementById('popup-overlay').classList.add('hidden');
}

// Adicionar evento ao botão de filtro
document.getElementById('filter-toggle').addEventListener('click', toggleFilterSidebar);
