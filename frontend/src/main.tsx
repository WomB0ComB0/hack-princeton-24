import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './routes/user_context';

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <UserProvider>
      {' '}
      <App />{' '}
    </UserProvider>,
  );
}
