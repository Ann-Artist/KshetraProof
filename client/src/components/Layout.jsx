import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export const Layout = ({ children, title = 'Dashboard' }) => {
  return (
    <div className="bg-backdrop min-h-screen p-2 sm:p-3 lg:p-4 font-sans">
      {/* Outer Forest Bezel Shell */}
      <div className="bg-forest-900 rounded-3xl shadow-2xl overflow-hidden border border-forest-800 flex min-h-[calc(100vh-2rem)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-canvas overflow-y-auto">
          <Header title={title} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
