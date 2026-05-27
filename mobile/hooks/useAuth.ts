// hooks/useAuth.ts
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { api } from '../services/api';

export const useAuth = () => {
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(userCredential.user);
      
      // Enviar el token seguro a tu servidor NestJS
      await api.post('/auth/login', { token });
      
    } catch (error) {
      console.error(error);
    }
  };

  return { login };
};