import React from 'react';
import { Search, Bookmark, User, CheckCircle } from 'lucide-react';
import { EDITIONS, SECTIONS } from '../data/articles';

interface HeaderProps {
  currentEdition: string;
  onSelectEdition: (editionId: string) => void;
  currentSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenSubscribe: () => void;
  onOpenAuth: () => void;
  onOpenGames: () => void;
  bookmarksCount: number;
  userEmail: string | null;
  isSubscribed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentEdition,
  onSelectEdition,
  currentSection,
  onSelectSection,
  onOpenSearch,
  onOpenBookmarks,
  onOpenSubscribe,
  onOpenAuth,
  onOpenGames,
  bookmarksCount,
  userEmail,
  isSubscribed
}) => {
  return (
    <header className="w-full max-w-[1280px] mx-auto px-5 pt-2 pb-1" data-purpose="top-utility">
      {/* Top utility row: Edition Selector, Search, Bookmarks & Actions */}
      <div className="flex items-center justify-between text-[11px] text-[#555] font-nyt-sans pb-1">
        {/* Left utility: Edition Selector */}
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-[#333] font-bold tracking-tight">EDITIONS:</span>
          {EDITIONS.map((ed) => {
            const isActive = currentEdition === ed.id;
            return (
              <button
                key={ed.id}
                onClick={() => onSelectEdition(ed.id)}
                className={
                  isActive
                    ? 'font-bold text-black border-b border-black pb-0.5'
                    : 'hover:underline text-[#333]'
                }
              >
                {ed.label}
              </button>
            );
          })}
        </div>

        {/* Right utility: Search, Saved, Actions & Subscription */}
        <div className="flex items-center space-x-3">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-1 text-[#333] hover:text-black hover:underline px-1.5 py-1 text-xs"
            title="Search NYT articles"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Reading List */}
          <button
            onClick={onOpenBookmarks}
            className="flex items-center space-x-1 text-[#333] hover:text-black hover:underline px-1.5 py-1 text-xs relative"
            title="Saved reading list"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Saved</span>
            {bookmarksCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center ml-0.5">
                {bookmarksCount}
              </span>
            )}
          </button>

          {isSubscribed ? (
            <span className="flex items-center space-x-1 bg-neutral-100 text-neutral-800 font-bold text-[10px] tracking-wider py-1 px-2.5 rounded-[3px] uppercase">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Subscriber</span>
            </span>
          ) : (
            <button
              onClick={onOpenSubscribe}
              className="bg-[#567b95] hover:bg-[#326891] text-white font-bold text-[10px] tracking-wider py-1.5 px-3 rounded-[3px] uppercase transition-colors"
            >
              Subscribe for €0.50/week
            </button>
          )}

          {userEmail ? (
            <div className="flex items-center space-x-1 text-black text-[11px] font-medium px-2 py-1 bg-neutral-50 rounded">
              <User className="w-3 h-3 text-neutral-600" />
              <span className="truncate max-w-[100px]">{userEmail.split('@')[0]}</span>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="font-medium text-black hover:underline px-2 py-1"
            >
              Log in
            </button>
          )}
        </div>
      </div>

      {/* Date line, Today's Paper & Stock info */}
      <div className="flex items-center justify-between text-[11.5px] text-[#666] pt-1 pb-2 border-b border-nyt">
        <div className="flex items-center space-x-3 font-nyt-sans">
          <span className="font-bold text-[#121212]">Wednesday, October 14, 2026</span>
          <button
            onClick={() => onSelectSection('all')}
            className="hover:underline text-[#666]"
          >
            Today’s Paper
          </button>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="flex items-center gap-1 font-medium">
            <span className="text-neutral-500">S&P 500</span>
            <span className="text-green-700 font-semibold">+0.38% ▲</span>
          </span>
          <span className="text-[#555]">64°F Partly Cloudy</span>
        </div>
      </div>

      {/* Masthead Logo */}
      <div className="w-full text-center py-4">
        <button
          onClick={() => onSelectSection('all')}
          className="inline-block cursor-pointer group"
          title="Return to Front Page"
        >
          <h1 className="font-nyt-masthead text-[62px] md:text-[76px] leading-[1] text-[#121212] tracking-tight group-hover:opacity-90 transition-opacity">
            The New York Times
          </h1>
        </button>
      </div>

      {/* Section Navigation */}
      <nav className="w-full" data-purpose="site-sections">
        <div className="border-y border-nyt py-1.5 flex items-center justify-between text-[11.5px] text-[#121212] font-nyt-sans overflow-x-auto no-scrollbar">
          {SECTIONS.filter((s) => s.id !== 'all').map((section) => {
            const hasChevron = ['us', 'world', 'business', 'arts', 'lifestyle', 'opinion'].includes(
              section.id
            );
            const isCurrent = currentSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => {
                  if (section.id === 'games') {
                    onOpenGames();
                  } else {
                    onSelectSection(isCurrent ? 'all' : section.id);
                  }
                }}
                className={`font-semibold hover:underline flex items-center gap-0.5 whitespace-nowrap px-1.5 py-0.5 transition ${
                  isCurrent ? 'text-[#326891] underline' : ''
                }`}
              >
                <span>{section.label}</span>
                {hasChevron && <span className="text-[9px] text-neutral-400">▾</span>}
              </button>
            );
          })}
        </div>
      </nav>

      {/* SubBanner Alert */}
      <div className="pt-3">
        <div className="text-[12px] text-[#555] font-nyt-serif italic pb-2 border-b border-nyt flex items-center justify-between">
          <span>
            These top stories are{' '}
            <strong className="font-bold text-black font-nyt-sans uppercase text-[11px] not-italic tracking-wider ml-1">
              free to read.
            </strong>
          </span>
          <span className="text-[11px] font-nyt-sans not-italic text-neutral-400 uppercase">
            {currentEdition === 'intl'
              ? 'INTERNATIONAL EDITION • UPDATED JUST NOW'
              : `${currentEdition.toUpperCase()} EDITION • UPDATED JUST NOW`}
          </span>
        </div>
      </div>
    </header>
  );
};
