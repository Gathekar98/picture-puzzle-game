import { useMemo } from "react";

type Piece = {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
};

const COLORS = ["#e07a5f", "#81b29a", "#f2cc8f", "#3d5a80", "#f15bb5"];

function generateConfetti(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 0.4,
    duration: 1.2 + Math.random() * 0.8,
    rotation: Math.random() * 360,
  }));
}

function Confetti() {
  const pieces = useMemo(() => generateConfetti(24), []);

  return (
    <div className="confetti-field">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;