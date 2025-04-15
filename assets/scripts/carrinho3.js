function carregarDados() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const endereco = JSON.parse(localStorage.getItem("endereco")) || {};

  let mensagem = `*✅ Pedido Confirmado!*\n\n`;

  carrinho.forEach(item => {
    mensagem += `🍔 *${item.produto}* - ${item.quantidade}x - R$ ${item.preco}\n`;
  });

  mensagem += `\n📍 *Endereço de Entrega:*\n`;
  mensagem += `🏠 CEP: ${endereco.cep}\n🏡 Rua: ${endereco.rua}, Nº ${endereco.numero}\n📌 Bairro: ${endereco.bairro}\n📞 Telefone: ${endereco.telefone}\n`;

  // Adiciona a forma de pagamento
  mensagem += `\n💰 *Forma de Pagamento:* ${endereco.pagamento === 'cartao' ? '💳 Cartão de Crédito' : endereco.pagamento === 'pix' ? '⚡ Pix' : '💵 Dinheiro'}\n`;

  document.getElementById("resumo-pedido").textContent = mensagem;
  return encodeURIComponent(mensagem);
}

function enviarParaWhatsApp() {
  const numero = "5588999999979";
  const mensagem = carregarDados();
  const whatsappURL = `https://wa.me/${numero}?text=${mensagem}`;
  window.open(whatsappURL, '_blank');
}

document.addEventListener("DOMContentLoaded", carregarDados);

