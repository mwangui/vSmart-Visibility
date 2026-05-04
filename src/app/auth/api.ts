// Auth API client. Cookies are HttpOnly and set by the backend.
// `credentials: 'include'` is required so the browser sends the session cookie.

export interface MeResponse {
  authed: boolean;
  session_id: string;
}

const headers: HeadersInit = { 'Content-Type': 'application/json' };

export async function fetchMe(signal?: AbortSignal): Promise<MeResponse | null> {
  const res = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
    signal,
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`auth/me failed (${res.status})`);
  return (await res.json()) as MeResponse;
}

export async function login(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ password }),
  });
  if (res.status === 401) {
    return { ok: false, error: 'Invalid password' };
  }
  if (!res.ok) {
    return { ok: false, error: `Login failed (${res.status})` };
  }
  return { ok: true };
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers,
  });
}
