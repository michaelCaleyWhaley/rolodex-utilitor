import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

import { contactFields } from "@/constants/contact";
import { handleFormSubmission } from "@/helpers/handleFormSubmission";
import { useContactForm } from "@/hooks/useContactForm";
import { usePrepopulatedForm } from "@/hooks/usePrepopulatedForm";
import { Contact } from "@/types/contact";

import cogImage from "../../public/cog.svg";
import { Button } from "../Button";
import styles from "./Update-Contact.module.scss";

const nestedKeys = ["Line1", "Line2", "Line3", "PostCode"];

function UpdateContact(
  props: Contact & { setContactRefresh: Dispatch<SetStateAction<number>> }
) {
  const { setContactRefresh, ContactId } = props;
  const {
    loading,
    setLoading,
    handleBtnClick,
    slide,
    contactOpen,
    closeBottomsheet,
    formRef,
  } = useContactForm();

  usePrepopulatedForm({ formRef, nestedKeys, props, contactOpen });

  return (
    <>
      <Button className={`${styles["cog"]}`} onClick={handleBtnClick}>
        <Image
          className={styles["cog--image"]}
          src={cogImage}
          alt="Dream big with our easy to use contact management system."
          width={701}
          height={466}
          loading="eager"
        />
      </Button>
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
                <h3 className={styles["title"]}>Update</h3>
                {contactFields.map((field, index) => (
                  <div key={index}>
                    <label className={styles["label-add"]} htmlFor={field.name}>
                      {field.label}
                    </label>

                    {nestedKeys.includes(field.name) ? (
                      <input
                        className={`${styles["input-add"]} ${styles["input"]}`}
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        required={field.required}
                      />
                    ) : (
                      <input
                        className={`${styles["input-add"]} ${styles["input"]}`}
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        required={field.required}
                      />
                    )}
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
                      endpoint: "/api/contact/update",
                      ContactId,
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
                      endpoint: "/api/contact/remove",
                      ContactId,
                    });
                  }}
                  className={`${styles["input"]} ${styles["input--delete"]}`}
                >
                  <>
                    {loading ? (
                      <div className={styles["wave"]}>
                        <span className={styles["dot"]}></span>
                        <span className={styles["dot"]}></span>
                        <span className={styles["dot"]}></span>
                      </div>
                    ) : (
                      <>Delete</>
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

export { UpdateContact };
