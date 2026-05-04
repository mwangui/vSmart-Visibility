import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { fetchMe, login as apiLogin, logout as apiLogout, type MeResponse } from './api';

interface AuthState {
  status: 'loading' | 'authed' | 'anon';
  session: MeResponse | null;
  error: string | null;
  login: (password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'authed' | 'anon'>('loading');
  const [session, setSession] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const aborter = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    aborter.current?.abort();
    const ac = new AbortController();
    aborter.current = ac;
    try {
      const me = await fetchMe(ac.signal);
      if (me) {
        setSession(me);
        setStatus('authed');
      } else {
        setSession(null);
        setStatus('anon');
      }
    } catch (e) {
      if ((e as DOMException).name === 'AbortError') return;
      setStatus('anon');
      setSession(null);
    }
  }, []);

  useEffect(() => {
    void refresh();
    return () => aborter.current?.abort();
  }, [refresh]);

  const login = useCallback(
    async (password: string) => {
      setError(null);
      const result = await apiLogin(password);
      if (!result.ok) {
        setError(result.error);
        return { ok: false, error: result.error };
      }
      await refresh();
      return { ok: true };
    },
    [refresh],
  );

  const logout = useCallback(async () => {
    await apiLogout();
    setSession(null);
    setStatus('anon');
  }, []);

  const value = useMemo<AuthState>(
    () => ({ status, session, error, login, logout }),
    [status, session, error, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
