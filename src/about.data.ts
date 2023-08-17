import type { RouteDataFunc } from '@solidjs/router'
import { createResource, type Resource } from 'solid-js'

import { hello } from './about.telefunc'
import { wait } from './utils'

async function fetchName(): Promise<string> {
  await wait(500, undefined)
  const { message } = await hello({ name: 'Solid' })
  return message
}

export const AboutData: RouteDataFunc<unknown, Resource<string>> = () => {
  const [data] = createResource(fetchName)
  return data
}

export type AboutDataType = typeof AboutData
