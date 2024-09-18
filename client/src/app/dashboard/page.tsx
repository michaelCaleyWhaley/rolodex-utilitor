"use client";

import { Fragment, useState } from "react";

import { ContactCard } from "@/components/Contact-Card";
import { Search } from "@/components/Search";
import { months } from "@/constants/months";
import { CONTEXT_ALPHA, SortContext } from "@/context/sort";

import styles from "./page.module.scss";
import { useDashboard } from "./useDashboard";

export default function Dashboard() {
  const [contactRefresh, setContactRefresh] = useState(1);
  const { sort, setSort, contacts } = useDashboard(contactRefresh);

  return (
    <main className="flex flex-row">
      <SortContext.Provider value={{ sort, setSort }}>
        <Search contacts={contacts} setContactRefresh={setContactRefresh} />
        <ul className="py-4 min-w-0">
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
                  ContactId,
                },
                index
              ) => {
                const isFirstIndex = index === 0;
                const prevContact = contacts[index - 1];
                const currContact = contacts[index];

                const hasUniqueLetter =
                  isFirstIndex ||
                  (prevContact &&
                    prevContact.LastName[0].toUpperCase() !==
                      currContact.LastName[0].toUpperCase());

                const hasUniqueDate =
                  isFirstIndex ||
                  (prevContact &&
                    prevContact.NextService &&
                    currContact.NextService &&
                    new Date(prevContact.NextService).getMonth() !==
                      new Date(currContact.NextService).getMonth());

                const hasNoServiceHeading =
                  !isFirstIndex &&
                  prevContact.NextService &&
                  !currContact.NextService;

                const showAlphaHeading =
                  sort === CONTEXT_ALPHA && hasUniqueLetter;
                const showServiceHeading =
                  sort !== CONTEXT_ALPHA && hasUniqueDate;
                const showNoServiceHeading =
                  hasNoServiceHeading && sort !== CONTEXT_ALPHA;

                return (
                  <Fragment key={`firstname=${FirstName}${index}`}>
                    {showAlphaHeading && (
                      <h3
                        className={styles["alpha-heading"]}
                        id={currContact.LastName[0].toUpperCase()}
                      >
                        {currContact.LastName[0].toUpperCase()}
                      </h3>
                    )}

                    {showServiceHeading && (
                      <h3
                        className={styles["alpha-heading"]}
                        id={
                          currContact.NextService
                            ? months[
                                new Date(currContact.NextService).getMonth()
                              ]
                            : "no-service"
                        }
                      >
                        {currContact.NextService
                          ? months[new Date(currContact.NextService).getMonth()]
                          : "no-service"}
                      </h3>
                    )}

                    {showNoServiceHeading && (
                      <h3 className={styles["alpha-heading"]} id="no-service">
                        No service
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
                      ContactId={ContactId}
                      setContactRefresh={setContactRefresh}
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
