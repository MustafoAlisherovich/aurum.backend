import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js'
import { requireAdminAuth } from './middlewares/authMiddleware.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import adminReservationRoutes from './routes/adminReservationRoutes.js'
import adminRestaurantRoutes from './routes/adminRestaurantRoutes.js'
import adminReviewRoutes from './routes/adminReviewRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import dishAdminRoutes from './routes/dishAdminRoutes.js'
import dishRoutes from './routes/dishRoutes.js'
import galleryAdminRoutes from './routes/galleryAdminRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

const app = express()
const port = Number(process.env.PORT) || 4000

await connectDB()

app.use(
	cors({
		origin: 'http://localhost:8080',
		credentials: true,
	}),
)
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
	res.status(200).json({ ok: true, service: 'aurum-backend' })
})

app.use('/api/reservations', reservationRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/dishes', dishRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use('/api/admin/restaurant', adminRestaurantRoutes)
app.use('/api/admin/dishes', dishAdminRoutes)
app.use('/api/admin/gallery', galleryAdminRoutes)
app.use('/api/admin/review', adminReviewRoutes)
app.use('/api/admin/reservations', adminReservationRoutes)

// Admin auth (login/logout) and protected admin panel routes.
app.use('/api/admin', adminAuthRoutes)
app.use('/api/admin', requireAdminAuth, adminRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
	console.log(`Server is live on http://localhost:${port}`)
})
