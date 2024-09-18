import { useEffect, useRef, useState } from "react";

import { scrollLock } from "@/helpers/scroll-lock";

function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [contactOpen, setIsContactOpen] = useState(false);
  const [slide, setIsSlide] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    return setIsContactOpen(false);
  }, []);

  const openBottomsheet = () => {
    setIsContactOpen(true);
    setTimeout(() => setIsSlide(true), 10);
    formRef.current?.focus();
    scrollLock.on();
  };

  const closeBottomsheet = () => {
    setIsSlide(false);
    setTimeout(() => setIsContactOpen(false), 600);
    scrollLock.off();
  };

  const handleBtnClick = () => {
    if (contactOpen) {
      closeBottomsheet();
      return;
    }
    openBottomsheet();
  };

  return {
    loading,
    setLoading,
    handleBtnClick,
    slide,
    contactOpen,
    closeBottomsheet,
    formRef,
  };
}

export { useContactForm };
