const STORAGE_KEY = "sima_plan";

export function getPlano() {
  if (typeof window === "undefined") return "free";
  return localStorage.getItem(STORAGE_KEY) || "free";
}

export function setPlano(plano: "free" | "premium") {
  localStorage.setItem(STORAGE_KEY, plano);
}
