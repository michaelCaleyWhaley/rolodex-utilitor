import { FUTURE_DATE } from "@/constants/future-dates";
import { Contact } from "@/types/contact";

export function sortContactsNextService(contacts: Contact[]) {
  return contacts.sort((a: Contact, b: Contact) => {
    if (
      new Date(a.NextService ?? FUTURE_DATE) >
      new Date(b.NextService ?? FUTURE_DATE)
    ) {
      return 1;
    }
    return -1;
  });
}
