import { Contact } from "@/app/dashboard/page";

export function sortContactsNextService(contacts: Contact[]) {
  return contacts.sort((a: Contact, b: Contact) => {
    if (new Date(a.NextService) > new Date(b.NextService)) {
      return 1;
    }
    return -1;
  });
}
