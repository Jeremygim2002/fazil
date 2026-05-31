type PendingGoogleAuthSession = {
  clientId: string;
  codeVerifier: string;
  redirectUri: string;
  scopes?: string[];
  state: string;
};

let pendingGoogleAuthSession: PendingGoogleAuthSession | null = null;

export function setPendingGoogleAuthSession(session: PendingGoogleAuthSession) {
  pendingGoogleAuthSession = session;
}

export function getPendingGoogleAuthSession() {
  return pendingGoogleAuthSession;
}

export function clearPendingGoogleAuthSession() {
  pendingGoogleAuthSession = null;
}
