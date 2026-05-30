import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { connectDb } from './config/db.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { authRoutes } from './routes/authRoutes.js'
import { recipeRoutes } from './routes/recipeRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/recipes', recipeRoutes)
app.use(notFound)
app.use(errorHandler)

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Cookly API running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server', error)
    process.exit(1)
  })
