import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  // Renderiza um componente de carregamento enquanto o redirecionamento acontece
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      color: '#666'
    }}>
      <p>Redirecionando para a página de login...</p>
    </div>
  );
};

export default Home;