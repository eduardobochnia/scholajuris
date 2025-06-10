// Função simples para simular autenticação
export async function getAuthSession() {
  // Para desenvolvimento, sempre retorna um usuário simulado
  return {
    user: {
      id: '1',
      name: 'Usuário de Desenvolvimento',
      email: 'dev@example.com'
    }
  };
}