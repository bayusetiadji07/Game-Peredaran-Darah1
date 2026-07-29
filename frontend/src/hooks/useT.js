import { useCallback } from "react";
import { useGame } from "../context/GameContext";
import { t as tRaw } from "../utils/i18n";

/**
 * React hook returning a translation function bound to the current language
 * stored in GameContext. Use as: `const t = useT(); t("menu.mulai")`
 */
export default function useT() {
  const { state } = useGame();
  const lang = state.language || "id";
  return useCallback((key) => tRaw(key, lang), [lang]);
}
