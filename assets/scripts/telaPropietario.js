const verificarToken = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // Evento para lidar com o botão voltar do navegador
    window.addEventListener('pageshow', async (event) => {
      if (event.persisted) {
        // Se a página foi carregada do cache, forçamos a verificação
        await verificarAcesso();
      }
    });

    // Verifica o acesso ao carregar a página
    verificarAcesso();
  });

  // Função para verificar o token e o acesso
  async function verificarAcesso() {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage

    if (!token) {
      // Redireciona para a página de login se o token não existir
      redirecionarParaLogin();
      return;
    }

    try {
      // Faz uma requisição ao servidor para validar o token
      const response = await fetch('https://back.soracoescariri.com.br/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
        },
      });

      if (response.status === 200) {
        // Exibe o conteúdo da página se o token for válido
        return;
      }

      if (response.status === 401) {
        // Redireciona para login se o token for inválido
        redirecionarParaLogin();
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      // Redireciona para login em caso de erro no servidor
      redirecionarParaLogin();
    }
  }

  // Função para redirecionar para a página de login
  function redirecionarParaLogin() {
    window.location.href = 'https://soracoescariri.com.br/pages/propietario/telaLogin.html';
  }

  document.getElementById('buttonExit').addEventListener('click', function() {
    
    localStorage.removeItem('token');
    
    redirecionarParaLogin();
  });

};

verificarToken()