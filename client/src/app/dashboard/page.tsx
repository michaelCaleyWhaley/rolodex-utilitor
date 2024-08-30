"use client";

import { apiUrl } from "@/config/urls";
import { useEffect, useRef, useState } from "react";

type Contact = { FirstName: string };

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[] | null>(null);

  useEffect(() => {
    (async () => {
      if (contacts) return;
      const response = await fetch("/api/contact/list");
      const json = await response.json();
      const resContacts = json?.contacts;

      if (resContacts) {
        setContacts(resContacts);
      }
    })();
  }, []);

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
