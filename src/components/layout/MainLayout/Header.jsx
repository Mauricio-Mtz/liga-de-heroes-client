// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { Search, User, Bell, LogOut, Heart, Mail, Settings } from 'lucide-react';

const Header = () => {
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
            <Link to="/builds" className="comic-text font-bold hover:text-primary">Builds</Link>
            <Link to="/compare" className="comic-text font-bold hover:text-primary">Comparar</Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 border-2 border-black bg-base-100 hover:bg-base-200 shadow-md shadow-black">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 border-2 border-black bg-base-100 hover:bg-base-200 shadow-md shadow-black">
              <Bell className="w-5 h-5" />
            </button>
            
            {/* Dropdown menu de perfil con Daisy UI - Estilo cómic */}
            <div className="dropdown dropdown-end">
              <button 
                tabIndex={0} 
                className="p-2 border-2 border-black bg-base-100 hover:bg-base-200 shadow-md shadow-black"
              >
                <User className="w-5 h-5" />
              </button>
              
              {/* Menu dropdown - Estilo cómic */}
              <ul 
                tabIndex={0} 
                className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 w-52 border-2 border-black comic-border"
              >
                <li>
                  <Link to="/account/profile" className="flex items-center gap-2 py-2 hover:bg-base-200 font-bold">
                    <User className="w-4 h-4" />
                    <span>Perfil</span>
                  </Link>
                </li>
                <li>
                  <Link to="/account/favorites" className="flex items-center gap-2 py-2 hover:bg-base-200 font-bold">
                    <Heart className="w-4 h-4" />
                    <span>Favoritos</span>
                  </Link>
                </li>
                <li>
                  <Link to="/account/settings" className="flex items-center gap-2 py-2 hover:bg-base-200 font-bold">
                    <Settings className="w-4 h-4" />
                    <span>Ajustes</span>
                  </Link>
                </li>
                <li>
                  <Link to="/account/contact" className="flex items-center gap-2 py-2 hover:bg-base-200 font-bold">
                    <Mail className="w-4 h-4" />
                    <span>Contacto</span>
                  </Link>
                </li>
                <li className="border-t-2 border-black mt-2 pt-2">
                  <Link to="/logout" className="flex items-center gap-2 py-2 text-error font-bold hover:bg-base-200">
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar sesión</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;