"use client";

/** Same-browser instant refresh; polling remains the fallback for visitors on other devices. */
export const CMS_CHANGED_EVENT = "kloom:cms-changed";
export type CmsSection = "feature-addons" | "portfolio";

export function announceCmsChange(section: CmsSection): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CMS_CHANGED_EVENT, { detail: section }));
  try {
    localStorage.setItem(CMS_CHANGED_EVENT, JSON.stringify({ section, time: Date.now() }));
  } catch { /* storage may be disabled; normal polling still works */ }
}

export function listenForCmsChanges(section: CmsSection, refresh: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const changed = (event: Event) => {
    if ((event as CustomEvent<string>).detail === section) refresh();
  };
  const storage = (event: StorageEvent) => {
    if (event.key !== CMS_CHANGED_EVENT || !event.newValue) return;
    try {
      const value = JSON.parse(event.newValue) as { section?: string };
      if (value.section === section) refresh();
    } catch { /* ignore malformed external storage values */ }
  };
  window.addEventListener(CMS_CHANGED_EVENT, changed);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener(CMS_CHANGED_EVENT, changed);
    window.removeEventListener("storage", storage);
  };
}
