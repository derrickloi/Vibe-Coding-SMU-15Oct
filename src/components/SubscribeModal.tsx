import React, { useState } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';

interface SubscribeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ onClose, onSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'annual'>('weekly');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 border border-neutral-300 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black rounded"
        >
          <X className="w-5 h-5" />
        </button>

        {subscribed ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 stroke-2" />
            </div>
            <h3 className="font-nyt-serif text-2xl font-bold mb-2">Welcome to The New York Times</h3>
            <p className="text-xs text-neutral-600">
              Your unlimited digital access subscription has been activated for {email}.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <span className="font-nyt-masthead text-2xl block mb-2">The New York Times</span>
              <h2 className="font-nyt-serif text-2xl font-bold text-black mb-1">
                Independent journalism worth paying for.
              </h2>
              <p className="text-xs text-neutral-500">
                Support in-depth reporting, global investigations, and opinion from around the world.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div
                onClick={() => setSelectedPlan('weekly')}
                className={`p-3 border rounded cursor-pointer transition ${
                  selectedPlan === 'weekly'
                    ? 'border-black bg-neutral-50 ring-1 ring-black'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="text-xs font-bold uppercase text-neutral-500 mb-1">Weekly Offer</div>
                <div className="text-xl font-bold font-nyt-serif">€0.50<span className="text-xs font-normal text-neutral-500">/wk</span></div>
                <div className="text-[10px] text-neutral-500 mt-1">Billed every 4 weeks. Cancel anytime.</div>
              </div>

              <div
                onClick={() => setSelectedPlan('annual')}
                className={`p-3 border rounded cursor-pointer transition relative ${
                  selectedPlan === 'annual'
                    ? 'border-black bg-neutral-50 ring-1 ring-black'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span className="absolute -top-2 right-2 bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Best Value</span>
                <div className="text-xs font-bold uppercase text-neutral-500 mb-1">All-Access Annual</div>
                <div className="text-xl font-bold font-nyt-serif">€25<span className="text-xs font-normal text-neutral-500">/yr</span></div>
                <div className="text-[10px] text-neutral-500 mt-1">Includes Cooking, Games & Wirecutter.</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
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

              <button
                type="submit"
                className="w-full py-2.5 bg-[#567b95] hover:bg-[#326891] text-white font-bold text-xs uppercase tracking-wider rounded transition"
              >
                Start Subscription
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-nyt flex items-center justify-center space-x-1.5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure checkout • Instant digital activation</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
