import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from 'sonner'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
createRoot(document.getElementById('root')!).render(
  <ClerkProvider appearance={{theme:""}} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <Toaster position='top-right'/>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
)
