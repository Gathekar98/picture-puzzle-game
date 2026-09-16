import { useState, useRef } from "react";
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

type DragState = {
  slotIndex: number;
  offsetX: number;
  offsetY: number;
};

function PuzzleScreen({ puzzle, totalLevels, onSolved, onBack }: PuzzleScreenProps) {
  const backgroundImage = `url(${puzzle.imageUrl})`;
  const gridSize = puzzle.gridSize;

  const playSwap = useSound(swapSound);
  const playSolve = useSound(solveSound);

  const [pieces, setPieces] = useState<number[]>(() =>
    shuffledIndices(gridSize * gridSize)
  );
  const [solved, setSolved] = useState(false);
  const [justSwapped, setJustSwapped] = useState<[number, number] | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const performSwap = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    setPieces((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];

      if (isSolved(next) && !solved) {
        setSolved(true);
        playSolve();
        setTimeout(onSolved, 500);
      }
      return next;
    });

    playSwap();
    setJustSwapped([fromIndex, toIndex]);
    setTimeout(() => setJustSwapped(null), 300);
  };

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    slotIndex: number
  ) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragState({ slotIndex, offsetX: 0, offsetY: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState) return;
    setDragState((prev) =>
      prev
        ? {
            ...prev,
            offsetX: prev.offsetX + e.movementX,
            offsetY: prev.offsetY + e.movementY,
          }
        : prev
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState) return;

    const draggedEl = e.currentTarget;

    // Hide the dragged piece from hit-testing so elementFromPoint finds
    // whatever is actually underneath it, not itself.
    draggedEl.style.pointerEvents = "none";
    const targetEl = document.elementFromPoint(e.clientX, e.clientY);
    draggedEl.style.pointerEvents = "";

    const slotAttr = targetEl?.closest<HTMLElement>("[data-slot]")?.dataset.slot;

    if (slotAttr !== undefined) {
        performSwap(dragState.slotIndex, Number(slotAttr));
    }

    setDragState(null);
    };

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>Level {puzzle.id} of {totalLevels}</h2>

      <div className="puzzle-wrapper" style={{ maxWidth: MAX_FRAME_WIDTH }}>
        <div
          ref={gridRef}
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
            const isDragging = dragState?.slotIndex === slotIndex;

            return (
              <div
                key={slotIndex}
                data-slot={slotIndex}
                onPointerDown={(e) => handlePointerDown(e, slotIndex)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className={
                  "puzzle-piece" +
                  (justSwapped?.includes(slotIndex) ? " just-swapped" : "") +
                  (isDragging ? " dragging" : "")
                }
                style={{
                  backgroundImage,
                  backgroundSize: bgSize,
                  backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                  transform: isDragging
                    ? `translate(${dragState.offsetX}px, ${dragState.offsetY}px) scale(1.08)`
                    : undefined,
                  touchAction: "none",
                }}
              />
            );
          })}
        </div>
      </div>

      <p className="hint">Press and drag a piece onto another to swap them.</p>
    </div>
  );
}

export default PuzzleScreen;