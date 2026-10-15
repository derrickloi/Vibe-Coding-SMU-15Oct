import React from 'react';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../data/articles';

interface SavedArticlesDrawerProps {
  savedArticles: Article[];
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  savedArticles,
  isOpen,
  onClose,
  onSelectArticle,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-neutral-300">
        <div className="p-4 border-b border-nyt flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-600 fill-amber-600" />
            <h3 className="font-nyt-serif font-bold text-lg">Saved Stories ({savedArticles.length})</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded text-neutral-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 font-nyt-serif">
              <Bookmark className="w-12 h-12 mx-auto mb-3 stroke-1 text-neutral-300" />
              <p className="text-base text-neutral-700 font-bold mb-1">Your reading list is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Bookmark articles on the front page or while reading to access them here anytime.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-3 border border-neutral-200 rounded hover:border-black transition flex flex-col justify-between"
                >
                  <div
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b30000] block mb-1">
                      {art.tag || art.section}
                    </span>
                    <h4 className="font-nyt-serif font-bold text-sm text-[#121212] hover:text-[#326891] mb-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 mb-2 font-nyt-serif">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-400">
                    <span>{art.readTime}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onRemoveBookmark(art.id)}
                        className="text-neutral-400 hover:text-red-600 p-1"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="flex items-center space-x-1 text-black font-semibold hover:underline"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
