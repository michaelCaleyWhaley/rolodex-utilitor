import { useEffect } from "react";

function useVerifyQuery(endpoint: string, storageKey: string) {
  useEffect(() => {
    const lsState = window.sessionStorage.getItem(storageKey);
    if (lsState) {
      return;
    }

    (async () => {
      const response = await fetch(endpoint).catch(() => null);

      if (!response || response.status !== 200) {
        window.localStorage.clear();
        window.location.href = "/";
        return;
      }
      window.sessionStorage.setItem(storageKey, "true");
    })();
  }, [endpoint, storageKey]);
}

export { useVerifyQuery };
