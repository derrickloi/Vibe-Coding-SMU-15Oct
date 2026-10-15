import React, { useState } from 'react';
import { Search, Bookmark, User, CheckCircle, Menu, CloudSun, Moon, Sun, TrendingUp, ChevronDown } from 'lucide-react';
import { EDITIONS, SECTIONS, MARKET_INDICES } from '../data/articles';

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
  onOpenMegaMenu: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
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
  onOpenMegaMenu,
  isDarkMode,
  onToggleDarkMode,
  bookmarksCount,
  userEmail,
  isSubscribed
}) => {
  const [showMarketsFlyout, setShowMarketsFlyout] = useState(false);
  const [showWeatherFlyout, setShowWeatherFlyout] = useState(false);
  const [currentMarketIdx, setCurrentMarketIdx] = useState(0);

  const activeMarket = MARKET_INDICES[currentMarketIdx];

  const handleNextMarket = () => {
    setCurrentMarketIdx((prev) => (prev + 1) % MARKET_INDICES.length);
  };

  return (
    <header className="w-full max-w-[1280px] mx-auto px-5 pt-2 pb-1" data-purpose="top-utility">
      {/* Top utility row: Sections Menu, Edition Selector, Search, Bookmarks & Actions */}
      <div className="flex items-center justify-between text-[11px] text-[#555] font-nyt-sans pb-1">
        {/* Left utility: Menu button + Edition Selector */}
        <div className="flex items-center space-x-3 text-[11px]">
          <button
            onClick={onOpenMegaMenu}
            className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-black hover:text-[#326891] transition py-1 pr-2 border-r border-nyt"
            title="Browse all NYT sections"
          >
            <Menu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sections</span>
          </button>

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

        {/* Right utility: Search, Saved, Theme, Actions & Subscription */}
        <div className="flex items-center space-x-3">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-1 text-[#333] hover:text-black hover:underline px-1.5 py-1 text-xs"
            title="Search NYT articles (⌘K)"
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

          {/* Night Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 text-neutral-600 hover:text-black rounded hover:bg-neutral-100 transition"
            title={isDarkMode ? 'Switch to Day Mode' : 'Switch to Dark Reading Mode'}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5" />}
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
            <div className="flex items-center space-x-1 text-black text-[11px] font-medium px-2 py-1 bg-neutral-50 rounded border border-neutral-200">
              <User className="w-3 h-3 text-neutral-600" />
              <span className="truncate max-w-[90px]">{userEmail.split('@')[0]}</span>
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
      <div className="flex items-center justify-between text-[11.5px] text-[#666] pt-1 pb-2 border-b border-nyt relative">
        <div className="flex items-center space-x-3 font-nyt-sans">
          <span className="font-bold text-[#121212]">Wednesday, October 14, 2026</span>
          <button
            onClick={() => onSelectSection('all')}
            className="hover:underline text-[#666]"
          >
            Today’s Paper
          </button>
        </div>

        <div className="flex items-center space-x-4 text-[11px] relative">
          {/* Interactive Market Index Pill */}
          <div className="relative">
            <button
              onClick={() => setShowMarketsFlyout(!showMarketsFlyout)}
              className="flex items-center gap-1 font-medium hover:bg-neutral-50 px-1 py-0.5 rounded cursor-pointer transition"
              title="Click to view all market indices"
            >
              <TrendingUp className="w-3 h-3 text-neutral-400" />
              <span className="text-neutral-500 font-semibold">{activeMarket.symbol}</span>
              <span className={activeMarket.isPositive ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                {activeMarket.change} {activeMarket.isPositive ? '▲' : '▼'}
              </span>
              <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
            </button>

            {/* Markets Dropdown Flyout */}
            {showMarketsFlyout && (
              <div className="absolute right-0 top-6 z-40 bg-white border border-neutral-300 shadow-xl rounded-md p-3 w-56 text-left animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5 mb-2">
                  <span className="font-bold text-[10px] uppercase text-neutral-500">Major Market Indices</span>
                  <button onClick={handleNextMarket} className="text-[10px] text-[#326891] hover:underline">Cycle</button>
                </div>
                <div className="space-y-1.5">
                  {MARKET_INDICES.map((m) => (
                    <div key={m.symbol} className="flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-800">{m.symbol}</span>
                      <div className="text-right">
                        <span className="text-neutral-500 text-[11px] mr-1.5">{m.value}</span>
                        <span className={m.isPositive ? 'text-green-700 font-semibold' : 'text-red-600 font-semibold'}>
                          {m.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Weather Widget */}
          <div className="relative">
            <button
              onClick={() => setShowWeatherFlyout(!showWeatherFlyout)}
              className="flex items-center gap-1 text-[#555] hover:text-black hover:bg-neutral-50 px-1 py-0.5 rounded transition"
            >
              <CloudSun className="w-3.5 h-3.5 text-amber-500" />
              <span>64°F Partly Cloudy</span>
              <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
            </button>

            {/* Weather Dropdown Flyout */}
            {showWeatherFlyout && (
              <div className="absolute right-0 top-6 z-40 bg-white border border-neutral-300 shadow-xl rounded-md p-3 w-52 text-left animate-in fade-in zoom-in-95 duration-150">
                <div className="font-bold text-[10px] uppercase text-neutral-500 mb-1">New York, NY Forecast</div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-100">
                  <div>
                    <span className="text-xl font-bold font-nyt-serif">64°F</span>
                    <span className="text-[10px] text-neutral-500 block">Humidity: 54% • Wind 7mph</span>
                  </div>
                  <CloudSun className="w-7 h-7 text-amber-500" />
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-neutral-600">
                    <span>Thu: Mostly Sunny</span>
                    <span className="font-bold text-neutral-800">68° / 52°</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Fri: Light Rain</span>
                    <span className="font-bold text-neutral-800">62° / 49°</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Masthead Logo with classic Broadsheet Ears */}
      <div className="w-full py-4 relative flex items-center justify-between">
        {/* Left Ear */}
        <div className="hidden lg:block w-48 text-left text-[10.5px] font-nyt-serif italic text-neutral-500 leading-tight">
          <p className="not-italic font-bold text-black uppercase text-[9px] tracking-wider font-nyt-sans">
            “All the News That’s Fit to Print”
          </p>
          <p className="text-[10px] text-neutral-400 not-italic mt-0.5">VOL. CLXXVI... No. 60,305</p>
        </div>

        {/* Center Masthead */}
        <div className="flex-1 text-center">
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

        {/* Right Ear */}
        <div className="hidden lg:block w-48 text-right text-[10.5px] font-nyt-sans text-neutral-500 leading-tight">
          <span className="font-bold uppercase tracking-wider text-[9.5px] text-neutral-700 block">
            International Edition
          </span>
          <span className="text-[10px] text-neutral-400">Late Edition • €3.50</span>
        </div>
      </div>

      {/* Section Navigation Bar */}
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

      {/* SubBanner Alert with live breaking pulse */}
      <div className="pt-3">
        <div className="text-[12px] text-[#555] font-nyt-serif italic pb-2 border-b border-nyt flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="flex items-center gap-1.5 text-red-600 not-italic font-bold font-nyt-sans text-[10px] uppercase bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              Live
            </span>
            <span>
              These top stories are{' '}
              <strong className="font-bold text-black font-nyt-sans uppercase text-[11px] not-italic tracking-wider ml-0.5">
                free to read.
              </strong>
            </span>
          </div>
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
