// src/routes/index.jsx (o src/AppRoutes.jsx)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Importa tus componentes de página
import HomePage from '../pages/Home/HomePage'

import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'

import ProfilePage from '../pages/Account/ProfilePage'
import FavoritesPage from '../pages/Account/FavoritesPage'

import CharacterList from '../pages/Catalog/Characters/CharacterList'
import CharacterDetail from '../pages/Catalog/Characters/CharacterDetail'
import ItemList from '../pages/Catalog/Items/ItemList'
import ItemDetail from '../pages/Catalog/Items/ItemList'

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

          <Route path="/catalog/character-list" element={<CharacterList />} />
          <Route path="/catalog/character-detail/:characterId" element={<CharacterDetail />} />
          <Route path="/catalog/item-list" element={<ItemList />} />
          <Route path="/catalog/item-detail/:itemId" element={<ItemDetail />} />

          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/favorites" element={<FavoritesPage />} />

          {/* Rutas protegidas (ejemplo) */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

          {/* Página 404 */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* Ruta para muestro de componentes */}
          <Route path="/ui-sample" element={<UISamplehPage />} />
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
