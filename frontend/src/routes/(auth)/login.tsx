import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Login</h1>
      <p>This is the login page.</p>
    </div>
  )
}
