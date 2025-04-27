import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('ServiceWorker registration successful');
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
