import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Article } from '../data/articles';

interface SearchModalProps {
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ articles, onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.byline.toLowerCase().includes(q) ||
        a.section.toLowerCase().includes(q)
    );
  }, [articles, query]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-nyt flex items-center space-x-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, opinion, topics, or authors..."
            className="flex-1 text-base outline-none font-nyt-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="px-3 py-1 border border-neutral-200 rounded text-xs font-semibold hover:bg-neutral-50">
            Esc
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {query.trim() === '' ? (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Popular Topics
              </span>
              <div className="flex flex-wrap gap-2">
                {['Russia-Ukraine War', 'White House', 'Pope Leo', 'Artificial Intelligence', 'Elections', 'Wirecutter'].map(
                  (topic) => (
                    <button
                      key={topic}
                      onClick={() => setQuery(topic)}
                      className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-xs font-medium rounded text-neutral-800"
                    >
                      {topic}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 font-nyt-serif">
              <p className="text-base font-bold text-neutral-700">No results found for “{query}”</p>
              <p className="text-xs text-neutral-400 mt-1">Try checking your spelling or using different keywords.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase text-neutral-500">
                Found {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
              </div>
              {filtered.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="p-3 border border-neutral-200 rounded hover:border-black cursor-pointer group transition flex justify-between items-center"
                >
                  <div className="pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b30000] block mb-1">
                      {art.tag || art.section}
                    </span>
                    <h4 className="font-nyt-serif font-bold text-sm group-hover:text-[#326891] mb-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-1">{art.excerpt}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-black shrink-0 transition" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
