import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createFileRoute('/dashboard/crypto')({
  component: crypto,
});

function crypto() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cryptocurrency</h2>
    </div>
  );
}
