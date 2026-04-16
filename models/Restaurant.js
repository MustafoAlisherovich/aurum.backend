import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		address: { type: String, required: true, trim: true },
		cuisine: { type: String, required: true, trim: true },
		phone: { type: String, required: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		totalTables: { type: Number, required: true, min: 1 },
		openHour: { type: Number, required: true, min: 0, max: 23 },
		closeHour: { type: Number, required: true, min: 1, max: 24 },
		instagram: { type: String, required: true, trim: true },
		facebook: { type: String, required: true, trim: true },
		twitter: { type: String, required: true, trim: true },
	},
	{ timestamps: true },
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant
