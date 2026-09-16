import { useState } from "react";
import type { Puzzle } from "../data/puzzles";
import { shuffledIndices, isSolved } from "../utils/puzzleHelpers";
import { MAX_FRAME_WIDTH } from "../utils/puzzleSizing";
import { useSound } from "../hooks/useSound";
import swapSound from "../assets/sounds/swap.wav";
import solveSound from "../assets/sounds/solve.wav";

type PuzzleScreenProps = {
  puzzle: Puzzle;
  totalLevels: number;
  onSolved: () => void;
  onBack: () => void;
};

function PuzzleScreen({ puzzle, totalLevels, onSolved, onBack }: PuzzleScreenProps) {
  const backgroundImage = `url(${puzzle.imageUrl})`;
  const gridSize = puzzle.gridSize;

  const playSwap = useSound(swapSound);
  const playSolve = useSound(solveSound);

  const [pieces, setPieces] = useState<number[]>(() =>
    shuffledIndices(gridSize * gridSize)
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [justSwapped, setJustSwapped] = useState<[number, number] | null>(null);

  const handleDrop = (dropIndex: number) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    setPieces((prev) => {
      const next = [...prev];
      [next[dragIndex], next[dropIndex]] = [next[dropIndex], next[dragIndex]];

      if (isSolved(next) && !solved) {
        setSolved(true);
        playSolve();
        setTimeout(onSolved, 500);
      }
      return next;
    });

    playSwap();
    setJustSwapped([dragIndex, dropIndex]);
    setTimeout(() => setJustSwapped(null), 300);
    setDragIndex(null);
  };

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>Level {puzzle.id} of {totalLevels}</h2>

      <div className="puzzle-wrapper" style={{ maxWidth: MAX_FRAME_WIDTH }}>
        <div
          className={"puzzle-grid" + (solved ? " solved" : "")}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {pieces.map((pieceId, slotIndex) => {
            const row = Math.floor(pieceId / gridSize);
            const col = pieceId % gridSize;
            const bgSize = `${gridSize * 100}% ${gridSize * 100}%`;
            const bgPosX = gridSize > 1 ? (col / (gridSize - 1)) * 100 : 0;
            const bgPosY = gridSize > 1 ? (row / (gridSize - 1)) * 100 : 0;

            return (
              <div
                key={slotIndex}
                draggable
                onDragStart={() => setDragIndex(slotIndex)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(slotIndex)}
                className={
                  "puzzle-piece" +
                  (justSwapped?.includes(slotIndex) ? " just-swapped" : "")
                }
                style={{
                  backgroundImage,
                  backgroundSize: bgSize,
                  backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                }}
              />
            );
          })}
        </div>
      </div>

      <p className="hint">Drag a piece onto another to swap them.</p>
    </div>
  );
}

export default PuzzleScreen;