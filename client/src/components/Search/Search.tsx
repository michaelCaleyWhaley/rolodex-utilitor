import { useContext, useEffect, useRef } from "react";

import { Contact } from "@/app/dashboard/page";
import { SORT_KEY } from "@/constants/local-storage";
import { CONTEXT_ALPHA, CONTEXT_SERVICE, SortContext } from "@/context/sort";

import { AddContact } from "../Add-Contact";
import { LetterList } from "../Letter-List";
import { ServiceDateList } from "../Service-Date-List";
import styles from "./Search.module.scss";

type PropTypes = { contacts: Contact[] | null };

function Search({ contacts }: PropTypes) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { sort: sortContext, setSort } = useContext(SortContext);
  const isAlpha = sortContext === CONTEXT_ALPHA;

  useEffect(() => {
    const storedSort = window.localStorage.getItem(SORT_KEY);
    if (!storedSort) return;
    setSort(storedSort);
    if (!selectRef.current) return;
    selectRef.current.value = storedSort;
  }, []);

  return (
    <div className={styles["search"]}>
      <AddContact />

      <input className={styles["input"]} placeholder="Search..." type="text" />

      <select
        ref={selectRef}
        className={styles["sort"]}
        name="sort"
        onChange={(e) => {
          window.localStorage.setItem(SORT_KEY, e.target.value);
          setSort(e.target.value);
        }}
      >
        <option value={CONTEXT_ALPHA}>Alphabetical</option>
        <option value={CONTEXT_SERVICE}>Service date</option>
      </select>

      {isAlpha && contacts ? (
        <LetterList contacts={contacts} />
      ) : (
        <ServiceDateList contacts={contacts} />
      )}
    </div>
  );
}

export { Search };
