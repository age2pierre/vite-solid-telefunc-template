import type { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

import Home from './home.page'

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('./about.page')),
  },
  {
    path: '**',
    component: lazy(() => import('./404.page')),
  },
  {
    path: '/auth',
    component: lazy(() => import('./auth.page')),
  },
] as const satisfies readonly RouteDefinition[]
