export function getNewDeadline(oldDeadline, reviseCount) {
	const days = [3, 7, 15, 30];
	const newDeadline = new Date(oldDeadline);

	newDeadline.setDate(newDeadline.getDate() + days[reviseCount]);

	return newDeadline;
}

export function isPastDeadline(deadline) {
	const diffInDays = getDifferenceInDays(deadline);

	return diffInDays <= 0;
}

export function getDifferenceInDays(deadline) {
	const now = new Date().getDate();

	return deadline.getDate() - now;
}
