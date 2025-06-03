import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUi } from '../../contexts/UiContext';
import { badges } from '../../data/badges';
import { Award, X } from 'lucide-react';

const BadgeModal: React.FC = () => {
  const { showBadgeModal, setShowBadgeModal, selectedBadge } = useUi();
  const [badge, setBadge] = useState(badges[0]);
  
  useEffect(() => {
    if (selectedBadge) {
      const foundBadge = badges.find(b => b.id === selectedBadge);
      if (foundBadge) {
        setBadge(foundBadge);
      }
    }
  }, [selectedBadge]);

  if (!showBadgeModal) {
    return null;
  }

  return (
    <AnimatePresence>
      {showBadgeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="relative p-6 text-center">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowBadgeModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Achievement Unlocked!</h2>
                <p className="text-gray-600">Congratulations! You've earned a new badge.</p>
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="py-6"
              >
                <div className="flex justify-center">
                  <div className={`h-32 w-32 rounded-full flex items-center justify-center badge-glow ${
                    badge.rarity === 'common' ? 'bg-gray-200' :
                    badge.rarity === 'uncommon' ? 'bg-green-200' :
                    badge.rarity === 'rare' ? 'bg-blue-200' :
                    badge.rarity === 'epic' ? 'bg-purple-200' :
                    'bg-yellow-200'
                  }`}>
                    <Award className={`h-20 w-20 ${
                      badge.rarity === 'common' ? 'text-gray-600' :
                      badge.rarity === 'uncommon' ? 'text-green-600' :
                      badge.rarity === 'rare' ? 'text-blue-600' :
                      badge.rarity === 'epic' ? 'text-purple-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900">{badge.name}</h3>
                  <div className="mt-1 inline-block px-3 py-1 rounded-full text-xs font-medium capitalize bg-primary-100 text-primary-800">
                    {badge.rarity} Rarity
                  </div>
                  <p className="mt-3 text-gray-600">{badge.description}</p>
                </div>
              </motion.div>
              
              <div className="mt-6">
                <button
                  className="btn-primary w-full"
                  onClick={() => setShowBadgeModal(false)}
                >
                  Awesome!
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BadgeModal;