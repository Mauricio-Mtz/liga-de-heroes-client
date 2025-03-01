// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { Search, User, Bell } from 'lucide-react'; // Asumiendo que usas lucide-react para íconos

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Toggle */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center ml-4 lg:ml-0">
              <span className="text-xl font-bold text-indigo-600">Liga de Heroes</span>
            </Link>
          </div>

          {/* Center: Navigation - Desktop */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Inicio</Link>
            <Link to="/champions" className="text-gray-700 hover:text-indigo-600">Campeones</Link>
            <Link to="/items" className="text-gray-700 hover:text-indigo-600">Items</Link>
            <Link to="/builds" className="text-gray-700 hover:text-indigo-600">Builds</Link>
            <Link to="/compare" className="text-gray-700 hover:text-indigo-600">Comparar</Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <Link to="/profile" className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;