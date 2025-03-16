// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '@/components/common/header';

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden min-h-screen bg-base-100" style={{backgroundImage: "radial-gradient(circle, rgba(255,26,117,0.1) 10%, transparent 10%)", backgroundSize: "20px 20px"}}>
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header/>
        <div className="flex-1 overflow-auto h-screen">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;