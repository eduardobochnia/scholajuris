import React, { useState } from 'react'; // Importar useState
import { useRouter } from 'next/navigation'; // Importar useRouter

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpar erros anteriores
    setSuccess(''); // Limpar mensagens de sucesso anteriores

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Erro ao registrar usuário.');
    } else {
      setSuccess('Usuário registrado com sucesso! Redirecionando para login...');
      // Redirecionar para a página de login após registro bem-sucedido
      setTimeout(() => {
        router.push('/login');
      }, 2000); // Redirecionar após 2 segundos
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}> {/* Adicionar onSubmit */}
      {error && ( // Exibir mensagem de erro se houver
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}
      {success && ( // Exibir mensagem de sucesso se houver
        <div className="text-green-500 text-sm text-center">{success}</div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name} // Ligar valor ao estado
          onChange={(e) => setName(e.target.value)} // Atualizar estado ao mudar
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email} // Ligar valor ao estado
          onChange={(e) => setEmail(e.target.value)} // Atualizar estado ao mudar
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password} // Ligar valor ao estado
          onChange={(e) => setPassword(e.target.value)} // Atualizar estado ao mudar
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Registrar
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;