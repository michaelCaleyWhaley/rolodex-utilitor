import { Contact } from "@/app/dashboard/page";
import styles from "./Search.module.scss";
import { useEffect, useState } from "react";

type PropTypes = { contacts: Contact[] | null };

function Search({ contacts }: PropTypes) {
  const [alphabet, setAplhabet] = useState<string[]>([]);

  useEffect(() => {
    if (!contacts) return;
    const letters = [];
    for (const contact of contacts) {
      const letter = contact.LastName.slice(0, 1).toUpperCase();
      if (alphabet.indexOf(letter) === -1 && letters.indexOf(letter) === -1) {
        letters.push(letter);
      }
    }
    setAplhabet([...alphabet, ...letters].sort());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  return (
    <div className={styles["search"]}>
      <input className={styles["input"]} placeholder="Search..." type="text" />

      <ul>
        {alphabet &&
          alphabet.map((letter) => (
            <li key={`alpha${letter}`}>
              <a className={styles["search__letter"]} href={`#${letter}`}>
                {letter}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export { Search };
