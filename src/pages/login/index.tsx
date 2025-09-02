
import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import dynamic from 'next/dynamic';

const GoogleLoginButton = dynamic(() => import('@/components/GoogleLoginButton'), {
  ssr: false,
});

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Renomeado para evitar conflito
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (err: unknown) { // Alterado para unknown
      setErrorMessage("E-mail ou senha inválidos. Tente novamente."); // Mensagem genérica e segura
    }
  };

  const handleGoogleLogin = () => {
    console.log('Botão de login com Google clicado.');
  };

  return (
    <div style={{...}}>
        <div style={{...}}>
            <h1 style={{...}}>Login</h1>
            {errorMessage && <p style={{ color: '#ff7f7f', marginBottom: '20px' }}>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
            <form onSubmit={handleLogin} style={{...}}>
                {/* Inputs e botão */}
            </form>
            <GoogleLoginButton onClick={handleGoogleLogin} />
            <div style={{...}}>
                {/* Link para criar conta */}
            </div>
        </div>
    </div>
  );
};

export default Login;
