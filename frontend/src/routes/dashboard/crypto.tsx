import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createFileRoute('/dashboard/crypto')({
  component: crypto,
})

function crypto() {
  return 'Hello /dashboard/crypto!'
}
