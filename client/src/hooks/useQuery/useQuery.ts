import { useEffect } from "react";

function useQuery<State, SetState extends Function>(
  state: State,
  setState: SetState,
  endpoint: string,
  storageKey: string
) {
  useEffect(() => {
    if (state) return;
    const lsState = window.localStorage.getItem(storageKey);
    if (lsState) {
      setState(JSON.parse(lsState));
      return;
    }

    (async () => {
      const response = await fetch(endpoint).catch(() => null);

      if (!response || response.status !== 200) {
        window.location.href = "/";
        return;
      }

      const json = await response.json();
      const resContacts = json?.contacts;

      if (resContacts) {
        window.localStorage.setItem(storageKey, JSON.stringify(resContacts));
        setState(resContacts);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { useQuery };
