import type { Puzzle } from "../data/puzzles";
import { useEffect, useRef, useState } from "react";

type RailwayMapProps = {
  puzzles: Puzzle[];
  unlockedCount: number;
  onHouseClick: (index: number) => void;
};

const SVG_WIDTH = 320;
const ROW_HEIGHT = 140;

function getHousePosition(index: number): { x: number; y: number } {
  // Alternate left/right using a sine wave, moving down the screen as index increases.
  const x = SVG_WIDTH / 2 + Math.sin(index * 1.4) * 90;
  const y = 80 + index * ROW_HEIGHT;
  return { x, y };
}

function buildPathD(puzzles: Puzzle[]): string {
  const points = puzzles.map((_, i) => getHousePosition(i));
  if (points.length === 0) return "";

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    // A smooth curve between each pair of houses, rather than a straight line.
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function RailwayMap({ puzzles, unlockedCount, onHouseClick }: RailwayMapProps) {
  const svgHeight = 80 + puzzles.length * ROW_HEIGHT;
  const pathD = buildPathD(puzzles);

    const previousUnlockedCount = useRef(unlockedCount);
    const [justUnlockedIndex, setJustUnlockedIndex] = useState<number | null>(null);

    useEffect(() => {
    if (unlockedCount > previousUnlockedCount.current) {
        // The newly unlocked house is at index (unlockedCount - 1)
        setJustUnlockedIndex(unlockedCount - 1);
        const timer = setTimeout(() => setJustUnlockedIndex(null), 600);
        previousUnlockedCount.current = unlockedCount;
        return () => clearTimeout(timer);
    }
    previousUnlockedCount.current = unlockedCount;
    }, [unlockedCount]);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
      className="railway-map"
    >
      {/* The track itself */}
      <path
        d={pathD}
        fill="none"
        stroke="#8d6e63"
        strokeWidth={6}
        strokeDasharray="14 10"
        strokeLinecap="round"
      />

      {/* One house per puzzle, positioned along the track */}
      {puzzles.map((puzzle, index) => {
        const { x, y } = getHousePosition(index);
        const isUnlocked = index < unlockedCount;

        return (
            <g
            key={puzzle.id}
            transform={`translate(${x}, ${y})`}
            onClick={() => isUnlocked && onHouseClick(index)}
            className={(isUnlocked ? "house-icon unlocked" : "house-icon locked") + (index === justUnlockedIndex ? " just-unlocked" : "")}
            >
            <g className={index === justUnlockedIndex ? "just-unlocked" : ""}>
                {/* all the shapes: ellipse, chimney, polygon, rects, circle, text — unchanged */}
            </g>
            {/* Soft shadow under the house, grounds it on the path */}
            <ellipse cx={0} cy={40} rx={26} ry={5} fill="rgba(45,42,38,0.15)" />

            {/* Chimney (behind the roof, drawn first) */}
            <rect x={14} y={-34} width={8} height={16} fill={isUnlocked ? "#c96f52" : "#8a8580"} />

            {/* Roof */}
            <polygon
                points="-30,0 0,-30 30,0"
                fill={isUnlocked ? "#c96f52" : "#8a8580"}
            />

            {/* Walls */}
            <rect x={-24} y={0} width={48} height={36} rx={2} fill={isUnlocked ? "#f2cc8f" : "#c4c0b8"} />

            {/* Window, "lit" only when unlocked */}
            <rect x={-16} y={8} width={12} height={12} rx={2} fill={isUnlocked ? "#fff4d6" : "#a8a49c"} />

            {/* Door */}
            <rect x={2} y={14} width={16} height={22} rx={2} fill={isUnlocked ? "#8d5b3f" : "#6f6b64"} />

            {/* House number badge */}
            <circle cx={0} cy={-16} r={11} fill="#fff" stroke={isUnlocked ? "#c96f52" : "#8a8580"} strokeWidth={2} />
            <text x={0} y={-12} textAnchor="middle" fontSize={13} fontWeight="700" fill={isUnlocked ? "#c96f52" : "#8a8580"}>
                {index + 1}
            </text>
            </g>
        );
        })}
    </svg>
  );
}

export default RailwayMap;