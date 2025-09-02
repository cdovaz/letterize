
import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    if (value.length > 5) value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
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
        await updateProfile(user, { displayName: username });
        await setDoc(doc(firestore, "profiles", user.uid), {
          username: username,
          birthDate: birthDate,
          email: email,
        });
      }
      router.push('/profile');

    } catch (err: unknown) { // Alterado de any para unknown
      let errorCode = 'unknown';
      if (typeof err === 'object' && err !== null && 'code' in err) {
          errorCode = (err as { code: string }).code;
      }

      switch (errorCode) {
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
    <div style={{...}}>
      {/* JSX permanece o mesmo */}
    </div>
  );
};

export default CreateAccount;
