import { expect, test } from 'vitest'

import { comparePassword, hashPassword } from './auth.telefunc'

test('hashPassword and comparePassword works', async () => {
  const hash = await hashPassword('pwd')
  expect(await comparePassword(hash, 'pwd')).toBeTruthy()
  expect(await comparePassword(hash, 'pass')).toBeFalsy()
})
