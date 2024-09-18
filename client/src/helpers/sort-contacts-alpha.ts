import { Contact } from "@/types/contact";

export function sortContactsAlpha(contacts: Contact[]) {
  return contacts.sort((a: Contact, b: Contact) => {
    if (a.LastName[0].toUpperCase() > b.LastName[0].toUpperCase()) {
      return 1;
    }
    return -1;
  });
}
