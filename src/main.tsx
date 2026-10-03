import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n'

const phKey = import.meta.env.VITE_POSTHOG_KEY;
if (phKey) {
  posthog.init(phKey, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    persistence: 'localStorage',
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
