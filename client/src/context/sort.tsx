import { createContext, Dispatch, SetStateAction } from 'react';

export const CONTEXT_ALPHA = 'alphabetical';
export const CONTEXT_SERVICE = 'service_date';

export const SortContext = createContext<{
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ sort: CONTEXT_ALPHA, setSort: () => {} });
