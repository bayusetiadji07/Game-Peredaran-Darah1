import { useCallback } from "react";
import { t as tRaw } from "../utils/i18n";

/**
 * React hook returning a translation function. Kept as a hook (rather than a
 * plain import) so we can attach a language state later without touching
 * call-sites again.
 */
export default function useT() {
  return useCallback((key) => tRaw(key), []);
}
