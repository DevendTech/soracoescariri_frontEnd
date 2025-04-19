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
          <div class="w-44 md:w-60 bg-white rounded-xl shadow-lg p-3">
            <div class="relative">
              <img class="flex w-48 h-48 md:w-32 md:h-32 rounded-lg" src="${imageUrl}" alt="${product.produto.name || 'Produto'}" >
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
              <button class="add-to-cart w-full mt-3 py-1.5 bg-[#48887A] text-white text-sm font-bold rounded-md" data-product='${JSON.stringify(product)}'>COMPRAR</button>
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
        const product = JSON.parse(button.getAttribute("data-product"));
        const variant = select ? JSON.parse(select.value) : { weight: "Padrão", price: "0" };

        // Mostrar no popup
        showPopup(product, variant);

        // Adicionar ao carrinho (mantido o mesmo código)
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

<<<<<<< HEAD
  // Função do popup
  function showPopup(product, variant) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    const overlay = document.getElementById('popup-overlay');

    const imageUrl = product.produto.pathimage
      ? `https://back.soracoescariri.com.br${product.produto.pathimage}`
      : 'default.jpg';
=======
        button.addEventListener("click", function () {
          const product = JSON.parse(button.getAttribute("data-product"));
          const variant = select ? JSON.parse(select.value) : { weight: "Padrão", price: "0" };
          let price = 0

          if(Number(variant.discount) > 0) {
            price = variant.price * (1 - Number(variant.discount) / 100);
          }else {
            price = variant.price
          }


          let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
          const newItem = {
            produto: product.produto.name,
            preco: price,
            quantidade: 1,
            peso: variant.weight,
            imagem: product.produto.pathimage ? `https://back.soracoescariri.com.br${product.produto.pathimage}` : 'default.jpg',
          };
>>>>>>> Matheus

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

    document.getElementById('closePopup').addEventListener('click', () => {
      popup.classList.add("translate-x-full");
      overlay.classList.add("hidden");
    });

    overlay.addEventListener('click', () => {
      popup.classList.add("translate-x-full");
      overlay.classList.add("hidden");
    });
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
