const inputLogin = document.getElementById('email');
const inputPassword = document.getElementById('password');
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o envio padrão do formulário

  const email = inputLogin.value.trim();
  const password = inputPassword.value.trim();

  const divMensage = document.getElementById('mensage');

  if (!email || !password) {
    divMensage.classList.remove('hidden');
    divMensage.innerHTML = `
      <div
        role="alert"
        class="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-yellow-200 dark:hover:bg-yellow-800 transform hover:scale-105"
      >
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-5 w-5 flex-shrink-0 mr-2 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
        <p class="text-xs font-semibold">
          Alerta - Preencha os campos corretamente.
        </p>
      </div>
    `
    setTimeout(() => {
      divMensage.innerHTML = '';
      divMensage.classList.add('hidden');
    }, 4000);
    return;
  }

  const login = { email, password };

  try {
    const response = await fetch('https://back.soracoescariri.com.br/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Erro:', errorData);
      divMensage.classList.remove('hidden');
      duvMensage.innerHTML = `
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
          <p class="text-xs font-semibold">Error - Falha ao fazer o login.</p>
        </div>
      `
      return;
    }

    const data = await response.json();

    // Armazena o token no localStorage
    localStorage.setItem('token', data.token);

    // Confirma se o token foi armazenado
    const confirmToken = localStorage.getItem('token');
    if (confirmToken) {
      // Redireciona apenas se o token foi salvo com sucesso
      window.location.href = 'http://127.0.0.1:5500/pages/propietario/telaPropietario.html';
    } else {
      divMensage.classList.remove('hidden');
      divMensage.innerHTML = `
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
          <p class="text-xs font-semibold">Error - Falha ao salvar o token. Tente novamente.!</p>
        </div>
      `
      setTimeout(() => {
        divMensage.innerHTML = '';
        divMensage.classList.add('hidden');
      }, 6000);
    }
  } catch (error) {
    console.error('Erro ao conectar ao servidor:', error);
    divMensage.classList.remove('hidden');
      divMensage.innerHTML = `
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
          <p class="text-xs font-semibold">Error - E-mail ou Senha incorreto(a)!</p>
        </div>
      `
      setTimeout(() => {
        divMensage.innerHTML = '';
        divMensage.classList.add('hidden');
      }, 6000);
  }
});