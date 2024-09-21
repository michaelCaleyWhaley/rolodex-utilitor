import { MouseEvent, RefObject } from "react";

import { postData } from "@/services/post-data";
import { type Contact } from "@/types/contact";

function reEnableBtn(e: MouseEvent<HTMLButtonElement>) {
  (e.target as HTMLButtonElement).disabled = false;
}

const handleFormSubmission = async ({
  e,
  formRef,
  styles,
  nestedKeys,
  setLoading,
  setContactRefresh,
  closeBottomsheet,
  endpoint,
  ContactId,
}: {
  e: MouseEvent<HTMLButtonElement>;
  formRef: RefObject<HTMLFormElement>;
  styles: {
    readonly [key: string]: string;
  };
  nestedKeys: string[];
  setLoading: (_state: boolean) => void;
  setContactRefresh: (_value: number) => void;
  closeBottomsheet: () => void;
  endpoint: "/api/contact/add" | "/api/contact/update" | "/api/contact/remove";
  ContactId?: string | undefined;
}) => {
  e.preventDefault();
  (e.target as HTMLButtonElement).disabled = true;

  if (!formRef) return;
  const inputs = formRef.current?.getElementsByTagName("input") ?? [];
  const requiredFields: Record<string, boolean> = {};
  const newContact: Partial<Contact> = {
    ...(ContactId && { ContactId }),
    Address: { Line1: "", Line2: "", Line3: "", PostCode: "" },
  };

  for (let i = 0; i < inputs.length; i++) {
    const { value, required } = inputs[i];
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
      // requiredFields[inputs[i].name] = true;
      delete requiredFields[inputs[i].name];
    } else if (required) {
      inputs[i].classList.add(styles["input--required"]);
      inputs[i].placeholder = "required";
      requiredFields[inputs[i].name] = true;
    }
  }

  if (Object.keys(requiredFields).length) {
    reEnableBtn(e);
    return;
  }

  setLoading(true);
  const postRes = await postData(
    endpoint,
    "contacts",
    JSON.stringify(newContact)
  );
  setLoading(false);

  if (!postRes?.length) return;

  setContactRefresh(new Date().getTime());
  closeBottomsheet();
};

export { handleFormSubmission };
