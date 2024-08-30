import { useEffect } from "react";

function useQuery<State, SetState extends Function>(
  state: State,
  setState: SetState,
  endpoint: string
) {
  useEffect(() => {
    (async () => {
      if (state) return;
      const response = await fetch(endpoint).catch(() => {
        window.location.href = "/login";
        return null;
      });

      if (!response) return;
      const json = await response.json();
      const resContacts = json?.contacts;

      if (resContacts) {
        setState(resContacts);
      }
    })();
  }, []);
}

export { useQuery };
