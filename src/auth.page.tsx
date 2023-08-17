import { createForm } from '@felte/solid'
import { config } from 'telefunc/client'

import { login, signup } from './auth.telefunc'

export default function Auth() {
  const { form: loginForm } = createForm<{
    username: string
    password: string
  }>({
    onSubmit: async (values) => {
      const res = await login(values)
      if (res.status === 'ok') {
        config.httpHeaders = {
          ...(config.httpHeaders ?? {}),
          authorization: `Bearer ${res.token}`,
        }
      }
    },
  })

  const { form: signupForm } = createForm<{
    username: string
    password: string
  }>({
    onSubmit: async (values) => {
      const res = await signup(values)
      if (res.status === 'ok') {
        config.httpHeaders = {
          ...(config.httpHeaders ?? {}),
          authorization: `Bearer ${res.token}`,
        }
      }
    },
  })

  return (
    <section class="bg-gray-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Auth</h1>
      <h3 class="text-xl">Login</h3>
      <form use:loginForm>
        <label class="block" for="usernameInput">
          Username
        </label>
        <input id="usernameInput" type="text" name="username" />
        <label class="block" for="passwordInput">
          Password
        </label>
        <input id="passwordInput" type="password" name="password" />
        <input type="submit" value="Login" />
      </form>

      <h3 class="text-xl">Sign Up</h3>
      <form use:signupForm>
        <label class="block" for="usernameInput">
          Username
        </label>
        <input id="usernameInput" type="text" name="username" />
        <label class="block" for="passwordInput">
          Password
        </label>
        <input id="passwordInput" type="password" name="password" />
        <input type="submit" value="Sign up" />
      </form>

      <button
        onClick={() => {
          delete config.httpHeaders?.['authorization']
        }}
      >
        Log out
      </button>
    </section>
  )
}

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      loginForm: true
      signupForm: true
    }
  }
}
