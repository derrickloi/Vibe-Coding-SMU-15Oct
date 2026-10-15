/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { GamesModal } from './components/GamesModal';
import { SearchModal } from './components/SearchModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { SubscribeModal } from './components/SubscribeModal';
import { AuthModal } from './components/AuthModal';
import { AudioBar } from './components/AudioBar';
import { ARTICLES_DATA, PHOTOGRAPHERS, Article } from './data/articles';

export default function App() {
  const [currentEdition, setCurrentEdition] = useState<string>('intl');
  const [currentSection, setCurrentSection] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeGame, setActiveGame] = useState<'wordle' | 'connections' | 'spelling-bee' | 'mini' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [audioArticle, setAudioArticle] = useState<Article | null>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['trump-press-secretary']);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getArticle = (id: string): Article => {
    return ARTICLES_DATA.find((a) => a.id === id) || ARTICLES_DATA[0];
  };

  const savedArticles = ARTICLES_DATA.filter((a) => bookmarkedIds.includes(a.id));

  // Filtered view when section is active
  const isSectionFiltered = currentSection !== 'all';
  const sectionFilteredArticles = ARTICLES_DATA.filter((a) => {
    if (currentSection === 'us') return a.section === 'U.S. Politics';
    if (currentSection === 'world') return a.section === 'World';
    if (currentSection === 'business') return a.section === 'Business';
    if (currentSection === 'arts') return a.section === 'Arts';
    if (currentSection === 'lifestyle') return a.section === 'Lifestyle';
    if (currentSection === 'opinion') return a.section === 'Opinion';
    if (currentSection === 'wirecutter') return a.section === 'Wirecutter';
    return true;
  });

  return (
    <div className="bg-[#ffffff] text-[#121212] font-nyt-sans antialiased min-h-screen flex flex-col selection:bg-neutral-200">
      {/* Top Header */}
      <Header
        currentEdition={currentEdition}
        onSelectEdition={setCurrentEdition}
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenGames={() => setActiveGame('wordle')}
        bookmarksCount={bookmarkedIds.length}
        userEmail={userEmail}
        isSubscribed={isSubscribed}
      />

      {/* Main Content Area */}
      {isSectionFiltered ? (
        /* Section-filtered view */
        <main className="w-full max-w-[1280px] mx-auto px-5 pt-6 pb-12 flex-1">
          <div className="border-b-2 border-black pb-2 mb-6 flex items-center justify-between">
            <h2 className="font-nyt-serif text-3xl font-bold uppercase tracking-tight text-[#121212]">
              {currentSection.toUpperCase()}
            </h2>
            <button
              onClick={() => setCurrentSection('all')}
              className="text-xs font-semibold text-[#326891] hover:underline"
            >
              ← Back to Front Page
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectionFilteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group cursor-pointer border-b border-nyt pb-6"
              >
                {art.imageUrl && (
                  <div className="mb-3 overflow-hidden bg-neutral-100 border border-nyt-light">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-48 object-cover group-hover:opacity-95 transition-opacity"
                    />
                  </div>
                )}
                {art.tag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#b30000] block mb-1">
                    {art.tag}
                  </span>
                )}
                <h3 className="font-nyt-serif text-xl font-bold leading-tight group-hover:text-[#555] mb-2">
                  {art.title}
                </h3>
                <p className="font-nyt-serif text-sm text-[#444] leading-relaxed mb-3">
                  {art.excerpt}
                </p>
                <div className="text-[11px] text-[#777] flex items-center space-x-2">
                  <span>{art.readTime}</span>
                  <span>•</span>
                  <span>{art.byline}</span>
                </div>
              </article>
            ))}
          </div>
        </main>
      ) : (
        /* Full Front Page Edition matching the exact user design */
        <>
          <main className="w-full max-w-[1280px] mx-auto px-5 pt-4 pb-12">
            {/* Grid container with 4 column layout (3 cols, 4 cols, 3 cols, 2 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8">
              {/* COLUMN 1: Lead Sub-Stories (3 columns wide) */}
              <section
                className="col-span-12 md:col-span-3 md:border-r border-nyt md:pr-5 flex flex-col justify-between"
                data-purpose="col-left-lead"
              >
                {/* Story 1 */}
                <article
                  onClick={() => setSelectedArticle(getArticle('women-leaving-trump-admin'))}
                  className="pb-5 border-b border-nyt group cursor-pointer"
                >
                  <h2 className="font-nyt-serif text-[24px] font-bold leading-[1.18] text-[#121212] group-hover:text-[#555] transition-colors mb-2">
                    High-Ranking Women Are Leaving the Trump Administration
                  </h2>
                  <p className="font-nyt-serif text-[13.5px] leading-[1.4] text-[#333] mb-2.5">
                    In the president’s second term, those heading for the exits are female officials.
                  </p>
                  <div className="flex items-center space-x-2 text-[11px] text-[#727272]">
                    <span>5 min read</span>
                    <span>•</span>
                    <span className="hover:underline">Tierney L. Cross</span>
                  </div>
                </article>

                {/* Story 2 */}
                <article
                  onClick={() => setSelectedArticle(getArticle('guilfoyle-rise-and-fall'))}
                  className="pt-5 pb-5 border-b border-nyt group cursor-pointer"
                >
                  <h3 className="font-nyt-serif text-[18px] font-bold leading-[1.22] text-[#121212] group-hover:text-[#555] transition-colors mb-1.5">
                    The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                  </h3>
                  <p className="font-nyt-serif text-[12.5px] leading-[1.4] text-[#555] mb-2">
                    The former campaign aide and envoy nominee's rapid retreat highlights widening fractures among loyalists.
                  </p>
                  <div className="flex items-center text-[11px] text-[#727272] space-x-3">
                    <span className="flex items-center gap-1 font-nyt-sans text-[#326891] font-semibold">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
                        <path d="M14 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v3l4-3h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                      </svg>
                      519
                    </span>
                    <span>4 min read</span>
                  </div>
                </article>

                {/* Photographers strip */}
                <div className="pt-4 text-[11px] text-[#666]">
                  <span className="font-bold text-[10px] tracking-wider uppercase text-neutral-400 block mb-2">
                    Photographers on Scene
                  </span>
                  <ul className="space-y-1 text-[11px] text-[#444] italic font-nyt-serif">
                    {PHOTOGRAPHERS.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Filler Bottom Lead snippet */}
                <article
                  onClick={() => setSelectedArticle(getArticle('cornell-president-faculty'))}
                  className="pt-5 mt-auto group cursor-pointer"
                >
                  <span className="text-[10px] font-bold tracking-wider text-[#b30000] uppercase block mb-1">
                    Investigation
                  </span>
                  <h4 className="font-nyt-serif text-[15px] font-bold leading-snug mb-1 group-hover:underline text-[#121212]">
                    Cornell’s President Is Grilled by Faculty Senate Over Handling of Allegations
                  </h4>
                  <span className="text-[11px] text-[#777]">4 min read</span>
                </article>
              </section>

              {/* COLUMN 2: Centerpiece Visual Feature (4 columns wide) */}
              <section
                className="col-span-12 md:col-span-4 md:border-r border-nyt md:pr-5 flex flex-col"
                data-purpose="col-centerpiece"
              >
                {/* Large Center Featured Image */}
                <div
                  onClick={() => setSelectedArticle(getArticle('trump-press-secretary'))}
                  className="w-full mb-3 overflow-hidden bg-neutral-100 border border-nyt-light cursor-pointer group"
                >
                  <img
                    alt="Kimberly Guilfoyle speaking at briefing"
                    className="w-full h-auto object-cover group-hover:opacity-95 transition-opacity duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA87yIoWFSfTFNmeogUxelNEu_1AtPpv5aSDjdMsfktGQ3gNguMF6GG6HvRI0FNHo5cCnAe-0IMA5nCZpVEEwaBI_bnhC4XzoAjtPkQHnlIDyz0HJXG-7dJ4Y-qRqhUlMvrwNAP-G94SF9EDDr_Hr4OP5S1IIUN0auQo4HZQdX09dUIuTY6EKsVjfYImWtNrfWMkayo1FvroHT-Yv9gyBqT31F1llDWLERDNuVYmZUYgwNyv7vttGiv"
                  />
                  <div className="p-1.5 text-right text-[10px] text-[#777] font-nyt-sans">
                    Kenny Holston/The New York Times
                  </div>
                </div>

                {/* Centerpiece Headline & Lead Summary */}
                <article
                  onClick={() => setSelectedArticle(getArticle('trump-press-secretary'))}
                  className="pb-4 group cursor-pointer"
                >
                  <h2 className="font-nyt-serif text-[27px] font-bold leading-[1.14] text-[#121212] mb-2 group-hover:text-[#555] transition-colors">
                    Trump’s New Press Secretary: Not-Quite Attorney at Law
                  </h2>
                  <p className="font-nyt-serif text-[14px] leading-[1.45] text-[#333] mb-3">
                    Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding.
                  </p>
                  <div className="flex items-center text-[11px] text-[#727272] space-x-2">
                    <span>4 min read</span>
                    <span>•</span>
                    <span className="text-neutral-500 font-nyt-sans">White House Bureau</span>
                  </div>
                </article>

                <div className="border-t border-nyt pt-4 mt-2">
                  {/* Great Read Sub-feature */}
                  <article
                    onClick={() => setSelectedArticle(getArticle('shelly-coach-coming-out'))}
                    className="group cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#567b95] block mb-1">
                      The Great Read
                    </span>
                    <h4 className="font-nyt-serif text-[18px] font-bold leading-tight mb-1.5 group-hover:underline text-[#121212]">
                      Coming Out at 50 Can Be Hard. Shelly Found a Coach.
                    </h4>
                    <p className="font-nyt-serif text-[12.5px] leading-relaxed text-[#444] mb-2">
                      She spent decades building an identity as a wife and mother. Could she disrupt “a perfectly good family dynamic” to live her own truth?
                    </p>
                    <span className="text-[11px] text-[#777]">Sophie Park for The New York Times</span>
                  </article>
                </div>
              </section>

              {/* COLUMN 3: Right News Analysis & Russia-Ukraine Module (3 columns wide) */}
              <section
                className="col-span-12 md:col-span-3 md:border-r border-nyt md:pr-5 flex flex-col space-y-4"
                data-purpose="col-right-news"
              >
                {/* Russia-Ukraine War Themed Module */}
                <div className="bg-[#f9f9f9] p-3.5 border-t-2 border-[#121212] border-x border-b border-nyt">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-nyt">
                    <span className="font-bold text-[12px] uppercase tracking-wider text-[#121212]">
                      Russia-Ukraine War
                    </span>
                    <span className="text-[10px] font-semibold text-red-700 uppercase bg-red-100 px-1 rounded">
                      Update
                    </span>
                  </div>

                  {/* Key updates list */}
                  <ul className="text-[12px] space-y-1.5 pb-2.5 mb-2.5 border-b border-nyt font-nyt-sans font-semibold text-[#121212]">
                    <li
                      onClick={() => setSelectedArticle(getArticle('ukraine-satellite-russia-escalates'))}
                      className="flex items-baseline space-x-1 hover:text-[#326891] cursor-pointer"
                    >
                      <span className="text-red-700 mr-1">•</span>
                      <span>Wins for Putin</span>
                    </li>
                    <li
                      onClick={() => setSelectedArticle(getArticle('ukraine-satellite-russia-escalates'))}
                      className="flex items-baseline space-x-1 hover:text-[#326891] cursor-pointer"
                    >
                      <span className="text-red-700 mr-1">•</span>
                      <span>Escalating Assaults</span>
                    </li>
                    <li
                      onClick={() => setSelectedArticle(getArticle('trump-diesel-deal-putin'))}
                      className="flex items-baseline space-x-1 hover:text-[#326891] cursor-pointer"
                    >
                      <span className="text-red-700 mr-1">•</span>
                      <span>Russian Oil Deal</span>
                    </li>
                  </ul>

                  {/* Main topic article */}
                  <article
                    onClick={() => setSelectedArticle(getArticle('ukraine-satellite-russia-escalates'))}
                    className="group cursor-pointer"
                  >
                    <h3 className="font-nyt-serif text-[16.5px] font-bold leading-tight mb-1.5 group-hover:underline text-[#121212]">
                      Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates
                    </h3>
                    <p className="font-nyt-serif text-[12px] leading-normal text-[#444] mb-2">
                      A huge attack cut power to 600,000 people in Kyiv, and a Pentagon-funded satellite program was curbed.
                    </p>
                    <div className="flex items-center text-[10.5px] text-[#727272] space-x-2">
                      <span className="text-[#326891] font-bold flex items-center gap-0.5">
                        💬 1.1k
                      </span>
                      <span>•</span>
                      <span>6 min read</span>
                    </div>
                  </article>
                </div>

                {/* Secondary analytical pieces */}
                <article
                  onClick={() => setSelectedArticle(getArticle('trump-diesel-deal-putin'))}
                  className="pb-3 border-b border-nyt group cursor-pointer"
                >
                  <h4 className="font-nyt-serif text-[15px] font-bold leading-snug mb-1 group-hover:underline text-[#121212]">
                    Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices
                  </h4>
                  <span className="text-[11px] text-[#777]">4 min read</span>
                </article>

                <article
                  onClick={() => setSelectedArticle(getArticle('us-intelligence-ukraine'))}
                  className="pb-3 border-b border-nyt group cursor-pointer"
                >
                  <h4 className="font-nyt-serif text-[15px] font-bold leading-snug mb-1 group-hover:underline text-[#121212]">
                    The U.S. Continues to Provide Intelligence to Ukraine, Officials Say
                  </h4>
                  <span className="text-[11px] text-[#777]">3 min read</span>
                </article>

                {/* Science & Health Alert */}
                <article
                  onClick={() => setSelectedArticle(getArticle('lung-cancer-pope-leo'))}
                  className="pt-1 group cursor-pointer"
                >
                  <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 block mb-1">
                    Health & The Vatican
                  </span>
                  <h4 className="font-nyt-serif text-[15px] font-bold leading-snug mb-1 group-hover:underline text-[#121212]">
                    A New World of Lung Cancer Therapy Awaits Pope Leo
                  </h4>
                  <p className="font-nyt-serif text-[12px] leading-relaxed text-[#555] mb-1.5">
                    Lung cancer rates dropped by half since the 1990s as personalized genetic targeted therapies advance rapidly.
                  </p>
                  <span className="text-[11px] text-[#326891] font-semibold">126 comments</span>
                </article>
              </section>

              {/* COLUMN 4: Opinion Columnists & Quick Links (2 columns wide) */}
              <section
                className="col-span-12 md:col-span-2 flex flex-col space-y-4"
                data-purpose="col-opinion-and-meta"
              >
                <div>
                  <div className="border-b-2 border-black pb-1 mb-3">
                    <h3 className="font-nyt-serif text-[16px] font-bold text-black uppercase tracking-wide">
                      Opinion
                    </h3>
                  </div>

                  <div className="space-y-4 text-[#121212]">
                    {/* Opinion 1 */}
                    <article
                      onClick={() => setSelectedArticle(getArticle('opinion-democrats-two-years'))}
                      className="border-b border-nyt pb-3 group cursor-pointer"
                    >
                      <span className="font-nyt-sans text-[11px] font-bold text-[#444] block mb-0.5">
                        David Wallace-Wells
                      </span>
                      <h4 className="font-nyt-serif text-[14px] font-bold leading-tight group-hover:underline mb-1">
                        Democrats Shouldn’t Wait Two More Years
                      </h4>
                      <span className="text-[10.5px] text-[#326891] font-semibold">💬 388</span>
                    </article>

                    {/* Opinion 2 */}
                    <article
                      onClick={() => setSelectedArticle(getArticle('opinion-ebola-spread'))}
                      className="border-b border-nyt pb-3 group cursor-pointer"
                    >
                      <span className="font-nyt-sans text-[11px] font-bold text-[#444] block mb-0.5">
                        Heather Kerr
                      </span>
                      <h4 className="font-nyt-serif text-[14px] font-bold leading-tight group-hover:underline mb-1">
                        I’ve Never Seen Ebola Spread Like This
                      </h4>
                      <span className="text-[10.5px] text-[#777]">Guest Essay</span>
                    </article>

                    {/* Opinion 3 */}
                    <article
                      onClick={() => setSelectedArticle(getArticle('opinion-manifesto-manifestoes'))}
                      className="border-b border-nyt pb-3 group cursor-pointer"
                    >
                      <span className="font-nyt-sans text-[11px] font-bold text-[#444] block mb-0.5">
                        Carlos Lozada
                      </span>
                      <h4 className="font-nyt-serif text-[14px] font-bold leading-tight group-hover:underline mb-1">
                        A Manifesto to End All Manifestoes
                      </h4>
                      <span className="text-[10.5px] text-[#326891] font-semibold">💬 69</span>
                    </article>

                    {/* Opinion 4 */}
                    <article
                      onClick={() => setSelectedArticle(getArticle('opinion-tom-cruise-flop'))}
                      className="group cursor-pointer"
                    >
                      <span className="font-nyt-sans text-[11px] font-bold text-[#444] block mb-0.5">
                        Jayson Greene
                      </span>
                      <h4 className="font-nyt-serif text-[14px] font-bold leading-tight group-hover:underline mb-1">
                        Tom Cruise’s Big Flop Is a Secret Masterpiece
                      </h4>
                      <span className="text-[10.5px] text-[#777]">5 min read</span>
                    </article>
                  </div>
                </div>

                {/* Wirecutter Feature Tile */}
                <div
                  onClick={() => setSelectedArticle(getArticle('wirecutter-stick-vacuums'))}
                  className="bg-[#f7f7f7] border border-nyt p-3 text-center mt-auto cursor-pointer hover:bg-neutral-100 transition"
                >
                  <span className="text-[9px] uppercase tracking-widest text-[#888] font-bold block mb-1">
                    From Wirecutter
                  </span>
                  <p className="font-nyt-serif text-[12.5px] font-semibold leading-snug hover:underline">
                    The 6 Best Cordless Stick Vacuums of 2026
                  </p>
                </div>
              </section>
            </div>
          </main>

          {/* Midpage Editorial Separator */}
          <div className="w-full max-w-[1280px] mx-auto px-5 mb-6">
            <div className="border-t-2 border-black pt-2 flex items-center justify-between text-[11px] uppercase tracking-wider font-bold">
              <span>More to Read for Free</span>
              <span className="text-neutral-400 font-normal lowercase italic text-[12px] font-nyt-serif">
                Continued international coverage
              </span>
            </div>
          </div>

          {/* Secondary Sections Grid (4 columns) */}
          <section className="w-full max-w-[1280px] mx-auto px-5 pb-12" data-purpose="secondary-news-blocks">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Section: The World */}
              <article
                onClick={() => setSelectedArticle(getArticle('angry-youth-aging-europe'))}
                className="border-t border-nyt pt-3 group cursor-pointer"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#121212] block mb-2">
                  The World
                </span>
                <div className="mb-2 bg-neutral-100 overflow-hidden">
                  <img
                    alt="European protest scene"
                    className="w-full h-auto object-cover group-hover:opacity-95 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP90-K-NAKnfzRTlUGSvAwo6UXIEUz6WC0dr-FXM4gpeBQ7ZlikzFC7_9m0g4zsGUMi2cMgKg0UYF7qY0zYut5SGskN1_sW9E3OyGY80oFEGqTbeYX0ErvDMM_1koQXavtBJUkt0kX7wPVLWcFxhf8_qNXnokA-6ngmBl5cGzDimZVX40f6DE8PFOPvxINxmxn9DN7tpvjhmloTz2sWeT05HJskGu5AZIuMc-Qkg5XycOSqO9F1gs-"
                  />
                </div>
                <h4 className="font-nyt-serif text-[17px] font-bold leading-snug mb-1.5 group-hover:underline">
                  Angry Youth in Aging Europe
                </h4>
                <p className="font-nyt-serif text-[12.5px] text-[#444] leading-normal mb-2">
                  A bitter generational battle over resources is boiling over as economic growth on the continent stalls.
                </p>
                <span className="text-[11px] text-[#777]">7 min read • Christophe Archambault</span>
              </article>

              {/* Section: Artificial Intelligence */}
              <article
                onClick={() => setSelectedArticle(getArticle('ai-agents-dinner-party'))}
                className="border-t border-nyt pt-3 group cursor-pointer"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#121212] block mb-2">
                  Technology & A.I.
                </span>
                <div className="mb-2 bg-neutral-100 overflow-hidden">
                  <img
                    alt="Artificial intelligence graphic"
                    className="w-full h-auto object-cover group-hover:opacity-95 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1qLbv7Cr3h4deqE6ZSM1uwt06LJJTI4JU-a5vt81QHQ8yuSNzLhQB_MtQBhXS8r19RGvqrCHEMAVewAiOU4IvbG3YQHFulQxYQhAW2S5f6TNMo2zpf49-Tq1t8OuEwu8gmDiNnwYBm3g5wE2oRN4zVvfeuuGFtXiNP91BhsM8kAqwcPfxKpEatKXYbbfPydvejhIFa54z4GWLnZy_2ao1b_DnrlCacnRnqaPAjCyXiG8vb-XRk7q7"
                  />
                </div>
                <h4 className="font-nyt-serif text-[17px] font-bold leading-snug mb-1.5 group-hover:underline">
                  What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party
                </h4>
                <p className="font-nyt-serif text-[12.5px] text-[#444] leading-normal mb-2">
                  As digital entities multiply, we get a glimpse into how bots communicate with one another behind closed doors.
                </p>
                <span className="text-[11px] text-[#326891] font-semibold">💬 210 • Aaron Fernandez</span>
              </article>

              {/* Section: Well & Longevity */}
              <article
                onClick={() => setSelectedArticle(getArticle('longevity-experts-stop-saying'))}
                className="border-t border-nyt pt-3 group cursor-pointer"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#121212] block mb-2">
                  Well
                </span>
                <div className="mb-2 bg-neutral-100 overflow-hidden">
                  <img
                    alt="Longevity illustration"
                    className="w-full h-auto object-cover group-hover:opacity-95 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnVHPICkB-U0a-kESbwyz6bE3rZL1b2Md9kWz7Q5Ddn0rqXOStjfXNz2YAihf9QoF1mvBfzQ_XquCDTCY5M2XttnPNx98tG-wS3y7myp-I6lV73Yy1RVS2oQDh_nX77R1vBD__rh8lWsSJbnvHDwdjRF6zdvlZoHlNVP5TCPPj5xlCUHQ6zKdEGbmQUPGMJhRw4i0AmsnQ7CPMZBl3iPDnufHj0WfHo4EBvSWJU5vLZTDEKQGe_Zur"
                  />
                </div>
                <h4 className="font-nyt-serif text-[17px] font-bold leading-snug mb-1.5 group-hover:underline">
                  6 Things Longevity Experts Wish People Would Stop Saying
                </h4>
                <p className="font-nyt-serif text-[12.5px] text-[#444] leading-normal mb-2">
                  Living longer and healthier is important. But don’t believe everything you hear about rapid reverse-aging.
                </p>
                <span className="text-[11px] text-[#326891] font-semibold">💬 591 • Elena Boils</span>
              </article>

              {/* Section: Culture & Books */}
              <article
                onClick={() => setSelectedArticle(getArticle('sally-rooney-books-britain'))}
                className="border-t border-nyt pt-3 group cursor-pointer"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#121212] block mb-2">
                  Culture
                </span>
                <div className="mb-2 bg-neutral-100 overflow-hidden">
                  <img
                    alt="Author portrait"
                    className="w-full h-auto object-cover group-hover:opacity-95 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCflhoNPOOl4B1utVmufBHSm9DckJ4G5IBP2H5l8YHxgH1fIZtRL2mhO8_lE6p5r3CvPPXRxQTeaQkQ3iMfXDrHQWhMbpWnvR32MdJIgWTTCpBCqp5eZL5omuI8uBv9acbVnVcvYVvWnC3mAFmlEJMQaCD6KJ5MOAqkLnZcOFjB8LhPRhzfXECG5_TBkN8bWFvy2G77AwIA446Kn5hTqPvGvJ-IpGmRDcrVchIqxRVYiIDbnvGfb2dB"
                  />
                </div>
                <h4 className="font-nyt-serif text-[17px] font-bold leading-snug mb-1.5 group-hover:underline">
                  Sally Rooney Says Her Novels Will No Longer Be Sold in Britain
                </h4>
                <p className="font-nyt-serif text-[12.5px] text-[#444] leading-normal mb-2">
                  The author stated she could not receive royalties due to her financial support for an activist coalition.
                </p>
                <span className="text-[11px] text-[#777]">3 min read • Ellius Grace</span>
              </article>
            </div>
          </section>

          {/* NYT Games Module */}
          <section className="w-full max-w-[1280px] mx-auto px-5 pb-12" data-purpose="nyt-games-strip">
            <div className="border-t-2 border-black pt-3 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-nyt-serif text-[22px] font-bold text-black">Play NYT Games</h3>
                  <p className="text-[12px] text-[#666] font-nyt-sans">
                    Daily word puzzles, logic challenges and crosswords.
                  </p>
                </div>
                <button
                  onClick={() => setActiveGame('wordle')}
                  className="text-[11px] font-bold uppercase text-[#326891] hover:underline"
                >
                  See all games ›
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Wordle */}
                <div
                  onClick={() => setActiveGame('wordle')}
                  className="border border-nyt p-3 rounded flex items-center space-x-3 hover:shadow-sm hover:border-black cursor-pointer transition"
                >
                  <div className="w-10 h-10 bg-[#6aaa64] text-white flex items-center justify-center font-bold text-[18px] rounded">
                    W
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px]">Wordle</h4>
                    <p className="text-[11px] text-[#666]">Guess the 5-letter word</p>
                  </div>
                </div>

                {/* Connections */}
                <div
                  onClick={() => setActiveGame('connections')}
                  className="border border-nyt p-3 rounded flex items-center space-x-3 hover:shadow-sm hover:border-black cursor-pointer transition"
                >
                  <div className="w-10 h-10 bg-[#b4a7d6] text-white flex items-center justify-center font-bold text-[18px] rounded">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px]">Connections</h4>
                    <p className="text-[11px] text-[#666]">Group common threads</p>
                  </div>
                </div>

                {/* Spelling Bee */}
                <div
                  onClick={() => setActiveGame('spelling-bee')}
                  className="border border-nyt p-3 rounded flex items-center space-x-3 hover:shadow-sm hover:border-black cursor-pointer transition"
                >
                  <div className="w-10 h-10 bg-[#f7da21] text-black flex items-center justify-center font-bold text-[18px] rounded">
                    🐝
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px]">Spelling Bee</h4>
                    <p className="text-[11px] text-[#666]">Make words with 7 letters</p>
                  </div>
                </div>

                {/* The Mini */}
                <div
                  onClick={() => setActiveGame('mini')}
                  className="border border-nyt p-3 rounded flex items-center space-x-3 hover:shadow-sm hover:border-black cursor-pointer transition"
                >
                  <div className="w-10 h-10 bg-[#4a90e2] text-white flex items-center justify-center font-bold text-[18px] rounded">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px]">The Mini Crossword</h4>
                    <p className="text-[11px] text-[#666]">Bite-sized daily puzzle</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <Footer
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenGames={() => setActiveGame('wordle')}
      />

      {/* Floating Audio Bar if active */}
      {audioArticle && (
        <AudioBar
          article={audioArticle}
          onClose={() => setAudioArticle(null)}
        />
      )}

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={toggleBookmark}
          onStartAudio={(art) => setAudioArticle(art)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          allArticles={ARTICLES_DATA}
        />
      )}

      {/* Playable Games Modal */}
      {activeGame && (
        <GamesModal
          initialGame={activeGame}
          onClose={() => setActiveGame(null)}
        />
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal
          articles={ARTICLES_DATA}
          onClose={() => setIsSearchOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {/* Bookmarks Drawer */}
      <SavedArticlesDrawer
        savedArticles={savedArticles}
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={(id) => toggleBookmark(id)}
      />

      {/* Subscription Modal */}
      {isSubscribeOpen && (
        <SubscribeModal
          onClose={() => setIsSubscribeOpen(false)}
          onSuccess={() => setIsSubscribed(true)}
        />
      )}

      {/* Login Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(email) => setUserEmail(email)}
        />
      )}
    </div>
  );
}
