import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createFileRoute('/dashboard/stocks')({
  component: stocks,
})

function stocks() {
  return 'Hello /dashboard/stocks!'
}
