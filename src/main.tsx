import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n'
import { init as initAnalytics } from './lib/analytics'

const phKey = import.meta.env.VITE_POSTHOG_KEY;
if (phKey) {
  initAnalytics(phKey, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    persistence: 'localStorage',
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
