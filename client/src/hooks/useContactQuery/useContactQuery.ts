import { type Dispatch, type SetStateAction, useEffect } from 'react';

let refreshNum: number;

function useContactQuery<State>(
  state: State,
  setState: Dispatch<SetStateAction<State>>,
  endpoint: string,
  storageKey: string,
  contactRefresh: number
): void {
  useEffect(() => {
    if (state && refreshNum === contactRefresh) return;
    refreshNum = contactRefresh;

    const lsState = window.localStorage.getItem(storageKey);
    if (lsState) {
      setState(JSON.parse(lsState));
      return;
    }

    (async () => {
      const response = await fetch(endpoint).catch(() => null);

      if (!response || response.status !== 200) {
        window.location.href = '/';
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
  }, [contactRefresh]);
}

export { useContactQuery };
