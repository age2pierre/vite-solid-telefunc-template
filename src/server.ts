import { createClient } from 'edgedb'
import { default as express } from 'express'
import { default as jwt } from 'jsonwebtoken'
import { type Telefunc, telefunc } from 'telefunc'
import { createServer } from 'vite'

export const isProduction = process.env.NODE_ENV === 'production'
export const port: number = process.env.PORT ? Number(process.env.PORT) : 3000
export const JWT_SECRET = process.env.JWT_SECRET ?? 'JWT_SECRET'
export const db = createClient()

startServer()

async function startServer() {
  const app = express()

  app.use(express.text())

  // RPC middleware
  app.all('/_telefunc', async (req, res) => {
    // decode JWT token if present in authorization header
    const token = req.headers['authorization']?.split(' ')[1]
    const decoded = await new Promise<string | jwt.JwtPayload | undefined>(
      (resolve) => {
        if (!token) {
          return resolve(undefined)
        }
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            console.warn('authenticateToken: token unauthenticated %j', err)
            return resolve(undefined)
          }
          resolve(decoded)
        })
      },
    )

    const context: Telefunc.Context = {
      JWT_SECRET,
      db,
      user:
        decoded &&
        typeof decoded === 'object' &&
        'username' in decoded &&
        typeof decoded.username === 'string'
          ? { username: decoded.username }
          : null,
    }

    const { body, statusCode, contentType } = await telefunc({
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      context,
    })
    res.status(statusCode).type(contentType).send(body)
  })

  if (isProduction) {
    // serve static file in prod
    app.use(express.static(`${__dirname}/../dist/client/`))
    app.get('*', (_req, res) => {
      res.sendFile(`${__dirname}/../dist/client/index.html`)
    })
  } else {
    // use vite for HRM
    const viteDevMiddleware = (
      await createServer({
        root: `${__dirname}/..`,
        server: { middlewareMode: true },
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
