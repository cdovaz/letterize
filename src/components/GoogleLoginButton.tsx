import React from 'react';

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
         <img src="/google-logo.svg" alt="Google logo" style={{ height: '18px' }}/>
         Entrar com Google
      </button>
    </>
  );
};

export default GoogleLoginButton;
