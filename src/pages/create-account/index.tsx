
import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';

const CreateAccount: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      alert('A senha deve ter no mínimo 8 dígitos.');
      return;
    }
    console.log('Email:', email, 'Senha:', password, 'Usuário:', username, 'Data de Nascimento:', birthDate);
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
        <h1 style={{ color: '#f8cb46', fontSize: '2.5rem', marginBottom: '30px' }}>Criar Conta</h1>
        
        <form onSubmit={handleCreateAccount} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <input
            type="password"
            placeholder="Sua senha (mín. 8 dígitos)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <input
            type="date"
            placeholder="Data de nascimento"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <button type="submit" style={{
            padding: '15px', color: '#300345', border: 'none',
            borderRadius: '5px', cursor: 'pointer', fontSize: '18px',
            fontWeight: 'bold', background: '#f8cb46'
          }}>Criar Conta</button>
        </form>

        <div style={{ marginTop: '25px' }}>
            <Link href="/login" style={{ color: '#f8cb46', textDecoration: 'none', fontSize: '16px' }}>
                Já tem uma conta? Faça login
            </Link>
        </div>

      </div>
    </div>
  );
};

export default CreateAccount;
