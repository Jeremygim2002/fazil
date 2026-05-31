// hooks/useAuth.ts
import { auth } from '../firebaseConfig';
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
import { api } from '../services/api';

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(userCredential.user);
      
      // Enviar el token seguro a tu servidor NestJS
      await api.post('/auth/login', { token });
      
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return { login };
};