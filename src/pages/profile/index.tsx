
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect } from 'react';
import useAuth from '@/hooks/useAuth'; // Importando o nosso hook!

const Profile: NextPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth(); // Usando o hook para obter o usuário

  // Efeito para proteger a rota: se não estiver carregando e não houver usuário, redireciona para o login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // --- Lógica de navegação e estilos (permanece a mesma) ---
  const currentXp = 750;
  const maxXp = 2000;
  const xpPercentage = (currentXp / maxXp) * 100;

  const goToDashboard = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const goToQuestionBank = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/question-bank');
  };

  const goToUpdateProfile = (e: MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    router.push('/update-profile');
  };

  const goToCronogram = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/cronogram');
  };

  const goToWriting = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/writing');
  };

  const buttonStyles = {
    padding: '15px 30px',
    fontSize: '18px',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s',
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '280px'
  };
  // --- Fim da lógica de navegação e estilos ---

  // Se estiver carregando, exibe uma mensagem de loading
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#300345', color: 'white' }}>
        <h1>Carregando seu perfil...</h1>
      </div>
    );
  }

  // Se não houver usuário (após o carregamento), não renderiza nada (pois o useEffect irá redirecionar)
  if (!user) {
    return null;
  }

  // Renderiza a página de perfil com os dados do usuário
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#300345',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{
        position: 'relative',
        textAlign: 'center',
        padding: '40px 20px',
        background: '#4c0e71',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '600px'
      }}>
        <svg
            onClick={goToUpdateProfile}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f8cb46"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                cursor: 'pointer'
            }}
        >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: '#f8cb46',
          margin: '0 auto 20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#300345',
          fontSize: '4rem',
          fontWeight: 'bold'
        }}>
          {/* Exibe a primeira letra do nome do usuário, ou 'U' como fallback */}
          {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
        </div>
        {/* Exibe o nome de exibição do usuário, ou 'Usuário' como fallback */}
        <h1 style={{ color: 'white', margin: '10px 0', fontSize: '1.5rem' }}>Bem-vindo, {user.displayName || 'Usuário'}!</h1>
        <p style={{ color: '#ffe085', marginBottom: '10px', fontSize: '1.1rem' }}>Este é o seu espaço pessoal.</p>

        {/* Barra de XP */}
        <div style={{ margin: '30px auto', maxWidth: '400px' }}>
            <div style={{
                height: '18px',
                width: '100%',
                backgroundColor: '#300345',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #ffe085'
            }}>
                <div style={{
                    height: '100%',
                    width: `${xpPercentage}%`,
                    backgroundColor: '#f8cb46',
                    borderRadius: '8px',
                    transition: 'width 0.5s ease-in-out'
                }}></div>
            </div>
            <p style={{ color: 'white', marginTop: '8px', textAlign: 'right', fontSize: '0.9rem' }}>{currentXp} / {maxXp} XP</p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px',
          width: '100%',
          marginTop: '40px'
        }}>
           {/* Botões de navegação */}
          <button onClick={goToDashboard} style={{ ...buttonStyles, background: '#4c0e71' }} onMouseOver={e => { e.currentTarget.style.background = '#f8cb46'; e.currentTarget.style.color = '#300345'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)'; }} onMouseOut={e => { e.currentTarget.style.background = '#4c0e71'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'; }}>
            Ver Dashboards
          </button>
          <button onClick={goToQuestionBank} style={{ ...buttonStyles, background: '#4c0e71' }} onMouseOver={e => { e.currentTarget.style.background = '#f8cb46'; e.currentTarget.style.color = '#300345'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)'; }} onMouseOut={e => { e.currentTarget.style.background = '#4c0e71'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'; }}>
            Banco de Questões
          </button>
          <button onClick={goToCronogram} style={{ ...buttonStyles, background: '#4c0e71' }} onMouseOver={e => { e.currentTarget.style.background = '#f8cb46'; e.currentTarget.style.color = '#300345'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)'; }} onMouseOut={e => { e.currentTarget.style.background = '#4c0e71'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'; }}>
            Cronograma de Estudo
          </button>
          <button onClick={goToWriting} style={{ ...buttonStyles, background: '#4c0e71' }} onMouseOver={e => { e.currentTarget.style.background = '#f8cb46'; e.currentTarget.style.color = '#300345'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)'; }} onMouseOut={e => { e.currentTarget.style.background = '#4c0e71'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'; }}>
            Fazer Redação
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
