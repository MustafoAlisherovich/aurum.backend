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
