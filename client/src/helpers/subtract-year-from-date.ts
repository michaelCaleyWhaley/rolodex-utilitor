import { getLastFullYear } from "./get-last-year";

export function subtractYearFromDate(dateString: string) {
  const date = new Date(dateString);
  date.setFullYear(getLastFullYear());
  return date;
}
