import React from 'react';
import {
  CircleDashed,
  Search,
  MessageSquare,
  Folder,
  LayoutTemplate,
  FileText,
  Users,
  Clock,
  Settings,
  Moon,
  Sun
} from 'lucide-react';

const LeftSidebar = ({ isDark, toggleTheme }) => {
  const menuItems = [
    { icon: MessageSquare, label: 'AI Chat', active: true },
    // { icon: Folder, label: 'Projects' },
    // { icon: LayoutTemplate, label: 'Templates' },
    // { icon: FileText, label: 'Documents' },
    // { icon: Users, label: 'Community', badge: 'NEW' },
    { icon: Clock, label: 'History' },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 p-4">
      {/* Header */}
      <div className="hidden lg:flex items-center gap-2 mb-6 px-2">
        <CircleDashed className="w-6 h-6 text-gray-900 dark:text-gray-100" />
        <span className="font-bold text-xl tracking-tight">AskMe</span>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg py-2 pl-9 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 dark:text-gray-300 placeholder-gray-400"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden sm:inline-block border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">⌘K</kbd>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto -mx-2 px-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${item.active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500'}`} />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <Settings className="w-4 h-4 text-gray-500" />
          Settings & Help
        </button>

        <div className="flex items-center justify-between px-3 py-2">
           <div className="flex items-center gap-2">
             <div className="w-4 h-4 flex items-center justify-center">
                {isDark ? <Moon size={16} className="text-gray-400" /> : <Sun size={16} className="text-amber-500" />}
             </div>
             <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Dark Mode</span>
           </div>
           <button
             onClick={toggleTheme}
             className={`w-9 h-5 rounded-full relative transition-colors duration-300 focus:outline-none ${isDark ? 'bg-blue-600' : 'bg-gray-200'}`}
           >
             <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full shadow transition-transform duration-300 ${isDark ? 'translate-x-4' : 'translate-x-0'}`}></div>
           </button>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 mt-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border border-indigo-200 dark:border-indigo-800 group-hover:border-indigo-300 transition-colors">
             <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">EC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Emilia Caitlin</span>
            <span className="text-xs text-gray-500 dark:text-gray-500">@emiliacaitlin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
