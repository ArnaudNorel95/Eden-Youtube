import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './app/page';
import Menu from './components/Menu';
import './index.css';

const App = () => {
  useEffect(() => {
  }, []);

  return <Home />;
};

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);