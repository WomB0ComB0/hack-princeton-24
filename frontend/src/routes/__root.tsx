import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Your app description here" />
          <meta name="keywords" content="react, vite, tanstack router" />
          <meta name="author" content="Your Name or Company" />
          <meta name="theme-color" content="#000000" />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Your App Title" />
          <meta property="og:description" content="Your app description here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
          <meta property="og:url" content="https://example.com" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Your App Title" />
          <meta name="twitter:description" content="Your app description here" />
          <meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
          <title>Your App Title | Vite App</title>
          <link rel="stylesheet" href="/tailwind.css" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <script
            type="module"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
              import RefreshRuntime from "/@react-refresh"
              RefreshRuntime.injectIntoGlobalHook(window)
              window.$RefreshReg$ = () => {}
              window.$RefreshSig$ = () => (type) => type
              window.__vite_plugin_react_preamble_installed__ = true
            `,
            }}
          />
          <script type="module" src="/@vite/client" />
          <script type="module" src="/src/entry-client.tsx" />
        </head>
        <body>
          <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Outlet />
          </main>
        </body>
      </html>
    </React.Fragment>
  );
}