import mongoose from 'mongoose'

const dishSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	image: {
		url: { type: String, required: true },
		fileId: { type: String, required: true },
	},
	category: { type: String, required: true },
})

const Dish = mongoose.model('Dish', dishSchema)

export default Dish
