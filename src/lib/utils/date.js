export function getNewDeadline(oldDeadline, reviseCount) {
  const days = [3, 7, 15, 30];
  const newDeadline = new Date(oldDeadline);

  newDeadline.setDate(
    newDeadline.getDate() + days[reviseCount]
  );

  return newDeadline;
}

export function isPastDeadline(deadline) {
  const diffInDays = getDifferenceInDays(deadline);

  return diffInDays <= 0;
}

export function getDifferenceInDays(deadline) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const now = new Date();

  const utc1 = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const utc2 = Date.UTC(
    deadline.getFullYear(),
    deadline.getMonth(),
    deadline.getDate()
  );

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}
