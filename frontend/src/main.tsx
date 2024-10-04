import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import AuthProvideWithNavigate from './Auth/AuthProvideWithNavigate'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from './components/ui/sonner'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvideWithNavigate>
          <AppRoutes />
          <Toaster visibleToasts={1} position='top-right'richColors/>
        </AuthProvideWithNavigate>
      </Router>
       </QueryClientProvider>

  </StrictMode>,
)
