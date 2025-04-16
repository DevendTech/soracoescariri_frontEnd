function carregarCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

// function renderizarCarrinho() {
//   const carrinho = carregarCarrinho();
//   const cartItemsContainer = document.getElementById("cart-items");
//   const totalCompraSpan = document.getElementById("total-compra");

//   cartItemsContainer.innerHTML = "";
//   let totalCompra = 0;

//   if (carrinho.length === 0) {
//     cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center text-gray-500">Seu carrinho está vazio</td></tr>`;
//     totalCompraSpan.textContent = "R$ 0,00";
//     return;
//   }

//   carrinho.forEach((item, index) => {
//     const total = item.preco * item.quantidade;
//     totalCompra += total;
//     console.log(item)

//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//   <td class="py-2 flex items-center gap-2">
//     <img src="${item.imagem}" alt="${item.produto}" class="w-12 h-12 object-cover rounded-md">
//     ${item.produto} (${item.peso})
//   </td>
//   <td class="text-center">
//     <button onclick="alterarQuantidade(${index}, -1)" class="px-2 bg-gray-300 rounded">➖</button>
//     ${item.quantidade}
//     <button onclick="alterarQuantidade(${index}, 1)" class="px-2 bg-gray-300 rounded">➕</button>
//   </td>
//   <span class="text-right">R$ ${item.preco}</span>
//   <td class="text-right">R$ ${total.toFixed(2)}</td>
//   <td class="text-center">
//     <button onclick="removerItem(${index})" class="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
//   </td>
// `;
//     cartItemsContainer.appendChild(tr);
//   });

//   totalCompraSpan.textContent = `R$ ${totalCompra.toFixed(2)}`;
// }

function renderizarCarrinho() {
  const carrinho = carregarCarrinho() || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const totalCompraSpan = document.querySelector(".mt-6.flex.justify-between span:last-child");

  cartItemsContainer.innerHTML = "";
  let totalCompra = 0;

  if (carrinho.length === 0) {
    cartItemsContainer.innerHTML = `<div class="text-center text-gray-500">Seu carrinho está vazio</div>`;
    totalCompraSpan.textContent = "R$ 0,00";
    return;
  }

  carrinho.forEach((item, index) => {
    const total = item.preco * item.quantidade;
    totalCompra += total; // Soma o total corretamente

    const div = document.createElement("div");
    div.classList.add(
      "flex", "items-center", "justify-between", "border-b", "pb-4", 
      "gap-4", "flex-wrap", "md:flex-nowrap"
    );

    div.innerHTML = `
      <div class="flex items-center gap-4 flex-1 min-w-[150px]">
        <img src="${item.imagem}" alt="${item.produto}" class="w-14 h-14 md:w-16 md:h-16 object-cover rounded-md">
        <span class="text-gray-700 font-normal text-sm md:text-base">${item.produto} (${item.peso})</span>
      </div>

      <div class="flex flex-col items-center gap-2 min-w-[80px]">
        <span class="text-xs md:text-sm font-semibold text-gray-600">Quant.</span>
        <div class="flex items-center gap-1">
          <button onclick="alterarQuantidade(${index}, -1)" class="bg-gray-200 w-7 h-7 md:w-9 md:h-9 rounded-l-2xl hover:bg-gray-300 transition" ${item.quantidade === 1 ? "disabled" : ""}>-</button>
          <span class="w-7 h-7 md:w-9 md:h-9 text-center py-1 border  bg-gray-300 text-sm md:text-base">${item.quantidade}</span>
          <button onclick="alterarQuantidade(${index}, 1)" class="bg-gray-200 w-7 h-7 md:w-9 md:h-9 rounded-e-2xl hover:bg-gray-300 transition">+</button>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 min-w-[80px]">
        <span class="text-xs md:text-sm font-semibold text-gray-600">Preço</span>
        <span class="text-gray-700 font-semibold text-sm md:text-base">R$ ${total.toFixed(2)}</span>
      </div>

      <button onclick="removerItem(${index})" class="text-red-500 text-lg hover:text-red-700 transition"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
<g fill="#6baf89" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M28,6c-2.209,0 -4,1.791 -4,4v2h-0.40039l-13.59961,2v3h44v-3l-13.59961,-2h-0.40039v-2c0,-2.209 -1.791,-4 -4,-4zM28,10h8v2h-8zM12,19l2.70117,33.32227c0.168,2.077 1.90428,3.67773 3.98828,3.67773h26.62305c2.084,0 3.81733,-1.59878 3.98633,-3.67578l2.625,-32.32422zM20,26c1.105,0 2,0.895 2,2v23h-3l-1,-23c0,-1.105 0.895,-2 2,-2zM32,26c1.657,0 3,1.343 3,3v22h-6v-22c0,-1.657 1.343,-3 3,-3zM44,26c1.105,0 2,0.895 2,2l-1,23h-3v-23c0,-1.105 0.895,-2 2,-2z"></path></g></g>
</svg></button>
    `;

    cartItemsContainer.appendChild(div);
  });

  totalCompraSpan.textContent = `R$ ${totalCompra.toFixed(2)}`;
}

function carregarCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function alterarQuantidade(index, delta) {
  let carrinho = carregarCarrinho();
  carrinho[index].quantidade += delta;

  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }

  salvarCarrinho(carrinho);
  renderizarCarrinho();
}

function removerItem(index) {
  let carrinho = carregarCarrinho();
  carrinho.splice(index, 1);
  salvarCarrinho(carrinho);
  renderizarCarrinho();
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");
  renderizarCarrinho();
}

// Renderiza o carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarCarrinho);


function alterarQuantidade(index, change) {
  let carrinho = carregarCarrinho();

  if (carrinho[index].quantidade + change > 0) {
    carrinho[index].quantidade += change;
  } else {
    carrinho.splice(index, 1);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

function removerItem(index) {
  let carrinho = carregarCarrinho();
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");
  renderizarCarrinho();
}

function irParaEntrega() {
  window.location.href = "carrinho2.html";
}

document.addEventListener("DOMContentLoaded", renderizarCarrinho);