import React from 'react';
import Image from 'next/image'; // Importa o componente Image

interface GoogleLoginButtonProps {
  onClick: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => {
  return (
    <>
      <div style={{ margin: '20px 0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <hr style={{ flex: 1, borderColor: '#6a2c91' }} />
          <span style={{ margin: '0 10px' }}>OU</span>
          <hr style={{ flex: 1, borderColor: '#6a2c91' }} />
      </div>

      <button onClick={onClick} style={{
          padding: '15px', color: '#300345', border: 'none', width: '100%',
          borderRadius: '5px', cursor: 'pointer', fontSize: '16px',
          fontWeight: 'bold', background: '#f8cb4e', display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: '10px'
      }}>
         {/* Substitui <img> por <Image> */}
         <Image src="/google-logo.svg" alt="Google logo" width={18} height={18} />
         Entrar com Google
      </button>
    </>
  );
};

export default GoogleLoginButton;
