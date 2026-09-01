import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.tsx'

posthog.init('phc_BEbvV6LeZRcM8JcjjA87Enhd6zafLej2R89ApZhXJGNa', {
  api_host: 'https://us.i.posthog.com',
  defaults: '2026-05-30',
  person_profiles: 'identified_only',
  persistence: 'localStorage',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
