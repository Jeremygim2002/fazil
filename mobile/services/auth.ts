import { getIdToken, signOut } from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { api } from './api';

export type AuthUser = {
  uid: string;
  email: string;
  name: string;
};

type AuthUserResponse = {
  user: AuthUser;
};

export async function loginWithFirebaseToken(token: string) {
  return api.post('/auth/login', { token }) as Promise<{
    message: string;
    user: AuthUser;
  }>;
}

export async function getCurrentUserProfile() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return null;
  }

  const token = await getIdToken(currentUser);
  const response = (await api.get('/auth/me', token)) as AuthUserResponse;
  return response.user;
}

export function getFirstName(name?: string | null) {
  const firstName = name?.trim().split(/\s+/)[0];
  return firstName || 'Usuario';
}

export async function logout() {
  await signOut(auth);
}
