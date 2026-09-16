import { useMemo } from "react";

type Sparkle = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
};

function generateSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 2,
  }));
}

function SparkleField() {
  const sparkles = useMemo(() => generateSparkles(12), []);

  return (
    <div className="sparkle-field">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default SparkleField;