import React, { useState } from 'react';
import { X, Bookmark, Share2, Volume2, ThumbsUp, MessageSquare, Send, Check } from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onStartAudio: (article: Article) => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onStartAudio,
  onSelectArticle,
  allArticles
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [comments, setComments] = useState(
    article.comments || [
      {
        id: 'init-1',
        author: 'Julian M.',
        location: 'London, UK',
        time: '3 hours ago',
        text: 'A very insightful reporting from the Times team. The geopolitical implications of this cannot be overstated.',
        likes: 24
      },
      {
        id: 'init-2',
        author: 'Sarah Jenkins',
        location: 'Boston, MA',
        time: '1 hour ago',
        text: 'Crucial nuance added here that most other mainstream outlets completely glossed over.',
        likes: 12
      }
    ]
  );
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `comm-${Date.now()}`,
      author: 'You (Reader)',
      location: 'New York, NY',
      time: 'Just now',
      text: newCommentText.trim(),
      likes: 0
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleLikeComment = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.section === article.section)
    .slice(0, 3);

  const fontClass =
    fontSize === 'sm'
      ? 'text-[15px] leading-relaxed'
      : fontSize === 'lg'
      ? 'text-[19px] leading-relaxed'
      : 'text-[17px] leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-4xl min-h-screen my-0 md:my-6 md:rounded-t-lg shadow-2xl flex flex-col border-x border-neutral-200">
        {/* Sticky Reader Toolbar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-nyt px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-nyt-masthead text-xl text-[#121212]">The New York Times</span>
            <span className="text-neutral-300">|</span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-nyt-sans">
              {article.tag || article.section}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center bg-neutral-100 rounded p-0.5 border border-neutral-200 mr-2 text-xs font-nyt-sans">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 rounded ${fontSize === 'sm' ? 'bg-white shadow-xs font-bold' : 'text-neutral-600'}`}
                title="Smaller text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 rounded ${fontSize === 'base' ? 'bg-white shadow-xs font-bold' : 'text-neutral-600'}`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 rounded ${fontSize === 'lg' ? 'bg-white shadow-xs font-bold' : 'text-neutral-600'}`}
                title="Larger text"
              >
                A+
              </button>
            </div>

            {/* Listen button */}
            <button
              onClick={() => onStartAudio(article)}
              className="flex items-center space-x-1 px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded text-xs font-semibold text-neutral-800 transition"
              title="Listen to this article"
            >
              <Volume2 className="w-3.5 h-3.5 text-neutral-600" />
              <span>Listen</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded transition ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-800'
                  : 'hover:bg-neutral-100 text-neutral-600 hover:text-black'
              }`}
              title={isBookmarked ? 'Saved to bookmarks' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded hover:bg-neutral-100 text-neutral-600 hover:text-black transition"
              title="Share article link"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-neutral-100 text-neutral-600 hover:text-black transition ml-1"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Content Container */}
        <article className="px-6 md:px-16 pt-8 pb-16 max-w-3xl mx-auto w-full">
          {/* Kicker */}
          {article.tag && (
            <div className="mb-2 text-xs font-bold tracking-widest uppercase text-[#b30000] font-nyt-sans">
              {article.tag}
            </div>
          )}

          {/* Headline */}
          <h1 className="font-nyt-serif text-3xl md:text-[38px] font-bold leading-[1.18] text-[#121212] mb-3">
            {article.title}
          </h1>

          {/* Dek / Excerpt */}
          <p className="font-nyt-serif text-lg md:text-[20px] text-[#555] leading-snug mb-5">
            {article.excerpt}
          </p>

          {/* Byline & Date Row */}
          <div className="flex flex-wrap items-center justify-between border-y border-nyt py-3 mb-6 text-xs text-[#555] font-nyt-sans">
            <div>
              <span className="font-semibold text-black">By {article.byline}</span>
              <span className="mx-2">•</span>
              <span>{article.publishedAt || 'October 14, 2026'}</span>
            </div>
            <div className="flex items-center space-x-3 text-neutral-500 mt-1 sm:mt-0">
              <span>{article.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#326891] font-semibold">
                <MessageSquare className="w-3.5 h-3.5" />
                {comments.length}
              </span>
            </div>
          </div>

          {/* Lead Image if present */}
          {article.imageUrl && (
            <figure className="mb-8">
              <div className="bg-neutral-100 overflow-hidden border border-nyt-light">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-auto object-cover max-h-[480px]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-[#666] font-nyt-sans flex justify-between items-start">
                <span>{article.imageCaption || article.title}</span>
                <span className="text-[#888] ml-4 whitespace-nowrap text-[11px]">
                  {article.imageCredit || 'The New York Times'}
                </span>
              </figcaption>
            </figure>
          )}

          {/* Body Paragraphs */}
          <div className={`font-nyt-serif text-[#222] space-y-5 ${fontClass}`}>
            {article.body && article.body.length > 0 ? (
              article.body.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none' : ''}>
                  {para}
                </p>
              ))
            ) : (
              <p>{article.excerpt}</p>
            )}
          </div>

          {/* End of article marker */}
          <div className="flex justify-center my-8 text-neutral-300">
            <span>• • •</span>
          </div>

          {/* Interactive Comments Section */}
          <section className="mt-10 border-t-2 border-black pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-nyt-serif text-2xl font-bold text-black">
                Comments ({comments.length})
              </h3>
              <span className="text-xs text-neutral-500 font-nyt-sans">
                Moderated according to NYT Community Guidelines
              </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-8 bg-neutral-50 p-4 border border-nyt rounded">
              <label htmlFor="commentInput" className="block text-xs font-bold uppercase text-neutral-700 mb-2 font-nyt-sans">
                Join the conversation
              </label>
              <textarea
                id="commentInput"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="What are your thoughts on this story? Share your perspective..."
                rows={3}
                className="w-full p-2.5 text-sm border border-neutral-300 rounded focus:ring-1 focus:ring-black outline-none font-nyt-sans"
              />
              <div className="flex justify-between items-center mt-2.5">
                <span className="text-[11px] text-neutral-400">Please remain civil and constructive.</span>
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="px-4 py-1.5 bg-[#121212] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded disabled:opacity-40 flex items-center space-x-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="border-b border-nyt pb-4 font-nyt-sans">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-xs">
                      <span className="font-bold text-black">{c.author}</span>
                      <span className="text-neutral-400 ml-1.5">({c.location})</span>
                    </div>
                    <span className="text-[11px] text-neutral-400">{c.time}</span>
                  </div>
                  <p className="text-sm font-nyt-serif text-neutral-800 mb-2 leading-relaxed">
                    {c.text}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-neutral-500">
                    <button
                      onClick={() => handleLikeComment(c.id)}
                      className="flex items-center space-x-1 hover:text-black transition"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{c.likes} Recommended</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Articles Strip */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 border-t border-nyt pt-6">
              <h4 className="font-nyt-serif text-lg font-bold mb-4">More in {article.section}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="group cursor-pointer border border-nyt p-3 hover:bg-neutral-50 transition"
                  >
                    <h5 className="font-nyt-serif font-bold text-sm group-hover:text-neutral-600 mb-1 leading-snug">
                      {rel.title}
                    </h5>
                    <p className="font-nyt-serif text-xs text-neutral-500 line-clamp-2 mb-2">
                      {rel.excerpt}
                    </p>
                    <span className="text-[11px] text-neutral-400">{rel.readTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};
