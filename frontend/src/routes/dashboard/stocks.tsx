import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createFileRoute('/dashboard/stocks')({
  component: stocks,
});

function stocks() {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Stocks</h2>
      </div>
    </>
  );
}
