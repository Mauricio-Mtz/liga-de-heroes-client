
// routes/AppRoutes.jsx - Renderiza las rutas
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout, AuthLayout } from '../components/layout';
import { publicRoutes, authRoutes, protectedRoutes } from './routes';
import { useAuth } from '../hooks/useAuth';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Mapea rutas públicas */}
          {publicRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} exact={route.exact} />
          ))}
          
          {/* Mapea rutas protegidas */}
          {protectedRoutes.map(route => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={isAuthenticated ? route.element : <Navigate to="/login" replace />} 
            />
          ))}
          
          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
        
        <Route element={<AuthLayout />}>
          {/* Mapea rutas de autenticación */}
          {authRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;