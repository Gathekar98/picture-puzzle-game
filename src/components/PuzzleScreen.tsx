import { useState } from "react";
import type { Puzzle } from "../data/puzzles";
import { shuffledIndices, isSolved } from "../utils/puzzleHelpers";

type PuzzleScreenProps = {
  puzzle: Puzzle;
  onSolved: () => void;
  onBack: () => void;
};

function PuzzleScreen({ puzzle, onSolved, onBack }: PuzzleScreenProps) {
  const backgroundImage = `url(${puzzle.imageUrl})`;

  const [pieces, setPieces] = useState<number[]>(() =>
    shuffledIndices(puzzle.gridSize * puzzle.gridSize)
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [justSwapped, setJustSwapped] = useState<[number, number] | null>(null);

  const size = 300;
  const cell = size / puzzle.gridSize;

  const handleDrop = (dropIndex: number) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    setPieces((prev) => {
        const next = [...prev];
        [next[dragIndex], next[dropIndex]] = [next[dropIndex], next[dragIndex]];

        if (isSolved(next) && !solved) {
        setSolved(true);
        setTimeout(onSolved, 500); // let the glow play before the modal appears
        }
        return next;
    });

    setJustSwapped([dragIndex, dropIndex]);
    setTimeout(() => setJustSwapped(null), 300);

    setDragIndex(null);
    };

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>{puzzle.name}</h2>

      <div
        className={"puzzle-grid" + (solved ? " solved" : "")}
        style={{ gridTemplateColumns: `repeat(${puzzle.gridSize}, 1fr)` }}
        >
        {pieces.map((pieceId, slotIndex) => {
          const row = Math.floor(pieceId / puzzle.gridSize);
          const col = pieceId % puzzle.gridSize;

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
                width: cell,
                height: cell,
                backgroundImage,
                backgroundSize: `${size}px ${size}px`,
                backgroundPosition: `-${col * cell}px -${row * cell}px`,
              }}
            />
          );
        })}
      </div>

      <p className="hint">Drag a piece onto another to swap them.</p>
    </div>
  );
}

export default PuzzleScreen;