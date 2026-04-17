import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		address: { type: String, required: true, trim: true },
		phone: { type: String, required: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		workingHours: {
			mon: {
				isClosed: { type: Boolean, default: false },
				openTime: { type: String, default: '9:00' },
				closeTime: { type: String, default: '23:00' },
			},
			tue: {
				isClosed: { type: Boolean, default: false },
				openTime: { type: String, default: '9:00' },
				closeTime: { type: String, default: '23:00' },
			},
			wed: {
				isClosed: { type: Boolean, default: false },
				openTime: { type: String, default: '9:00' },
				closeTime: { type: String, default: '23:00' },
			},
			thu: {
				isClosed: { type: Boolean, default: false },
				openTime: { type: String, default: '9:00' },
				closeTime: { type: String, default: '23:00' },
			},
			fri: {
				isClosed: { type: Boolean, default: false },
				openTime: { type: String, default: '9:00' },
				closeTime: { type: String, default: '23:00' },
			},
			sat: {
				isClosed: { type: Boolean, default: false },
				openTime: { type: String, default: '9:00' },
				closeTime: { type: String, default: '23:00' },
			},
			sun: {
				isClosed: { type: Boolean, default: false },
				openTime: { type: String, default: '9:00' },
				closeTime: { type: String, default: '23:00' },
			},
		},
		instagram: { type: String, trim: true },
		facebook: { type: String, trim: true },
		twitter: { type: String, trim: true },
	},
	{ timestamps: true },
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant
