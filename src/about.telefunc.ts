import { getContext } from 'telefunc'

export async function hello({ name }: { name: string }) {
  const { user } = getContext()

  const message = 'super ' + (user?.username ?? name)
  return { message }
}
