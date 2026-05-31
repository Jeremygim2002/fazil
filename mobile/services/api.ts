const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

type JsonBody = Record<string, unknown>;

async function parseResponse(response: Response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  async post(path: string, body: JsonBody) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    return parseResponse(response);
  },

  async get(path: string, token?: string) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return parseResponse(response);
  },
};
