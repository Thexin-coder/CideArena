import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Gift } from 'lucide-react';
import { badges } from '../../data/badges';
import { useUi } from '../../contexts/UiContext';

interface LotteryWheelProps {
  onComplete: (badgeId: string) => void;
  isSpinning: boolean;
}

const LotteryWheel: React.FC<LotteryWheelProps> = ({ onComplete, isSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  
  useEffect(() => {
    if (isSpinning) {
      const randomBadge = badges[Math.floor(Math.random() * badges.length)];
      const randomRotations = 1440 + Math.random() * 360; // 4 full rotations + random
      
      setRotation(randomRotations);
      setSelectedBadge(randomBadge.id);
      
      const timer = setTimeout(() => {
        onComplete(randomBadge.id);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSpinning, onComplete]);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-4 bg-accent-500 z-10"></div>
      <motion.div
        className="w-full h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-800 relative"
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2 p-4">
            {badges.slice(0, 9).map((badge, index) => (
              <div
                key={badge.id}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  badge.rarity === 'legendary' ? 'bg-yellow-200' :
                  badge.rarity === 'epic' ? 'bg-purple-200' :
                  badge.rarity === 'rare' ? 'bg-blue-200' :
                  badge.rarity === 'uncommon' ? 'bg-green-200' :
                  'bg-gray-200'
                }`}
              >
                <Award className={`h-6 w-6 ${
                  badge.rarity === 'legendary' ? 'text-yellow-600' :
                  badge.rarity === 'epic' ? 'text-purple-600' :
                  badge.rarity === 'rare' ? 'text-blue-600' :
                  badge.rarity === 'uncommon' ? 'text-green-600' :
                  'text-gray-600'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isSpinning && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Gift className="h-12 w-12 text-accent-500 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LotteryWheel;