document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);
    const formEditarProduct = document.getElementById('produtoForm')
    const productId = urlParams.get('produtoId');
    const nome = document.getElementById('name-product');
    const descricao = document.getElementById('descricao-product');
    const categoriaProduto = document.getElementById('categoria-product');
    const categoriaAnimal = document.getElementById('categoria-product-animal');
    const alertaSucesso = document.getElementById('alertaSucesso');

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
            alertaSucesso.classList.remove("hidden");
            alertaSucesso.classList.add("flex");
            alertaSucesso.innerHTML = `
                <div
                role="alert"
                class="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
                >
                    <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke-width="2"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                        ></path>
                        </svg>
                        <p class="text-xs font-semibold">Sucesso - Produto cadastrado com sucesso!</p>
                </div>
            `
            setTimeout(() => {
                document.getElementById("alertaSucesso").classList.add("hidden");
                window.history.back();
            }, 4000);

        })
        .catch(error => {
            alertaSucesso.classList.remove("hidden");
                alertaSucesso.classList.add("flex");
                alertaSucesso.innerHTML = `
                    <div
                        role="alert"
                        class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
                    >
                        <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke-width="2"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                        ></path>
                        </svg>
                        <p class="text-xs font-semibold">Erro - Erro interno do servidor.</p>
                    </div>
                `
                setTimeout(() => {
                    document.getElementById("alertaSucesso").classList.add("hidden");
                }, 4000);
            console.error("Erro ao atualizar variante:", error);
        });
    });
});
