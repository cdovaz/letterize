
import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import dynamic from 'next/dynamic';

// --- HYDRATION MISMATCH FIX: DYNAMIC IMPORT WITH SSR DISABLED ---
const GoogleLoginButton = dynamic(() => import('@/components/GoogleLoginButton'), {
  ssr: false,
});
// ------------------------------------------------------------

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (error: any) {
      setError("Erro na senha/email");
    }
  };

  const handleGoogleLogin = () => {
    // Futura implementação do login com Google
    console.log('Botão de login com Google clicado.');
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#300345', padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        padding: '40px', boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
        background: '#4c0e71', borderRadius: '10px', width: '100%',
        maxWidth: '400px', textAlign: 'center'
      }}>
        <h1 style={{ color: '#f8cb46', fontSize: '2.5rem', marginBottom: '30px' }}>Login</h1>
        {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <button type="submit" style={{
            padding: '15px', color: '#300345', border: 'none',
            borderRadius: '5px', cursor: 'pointer', fontSize: '18px',
            fontWeight: 'bold', background: '#f8cb4e'
          }}>Entrar</button>
        </form>

        <GoogleLoginButton onClick={handleGoogleLogin} />

        <div style={{ marginTop: '25px' }}>
            <Link href="/create-account" style={{ color: '#f8cb46', textDecoration: 'none', fontSize: '16px' }}>
                Criar conta
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
