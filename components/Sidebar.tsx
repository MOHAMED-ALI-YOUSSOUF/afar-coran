import React from 'react';

interface SidebarProps {
  pages: Record<string, { image: string; audio: string }>;
  onPageSelect: (pageNum: number) => void;
  selectedPage: number;
}

const Sidebar: React.FC<SidebarProps> = ({ pages, onPageSelect, selectedPage }) => {
  return (
    <div className="w-32 bg-gray-800 text-white p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Pages</h2>
      <ul className="space-y-2">
        {Object.keys(pages).map((pageKey) => {
          const pageNum = parseInt(pageKey.split('_')[1]);
          return (
            <li
              key={pageKey}
              className={`cursor-pointer p-2 rounded ${
                selectedPage === pageNum ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
              onClick={() => onPageSelect(pageNum)}
            >
              Page {pageNum}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;