import { Contact } from "@/app/dashboard/page";
import styles from "./Search.module.scss";
import { useContext } from "react";
import { CONTEXT_ALPHA, CONTEXT_SERVICE, SortContext } from "@/context/sort";
import { LetterList } from "../Letter-List";
import { ServiceDateList } from "../Service-Date-List";

type PropTypes = { contacts: Contact[] | null };

function Search({ contacts }: PropTypes) {
  const { sort: sortContext, setSort } = useContext(SortContext);
  const isAlpha = sortContext === CONTEXT_ALPHA;

  return (
    <div className={styles["search"]}>
      <input className={styles["input"]} placeholder="Search..." type="text" />

      <select
        className={styles["sort"]}
        name="sort"
        onChange={(e) => {
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
