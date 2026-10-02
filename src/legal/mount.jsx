import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/** Mounts a legal page component into #root. */
export function mount(Page) {
  const el = document.getElementById('root');
  if (!el) return;
  createRoot(el).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}
