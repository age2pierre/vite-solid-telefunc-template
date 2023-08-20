import { createForm } from '@felte/solid'
import { createSignal, untrack } from 'solid-js'
import { config } from 'telefunc/client'

import { login, signup } from './auth.telefunc'

export default function Auth() {
  const [authAction, setAuthAction] = createSignal<'signup' | 'login'>('signup')

  const { form } = createForm<{
    username: string
    password: string
  }>({
    onSubmit: async (values) => {
      const action = untrack(() => authAction())
      const res = await (action === 'signup' ? signup : login)(values)
      if (res.status === 'ok') {
        config.httpHeaders = {
          ...(config.httpHeaders ?? {}),
          authorization: `Bearer ${res.token}`,
        }
      }
    },
  })

  return (
    <section class="card-bordered w-96 shadow-xl bg-base-100 self-center">
      <form use:form>
        <div class="card-body">
          <h1 class="card-title self-center">Authenticate</h1>
          <div class="tabs tabs-boxed w-max self-center">
            <button
              classList={{
                tab: true,
                'tab-active': authAction() === 'signup',
              }}
              onClick={(e) => {
                e.preventDefault()
                setAuthAction('signup')
              }}
            >
              Sign Up
            </button>
            <button
              classList={{
                tab: true,
                'tab-active': authAction() === 'login',
              }}
              onClick={(e) => {
                e.preventDefault()
                setAuthAction('login')
              }}
            >
              Login
            </button>
          </div>
          <div class="form-control">
            <label class="label" for="usernameInput">
              Username
            </label>
            <input
              class="input input-bordered max-w-xs"
              id="usernameInput"
              type="text"
              name="username"
            />
          </div>
          <div class="form-control">
            <label class="label" for="passwordInput">
              Password
            </label>
            <input
              class="input input-bordered max-w-xs"
              id="passwordInput"
              type="password"
              name="password"
            />
          </div>
          <div class="card-actions justify-end">
            <button
              class="btn btn-primary btn-outline"
              onClick={(e) => {
                e.preventDefault()
                delete config.httpHeaders?.['authorization']
              }}
            >
              Log out
            </button>
            <input
              class="btn btn-primary"
              type="submit"
              value={authAction() === 'login' ? 'Login' : 'Sign up'}
            />
          </div>
        </div>
      </form>
    </section>
  )
}

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      form: true
    }
  }
}
