import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/crypto')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /dashboard/crypto!'
}
