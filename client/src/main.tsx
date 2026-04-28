import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'

import { App } from '@/App'
import { store } from '@/01-app'
import { ThemeProvider } from '@/01-app'
import { TooltipProvider } from '@/06-shared'

const start = async () => {
  const root = createRoot(document.getElementById('root')!)

  // Убирает моргание первой темы
  document.documentElement.classList.add('no-transition')
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('no-transition')
    })
  })

  root.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  )
}

start()
