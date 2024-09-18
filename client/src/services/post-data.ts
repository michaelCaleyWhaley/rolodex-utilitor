async function postData(endpoint: string, storageKey: string, body: BodyInit) {
  const response = await fetch(endpoint, {
    method: "POST",
    body,
  }).catch(() => null);

  if (!response || response.status !== 200) {
    return;
  }

  const json = await response?.json().catch(() => null);
  const resContacts = json?.contacts;

  if (resContacts) {
    window.localStorage.setItem(storageKey, JSON.stringify(resContacts));
  }

  return resContacts;
}

export { postData };
