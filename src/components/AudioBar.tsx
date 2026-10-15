import React, { useState, useEffect } from 'react';
import { Play, Pause, X, RotateCcw, Volume2, FastForward } from 'lucide-react';
import { Article } from '../data/articles';

interface AudioBarProps {
  article: Article;
  onClose: () => void;
}

export const AudioBar: React.FC<AudioBarProps> = ({ article, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5>(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const toggleSpeed = () => {
    if (speed === 1) setSpeed(1.25);
    else if (speed === 1.25) setSpeed(1.5);
    else setSpeed(1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212] text-white border-t border-neutral-800 shadow-2xl px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3 max-w-md truncate">
        <div className="w-9 h-9 rounded bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
          <Volume2 className="w-5 h-5 text-white" />
        </div>
        <div className="truncate">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
            Listening to article • The New York Times Audio
          </span>
          <p className="text-xs font-serif font-bold text-white truncate">{article.title}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 flex-1 max-w-md mx-6 hidden md:flex">
        <button
          onClick={() => setProgress((p) => Math.max(0, p - 10))}
          className="text-neutral-400 hover:text-white"
          title="Rewind 10 seconds"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <button
          onClick={() => setProgress((p) => Math.min(100, p + 15))}
          className="text-neutral-400 hover:text-white"
          title="Fast forward 15 seconds"
        >
          <FastForward className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center space-x-2">
          <span className="text-[10px] text-neutral-400">01:24</span>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}
            className="flex-1 h-1.5 bg-neutral-800 rounded-full cursor-pointer relative overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-neutral-400">04:30</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSpeed}
          className="px-2 py-0.5 rounded text-[11px] font-bold border border-neutral-700 hover:border-neutral-500 text-neutral-300"
        >
          {speed}x
        </button>

        <button
          onClick={onClose}
          className="p-1 rounded text-neutral-400 hover:text-white"
          title="Close player"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
