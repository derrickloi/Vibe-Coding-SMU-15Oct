import React from 'react';

interface FooterProps {
  onOpenSubscribe: () => void;
  onOpenGames: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubscribe, onOpenGames }) => {
  return (
    <footer className="w-full border-t-2 border-black pt-6 pb-12 bg-white" data-purpose="site-footer">
      <div className="max-w-[1280px] mx-auto px-5">
        {/* Footer Logo */}
        <div className="mb-4">
          <h2 className="font-nyt-masthead text-[28px] text-[#121212]">The New York Times</h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-[11px] text-[#333] border-b border-nyt pb-8 font-nyt-sans">
          <div>
            <h4 className="font-bold text-[11.5px] text-black mb-2 uppercase">News</h4>
            <ul className="space-y-1 text-[#555]">
              <li><a className="hover:underline" href="#top">Home Page</a></li>
              <li><a className="hover:underline" href="#world">World News</a></li>
              <li><a className="hover:underline" href="#us">U.S. Politics</a></li>
              <li><a className="hover:underline" href="#climate">Climate & Energy</a></li>
              <li><a className="hover:underline" href="#business">Business & Tech</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11.5px] text-black mb-2 uppercase">Opinion</h4>
            <ul className="space-y-1 text-[#555]">
              <li><a className="hover:underline" href="#opinion">Editorials</a></li>
              <li><a className="hover:underline" href="#opinion">Guest Essays</a></li>
              <li><a className="hover:underline" href="#opinion">Columnists</a></li>
              <li><a className="hover:underline" href="#opinion">Letters</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11.5px] text-black mb-2 uppercase">Arts</h4>
            <ul className="space-y-1 text-[#555]">
              <li><a className="hover:underline" href="#arts">Books Review</a></li>
              <li><a className="hover:underline" href="#arts">Movies & TV</a></li>
              <li><a className="hover:underline" href="#arts">Music & Popcast</a></li>
              <li><a className="hover:underline" href="#arts">Visual Arts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11.5px] text-black mb-2 uppercase">Living</h4>
            <ul className="space-y-1 text-[#555]">
              <li><a className="hover:underline" href="#cooking">Cooking</a></li>
              <li><a className="hover:underline" href="#wirecutter">Wirecutter</a></li>
              <li><a className="hover:underline" href="#theathletic">The Athletic</a></li>
              <li><a className="hover:underline" href="#well">Well & Health</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11.5px] text-black mb-2 uppercase">More</h4>
            <ul className="space-y-1 text-[#555]">
              <li><a className="hover:underline" href="#reader-center">Reader Center</a></li>
              <li><a className="hover:underline" href="#podcasts">Podcasts</a></li>
              <li><a className="hover:underline" href="#video">Video</a></li>
              <li><a className="hover:underline" href="#live-events">Live Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11.5px] text-black mb-2 uppercase">Subscribe</h4>
            <ul className="space-y-1 text-[#555]">
              <li>
                <button onClick={onOpenSubscribe} className="hover:underline font-semibold text-[#326891] text-left">
                  Home Delivery
                </button>
              </li>
              <li>
                <button onClick={onOpenSubscribe} className="hover:underline font-semibold text-[#326891] text-left">
                  Digital Subscriptions
                </button>
              </li>
              <li>
                <button onClick={onOpenGames} className="hover:underline text-left">
                  Crossword & Games
                </button>
              </li>
              <li>
                <a className="hover:underline" href="#cooking">Cooking Only</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright row */}
        <div className="pt-5 flex flex-wrap items-center justify-between text-[10.5px] text-[#727272] font-nyt-sans">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <span>© 2026 The New York Times Company</span>
            <a className="hover:underline" href="#nytco">NYTCo</a>
            <a className="hover:underline" href="#contact">Contact Us</a>
            <a className="hover:underline" href="#accessibility">Accessibility</a>
            <a className="hover:underline" href="#work">Work with us</a>
            <a className="hover:underline" href="#advertise">Advertise</a>
            <a className="hover:underline" href="#privacy">Privacy Policy</a>
            <a className="hover:underline" href="#terms">Terms of Service</a>
            <a className="hover:underline" href="#sitemap">Site Map</a>
          </div>
          <div>
            <span>International Edition • Published in Paris & New York</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
