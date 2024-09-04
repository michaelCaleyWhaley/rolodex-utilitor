import { Contact } from "@/app/dashboard/page";
import { useEffect, useState } from "react";

import styles from "./Service-Date-List.module.scss";
import { months } from "@/constants/months";

type PropTypes = { contacts: Contact[] | null };

export function ServiceDateList({ contacts }: PropTypes) {
  const [serviceDates, setServiceDates] = useState<string[]>([]);

  useEffect(() => {
    if (!contacts) return;
    const dates = [];
    for (const contact of contacts) {
      const date: string = new Date(contact.NextService).getMonth().toString();
      if (serviceDates.indexOf(date) === -1 && dates.indexOf(date) === -1) {
        dates.push(date);
      }
    }
    setServiceDates([...serviceDates, ...dates].sort());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  return (
    <ul>
      {serviceDates &&
        serviceDates.map((date: string) => {
          const month = months[parseInt(date, 10)];
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
