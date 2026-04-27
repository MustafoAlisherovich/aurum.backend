import { isValidObjectId } from 'mongoose'
import imagekit from '../config/imagekit.js'
import Gallery from '../models/Gallery.js'

export const getGallery = async (req, res, next) => {
	try {
		const data = req.body
		const gallery = await Gallery.find(data)
		res.status(200).json({ success: true, gallery })
	} catch (error) {
		next(error)
	}
}

export const getAdminGallery = async (req, res, next) => {
	try {
		const data = req.body
		const gallery = await Gallery.find(data)
		res.status(200).json({ success: true, gallery })
	} catch (error) {
		next(error)
	}
}

export const createGallery = async (req, res, next) => {
	try {
		const data = req.body

		if (!req.file) {
			return res
				.status(400)
				.json({ success: false, message: 'Image is required' })
		}

		const uploadImage = await imagekit.upload({
			file: req.file.buffer,
			fileName: req.file.originalname,
			folder: '/aurum/gallery',
		})
		const gallery = await Gallery.create({
			...data,
			image: { url: uploadImage.url, fileId: uploadImage.fileId },
		})

		res.status(201).json({ success: true, gallery })
	} catch (error) {
		next(error)
	}
}

export const deleteGallery = async (req, res, next) => {
	try {
		const { id } = req.params

		if (!id || !isValidObjectId(id)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid gallery id',
			})
		}

		const gallery = await Gallery.findById(id)

		if (!gallery) {
			return res.status(404).json({
				success: false,
				message: 'Gallery not found',
			})
		}

		if (gallery.image?.fileId) {
			await imagekit.deleteFile(gallery.image.fileId)
		}

		await Gallery.findByIdAndDelete(id)

		res.json({
			success: true,
			message: 'Gallery deleted',
		})
	} catch (error) {
		next(error)
	}
}
