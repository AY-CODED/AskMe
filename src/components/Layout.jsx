import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Layout = ({ leftSidebar, rightSidebar, children, isDark, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="font-bold text-xl flex items-center gap-2">
           <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-600 dark:border-gray-400"></div>
           AskMe
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Left Sidebar - Drawer on Mobile, Fixed on Desktop */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-full ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} pt-16 lg:pt-0 flex flex-col`}>
        {/* Pass toggleTheme down to sidebar if valid element */}
        {React.isValidElement(leftSidebar)
          ? React.cloneElement(leftSidebar, { isDark, toggleTheme })
          : leftSidebar}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative pt-16 lg:pt-0 bg-white dark:bg-gray-950">
        {children}
      </main>

      {/* Right Sidebar - Hidden on Mobile */}
      <div className="hidden lg:flex w-80 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 h-full flex-col">
        {rightSidebar}
      </div>

      {/* Mobile Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
