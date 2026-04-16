const addDishSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	image: { type: String, required: true },
	category: { type: String, required: true },
})

const AddDish = mongoose.model('AddDish', addDishSchema)

export default AddDish
