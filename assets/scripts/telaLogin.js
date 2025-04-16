const inputLogin = document.getElementById('email');
const inputPassword = document.getElementById('password');
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o envio padrão do formulário

  const email = inputLogin.value.trim();
  const password = inputPassword.value.trim();

  if (!email || !password) {
    alert('Por favor, preencha todos os campos.');
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
      alert(errorData.message || 'Falha no login. Tente novamente.');
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
      alert('Falha ao salvar o token. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao conectar ao servidor:', error);
    alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
  }
});