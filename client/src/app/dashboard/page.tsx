"use client";

import { useQuery } from "@/hooks/useQuery";
import { useState } from "react";
import { ContactCard } from "@/components/Contact-Card";
import { Search } from "@/components/Search";
import { sortContactsAlpha } from "@/helpers/sort-contacts-alpha";

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
};

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  useQuery(
    contacts,
    (resp: Contact[]) => {
      const sortedResp = sortContactsAlpha(resp);
      setContacts(sortedResp);
    },
    "/api/contact/list",
    "contacts"
  );

  return (
    <main className="flex flex-row">
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
              },
              index
            ) => {
              return (
                <ContactCard
                  key={`firstname=${FirstName}${index}`}
                  FirstName={FirstName}
                  LastName={LastName}
                  Company={Company}
                  Address={Address}
                  Email={Email}
                  PhoneNo={PhoneNo}
                  ServiceStart={ServiceStart}
                  ServiceFreq={ServiceFreq}
                />
              );
            }
          )}
      </ul>
    </main>
  );
}
