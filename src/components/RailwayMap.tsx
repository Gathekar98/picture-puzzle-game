import { useEffect, useRef, useState } from "react";
import type { Puzzle } from "../data/puzzles";
import villageBg from "../assets/village-bg.png";
import houseUnlocked from "../assets/house-unlocked.png";
import houseLocked from "../assets/house-locked.png";
import villageGate from "../assets/gate.png";
import villageWell from "../assets/well.png";
import { useSound } from "../hooks/useSound";
import unlockSound from "../assets/sounds/unlock.wav";

type RailwayMapProps = {
  puzzles: Puzzle[];
  unlockedCount: number;
  onHouseClick: (index: number) => void;
};

const SVG_WIDTH = 320;
const TOP_OFFSET = 160;
const ROW_HEIGHT = 100;
const HOUSE_SIZE = 48;
const GROUND_Y = 0;

const WELL_ROW_INDEX = 10;
const WELL_SIDE_OFFSET = 110;

function getHousePosition(index: number): { x: number; y: number } {
  const x = SVG_WIDTH / 2 + Math.sin(index * 1.4) * 70;
  const y = TOP_OFFSET + index * ROW_HEIGHT;
  return { x, y };
}

function buildPathD(puzzles: Puzzle[]): string {
  const points = puzzles.map((_, i) => getHousePosition(i));
  if (points.length === 0) return "";

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function RailwayMap({ puzzles, unlockedCount, onHouseClick }: RailwayMapProps) {
  const svgHeight = TOP_OFFSET + puzzles.length * ROW_HEIGHT;
  const pathD = buildPathD(puzzles);

  const playUnlock = useSound(unlockSound);
  const previousUnlockedCount = useRef(unlockedCount);
  const [justUnlockedIndex, setJustUnlockedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (unlockedCount > previousUnlockedCount.current) {
      setJustUnlockedIndex(unlockedCount - 1);
      playUnlock();
      const timer = setTimeout(() => setJustUnlockedIndex(null), 600);
      previousUnlockedCount.current = unlockedCount;
      return () => clearTimeout(timer);
    }
    previousUnlockedCount.current = unlockedCount;
  }, [unlockedCount]);

  return (
    <div
      className="village-background"
      style={{ backgroundImage: `url(${villageBg})` }}
    >
      <svg width="100%" viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`} className="railway-map">
        <path d={pathD} fill="none" stroke="#c9a876" strokeWidth={10} strokeLinecap="round" opacity={0.85} />
        <path d={pathD} fill="none" stroke="#a8825c" strokeWidth={10} strokeDasharray="2 14" strokeLinecap="round" />

        <image href={villageGate} x={SVG_WIDTH / 2 - 90} y={10} width={180} height={90} />
        <image
          href={villageWell}
          x={SVG_WIDTH / 2 + WELL_SIDE_OFFSET - 32}
          y={TOP_OFFSET + WELL_ROW_INDEX * ROW_HEIGHT - 32}
          width={64}
          height={64}
        />

        {puzzles.map((puzzle, index) => {
          const { x, y } = getHousePosition(index);
          const isUnlocked = index < unlockedCount;
          const sprite = isUnlocked ? houseUnlocked : houseLocked;

          return (
            <g
              key={puzzle.id}
              transform={`translate(${x}, ${y})`}
              onClick={() => isUnlocked && onHouseClick(index)}
              className={isUnlocked ? "house-icon unlocked" : "house-icon locked"}
            >
              <g className={index === justUnlockedIndex ? "just-unlocked" : ""}>
                <ellipse cx={0} cy={GROUND_Y} rx={HOUSE_SIZE / 3} ry={5} fill="rgba(45,42,38,0.3)" />
                <image href={sprite} x={-HOUSE_SIZE / 2} y={GROUND_Y - HOUSE_SIZE} width={HOUSE_SIZE} height={HOUSE_SIZE} />
                <circle cx={16} cy={GROUND_Y - HOUSE_SIZE + 18} r={11} fill="#fff" stroke={isUnlocked ? "#c96f52" : "#8a8580"} strokeWidth={2} />
                <text x={16} y={GROUND_Y - HOUSE_SIZE + 22} textAnchor="middle" fontSize={12} fontWeight="700" fill={isUnlocked ? "#c96f52" : "#8a8580"}>
                  {index + 1}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default RailwayMap;