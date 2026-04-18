import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		guests: {
			type: Number,
			required: true,
			min: 1,
			max: 20,
		},
		bookingStart: {
			type: Date,
			required: true,
		},
		bookingEnd: {
			type: Date,
			required: true,
		},
		durationMinutes: {
			type: Number,
			default: 120,
			min: 30,
			max: 300,
		},
		description: {
			type: String,
			default: '',
			trim: true,
		},
		status: {
			type: String,
			enum: ['pending', 'confirmed', 'cancelled', 'completed'],
			default: 'pending',
		},
		restaurant: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Restaurant',
			required: true,
		},
		reviewToken: { type: String, default: null },
		reviewTokenExpiresAt: { type: Date, default: null },
		reviewSubmitted: { type: Boolean, default: false },
	},
	{ timestamps: true },
)

reservationSchema.index({
	bookingStart: 1,
	bookingEnd: 1,
	status: 1,
})

const Reservation =
	mongoose.models.Reservation ||
	mongoose.model('Reservation', reservationSchema)

export default Reservation
