import 'telefunc'

import { type Client } from 'edgedb'

declare module 'telefunc' {
  namespace Telefunc {
    interface Context {
      user: null | {
        username: string
      }
      JWT_SECRET: string
      db: Client
    }
  }
}
