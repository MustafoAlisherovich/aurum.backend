import imagekit from '../config/imagekit.js'
import Dish from '../models/Dish.js'

export const getDishes = async (req, res, next) => {
	try {
		const { page = 1, limit = 10 } = req.query
		const dishes = await Dish.find()
			.skip((page - 1) * limit)
			.limit(Number(limit))

		res.status(200).json({ success: true, count: dishes.length, data: dishes })
	} catch (error) {
		next(error)
	}
}

export const createDish = async (req, res, next) => {
	try {
		const data = req.body

		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: 'Image is required',
			})
		}

		const uploadImage = await imagekit.upload({
			file: req.file.buffer,
			fileName: req.file.originalname,
			folder: '/aurum/dishes',
		})

		const dish = await Dish.create({
			...data,
			image: { url: uploadImage.url, fileId: uploadImage.fileId },
		})

		res.status(201).json({ success: true, dish })
	} catch (error) {
		next(error)
	}
}

export const updateDish = async (req, res, next) => {
	try {
		const { id } = req.params
		const data = req.body

		const dish = await Dish.findById(id)

		if (!dish) {
			return res.status(404).json({ success: false, message: 'Dish not found' })
		}

		if (req.file) {
			if (dish.image?.fileId) {
				await imagekit.deleteFile(dish.image.fileId)
			}

			const uploadImage = await imagekit.upload({
				file: req.file.buffer,
				fileName: req.file.originalname,
				folder: '/aurum/dishes',
			})

			data.image = {
				url: uploadImage.url,
				fileId: uploadImage.fileId,
			}

			const uploadDish = await Dish.findByIdAndUpdate(id, data, {
				new: true,
				runValidators: true,
			})

			res.status(200).json({ success: true, dish: uploadDish })
		}
	} catch (error) {
		next(error)
	}
}

export const deleteDish = async (req, res, next) => {
	try {
		const dish = await Dish.findById(req.params.id)

		if (!dish) {
			return res.status(400).json({ success: false, message: 'Dish not found' })
		}

		if (dish.image?.fileId) {
			await imagekit.deleteFile(dish.image.fileId)
		}

		await Dish.findByIdAndDelete(req.params.id)

		res.json({ success: true, message: 'Dish deleted' })
	} catch (error) {
		next(error)
	}
}
