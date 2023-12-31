/* @refresh reload */
import './index.css'

import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'

import App from './app'

const root = document.getElementById('root')

if (!root) {
  throw new Error('element #root not found')
}

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root,
)
