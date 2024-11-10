import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/(auth)/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Signup</h1>
      <p>Signup page content</p>
    </div>
  )
}
