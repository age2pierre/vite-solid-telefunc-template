import type { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

import { AboutData } from './about.data'
import Home from './home.page'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('./about.page')),
    data: AboutData,
  },
  {
    path: '**',
    component: lazy(() => import('./404.page')),
  },
]
