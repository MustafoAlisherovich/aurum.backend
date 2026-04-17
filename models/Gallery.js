import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema({
	image: {
		url: { type: String, required: true },
		fileId: { type: String, required: true },
	},
	title: { type: String, required: true },
})

const Gallery = mongoose.model('Gallery', gallerySchema)

export default Gallery
