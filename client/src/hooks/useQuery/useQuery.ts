import { useEffect } from "react";

function useQuery<State, SetState extends Function>(
  state: State,
  setState: SetState,
  endpoint: string,
  storageKey: string
) {
  useEffect(() => {
    (async () => {
      if (state) return;
      const response = await fetch(endpoint).catch(() => null);

      if (!response || response.status !== 200) {
        window.location.href = "/login";
        return;
      }

      const json = await response.json();
      const resContacts = json?.contacts;

      if (resContacts) {
        window.localStorage.set(storageKey, resContacts);
        setState(resContacts);
      }
    })();
  }, []);
}

export { useQuery };
