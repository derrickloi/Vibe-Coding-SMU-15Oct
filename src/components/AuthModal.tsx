import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoggedIn(true);
    setTimeout(() => {
      onLoginSuccess(email);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 border border-neutral-300 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black rounded"
        >
          <X className="w-5 h-5" />
        </button>

        {loggedIn ? (
          <div className="text-center py-6">
            <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-nyt-serif font-bold text-lg">Welcome back</h4>
            <p className="text-xs text-neutral-500">Signing into your NYT account...</p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <span className="font-nyt-masthead text-2xl block mb-1">The New York Times</span>
              <h3 className="font-nyt-serif text-xl font-bold">Log in or create an account</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 border border-neutral-300 rounded text-sm outline-none focus:border-black font-nyt-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-neutral-300 rounded text-sm outline-none focus:border-black font-nyt-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded transition mt-2"
              >
                Continue
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
