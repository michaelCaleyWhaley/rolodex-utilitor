"use client";

import { useQuery } from "@/hooks/useQuery";
import { useState } from "react";

type Contact = { FirstName: string };

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  useQuery(contacts, setContacts, "/api/contact/list");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Dashboard</p>

      <ul>
        {contacts &&
          contacts.map(({ FirstName }) => {
            // console.log("contact: ", contact);

            return <li key={`firstname=${FirstName}`}>{FirstName}</li>;
          })}
      </ul>
    </main>
  );
}
