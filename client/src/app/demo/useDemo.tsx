import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { demoContacts } from "@/constants/demo-data";
import { CONTEXT_ALPHA } from "@/context/sort";
import { sortContactsAlpha } from "@/helpers/sort-contacts-alpha";
import { sortContactsNextService } from "@/helpers/sort-contacts-next-service";
import { Contact } from "@/types/contact";

function useDemo(): {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  contacts: Contact[] | null;
} {
  const [sort, setSort] = useState(CONTEXT_ALPHA);
  const [contacts, setContacts] = useState<Contact[] | null>(null);

  useEffect(() => {
    if (sort === CONTEXT_ALPHA) {
      setContacts(new Array(...sortContactsAlpha(demoContacts)));
      return;
    }
    setContacts(new Array(...sortContactsNextService(demoContacts)));
  }, []);

  useEffect(() => {
    if (!contacts) return;

    if (sort === CONTEXT_ALPHA) {
      setContacts(new Array(...sortContactsAlpha(contacts)));
      return;
    }
    setContacts(new Array(...sortContactsNextService(contacts)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return { sort, setSort, contacts };
}

export { useDemo };
