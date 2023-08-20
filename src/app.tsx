import { Link, useRoutes } from '@solidjs/router'
import { type ParentProps } from 'solid-js'

import { routes } from './routes'

function NavLink(props: { href: string } & ParentProps) {
  return (
    <Link class="btn btn-ghost" activeClass="btn-active" href={props.href} end>
      {props.children}
    </Link>
  )
}

export default function App() {
  const Route = useRoutes(routes)

  return (
    <div class="flex flex-col min-h-screen">
      <nav class="navbar gap-2 shadow-md">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/auth">Auth</NavLink>
      </nav>

      <main class="flex-auto flex justify-center">
        <Route />
      </main>
    </div>
  )
}
