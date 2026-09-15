import type { Puzzle } from "../data/puzzles";
import RailwayMap from "./RailwayMap";

type MapScreenProps = {
  puzzles: Puzzle[];
  unlockedCount: number;
  onHouseClick: (index: number) => void;
};

function MapScreen({ puzzles, unlockedCount, onHouseClick }: MapScreenProps) {
  return (
    <div className="screen">
      <h2>Map</h2>
      <RailwayMap
        puzzles={puzzles}
        unlockedCount={unlockedCount}
        onHouseClick={onHouseClick}
      />
    </div>
  );
}

export default MapScreen;