const STORAGE_KEY = "picpuzzle-progress";

export function loadProgress(): number {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) return 1;

  const parsed = Number(saved);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

export function saveProgress(unlockedCount: number): void {
  localStorage.setItem(STORAGE_KEY, String(unlockedCount));
}