import type { Puzzle } from "../data/puzzles";
import RailwayMap from "./RailwayMap";
import ProgressBar from "./ProgressBar";

type MapScreenProps = {
  puzzles: Puzzle[];
  unlockedCount: number;
  onHouseClick: (index: number) => void;
};

function MapScreen({ puzzles, unlockedCount, onHouseClick }: MapScreenProps) {
  const solvedCount = unlockedCount >= puzzles.length ? puzzles.length : unlockedCount - 1;

  return (
    <div className="screen">
      <h2>Map</h2>
      <ProgressBar completed={solvedCount} total={puzzles.length} />
      <RailwayMap puzzles={puzzles} unlockedCount={unlockedCount} onHouseClick={onHouseClick} />
    </div>
  );
}

export default MapScreen;