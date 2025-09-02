
import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Importa a função 'updateProfile'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';

const CreateAccount: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    if (value.length > 5) {
        value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
    }
    setBirthDate(value);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 dígitos.');
      return;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
        setError('Por favor, insira uma data de nascimento válida no formato DD/MM/AAAA.');
        return;
    }

    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // PASSO CRUCIAL: Atualiza o perfil de autenticação com o nome de usuário
        await updateProfile(user, {
          displayName: username
        });

        // Mantém o salvamento de dados extras no Firestore
        await setDoc(doc(firestore, "profiles", user.uid), {
          username: username,
          birthDate: birthDate,
          email: email,
        });
      }

      router.push('/profile');

    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este endereço de e-mail já está em uso.');
          break;
        case 'auth/invalid-email':
          setError('O formato do e-mail é inválido.');
          break;
        case 'auth/weak-password':
          setError('A senha é muito fraca. Tente uma mais forte.');
          break;
        default:
          setError('Ocorreu um erro ao criar a conta. Tente novamente.');
          break;
      }
    } finally {
        setLoading(false);
    }
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
        {error && <p style={{ color: '#ff7f7f', marginBottom: '20px' }}>{error}</p>}
        
        <form onSubmit={handleCreateAccount} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="text"
            placeholder="Seu nome (será exibido no perfil)"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <input
            type="password"
            placeholder="Sua senha (mín. 8 dígitos)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <input
            type="text"
            placeholder="Data de nascimento (DD/MM/AAAA)"
            value={birthDate}
            onChange={handleDateChange}
            maxLength={10}
            required
            style={{ padding: '15px', border: '1px solid #300345', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa' }}
          />
          <button type="submit" disabled={loading} style={{
            padding: '15px', color: '#300345', border: 'none',
            borderRadius: '5px', cursor: 'pointer', fontSize: '18px',
            fontWeight: 'bold', background: loading ? '#ccc' : '#f8cb46',
            transition: 'background-color 0.3s'
          }}>
            {loading ? 'Criando...' : 'Criar Conta'}
          </button>
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
