import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { contactFields } from "@/constants/contact";
import { scrollLock } from "@/helpers/scroll-lock";
import { postData } from "@/services/post-data";
import { Contact } from "@/types/contact";

import { Button } from "../Button";
import styles from "./Add-Contact.module.scss";

const nestedKeys = ["Line1", "Line2", "Line3", "PostCode"];

function AddContact({
  setContactRefresh,
}: {
  setContactRefresh: Dispatch<SetStateAction<Number>>;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [slide, setIsSlide] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    return setIsOpen(false);
  }, []);

  const openBottomsheet = () => {
    setIsOpen(true);
    setTimeout(() => setIsSlide(true), 10);
    formRef.current?.focus();
    scrollLock.on();
  };

  const closeBottomsheet = () => {
    setIsSlide(false);
    setTimeout(() => setIsOpen(false), 600);
    scrollLock.off();
  };

  const handleBtnClick = () => {
    if (open) {
      closeBottomsheet();
      return;
    }
    openBottomsheet();
  };

  const handleFormSubmission = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (e.target as HTMLButtonElement).disabled = true;

    if (!formRef) return;
    const inputs = formRef.current?.getElementsByTagName("input") ?? [];
    const requiredFields: Record<string, boolean> = {};
    const newContact: Partial<Contact> = {
      Address: { Line1: "", Line2: "", Line3: "", PostCode: "" },
    };

    for (let i = 0; i < inputs.length; i++) {
      const { value } = inputs[i];
      if (value.length) {
        inputs[i].classList.remove(styles["input--required"]);
        const key = inputs[i].name as keyof typeof newContact;
        const isNestedKey = nestedKeys.includes(key);
        if (isNestedKey) {
          // @ts-expect-error
          newContact.Address[key] = inputs[i].value;
        } else {
          // @ts-expect-error
          newContact[key] =
            inputs[i].type === "number"
              ? parseInt(inputs[i].value, 10)
              : inputs[i].value;
        }
        requiredFields[inputs[i].name] = true;
        delete requiredFields[inputs[i].name];
      } else {
        inputs[i].classList.add(styles["input--required"]);
        inputs[i].placeholder = "required";
        requiredFields[inputs[i].name] = true;
      }
    }

    if (Object.keys(requiredFields).length) {
      return;
    }

    setLoading(true);
    const postRes = await postData(
      "/api/contact/update",
      "contacts",
      JSON.stringify(newContact)
    );
    setLoading(false);

    if (!postRes.length) return;

    setContactRefresh(new Date().getTime());
    closeBottomsheet();
  };

  return (
    <>
      <Button
        className={`${styles["input"]} ${styles["input--left-align"]}`}
        text="Add Contact"
        onClick={handleBtnClick}
      />
      {open &&
        typeof window !== "undefined" &&
        createPortal(
          <>
            <Button
              onClick={closeBottomsheet}
              className={`${styles["overlay"]} ${slide ? styles["overlay--animate"] : ""}`}
            />
            <div
              className={`${styles["portal"]} ${slide ? styles["portal--animate"] : ""}`}
            >
              <form ref={formRef} action="" method="post">
                {contactFields.map((field, index) => (
                  <div key={index}>
                    <label className={styles["label-add"]} htmlFor={field.name}>
                      {field.label}
                    </label>
                    <input
                      className={`${styles["input-add"]} ${styles["input"]}`}
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      required={field.required}
                    />
                  </div>
                ))}
                <Button
                  onClick={handleFormSubmission}
                  className={`${styles["input"]} ${styles["input--submit"]}`}
                >
                  <>
                    {loading ? (
                      <div className={styles["wave"]}>
                        <span className={styles["dot"]}></span>
                        <span className={styles["dot"]}></span>
                        <span className={styles["dot"]}></span>
                      </div>
                    ) : (
                      <>Save</>
                    )}
                  </>
                </Button>
              </form>
            </div>
          </>,
          document.body
        )}
    </>
  );
}

export { AddContact };
