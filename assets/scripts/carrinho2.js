
function confirmarPedido() {
  const endereco = {
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    bairro: document.getElementById("bairro").value,
    numero: document.getElementById("numero").value,
    telefone: document.getElementById("telefone").value,
    pagamento: document.getElementById("forma-pagamento").value
  };

  localStorage.setItem("endereco", JSON.stringify(endereco));
  window.location.href = "carrinho1.html";
}
