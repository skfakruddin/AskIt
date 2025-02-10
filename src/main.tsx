import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AuthProvider from './store/AuthProvider.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Toaster
      toastOptions={{
        style: {
          background: '#141615',
          color: '#fff'
        }
      }}
    />
      <AuthProvider>
        <App />
      </AuthProvider>
  </BrowserRouter>
)
