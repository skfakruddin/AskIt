import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AuthProvider from './store/AuthProvider.tsx'
import CommonProvider from './store/CommonProvider.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Toaster
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff'
        }
      }}
    />
    <CommonProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CommonProvider>
  </BrowserRouter>
)
