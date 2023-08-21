import { reporter, ValidationMessage } from '@felte/reporter-solid'
import { createForm } from '@felte/solid'
import { createSignal, untrack } from 'solid-js'
import { config } from 'telefunc/client'
import { createIs, createValidate } from 'typia'

import { login, signup } from './auth.telefunc'
import { fromEntries, isNotNullish } from './utils'

type FormData = {
  /**
   * @minLength 1
   */
  username: string
  /**
   * @minLength 3
   */
  password: string
}
const validateFormData = createValidate<FormData>()
const isKeyOfFormData = createIs<keyof FormData>()

export default function Auth() {
  const [authAction, setAuthAction] = createSignal<'signup' | 'login'>('signup')

  const { form, handleSubmit } = createForm<FormData>({
    extend: reporter,
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
    validate: (values) => {
      const errors = fromEntries(
        validateFormData(values)
          .errors.map((error) => {
            const key = error.path.match(/\$input\.(.+)/)?.[1]
            if (!isKeyOfFormData(key)) {
              return null
            }
            return [key, error.expected] as const
          })
          .filter(isNotNullish),
      )
      return errors
    },
  })

  return (
    <section class="card-bordered w-96 shadow-xl bg-base-100 self-center">
      <div class="card-body">
        <h1 class="card-title self-center">Authenticate</h1>
        <div class="tabs tabs-boxed w-max self-center">
          <button
            classList={{
              tab: true,
              'tab-active': authAction() === 'signup',
            }}
            onClick={() => {
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
            onClick={() => {
              setAuthAction('login')
            }}
          >
            Login
          </button>
        </div>
        <form use:form>
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
            <ValidationMessage for="username">
              {(message) => (
                <label class="label text-error">{message?.[0]}</label>
              )}
            </ValidationMessage>
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
            <ValidationMessage for="password">
              {(message) => (
                <label class="label text-error">{message?.[0]}</label>
              )}
            </ValidationMessage>
          </div>
        </form>
        <div class="card-actions justify-end mt-2">
          <button
            class="btn btn-primary btn-outline"
            onClick={() => {
              delete config.httpHeaders?.['authorization']
            }}
          >
            Log out
          </button>
          <button
            class="btn btn-primary"
            onClick={() => {
              handleSubmit()
            }}
          >
            {authAction() === 'login' ? 'Login' : 'Sign up'}
          </button>
        </div>
      </div>
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
