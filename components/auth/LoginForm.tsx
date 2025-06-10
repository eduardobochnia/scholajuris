import React, { useState } from 'react'; // Importar useState
import { signIn } from 'next-auth/react'; // Importar signIn
import { useRouter } from 'next/navigation'; // Importar useRouter

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpar erros anteriores

    const result = await signIn('credentials', {
      redirect: false, // Não redirecionar automaticamente
      email,
      password,
    });

    if (result?.error) {
      setError('Credenciais inválidas. Verifique seu email e senha.');
    } else {
      // Redirecionar para o dashboard ou página inicial após login bem-sucedido
      router.push('/dashboard'); // TODO: Definir a rota de redirecionamento correta
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}> {/* Adicionar onSubmit */}
      {error && ( // Exibir mensagem de erro se houver
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}
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
          autoComplete="current-password"
          required
          value={password} // Ligar valor ao estado
          onChange={(e) => setPassword(e.target.value)} // Atualizar estado ao mudar
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Entrar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;