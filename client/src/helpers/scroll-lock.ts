export const scrollLock = {
  on: () => {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
  },
  off: () => {
    document.body.style.overflow = "auto";
    document.body.style.position = "relative";
  },
};
