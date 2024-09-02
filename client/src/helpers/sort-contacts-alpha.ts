import { Contact } from "@/app/dashboard/page";

export function sortContactsAlpha(contacts: Contact[]) {
  return contacts.sort((a: Contact, b: Contact) => {
    if (a.LastName[0] > b.LastName[0]) {
      return 1;
    }
    return -1;
  });
}
