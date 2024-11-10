import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/crypto')({
  component: crypto,
})

function crypto() {
  return 'Hello /dashboard/crypto!'
}
