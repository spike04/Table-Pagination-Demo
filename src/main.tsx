import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ModeToggle } from './components/mode-toggle.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
)
