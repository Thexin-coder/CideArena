import React, { createContext, useContext, useState } from 'react';

interface UiContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  showBadgeModal: boolean;
  setShowBadgeModal: (show: boolean) => void;
  selectedBadge: string | null;
  setSelectedBadge: (badgeId: string | null) => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <UiContext.Provider value={{
      theme,
      toggleTheme,
      showBadgeModal,
      setShowBadgeModal,
      selectedBadge,
      setSelectedBadge
    }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUi = (): UiContextType => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
};