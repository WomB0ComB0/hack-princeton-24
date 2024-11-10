import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/stocks')({
  component: stocks,
})

function stocks() {
  return 'Hello /dashboard/stocks!'
}
