import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { CONTEXT_ALPHA } from "@/context/sort";
import { findNextService } from "@/helpers/find-next-service";
import { sortContactsAlpha } from "@/helpers/sort-contacts-alpha";
import { sortContactsNextService } from "@/helpers/sort-contacts-next-service";
import { useQuery } from "@/hooks/useQuery";

import { Contact } from "./page";

function useDashboard(contactRefresh: number): {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  contacts: Contact[] | null;
} {
  const [sort, setSort] = useState(CONTEXT_ALPHA);
  const [contacts, setContacts] = useState<Contact[] | null>(null);

  useQuery(
    contacts,
    (resp: Contact[]) => {
      const sortedResp = sortContactsAlpha(resp);

      const enrichedResp = sortedResp.map((contact) => {
        const nextService =
          contact.ServiceFreq && contact.ServiceStart
            ? findNextService(
                contact.ServiceStart,
                contact.ServiceFreq
              )?.toDateString()
            : null;

        return {
          ...contact,
          ...(nextService && { NextService: nextService }),
          ...(contact.ServiceStart && {
            ServiceStart: new Date(contact.ServiceStart).toDateString(),
          }),
        };
      });
      setContacts(enrichedResp);
    },
    "/api/contact/list",
    "contacts",
    contactRefresh
  );

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

export { useDashboard };
