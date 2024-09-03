import { subtractYearFromDate } from "./subtract-year-from-date";

export function findNextService(
  startDate: string,
  increment: number,
  recursive: boolean = false
) {
  let prevYearService = new Date(startDate);
  if (!recursive) {
    prevYearService = subtractYearFromDate(startDate);
  }

  const today = new Date();

  prevYearService.setMonth(prevYearService.getMonth() + increment);

  if (prevYearService >= today) {
    return prevYearService;
  }

  return findNextService(prevYearService.toDateString(), increment, true);
}
