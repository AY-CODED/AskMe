import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

  const RightSidebar = () => {
    const projects = [
      // { title: "Learning From 100 Years...", snippet: "Of Solitude by Gabriel Garcia..." },
      // { title: "Research officiants", snippet: "Look for officiants in the..." },
      // { title: "Write a sweet note", snippet: "To my partner for our anniv..." },
      // { title: "Quarterly Report", snippet: "Summarize Q3 financial res..." },
      // { title: "Travel Itinerary", snippet: "Japan trip planning for..." },
      // { title: "Gift Ideas", snippet: "List for upcoming holidays..." },
      // { title: "Website Redesign", snippet: "Notes on new color palet..." },
    ];

    return (
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Projects ({projects.length === 0 ? 'None' : projects.length})</h2>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

      {/* New Project Button */}
      <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all mb-4">
        <Plus className="w-4 h-4" />
        New Project
      </button>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all cursor-pointer group"
          >
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 truncate">
              {project.snippet}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
