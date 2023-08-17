import {
  type BinaryLike,
  randomBytes,
  scrypt,
  timingSafeEqual,
} from 'node:crypto'
import { promisify } from 'node:util'

import { default as jwt } from 'jsonwebtoken'
import { getContext } from 'telefunc'

import { default as eql } from './edgeql'

const scryptAsync = promisify<BinaryLike, BinaryLike, number, Buffer>(scrypt)

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const buf = await scryptAsync(password, salt, 64)
  return `${buf.toString('hex')}.${salt}`
}

export async function comparePassword(
  storedPassword: string,
  suppliedPassword: string,
): Promise<boolean> {
  const [hashedPassword, salt] = storedPassword.split('.')
  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex')
  const suppliedPasswordBuf = await scryptAsync(suppliedPassword, salt, 64)
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf)
}

export async function signup({
  password,
  username,
}: {
  password: string
  username: string
}): Promise<
  | { status: 'nok' }
  | {
      status: 'ok'
      user_id: string
      username: string
      token: string
    }
> {
  try {
    const { db, JWT_SECRET } = getContext()
    const hash = await hashPassword(password)
    const { id } = await eql
      .insert(eql.AuthLocal, {
        password: hash,
        username,
      })
      .run(db)

    return {
      status: 'ok',
      user_id: id,
      username,
      token: jwt.sign({ username }, JWT_SECRET, {
        expiresIn: '6h',
      }),
    }
  } catch (error) {
    console.error('signup: unexpected error %j', error)
    return {
      status: 'nok',
    }
  }
}

export async function login({
  password,
  username,
}: {
  password: string
  username: string
}): Promise<
  | {
      status: 'nok'
      message: string
    }
  | {
      status: 'ok'
      user_id: string
      username: string
      token: string
    }
> {
  const { db, JWT_SECRET } = getContext()
  const user = await eql
    .select(eql.AuthLocal, (authLocal) => ({
      id: true,
      password: true,
      username: true,
      filter_single: eql.op(authLocal.username, '=', username),
    }))
    .run(db)
    .catch((err) => {
      console.error('login: unexpected error %j', err)
      return null
    })

  if (!user || !(await comparePassword(user.password, password))) {
    return { status: 'nok', message: 'Login failure' }
  }

  return {
    status: 'ok',
    user_id: user.id,
    username,
    token: jwt.sign({ username }, JWT_SECRET, {
      expiresIn: '6h',
    }),
  }
}
