import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import patientsRouter from './routes/patients'

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'unexpected error' })
}

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.use('/patients', patientsRouter)

app.use(errorHandler) // catch-all error handler
export default app
