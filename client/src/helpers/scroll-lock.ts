export const scrollLock = {
  on: () => {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";

    document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";
  },
  off: () => {
    const scrollDist = document.body.style.top;

    document.body.style.overflow = "auto";
    document.body.style.position = "relative";
    document.body.style.top = "initial";

    window.scrollTo(0, Math.abs(parseInt(scrollDist, 10)));

    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
  },
};
