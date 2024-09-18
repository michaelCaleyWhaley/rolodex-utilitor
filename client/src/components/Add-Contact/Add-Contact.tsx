import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

import { contactFields, nestedKeys } from "@/constants/contact";
import { handleFormSubmission } from "@/helpers/handleFormSubmission";
import { useContactForm } from "@/hooks/useContactForm";

import { Button } from "../Button";
import styles from "./Add-Contact.module.scss";

function AddContact({
  setContactRefresh,
}: {
  setContactRefresh: Dispatch<SetStateAction<number>>;
}) {
  const {
    loading,
    setLoading,
    handleBtnClick,
    slide,
    contactOpen,
    closeBottomsheet,
    formRef,
  } = useContactForm();

  return (
    <>
      <Button
        className={`${styles["input"]} ${styles["input--left-align"]}`}
        text="Add Contact"
        onClick={handleBtnClick}
      />
      {contactOpen &&
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
                <h3 className={styles["title"]}>Add</h3>
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
                  onClick={(e) => {
                    handleFormSubmission({
                      e,
                      formRef,
                      styles,
                      nestedKeys,
                      setLoading,
                      setContactRefresh,
                      closeBottomsheet,
                      endpoint: "/api/contact/add",
                    });
                  }}
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
