export function getTotalMinutes(date) {
	return date.getHours() * 60 + date.getMinutes()
}

export function getDayKeyFromDate(date) {
	const dayIndex = date.getDay()
	const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
	return map[dayIndex]
}

export function parseTimeToMinutes(timeStr) {
	if (!timeStr || typeof timeStr !== 'string') return null

	const [h, m] = timeStr.split(':').map(Number)

	if (Number.isNaN(h) || Number.isNaN(m)) return null

	return h * 60 + m
}

export function isValidStatus(status) {
	return ['pending', 'confirmed', 'cancelled', 'completed'].includes(status)
}

export const getCurrentStatus = workingHours => {
	if (!workingHours) return { isOpen: false, closesAt: null }

	const now = new Date(
		new Date().toLocaleString('en-US', { timeZone: 'Asia/Tashkent' }),
	)

	const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
	const today = workingHours[days[now.getDay()]]

	if (!today || today.isClosed) return { isOpen: false, closesAt: null }

	const currentTime =
		now.getHours().toString().padStart(2, '0') +
		':' +
		now.getMinutes().toString().padStart(2, '0')

	const open = today.openTime.padStart(5, '0')
	const close = today.closeTime.padStart(5, '0')

	const isOpen = currentTime >= open && currentTime <= close

	return {
		isOpen,
		closesAt: isOpen ? today.closeTime : null,
	}
}
