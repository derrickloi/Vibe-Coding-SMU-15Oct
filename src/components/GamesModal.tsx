import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Shuffle, Sparkles, CheckCircle2 } from 'lucide-react';

interface GamesModalProps {
  initialGame?: 'wordle' | 'connections' | 'spelling-bee' | 'mini';
  onClose: () => void;
}

export const GamesModal: React.FC<GamesModalProps> = ({ initialGame = 'wordle', onClose }) => {
  const [activeTab, setActiveTab] = useState<'wordle' | 'connections' | 'spelling-bee' | 'mini'>(initialGame);

  // --- WORDLE STATE ---
  const TARGET_WORD = 'TRUTH';
  const [wordleGuesses, setWordleGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [wordleStatus, setWordleStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [wordleMessage, setWordleMessage] = useState<string>('');

  const handleWordleKey = (letter: string) => {
    if (wordleStatus !== 'playing') return;
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleWordleBackspace = () => {
    if (wordleStatus !== 'playing') return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleWordleSubmit = () => {
    if (wordleStatus !== 'playing') return;
    if (currentGuess.length !== 5) {
      setWordleMessage('Not enough letters');
      setTimeout(() => setWordleMessage(''), 1500);
      return;
    }

    const nextGuesses = [...wordleGuesses, currentGuess];
    setWordleGuesses(nextGuesses);
    setCurrentGuess('');

    if (currentGuess === TARGET_WORD) {
      setWordleStatus('won');
      setWordleMessage('Splendid! You solved today’s Wordle.');
    } else if (nextGuesses.length >= 6) {
      setWordleStatus('lost');
      setWordleMessage(`Nice try! The word was ${TARGET_WORD}.`);
    }
  };

  const resetWordle = () => {
    setWordleGuesses([]);
    setCurrentGuess('');
    setWordleStatus('playing');
    setWordleMessage('');
  };

  // Keyboard listener for Wordle
  useEffect(() => {
    if (activeTab !== 'wordle') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleWordleSubmit();
      } else if (e.key === 'Backspace') {
        handleWordleBackspace();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleWordleKey(e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, currentGuess, wordleStatus, wordleGuesses]);

  // --- CONNECTIONS STATE ---
  const CATEGORIES = [
    { name: 'PARTS OF A NEWSPAPER', words: ['BYLINE', 'HEADLINE', 'MASTHEAD', 'COLUMN'], color: 'bg-yellow-200 border-yellow-400' },
    { name: 'COFFEE PREPARATION', words: ['DRIP', 'POUR', 'PRESS', 'BREW'], color: 'bg-emerald-200 border-emerald-400' },
    { name: 'PRECEDED BY "POINT"', words: ['MATCH', 'BULLET', 'TURNING', 'FOCAL'], color: 'bg-blue-200 border-blue-400' },
    { name: 'WORDS ENDING IN DOUBLE LETTERS', words: ['CROSS', 'STAFF', 'SCROLL', 'SPELL'], color: 'bg-purple-200 border-purple-400' }
  ];

  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    const all = CATEGORIES.flatMap((c) => c.words);
    return [...all].sort(() => Math.random() - 0.5);
  });
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedCategories, setSolvedCategories] = useState<typeof CATEGORIES>([]);
  const [connectionsMistakes, setConnectionsMistakes] = useState<number>(4);
  const [connectionsMsg, setConnectionsMsg] = useState<string>('');

  const toggleWordSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const shuffleConnections = () => {
    setAvailableWords([...availableWords].sort(() => Math.random() - 0.5));
  };

  const submitConnections = () => {
    if (selectedWords.length !== 4) return;
    const match = CATEGORIES.find((cat) =>
      selectedWords.every((w) => cat.words.includes(w))
    );

    if (match) {
      setSolvedCategories([...solvedCategories, match]);
      setAvailableWords(availableWords.filter((w) => !match.words.includes(w)));
      setSelectedWords([]);
      setConnectionsMsg(`Found: ${match.name}!`);
      setTimeout(() => setConnectionsMsg(''), 2000);
    } else {
      setConnectionsMistakes((prev) => Math.max(0, prev - 1));
      setConnectionsMsg('Not a category. Try again!');
      setTimeout(() => setConnectionsMsg(''), 1500);
    }
  };

  const resetConnections = () => {
    const all = CATEGORIES.flatMap((c) => c.words);
    setAvailableWords([...all].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setSolvedCategories([]);
    setConnectionsMistakes(4);
    setConnectionsMsg('');
  };

  // --- SPELLING BEE STATE ---
  const BEE_CENTER = 'T';
  const BEE_OUTERS = ['E', 'A', 'M', 'P', 'R', 'S'];
  const VALID_BEE_WORDS = ['TEAM', 'TEAMS', 'STAMP', 'STREAM', 'PASTE', 'MASTER', 'SMART', 'STAR', 'START', 'PIRATE', 'MATTER'];
  const [beeInput, setBeeInput] = useState<string>('');
  const [beeFoundWords, setBeeFoundWords] = useState<string[]>([]);
  const [beeMsg, setBeeMsg] = useState<string>('');

  const handleBeeClick = (letter: string) => {
    setBeeInput((prev) => prev + letter);
  };

  const submitBeeWord = () => {
    const word = beeInput.toUpperCase();
    if (word.length < 4) {
      setBeeMsg('Too short (min 4 letters)');
      setTimeout(() => setBeeMsg(''), 1500);
      return;
    }
    if (!word.includes(BEE_CENTER)) {
      setBeeMsg(`Must contain center letter '${BEE_CENTER}'`);
      setTimeout(() => setBeeMsg(''), 1500);
      return;
    }
    if (beeFoundWords.includes(word)) {
      setBeeMsg('Already found!');
      setTimeout(() => setBeeMsg(''), 1500);
      return;
    }
    if (VALID_BEE_WORDS.includes(word)) {
      setBeeFoundWords([...beeFoundWords, word]);
      setBeeMsg(`Nice! +${word.length} points`);
      setTimeout(() => setBeeMsg(''), 1500);
      setBeeInput('');
    } else {
      setBeeMsg('Not in word list');
      setTimeout(() => setBeeMsg(''), 1500);
    }
  };

  // --- THE MINI CROSSWORD STATE ---
  const MINI_GRID_SOLUTION = [
    ['T', 'I', 'M', 'E', 'S'],
    ['R', 'U', 'L', 'E', 'R'],
    ['U', 'N', 'I', 'T', 'E'],
    ['T', 'I', 'E', 'R', 'S'],
    ['H', 'O', 'U', 'S', 'E']
  ];
  const [miniUserGrid, setMiniUserGrid] = useState<string[][]>(() =>
    Array(5).fill('').map(() => Array(5).fill(''))
  );
  const [miniCompleted, setMiniCompleted] = useState<boolean>(false);

  const handleMiniCellChange = (row: number, col: number, val: string) => {
    const char = val.slice(-1).toUpperCase();
    const updated = miniUserGrid.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? char : c))
    );
    setMiniUserGrid(updated);

    // Check completion
    const isFull = updated.every((r) => r.every((cell) => cell !== ''));
    if (isFull) {
      const isCorrect = updated.every((r, rIdx) =>
        r.every((cell, cIdx) => cell === MINI_GRID_SOLUTION[rIdx][cIdx])
      );
      if (isCorrect) {
        setMiniCompleted(true);
      }
    }
  };

  const solveMini = () => {
    setMiniUserGrid(MINI_GRID_SOLUTION);
    setMiniCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-neutral-300">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-nyt">
          <div className="flex items-center space-x-2">
            <span className="font-nyt-masthead text-xl font-bold">Play NYT Games</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-nyt bg-neutral-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('wordle')}
            className={`flex-1 py-2.5 px-3 border-b-2 text-center transition flex items-center justify-center gap-1.5 ${
              activeTab === 'wordle'
                ? 'border-[#6aaa64] text-[#2c682c] bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <span className="w-4 h-4 rounded-xs bg-[#6aaa64] text-white flex items-center justify-center text-[10px]">W</span>
            Wordle
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`flex-1 py-2.5 px-3 border-b-2 text-center transition flex items-center justify-center gap-1.5 ${
              activeTab === 'connections'
                ? 'border-[#b4a7d6] text-[#6d5b97] bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <span className="w-4 h-4 rounded-xs bg-[#b4a7d6] text-white flex items-center justify-center text-[10px]">C</span>
            Connections
          </button>
          <button
            onClick={() => setActiveTab('spelling-bee')}
            className={`flex-1 py-2.5 px-3 border-b-2 text-center transition flex items-center justify-center gap-1.5 ${
              activeTab === 'spelling-bee'
                ? 'border-[#f7da21] text-amber-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <span className="w-4 h-4 rounded-xs bg-[#f7da21] text-black flex items-center justify-center text-[10px]">🐝</span>
            Spelling Bee
          </button>
          <button
            onClick={() => setActiveTab('mini')}
            className={`flex-1 py-2.5 px-3 border-b-2 text-center transition flex items-center justify-center gap-1.5 ${
              activeTab === 'mini'
                ? 'border-[#4a90e2] text-[#235d9f] bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <span className="w-4 h-4 rounded-xs bg-[#4a90e2] text-white flex items-center justify-center text-[10px]">M</span>
            The Mini
          </button>
        </div>

        {/* Game Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-start min-h-[380px]">
          {/* WORDLE */}
          {activeTab === 'wordle' && (
            <div className="w-full max-w-sm flex flex-col items-center">
              <div className="text-center mb-3">
                <h3 className="font-bold text-lg font-nyt-serif">Wordle</h3>
                <p className="text-xs text-neutral-500">Guess the 5-letter word in 6 tries.</p>
                {wordleMessage && (
                  <div className="mt-2 text-xs font-bold bg-neutral-900 text-white px-3 py-1 rounded inline-block animate-bounce">
                    {wordleMessage}
                  </div>
                )}
              </div>

              {/* Wordle Grid */}
              <div className="grid grid-rows-6 gap-1.5 mb-4">
                {Array.from({ length: 6 }).map((_, rowIdx) => {
                  const guess = wordleGuesses[rowIdx] || (rowIdx === wordleGuesses.length ? currentGuess : '');
                  return (
                    <div key={rowIdx} className="grid grid-cols-5 gap-1.5">
                      {Array.from({ length: 5 }).map((__, colIdx) => {
                        const letter = guess[colIdx] || '';
                        let tileColor = 'border-neutral-300 bg-white text-black';

                        if (wordleGuesses[rowIdx]) {
                          if (TARGET_WORD[colIdx] === letter) {
                            tileColor = 'bg-[#6aaa64] border-[#6aaa64] text-white';
                          } else if (TARGET_WORD.includes(letter)) {
                            tileColor = 'bg-[#c9b458] border-[#c9b458] text-white';
                          } else {
                            tileColor = 'bg-[#787c7e] border-[#787c7e] text-white';
                          }
                        } else if (letter) {
                          tileColor = 'border-neutral-700 bg-white text-black font-bold scale-105';
                        }

                        return (
                          <div
                            key={colIdx}
                            className={`w-11 h-11 border-2 flex items-center justify-center text-lg font-bold font-nyt-sans uppercase transition-all duration-200 ${tileColor}`}
                          >
                            {letter}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Wordle Action Bar */}
              <div className="flex items-center space-x-2 mb-2 w-full justify-center">
                <button
                  onClick={handleWordleSubmit}
                  disabled={wordleStatus !== 'playing' || currentGuess.length !== 5}
                  className="px-4 py-2 bg-[#121212] text-white rounded text-xs font-bold uppercase tracking-wider disabled:opacity-40 hover:bg-black transition"
                >
                  Enter
                </button>
                <button
                  onClick={handleWordleBackspace}
                  disabled={wordleStatus !== 'playing' || currentGuess.length === 0}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 transition"
                >
                  Delete
                </button>
                <button
                  onClick={resetWordle}
                  className="p-2 border border-neutral-300 rounded text-neutral-500 hover:text-black hover:bg-neutral-100 transition"
                  title="Reset Game"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Simple On-Screen Keys */}
              <div className="w-full text-center mt-2">
                <div className="flex flex-wrap justify-center gap-1 max-w-xs mx-auto">
                  {'QWERTYUIOPASDFGHJKLZXCVBNM'.split('').map((char) => (
                    <button
                      key={char}
                      onClick={() => handleWordleKey(char)}
                      className="w-7 h-8 bg-neutral-200 hover:bg-neutral-300 text-xs font-bold rounded flex items-center justify-center active:scale-95 transition"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONNECTIONS */}
          {activeTab === 'connections' && (
            <div className="w-full max-w-lg flex flex-col items-center">
              <div className="text-center mb-3">
                <h3 className="font-bold text-lg font-nyt-serif">Connections</h3>
                <p className="text-xs text-neutral-500">Group four words that share a common thread.</p>
                {connectionsMsg && (
                  <div className="mt-1.5 text-xs font-semibold bg-neutral-800 text-white px-3 py-1 rounded inline-block">
                    {connectionsMsg}
                  </div>
                )}
              </div>

              {/* Solved Groups */}
              <div className="w-full space-y-2 mb-3">
                {solvedCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`w-full p-2.5 rounded text-center border font-nyt-sans ${cat.color}`}
                  >
                    <span className="font-bold text-xs uppercase tracking-wide block">{cat.name}</span>
                    <span className="text-xs text-neutral-800">{cat.words.join(', ')}</span>
                  </div>
                ))}
              </div>

              {/* Active Word Grid */}
              {availableWords.length > 0 ? (
                <div className="grid grid-cols-4 gap-2 w-full mb-4">
                  {availableWords.map((word) => {
                    const isSelected = selectedWords.includes(word);
                    return (
                      <button
                        key={word}
                        onClick={() => toggleWordSelect(word)}
                        className={`h-14 p-1 rounded font-bold text-[11px] sm:text-xs flex items-center justify-center text-center transition-all ${
                          isSelected
                            ? 'bg-neutral-800 text-white scale-[1.02]'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-6 text-center text-green-700 font-bold flex flex-col items-center">
                  <CheckCircle2 className="w-10 h-10 mb-2" />
                  <span>Congratulations! All categories solved!</span>
                </div>
              )}

              {/* Mistakes & Controls */}
              <div className="flex items-center justify-between w-full text-xs text-neutral-600 mb-4 px-2">
                <div className="flex items-center space-x-1.5">
                  <span>Mistakes remaining:</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < connectionsMistakes ? 'bg-neutral-800' : 'bg-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={shuffleConnections}
                    className="p-1.5 border border-neutral-300 rounded hover:bg-neutral-100"
                    title="Shuffle"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedWords([])}
                    className="px-2.5 py-1 border border-neutral-300 rounded hover:bg-neutral-100 font-medium text-[11px]"
                  >
                    Deselect All
                  </button>
                  <button
                    onClick={submitConnections}
                    disabled={selectedWords.length !== 4}
                    className="px-3.5 py-1 bg-black text-white rounded font-bold text-[11px] disabled:opacity-40 hover:bg-neutral-800"
                  >
                    Submit
                  </button>
                  <button
                    onClick={resetConnections}
                    className="p-1.5 border border-neutral-300 rounded hover:bg-neutral-100"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SPELLING BEE */}
          {activeTab === 'spelling-bee' && (
            <div className="w-full max-w-sm flex flex-col items-center">
              <div className="text-center mb-2">
                <h3 className="font-bold text-lg font-nyt-serif">Spelling Bee</h3>
                <p className="text-xs text-neutral-500">
                  Form words using letters. Must include center letter: <strong className="text-amber-800 font-bold">{BEE_CENTER}</strong>
                </p>
                {beeMsg && (
                  <div className="mt-1 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded inline-block">
                    {beeMsg}
                  </div>
                )}
              </div>

              {/* Current Input Display */}
              <div className="h-10 border-b-2 border-neutral-400 w-full flex items-center justify-center text-xl font-bold tracking-widest text-neutral-800 mb-4">
                {beeInput || <span className="text-neutral-300 font-normal text-sm">Type or click letters...</span>}
              </div>

              {/* Bee Hive Layout */}
              <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                {/* Center Button */}
                <button
                  onClick={() => handleBeeClick(BEE_CENTER)}
                  className="z-10 w-14 h-14 rounded-full bg-[#f7da21] hover:bg-amber-400 text-black font-extrabold text-xl shadow flex items-center justify-center transition active:scale-95"
                >
                  {BEE_CENTER}
                </button>

                {/* Outer Letters */}
                {BEE_OUTERS.map((char, index) => {
                  const angle = (index * 60 - 30) * (Math.PI / 180);
                  const radius = 56;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <button
                      key={char}
                      onClick={() => handleBeeClick(char)}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                      className="absolute w-12 h-12 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold text-lg shadow-xs flex items-center justify-center transition active:scale-95"
                    >
                      {char}
                    </button>
                  );
                })}
              </div>

              {/* Bee Actions */}
              <div className="flex items-center space-x-2 mb-4">
                <button
                  onClick={() => setBeeInput((prev) => prev.slice(0, -1))}
                  className="px-3 py-1.5 border border-neutral-300 rounded text-xs font-bold hover:bg-neutral-100"
                >
                  Delete
                </button>
                <button
                  onClick={submitBeeWord}
                  className="px-5 py-1.5 bg-black text-white rounded text-xs font-bold hover:bg-neutral-800"
                >
                  Enter
                </button>
              </div>

              {/* Found Words List */}
              <div className="w-full border-t border-nyt pt-2 text-xs">
                <span className="font-bold text-neutral-700 block mb-1">
                  Words found ({beeFoundWords.length}):
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  {beeFoundWords.length === 0 ? (
                    <span className="text-neutral-400 italic">None yet. Try: TEAM, STAR, SMART...</span>
                  ) : (
                    beeFoundWords.map((w, idx) => (
                      <span key={idx} className="bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-semibold text-amber-900">
                        {w}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* THE MINI CROSSWORD */}
          {activeTab === 'mini' && (
            <div className="w-full max-w-md flex flex-col items-center">
              <div className="text-center mb-2">
                <h3 className="font-bold text-lg font-nyt-serif">The Mini Crossword</h3>
                <p className="text-xs text-neutral-500">A brisk 5x5 daily challenge.</p>
                {miniCompleted && (
                  <div className="mt-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded inline-flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Puzzle Complete! Great job!
                  </div>
                )}
              </div>

              {/* 5x5 Grid */}
              <div className="grid grid-rows-5 gap-1 mb-4 border-2 border-black p-1 bg-black">
                {miniUserGrid.map((row, rIdx) => (
                  <div key={rIdx} className="grid grid-cols-5 gap-1">
                    {row.map((cell, cIdx) => (
                      <div key={cIdx} className="relative w-10 h-10 bg-white">
                        <span className="absolute top-0.5 left-1 text-[8px] text-neutral-400 font-bold">
                          {rIdx * 5 + cIdx + 1 <= 5 ? rIdx * 5 + cIdx + 1 : ''}
                        </span>
                        <input
                          type="text"
                          maxLength={1}
                          value={cell}
                          onChange={(e) => handleMiniCellChange(rIdx, cIdx, e.target.value)}
                          className="w-full h-full text-center font-bold text-base uppercase bg-transparent outline-none focus:bg-blue-50"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Clues */}
              <div className="grid grid-cols-2 gap-3 w-full text-left text-xs mb-3 font-nyt-serif border-t border-nyt pt-2">
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1 font-nyt-sans text-[11px] uppercase">Across</h4>
                  <ul className="space-y-1 text-neutral-600 text-[11px]">
                    <li><strong>1.</strong> Iconic publisher (... Times)</li>
                    <li><strong>6.</strong> King or straight measuring tool</li>
                    <li><strong>7.</strong> Join together as one</li>
                    <li><strong>8.</strong> Layers or rankings</li>
                    <li><strong>9.</strong> Home dwelling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1 font-nyt-sans text-[11px] uppercase">Down</h4>
                  <ul className="space-y-1 text-neutral-600 text-[11px]">
                    <li><strong>1.</strong> Honesty, veracity</li>
                    <li><strong>2.</strong> Hospital wing for urgent care (abbr.)</li>
                    <li><strong>3.</strong> Military officer ranking</li>
                    <li><strong>4.</strong> Goes in or registers</li>
                    <li><strong>5.</strong> Winter vehicle on runners</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={solveMini}
                  className="px-3 py-1.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
                >
                  Reveal Solution
                </button>
                <button
                  onClick={() => {
                    setMiniUserGrid(Array(5).fill('').map(() => Array(5).fill('')));
                    setMiniCompleted(false);
                  }}
                  className="p-1.5 border border-neutral-300 rounded text-neutral-500 hover:text-black hover:bg-neutral-100"
                  title="Clear Grid"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
