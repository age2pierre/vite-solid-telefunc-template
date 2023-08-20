import { createResource } from 'solid-js'

import { hello } from './about.telefunc'
import { wait } from './utils'

async function fetchName(): Promise<string> {
  await wait(500, undefined)
  const { message } = await hello({ name: 'world' })
  return message
}

export default function About() {
  const [data] = createResource(fetchName)

  return (
    <section class="min-h-full shadow-2xl w-3/4 p-8">
      <h1>About</h1>

      <p>A page all about this website.</p>

      <p>{`We love ${data() ?? '...'}`}</p>
    </section>
  )
}
