
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { firestore } from '@/lib/firebase';
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

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const docRef = doc(firestore, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const birthDateParts = data.birthDate ? data.birthDate.split('/') : [];
          const formattedBirthDate = birthDateParts.length === 3 ? `${birthDateParts[2]}-${birthDateParts[1]}-${birthDateParts[0]}` : '';

          setProfileData({
            fullName: user.displayName || data.username || '',
            nickname: data.nickname || '',
            birthDate: formattedBirthDate
          });
        } else {
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
      await updateProfile(user, {
        displayName: profileData.fullName
      });

      const docRef = doc(firestore, 'profiles', user.uid);
      const birthDateParts = profileData.birthDate ? profileData.birthDate.split('-') : [];
      const formattedBirthDate = birthDateParts.length === 3 ? `${birthDateParts[2]}/${birthDateParts[1]}/${birthDateParts[0]}` : '';

      await setDoc(docRef, {
        username: profileData.fullName,
        fullName: profileData.fullName,
        nickname: profileData.nickname,
        birthDate: formattedBirthDate
      }, { merge: true });

      alert('Perfil atualizado com sucesso!');
      router.push('/profile');

    } catch (err) {
      setError('Falha ao salvar as alterações. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ... (o resto do componente permanece o mesmo)
  return (
    <div>...</div>
  );
};

export default UpdateProfile;
