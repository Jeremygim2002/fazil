import { getIdToken } from 'firebase/auth';

import { auth } from '@/firebaseConfig';
import { api } from '@/services/api';
import { type PendingPurchaseValidation } from '@/services/extracted-document-store';

export type SavePurchaseResponse = {
  transactionId: string;
  insertedRows: number;
};

export async function savePurchaseValidation(validation: PendingPurchaseValidation) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Inicia sesión para guardar el comprobante.');
  }

  const token = await getIdToken(currentUser);

  return api.post('/purchases', validation, token) as Promise<SavePurchaseResponse>;
}
