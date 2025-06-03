import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award } from 'lucide-react';
import { badges } from '../../data/badges';

interface LotteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeId: string | null;
}

const LotteryModal: React.FC<LotteryModalProps> = ({ isOpen, onClose, badgeId }) => {
  const badge = badges.find(b => b.id === badgeId);

  if (!isOpen || !badge) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden mx-4"
        >
          <div className="relative p-6 text-center">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">恭喜获得新徽章！</h2>
              <p className="text-gray-600">你抽中了一个新的徽章奖励。</p>
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
                  {badge.rarity === 'common' ? '普通' :
                   badge.rarity === 'uncommon' ? '稀有' :
                   badge.rarity === 'rare' ? '珍贵' :
                   badge.rarity === 'epic' ? '史诗' :
                   '传说'}级别
                </div>
                <p className="mt-3 text-gray-600">{badge.description}</p>
              </div>
            </motion.div>
            
            <div className="mt-6">
              <button
                className="btn-primary w-full"
                onClick={onClose}
              >
                太棒了！
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LotteryModal;