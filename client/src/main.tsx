import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from 'sonner'
import {experimental__simple} from '@clerk/themes'  
import { I18nextProvider } from 'react-i18next'
import './i18n/index.ts';
import i18next from 'i18next'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


createRoot(document.getElementById('root')!).render(
  <ClerkProvider
    appearance={{
      baseTheme: experimental__simple, 
    }}
    publishableKey={PUBLISHABLE_KEY}
    afterSignOutUrl='/'
  >
    <Toaster position='top-right' />
    <I18nextProvider i18n={i18next}>    
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </I18nextProvider>
  </ClerkProvider>
)
