// routes/routes.js - Define todas las rutas como objetos
import HomePage from '../pages/Home/HomePage';

import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import EmailVerificationPage from '../pages/Auth/EmailVerificationPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import PasswordResetConfirmationPage from '../pages/Auth/PasswordResetConfirmationPage';

import ProfilePage from '../pages/Account/ProfilePage';
import CharacterList from '../pages/Catalog/Characters/CharacterList';
import CharacterDetail from '../pages/Catalog/Characters/CharacterDetail';
import ItemList from '../pages/Catalog/Items/ItemList';
import ItemDetail from '../pages/Catalog/Items/ItemDetail';
import BuildsPage from '../pages/Builds/BuildsPage';

import UISamplePage from '../pages/UISamplePage';
import NotFoundPage from '../pages/NotFound';

// Define rutas agrupadas por tipo/layout
export const publicRoutes = [
  { path: '/', element: <HomePage />, exact: true },
  { path: '/catalog/character-list', element: <CharacterList /> },
  { path: '/catalog/character-detail/:characterId', element: <CharacterDetail /> },
  { path: '/catalog/item-list', element: <ItemList /> },
  { path: '/catalog/item-detail/:itemId', element: <ItemDetail /> },
  { path: '/ui-sample', element: <UISamplePage /> },
  { path: '/404', element: <NotFoundPage /> },  
];

export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/verify-email', element: <EmailVerificationPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <PasswordResetConfirmationPage /> },
];

export const protectedRoutes = [
  { path: '/account/profile', element: <ProfilePage /> },
  { path: '/builds', element: <BuildsPage /> },
];