"use client";

import { Fragment, useEffect, useState } from "react";

import { ContactCard } from "@/components/Contact-Card";
import { Search } from "@/components/Search";
import { months } from "@/constants/months";
import { CONTEXT_ALPHA, SortContext } from "@/context/sort";
import { findNextService } from "@/helpers/find-next-service";
import { sortContactsAlpha } from "@/helpers/sort-contacts-alpha";
import { sortContactsNextService } from "@/helpers/sort-contacts-next-service";
import { useQuery } from "@/hooks/useQuery";

import styles from "./page.module.scss";

export type ContactAddress = {
  Line1: string;
  Line2: string;
  Line3: string;
  PostCode: string;
};

export type Contact = {
  FirstName: string;
  LastName: string;
  Company: string;
  Address: ContactAddress;
  Email: string;
  PhoneNo: string;
  ServiceStart: string;
  ServiceFreq: number;
  NextService: string;
};

export default function Dashboard() {
  const [sort, setSort] = useState(CONTEXT_ALPHA);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  useQuery(
    contacts,
    (resp: Contact[]) => {
      const sortedResp = sortContactsAlpha(resp);

      const enrichedResp = sortedResp.map((contact) => {
        const prevYearService = findNextService(
          contact.ServiceStart,
          contact.ServiceFreq
        )?.toDateString();

        return {
          ...contact,
          NextService: prevYearService,
          ServiceStart: new Date(contact.ServiceStart).toDateString(),
        };
      });
      setContacts(enrichedResp);
    },
    "/api/contact/list",
    "contacts"
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

  return (
    <main className="flex flex-row">
      <SortContext.Provider value={{ sort, setSort }}>
        <Search contacts={contacts} />
        <ul className="py-4">
          {contacts &&
            contacts.map(
              (
                {
                  FirstName,
                  LastName,
                  Company,
                  Address,
                  Email,
                  PhoneNo,
                  ServiceStart,
                  ServiceFreq,
                  NextService,
                },
                index
              ) => {
                const isFirstIndex = index === 0;
                const prevContact = contacts[index - 1];
                const currContact = contacts[index];

                const hasUniqueLetter =
                  isFirstIndex ||
                  (prevContact &&
                    prevContact.LastName[0] !== currContact.LastName[0]);

                const hasUniqueDate =
                  isFirstIndex ||
                  (prevContact &&
                    new Date(prevContact.NextService).getMonth() !==
                      new Date(currContact.NextService).getMonth());

                return (
                  <Fragment key={`firstname=${FirstName}${index}`}>
                    {sort === CONTEXT_ALPHA && hasUniqueLetter && (
                      <h3
                        className={styles["alpha-heading"]}
                        id={currContact.LastName[0]}
                      >
                        {currContact.LastName[0]}
                      </h3>
                    )}

                    {sort !== CONTEXT_ALPHA && hasUniqueDate && (
                      <h3
                        className={styles["alpha-heading"]}
                        id={
                          months[new Date(currContact.NextService).getMonth()]
                        }
                      >
                        {months[new Date(currContact.NextService).getMonth()]}
                      </h3>
                    )}

                    <ContactCard
                      FirstName={FirstName}
                      LastName={LastName}
                      Company={Company}
                      Address={Address}
                      Email={Email}
                      PhoneNo={PhoneNo}
                      ServiceStart={ServiceStart}
                      ServiceFreq={ServiceFreq}
                      NextService={NextService}
                    />
                  </Fragment>
                );
              }
            )}
        </ul>
      </SortContext.Provider>
    </main>
  );
}
