import Image from "next/image";

import { loginUrl } from "@/config/urls";

import dreamImage from "../public/dream.jpeg";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className="flex py-4">
      <section className={`${styles["hero"]} p-4`}>
        <div className={styles["hero__text"]}>
          <h1 className={styles["h1"]}>Manage Your Contacts with Ease</h1>
          <p className={styles["strap-line"]}>
            Rolodex is the ultimate contact management solution, helping you
            stay organized and connected with your network.
          </p>
          <div className={styles["hero__link-box"]}>
            <a
              className={styles["hero__link"]}
              href={`https://rolodex-utilitor.auth.eu-west-2.amazoncognito.com/login?client_id=65u34livlolumvk8adv9bjs2fl&response_type=code&scope=email+openid&redirect_uri=${encodeURI(
                loginUrl
              )}`}
            >
              Login
            </a>
            <a
              className={styles["hero__link"]}
              href={`https://rolodex-utilitor.auth.eu-west-2.amazoncognito.com/signup?client_id=65u34livlolumvk8adv9bjs2fl&response_type=code&scope=email+openid&redirect_uri=${encodeURI(
                loginUrl
              )}`}
            >
              Sign up
            </a>
          </div>
        </div>

        <Image
          className={styles["hero__image"]}
          src={dreamImage}
          alt="Dream big with our easy to use contact management system."
          width={701}
          height={466}
          loading="eager"
        />
      </section>
    </main>
  );
}
