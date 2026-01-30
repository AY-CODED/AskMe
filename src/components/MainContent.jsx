import React from 'react';
import {
  Pencil,
  Image as ImageIcon,
  User,
  Code,
  Plus,
  Paperclip,
  Mic,
  Globe
} from 'lucide-react';

const MainContent = () => {
  const actions = [
    {
      icon: Pencil,
      label: 'Write copy',
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    },
    {
      icon: ImageIcon,
      label: 'Image generation',
      color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
    },
    {
      icon: User,
      label: 'Create avatar',
      color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Code,
      label: 'Write code',
      color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    },
  ];

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-32 overflow-y-auto">
        <div className="max-w-2xl w-full space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Welcome to Script
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Get started by Script a task and Chat can do the rest.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {actions.map((action) => (
              <button
                key={action.label}
                className="group flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {action.label}
                  </span>
                </div>
                <div className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-400 transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area (Bottom Floating) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-950 dark:via-gray-950 dark:to-transparent pt-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4">
            <textarea
              placeholder="Summarize the latest..."
              className="w-full h-12 resize-none bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 text-base"
            ></textarea>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 gap-2">
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                  <Paperclip className="w-4 h-4" />
                  Attach
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                  <Mic className="w-4 h-4" />
                  Voice Message
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                  <Globe className="w-4 h-4" />
                  Browse Prompts
                </button>
              </div>

              <div className="text-xs text-gray-400 font-medium whitespace-nowrap ml-auto sm:ml-0">
                20/3,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
