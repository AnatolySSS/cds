// main.tsx / App.tsx
import { RouterProvider } from 'react-router-dom'
import { router } from '@/01-app'
import './App.css'
import { Toaster } from 'sonner'
import { useAppBootstrap } from '@/01-app'

export function App() {
  useAppBootstrap()

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </>
  )
}
