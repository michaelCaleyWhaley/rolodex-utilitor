import { MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { contactFields } from "@/constants/contact";

import { Button } from "../Button";
import styles from "./Add-Contact.module.scss";

function AddContact() {
  const [open, setIsOpen] = useState(false);
  const [slide, setIsSlide] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    return setIsOpen(false);
  }, []);

  const closeBottomsheet = () => {
    setIsSlide(false);
    setTimeout(() => setIsOpen(false), 600);
  };

  const handleBtnClick = () => {
    if (open) {
      closeBottomsheet();
      return;
    }
    setIsOpen(true);
    setTimeout(() => setIsSlide(true), 10);
  };

  const handleFormSubmission = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!formRef) return;
    const inputs = formRef.current?.getElementsByTagName("input") ?? [];

    for (let i = 0; i < inputs.length; i++) {
      const { value } = inputs[i];
      if (value.length) {
        inputs[i].classList.remove(styles["input--required"]);
        return;
      }
      inputs[i].classList.add(styles["input--required"]);
      inputs[i].placeholder = "required";
    }
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
                  text="Save"
                  onClick={handleFormSubmission}
                  className={`${styles["input"]} ${styles["input--submit"]}`}
                />
              </form>
            </div>
          </>,
          document.body
        )}
    </>
  );
}

export { AddContact };
