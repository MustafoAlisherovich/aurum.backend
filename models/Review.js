import { model, Schema } from 'mongoose'

const reviewSchema = new Schema(
	{
		reservation: {
			type: Schema.Types.ObjectId,
			ref: 'Reservation',
			required: true,
			unique: true,
		},
		fullName: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		rating: { type: Number, required: true, min: 1, max: 5 },
		comment: { type: String, required: true, trim: true, maxLength: 1000 },
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
	},
	{ timestamps: true },
)

const Review = model('Review', reviewSchema)
export default Review
