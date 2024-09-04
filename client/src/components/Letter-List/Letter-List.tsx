import { Contact } from "@/app/dashboard/page";
import { useEffect, useState } from "react";

import styles from "./Letter-List.module.scss";

type PropTypes = { contacts: Contact[] | null };

export function LetterList({ contacts }: PropTypes) {
  const [alphabet, setAlphabet] = useState<string[]>([]);

  useEffect(() => {
    if (!contacts) return;
    const letters = [];
    for (const contact of contacts) {
      const letter = contact.LastName.slice(0, 1).toUpperCase();
      if (alphabet.indexOf(letter) === -1 && letters.indexOf(letter) === -1) {
        letters.push(letter);
      }
    }
    setAlphabet([...alphabet, ...letters].sort());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  return (
    <ul>
      {alphabet &&
        alphabet.map((letter) => (
          <li key={`alpha${letter}`}>
            <a className={styles["letter"]} href={`#${letter}`}>
              {letter}
            </a>
          </li>
        ))}
    </ul>
  );
}
