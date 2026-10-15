import React from 'react';
import { X, Search, ChevronRight, Newspaper, Flame, Utensils, Award } from 'lucide-react';
import { MEGA_MENU_CATEGORIES } from '../data/articles';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: string) => void;
  onOpenGames: () => void;
  onOpenSearch: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onOpenGames,
  onOpenSearch
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-start transition-opacity animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-r border-neutral-300 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 border-b border-nyt flex items-center justify-between bg-neutral-50">
          <div className="flex items-center space-x-2">
            <span className="font-nyt-masthead text-2xl">The New York Times</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-200 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Shortcut */}
        <div className="p-4 border-b border-nyt bg-white">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded text-xs font-nyt-sans transition"
          >
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-neutral-400" />
              <span>Search articles, authors, topics...</span>
            </div>
            <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-neutral-200 font-mono">⌘K</span>
          </button>
        </div>

        {/* Quick Product Strip */}
        <div className="grid grid-cols-4 border-b border-nyt text-center text-xs font-nyt-sans divide-x divide-nyt bg-neutral-50/50">
          <button
            onClick={() => {
              onClose();
              onOpenGames();
            }}
            className="p-3 hover:bg-white transition flex flex-col items-center gap-1 group"
          >
            <span className="w-6 h-6 rounded bg-[#6aaa64] text-white flex items-center justify-center font-bold text-xs group-hover:scale-110 transition">W</span>
            <span className="font-bold text-[11px]">Games</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectSection('cooking');
            }}
            className="p-3 hover:bg-white transition flex flex-col items-center gap-1 group"
          >
            <span className="w-6 h-6 rounded bg-red-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition">
              <Utensils className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-[11px]">Cooking</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectSection('wirecutter');
            }}
            className="p-3 hover:bg-white transition flex flex-col items-center gap-1 group"
          >
            <span className="w-6 h-6 rounded bg-[#326891] text-white flex items-center justify-center text-xs group-hover:scale-110 transition">
              <Award className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-[11px]">Wirecutter</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectSection('theathletic');
            }}
            className="p-3 hover:bg-white transition flex flex-col items-center gap-1 group"
          >
            <span className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-xs group-hover:scale-110 transition">A</span>
            <span className="font-bold text-[11px]">The Athletic</span>
          </button>
        </div>

        {/* Categorized Directory */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {MEGA_MENU_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="border-b border-nyt pb-5 last:border-b-0">
              <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400 mb-3 font-nyt-sans">
                {cat.category}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm font-nyt-serif">
                {cat.links.map((link, lIdx) => (
                  <button
                    key={lIdx}
                    onClick={() => {
                      onClose();
                      if (link.toLowerCase().includes('games')) onOpenGames();
                      else if (link.toLowerCase().includes('world')) onSelectSection('world');
                      else if (link.toLowerCase().includes('politics')) onSelectSection('us');
                      else if (link.toLowerCase().includes('business')) onSelectSection('business');
                      else if (link.toLowerCase().includes('opinion')) onSelectSection('opinion');
                      else if (link.toLowerCase().includes('cooking')) onSelectSection('cooking');
                      else if (link.toLowerCase().includes('wirecutter')) onSelectSection('wirecutter');
                      else onSelectSection('all');
                    }}
                    className="text-left text-[#121212] hover:text-[#326891] hover:underline flex items-center justify-between py-1 group transition"
                  >
                    <span>{link}</span>
                    <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-[#326891] opacity-0 group-hover:opacity-100 transition" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Drawer Footer */}
        <div className="p-4 border-t border-nyt bg-neutral-50 flex items-center justify-between text-xs text-neutral-500 font-nyt-sans">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-4 h-4 text-neutral-600" />
            <span className="font-semibold text-neutral-800">International Edition</span>
          </div>
          <span>Published in Paris & New York</span>
        </div>
      </div>

      {/* Backdrop Click */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
