export type Puzzle = {
  id: number;
  name: string;
  gridSize: number;
  imageUrl: string;
};

function gridSizeForLevel(level: number): number {
  if (level <= 5) return 3;   // levels 1-5
  if (level <= 11) return 4;  // levels 6-11
  if (level <= 19) return 5;  // levels 12-19
  if (level <= 25) return 6;  // levels 20-25
  if (level <= 28) return 7;  // levels 26-28
  return 8;                   // levels 29-30
}

const imageModules = import.meta.glob<{ default: string }>(
  "../assets/puzzles/*.png",
  { eager: true }
);

function getImageForLevel(level: number): string {
  const path = `../assets/puzzles/puzzle${level}.png`;
  const mod = imageModules[path];
  if (!mod) {
    throw new Error(`Missing image for level ${level}. Expected file: puzzle${level}.png`);
  }
  return mod.default;
}

const TOTAL_LEVELS = 30;

export const puzzles: Puzzle[] = Array.from({ length: TOTAL_LEVELS }, (_, i) => {
  const level = i + 1;
  return {
    id: level,
    name: `Level ${level}`,
    gridSize: gridSizeForLevel(level),
    imageUrl: getImageForLevel(level),
  };
});