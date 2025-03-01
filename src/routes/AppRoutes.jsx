// src/routes/index.jsx (o src/AppRoutes.jsx)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Importa tus componentes de página
import HomePage from '../pages/Home/HomePage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import UISamplehPage from '../pages/UISamplePage'
import NotFoundPage from '../pages/NotFound'

// Layout principal si lo tienes
import { MainLayout, AuthLayout } from '../components/layout'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ui-sample" element={<UISamplehPage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}

          {/* Rutas protegidas (ejemplo) */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

          {/* Página 404 */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
