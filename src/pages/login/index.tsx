import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

const Login: NextPage = () => {
  const router = useRouter();

  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Simulando login...');
    router.push('/profile');
  };
  
  const handleGoogleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Simulando login com Google...');
    router.push('/profile');
  };

  const buttonStyles = {
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
        maxWidth: '400px'
      }}>
        <h1 style={{ marginBottom: '24px', color: 'white', fontSize: '2rem' }}>Login</h1>
        <input 
          type="email" 
          placeholder="Email" 
          style={{ width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} 
        />
        <button 
          onClick={handleLogin}
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
          Login
        </button>
        <button 
          onClick={handleGoogleLogin}
          style={{
            ...buttonStyles,
            background: '#300345', // prpl1
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
          Login com Google
        </button>
      </div>
    </div>
  );
};

export default Login;