import { useEffect, useState } from 'react';
import { FAB } from './FAB';
import { ChatPanel } from './ChatPanel';

export function AIAssistant() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {!open ? <FAB onClick={() => setOpen(true)} /> : null}
      {open ? <ChatPanel onClose={() => setOpen(false)} /> : null}
    </>
  );
}
