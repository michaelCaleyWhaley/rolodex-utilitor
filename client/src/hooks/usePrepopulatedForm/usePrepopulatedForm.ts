import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

import { Address, Contact } from "@/types/contact";

function formatDateInput(
  props: Contact & {
    setContactRefresh: Dispatch<SetStateAction<number>>;
  }
) {
  const dateStr = props.ServiceStart as string;
  const dateObj = new Date(dateStr);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = dateObj.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function usePrepopulatedForm({
  formRef,
  nestedKeys,
  props,
  contactOpen,
}: {
  formRef: RefObject<HTMLFormElement>;
  nestedKeys: string[];
  props: Contact & {
    setContactRefresh: Dispatch<SetStateAction<number>>;
  };
  contactOpen: boolean;
}) {
  useEffect(() => {
    if (!contactOpen) return;

    const formattedDate = formatDateInput(props);

    Array.from(formRef.current?.getElementsByTagName("input") ?? []).forEach(
      (element) => {
        const typedEle = element as HTMLInputElement;

        const isNestedKey = nestedKeys.includes(typedEle.name);
        if (typedEle.type === "date") {
          typedEle.value = formattedDate;
          return;
        }
        if (isNestedKey) {
          typedEle.value = props.Address[typedEle.name as keyof Address];
          return;
        }
        typedEle.value = props[typedEle.name as keyof Contact] as string;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactOpen]);
}

export { usePrepopulatedForm };
