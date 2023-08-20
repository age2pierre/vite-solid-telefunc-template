import 'telefunc'

import { type Client } from 'edgedb'

declare module 'telefunc' {
  namespace Telefunc {
    interface Context {
      // if null user not authenticated
      user: null | {
        username: string
      }
      JWT_SECRET: string
      db: Client
    }
  }
}
