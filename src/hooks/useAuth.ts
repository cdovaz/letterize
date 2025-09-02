
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * Hook customizado para obter o estado de autenticação do Firebase em tempo real.
 * @returns Um objeto contendo o usuário autenticado (`user`) e o estado de carregamento (`loading`).
 */
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged é um 'listener' que observa mudanças no estado de login.
    // Ele retorna uma função 'unsubscribe' para limpar o listener quando o componente desmontar.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Função de limpeza do useEffect: remove o listener para evitar memory leaks.
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
