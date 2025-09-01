import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, CSSProperties } from 'react';

const UpdateProfile: NextPage = () => {
  const router = useRouter();

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Lógica para salvar os dados virá aqui
    console.log('Salvando dados...');
    router.push('/profile');
  };

  const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/profile');
  };

  const inputStyles: CSSProperties = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '16px'
  };

  const buttonStyles: CSSProperties = {
    width: '100%',
    padding: '12px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.2s, color 0.2s',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#300345', // Cor de fundo prpl1
      padding: '20px'
    }}>
      <div style={{
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        background: '#4c0e71', // prpl2
        borderRadius: '10px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h1 style={{ marginBottom: '30px', color: 'white', fontSize: '2rem' }}>Atualizar Dados</h1>
        <form>
          <input
            type="text"
            placeholder="Nome Completo"
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="Apelido"
            style={inputStyles}
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            style={inputStyles}
          />
          <button
            onClick={handleSave}
            style={{
              ...buttonStyles,
              background: '#300345', // prpl1
              marginBottom: '12px',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f8cb46'; // yllw1
              e.currentTarget.style.color = '#300345'; // prpl1
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#300345'; // prpl1
              e.currentTarget.style.color = 'white';
            }}
          >
            Salvar Alterações
          </button>
          <button
            onClick={handleBack}
            style={{
              ...buttonStyles,
              background: 'transparent',
              border: '1px solid #f8cb46', // yllw1
              color: '#f8cb46', // yllw1
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f8cb46';
              e.currentTarget.style.color = '#300345';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#f8cb46';
            }}
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
