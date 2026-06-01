const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

type JsonBody = Record<string, unknown>;

async function parseResponse(response: Response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(parseErrorMessage(message) || `Request failed: ${response.status}`);
  }

  return response.json();
}

function parseErrorMessage(message: string) {
  try {
    const parsed = JSON.parse(message) as { message?: string | string[]; error?: string };
    const parsedMessage = Array.isArray(parsed.message) ? parsed.message.join('\n') : parsed.message;

    return parsedMessage ?? parsed.error ?? message;
  } catch {
    return message;
  }
}

export const api = {
  async post(path: string, body: JsonBody, token?: string) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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

  async upload(path: string, formData: FormData) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      body: formData,
    });

    return parseResponse(response);
  },
};
