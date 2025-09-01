import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

const Profile: NextPage = () => {
  const router = useRouter();

  // Valor de exemplo para o XP
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

  const goToUpdateProfile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/update-profile');
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

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#300345', // prpl1
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: '#4c0e71', // prpl2
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '600px'
      }}>
        <h1 style={{ color: 'white', margin: '10px 0', fontSize: '2rem' }}>Bem-vindo, Usuário!</h1>
        <p style={{ color: '#ffe085', marginBottom: '10px', fontSize: '1.1rem' }}>Este é o seu espaço pessoal.</p>

        {/* Barra de XP */}
        <div style={{ margin: '30px auto', maxWidth: '400px' }}>
            <div style={{
                height: '18px',
                width: '100%',
                backgroundColor: '#300345', // prpl1
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #ffe085' // yllw2
            }}>
                <div style={{
                    height: '100%',
                    width: `${xpPercentage}%`,
                    backgroundColor: '#f8cb46', // yllw1
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
          <button
            onClick={goToDashboard}
            style={{
              ...buttonStyles,
              background: '#4c0e71',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f8cb46';
              e.currentTarget.style.color = '#300345';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#4c0e71';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
          >
            Ver Dashboards
          </button>

          <button
            onClick={goToUpdateProfile}
            style={{
              ...buttonStyles,
              background: '#4c0e71',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f8cb46';
              e.currentTarget.style.color = '#300345';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#4c0e71';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
          >
            Atualizar Dados
          </button>

          <button
            onClick={goToQuestionBank}
            style={{
              ...buttonStyles,
              background: '#4c0e71',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f8cb46';
              e.currentTarget.style.color = '#300345';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#4c0e71';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
          >
            Banco de Questões
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;