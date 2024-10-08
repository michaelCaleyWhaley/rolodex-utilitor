import { useEffect, useState } from "react";

import { FUTURE_DATE } from "@/constants/future-dates";
import { months } from "@/constants/months";
import { Contact } from "@/types/contact";

import styles from "./Service-Date-List.module.scss";

type PropTypes = { contacts: Contact[] | null };

const futureDateTime = new Date(FUTURE_DATE).getTime();

export function ServiceDateList({ contacts }: PropTypes) {
  const [serviceDates, setServiceDates] = useState<string[]>([]);

  useEffect(() => {
    if (!contacts) return;
    const dates = [];
    for (const contact of contacts) {
      const date: string = new Date(
        contact.NextService ?? FUTURE_DATE
      ).toString();
      if (serviceDates.indexOf(date) === -1 && dates.indexOf(date) === -1) {
        dates.push(date);
      }
    }
    setServiceDates(
      [...serviceDates, ...dates].sort((a, b) => {
        if (new Date(a) > new Date(b)) {
          return 1;
        }
        return -1;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  return (
    <ul>
      {serviceDates &&
        serviceDates.map((date: string, index: number) => {
          const lastMonth =
            months[
              parseInt(
                new Date(serviceDates[index - 1]).getMonth().toString(),
                10
              )
            ];
          const month =
            months[parseInt(new Date(date).getMonth().toString(), 10)];

          if (month === lastMonth) return null;

          if (futureDateTime === new Date(date).getTime()) {
            return (
              <li key={`alpha${date}`}>
                <a className={styles["date"]} href="#no-service">
                  No service
                </a>
              </li>
            );
          }

          return (
            <li key={`alpha${date}`}>
              <a className={styles["date"]} href={`#${month}`}>
                {month}
              </a>
            </li>
          );
        })}
    </ul>
  );
}
