import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js'
import { requireAdminAuth } from './middlewares/authMiddleware.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import dishRoutes from './routes/dishRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'

const app = express()
const port = Number(process.env.PORT) || 4000

await connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
	res.status(200).json({ ok: true, service: 'aurum-backend' })
})

app.use('/api/reservations', reservationRoutes)
app.use('/api/admin/restaurants', restaurantRoutes)
app.use('/api/admin/dishes', dishRoutes)
app.use('/api/admin/gallery', galleryRoutes)

// Admin auth (login/logout) and protected admin panel routes.
app.use('/api/admin', adminAuthRoutes)
app.use('/api/admin', requireAdminAuth, adminRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
	console.log(`Server is live on http://localhost:${port}`)
})
