import { Contact, ContactAddress } from "@/app/dashboard/page";

import styles from "./Contact-Card.module.scss";

function AddressLink({
  Address,
  text,
}: {
  Address: ContactAddress;
  text: string;
}) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${Address.Line1}+${Address.Line2}+${Address.Line3}+${Address.PostCode}`}
      target="_blank"
    >
      {text}
    </a>
  );
}

function ContactCard({
  FirstName,
  LastName,
  Company,
  Address,
  Email,
  PhoneNo,
  ServiceStart,
  ServiceFreq,
  NextService,
}: Contact) {
  return (
    <ul className={styles["card"]}>
      <li className={styles["first-name"]}>
        {FirstName} {LastName}
      </li>
      <li className={`${styles["company"]} ${styles["contact-li"]}`}>
        {Company}
      </li>

      <li className={styles["contact-li"]}>
        <AddressLink Address={Address} text={Address.Line1} />
      </li>
      <li className={styles["contact-li"]}>
        <AddressLink Address={Address} text={Address.Line2} />
      </li>
      <li className={styles["contact-li"]}>
        <AddressLink Address={Address} text={Address.Line3} />
      </li>
      <li className={styles["postcode"]}>
        <AddressLink Address={Address} text={Address.PostCode} />
      </li>
      <li className={styles["contact-li"]}>
        <svg
          data-id="20"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 inline"
        >
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>{" "}
        {Email}
      </li>
      <li className={styles["contact-li"]}>
        <svg
          data-id="18"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 inline"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        {PhoneNo}
      </li>
      <li className={styles["service-start"]}>Service start: {ServiceStart}</li>
      <li className={styles["contact-li"]}>
        Service freq: {ServiceFreq} monthly
      </li>
      <li className={styles["contact-li"]}>Next Service: {NextService}</li>
    </ul>
  );
}

export { ContactCard };
