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
	const now = new Date()

	const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
	const todayKey = days[now.getDay()]
	const today = workingHours[todayKey]

	if (!today || today.isClosed) {
		return { isOpen: false, closesAt: null }
	}

	const [openH, openM] = today.openTime.split(':').map(Number)
	const [closeH, closeM] = today.closeTime.split(':').map(Number)

	const openDate = new Date()
	openDate.setHours(openH, openM, 0)

	const closeDate = new Date()
	closeDate.setHours(closeH, closeM, 0)

	const isOpen = now >= openDate && now <= closeDate

	return {
		isOpen,
		closesAt: isOpen ? today.closeTime : null,
	}
}
