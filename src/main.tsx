import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ProblemsProvider } from './contexts/ProblemsContext';
import { UiProvider } from './contexts/UiContext';
import { TeamProvider } from './contexts/TeamContext';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProblemsProvider>
          <UiProvider>
            <TeamProvider>
              <App />
              <Toaster position="top-right" />
            </TeamProvider>
          </UiProvider>
        </ProblemsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);