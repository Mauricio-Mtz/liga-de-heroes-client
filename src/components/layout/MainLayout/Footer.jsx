// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    
    <footer className="bg-white border-t py-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Liga de Heroes. Todos los derechos reservados.
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6">
            <Link to="/about" className="text-gray-500 hover:text-indigo-600">
              Acerca de
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-indigo-600">
              Privacidad
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-indigo-600">
              Términos
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-indigo-600">
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;