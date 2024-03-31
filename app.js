import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
/* Como importar un JSON con fileSystem
import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) */

/* Como importar un JSON recomendado
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('./movies.json') */

const app = express()
app.use(json())
app.disable('x-powered-by')
app.use(corsMiddleware)

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`Puerto http://localhost:${PORT}`)
})
