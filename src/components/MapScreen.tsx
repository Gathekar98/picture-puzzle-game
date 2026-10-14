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
      <header className="map-header">
        <div className="map-heading">
          <span className="eyebrow">Your adventure</span>
          <h1>Puzzle Trail</h1>
          <p>Restore every picture in the valley</p>
        </div>
        <div className="level-orb" aria-label={`Level ${Math.min(unlockedCount, puzzles.length)}`}>
          {Math.min(unlockedCount, puzzles.length)}
        </div>
      </header>
      <ProgressBar completed={solvedCount} total={puzzles.length} />
      <div className="village-shell">
        <RailwayMap puzzles={puzzles} unlockedCount={unlockedCount} onHouseClick={onHouseClick} />
      </div>
    </div>
  );
}

export default MapScreen;
