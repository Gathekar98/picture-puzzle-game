import { useState , useEffect } from "react";
import StartModal from "./components/StartModal";
import MapScreen from "./components/MapScreen";
import PuzzleScreen from "./components/PuzzleScreen";
import { puzzles } from "./data/puzzles";
import "./App.css";
import SuccessModal from "./components/SuccessModal";
import SplashScreen from "./components/SplashScreen";

type Stage = "splash" | "start" | "map" | "puzzle";

function App() {
  const [stage, setStage] = useState<Stage>("splash");
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const isLastPuzzle = currentIndex === puzzles.length - 1;

  const handleStart = () => setStage("map");

  const handleHouseClick = (index: number) => {
   setCurrentIndex(index);
   setStage("puzzle");
  };

  useEffect(() => {
    const timer = setTimeout(() => setStage("start"), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSolved = () => setShowSuccess(true);

  const handleBack = () => setStage("map");

  const handlePlayNext = () => {
    setShowSuccess(false);

    if(isLastPuzzle){
      setUnlockedCount(puzzles.length);
      setStage("map");
    }
    else{
      const nextIndex = currentIndex + 1;
      setUnlockedCount((prev) => Math.max(prev, nextIndex + 1));
      setCurrentIndex(nextIndex);
      setStage("puzzle");
    }
  };

  return (
    <div className="app">
      {stage === "splash" && <SplashScreen />}
      {stage === "start" && <StartModal onStart={handleStart} />}
      {stage === "map" && (
        <MapScreen
          puzzles={puzzles}
          unlockedCount={unlockedCount}
          onHouseClick={handleHouseClick}
        />
      )}
      {stage === "puzzle" && (
        <PuzzleScreen
          key={currentIndex}
          puzzle={puzzles[currentIndex]}
          totalLevels={puzzles.length}
          onSolved={handleSolved}
          onBack={handleBack}
        />
      )}
      {showSuccess && (
        <SuccessModal isLast={isLastPuzzle} onPlayNext={handlePlayNext} />
      )}
    </div>
  );
}

export default App;