import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100" style={{backgroundImage: "radial-gradient(circle, rgba(255,26,117,0.1) 10%, transparent 10%)", backgroundSize: "20px 20px"}}>
      <Header />
      <div className="flex-1 overflow-auto h-screen">
        <main className='min-h-screen py-4 px-4 sm:px-6 lg:px-8'>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
