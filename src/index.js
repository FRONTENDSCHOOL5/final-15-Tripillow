import React from 'react';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <RecoilRoot>
      <HelmetProvider>
        <App id={'root'} />
      </HelmetProvider>
    </RecoilRoot>
  </BrowserRouter>,
);
