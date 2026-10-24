import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Application root element is missing');

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
