import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './AppContext/AuthContext.jsx'
import { FetchProductProvider } from './AppContext/FetchProductContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchProductProvider >
      <AuthProvider>
        <App />
      </AuthProvider>
    </FetchProductProvider>
  </StrictMode>
)
