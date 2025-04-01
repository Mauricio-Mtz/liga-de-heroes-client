// src/components/layout/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al usuario a la página de login después de cerrar sesión
  };

  return (
    <header className="sticky top-0 z-30 bg-base-100 border-b shadow-sm comic-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Toggle */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary comic-title">Liga de Heroes</span>
            </Link>
          </div>

          {/* Center: Navigation - Desktop */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="comic-text font-bold hover:text-primary">Inicio</Link>
            <Link to="/catalog/character-list" className="comic-text font-bold hover:text-primary">Campeones</Link>
            <Link to="/catalog/item-list" className="comic-text font-bold hover:text-primary">Items</Link>
            {/* <Link to="/builds" className="comic-text font-bold hover:text-primary">Builds</Link>
            <Link to="/compare" className="comic-text font-bold hover:text-primary">Comparar</Link> */}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Dropdown menu de perfil con Daisy UI - Estilo cómic */}
            <div className="dropdown dropdown-end">
              <button 
                tabIndex={0} 
                className="flex p-2 border-2 border-black bg-base-100 hover:bg-base-200 shadow-md shadow-black"
              >
                <User className="w-5 h-5" />
                {currentUser && (
                  <span className="ml-2 font-bold hidden sm:inline">{currentUser.riotProfile.summonerName}</span>
                )}
              </button>
              
              {/* Menu dropdown - Estilo cómic */}
              <ul 
                tabIndex={0} 
                className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 w-52 border-2 border-black comic-border"
              >
                {currentUser ? (
                  <>
                    <li>
                      <Link to="/account/profile" className="flex items-center gap-2 py-2 hover:bg-base-200 font-bold">
                        <User className="w-4 h-4" />
                        <span>Perfil</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/builds" className="flex items-center gap-2 py-2 hover:bg-base-200 font-bold">
                        <Settings className="w-4 h-4" />
                        <span>Builds</span>
                      </Link>
                    </li>
                    <li className="border-t-2 border-black mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 py-2 text-error font-bold hover:bg-base-200 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar sesión</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="flex items-center gap-2 py-2 hover:bg-base-200 font-bold">
                        <LogOut className="w-4 h-4" />
                        <span>Iniciar sesión</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="flex items-center gap-2 py-2 hover:bg-base-200 font-bold">
                        <User className="w-4 h-4" />
                        <span>Registrarse</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;