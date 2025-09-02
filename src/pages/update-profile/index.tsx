
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, CSSProperties, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, firestore } from '@/lib/firebase';
import useAuth from '@/hooks/useAuth';

interface ProfileData {
  fullName: string;
  nickname: string;
  birthDate: string;
}

const UpdateProfile: NextPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    nickname: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar os dados do perfil quando o usuário for carregado
  useEffect(() => {
    if (authLoading) return; // Aguarda o useAuth terminar
    if (!user) {
      router.push('/login'); // Protege a rota
      return;
    }

    const fetchProfileData = async () => {
      try {
        const docRef = doc(firestore, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Formata a data de DD/MM/AAAA para AAAA-MM-DD para o input type="date"
          const birthDateParts = data.birthDate ? data.birthDate.split('/') : [];
          const formattedBirthDate = birthDateParts.length === 3 ? `${birthDateParts[2]}-${birthDateParts[1]}-${birthDateParts[0]}` : '';

          setProfileData({
            fullName: user.displayName || data.username || '', // Prioriza o displayName do Auth
            nickname: data.nickname || '',
            birthDate: formattedBirthDate
          });
        } else {
          // Se não houver documento no firestore, ainda preenche com o displayName
          setProfileData(prev => ({...prev, fullName: user.displayName || ''}));
        }
      } catch (err) {
        setError('Falha ao carregar dados do perfil.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, authLoading, router]);

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      // 1. ATUALIZA O FIREBASE AUTH (O mais importante!)
      await updateProfile(user, {
        displayName: profileData.fullName
      });

      // 2. ATUALIZA O FIRESTORE
      const docRef = doc(firestore, 'profiles', user.uid);
      // Formata a data de AAAA-MM-DD para DD/MM/AAAA para salvar no firestore
      const birthDateParts = profileData.birthDate ? profileData.birthDate.split('-') : [];
      const formattedBirthDate = birthDateParts.length === 3 ? `${birthDateParts[2]}/${birthDateParts[1]}/${birthDateParts[0]}` : '';

      await setDoc(docRef, {
        username: profileData.fullName, // Mantendo consistência
        fullName: profileData.fullName,
        nickname: profileData.nickname,
        birthDate: formattedBirthDate
      }, { merge: true }); // merge: true evita apagar campos não enviados

      alert('Perfil atualizado com sucesso!');
      router.push('/profile');

    } catch (err) {
      setError('Falha ao salvar as alterações. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/profile');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  if (authLoading || loading) {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#300345', color: 'white'}}><h1>Carregando...</h1></div>;
  }

  const inputStyles: CSSProperties = { width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', fontSize: '16px' };
  const buttonStyles: CSSProperties = { width: '100%', padding: '12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background 0.2s, color 0.2s' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#300345', padding: '20px' }}>
      <div style={{ padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#4c0e71', borderRadius: '10px', textAlign: 'center', width: '100%', maxWidth: '500px' }}>
        <h1 style={{ marginBottom: '30px', color: 'white', fontSize: '2rem' }}>Atualizar Dados</h1>
        {error && <p style={{ color: '#ff7f7f', marginBottom: '20px' }}>{error}</p>}
        <form>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#f8cb46', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#300345', fontSize: '5rem', fontWeight: 'bold', marginBottom: '15px' }}>
              {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : (user?.displayName?.charAt(0).toUpperCase() || 'U')}
            </div>
            <input type="file" id="profile-picture" style={{ display: 'none' }} />
            <label htmlFor="profile-picture" style={{ padding: '10px 20px', background: '#f8cb46', color: '#300345', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>
              Alterar Foto
            </label>
          </div>

          <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} placeholder="Nome Completo" style={inputStyles} required />
          <input type="text" name="nickname" value={profileData.nickname} onChange={handleChange} placeholder="Apelido" style={inputStyles} />
          <input type="date" name="birthDate" value={profileData.birthDate} onChange={handleChange} placeholder="Data de Nascimento" style={inputStyles} />
          
          <button onClick={handleSave} disabled={loading} style={{ ...buttonStyles, background: loading ? '#ccc' : '#300345', marginBottom: '12px' }}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button onClick={handleBack} style={{ ...buttonStyles, background: 'transparent', border: '1px solid #f8cb46', color: '#f8cb46' }}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
