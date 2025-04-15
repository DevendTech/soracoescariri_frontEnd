document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);
    const formEditarProduct = document.getElementById('produtoForm')
    const productId = urlParams.get('produtoId');
    const nome = document.getElementById('name-product');
    const descricao = document.getElementById('descricao-product');
    const categoriaProduto = document.getElementById('categoria-product');
    const categoriaAnimal = document.getElementById('categoria-product-animal');

    function carregarProdutos() {
        if (!productId) {
            console.error("ID do produto não encontrado na URL.");
            return;
        }

        fetch(`https://back.soracoescariri.com.br/api/getProduct/${productId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Produto não encontrado.");
            return response.json();
        })
        .then(data => {
            console.log("Dados do produto:", data);

            if (nome) nome.value = data.name || '';
            if (descricao) descricao.value = data.description || '';
            if (categoriaProduto) categoriaProduto.value = data.product_category || '';
            if (categoriaAnimal) categoriaAnimal.value = data.animal_category || '';
        })
        .catch(error => {
            console.error("Erro ao carregar produto:", error);
            alert("Erro ao carregar os dados do produto.");
        });
    }

    carregarProdutos();

    formEditarProduct.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('name-product').value;
        const descricao = document.getElementById('descricao-product').value;
        const categoriaProduto = document.getElementById('categoria-product').value;
        const categoriaAnimal = document.getElementById('categoria-product-animal').value;

        fetch(`https://back.soracoescariri.com.br/api/updateProduct/${productId}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nome,
                description: descricao,
                product_category: categoriaProduto,
                animal_category: categoriaAnimal,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Variante atualizada:", data);
            alert("Variante atualizada com sucesso!");
            setTimeout(() => {
                window.location.href= "/pages/propietario/produtosCadastrados.html"; // Redireciona após 2 segundos
            }, 1000);
        })
        .catch(error => {
            console.error("Erro ao atualizar variante:", error);
            alert("Erro ao atualizar variante. Tente novamente.");
        });
    });
});
