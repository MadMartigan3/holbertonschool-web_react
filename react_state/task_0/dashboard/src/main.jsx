import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import roboto400Woff2 from '@fontsource/roboto/files/roboto-latin-400-normal.woff2';
import roboto500Woff2 from '@fontsource/roboto/files/roboto-latin-500-normal.woff2';
import roboto700Woff2 from '@fontsource/roboto/files/roboto-latin-700-normal.woff2';

function ensureRobotoNetworkFetch() {
  const faces = [
    new FontFace('Roboto', `url(${roboto400Woff2}) format('woff2')`, { weight: '400', style: 'normal' }),
    new FontFace('Roboto', `url(${roboto500Woff2}) format('woff2')`, { weight: '500', style: 'normal' }),
    new FontFace('Roboto', `url(${roboto700Woff2}) format('woff2')`, { weight: '700', style: 'normal' }),
  ];
  faces.forEach(f => f.load().then(loaded => document.fonts.add(loaded)).catch(() => {}));
  document.fonts.load('400 1rem Roboto');
  document.fonts.load('500 1rem Roboto');
  document.fonts.load('700 1rem Roboto');
}
ensureRobotoNetworkFetch();

import './main.css';
import App from './App/App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);