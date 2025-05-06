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
const form = document.getElementById("checkout-form");
const continuarBtn = document.querySelector('a[onclick="confirmarPedido()"]');

const inputs = form.querySelectorAll("input, select");

function validarCampos() {
  let formValido = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("border-red-500");
      formValido = false;
    } else {
      input.classList.remove("border-red-500");
    }
  });

  continuarBtn.classList.toggle("pointer-events-none", !formValido);
  continuarBtn.classList.toggle("opacity-50", !formValido);
}

inputs.forEach((input) => {
  input.addEventListener("input", validarCampos);
});

// Inicialmente desabilita o botão
continuarBtn.classList.add("pointer-events-none", "opacity-50");
