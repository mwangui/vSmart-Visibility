import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useAuth } from './AuthProvider';

export function LoginScreen() {
  const { login, error } = useAuth();
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim() || submitting) return;
    setSubmitting(true);
    setLocalError(null);
    const result = await login(password);
    setSubmitting(false);
    if (!result.ok) {
      setLocalError(result.error ?? 'Invalid password');
      setPassword('');
      inputRef.current?.focus();
    }
  }

  const message = localError ?? error;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b1220] text-slate-100 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl bg-slate-900/70 backdrop-blur p-8 shadow-2xl border border-slate-800"
      >
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Cisco Catalyst SD-WAN
          </div>
          <h1 className="mt-2 text-2xl font-semibold">vSmart Visibility</h1>
          <p className="mt-2 text-sm text-slate-400">Enter password to continue</p>
        </div>

        <label className="block">
          <span className="sr-only">Password</span>
          <input
            ref={inputRef}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-md bg-slate-800/60 border border-slate-700 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            aria-invalid={!!message}
            aria-describedby={message ? 'login-error' : undefined}
            maxLength={256}
            required
          />
        </label>

        {message ? (
          <p id="login-error" className="mt-3 text-sm text-rose-400" role="alert">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || !password.trim()}
          className="mt-5 w-full rounded-md bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 transition"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="mt-4 text-[11px] text-center text-slate-500">
          Internal demo · Single shared password
        </p>
      </form>
    </div>
  );
}
