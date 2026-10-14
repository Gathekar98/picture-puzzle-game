type ProgressBarProps = {
  completed: number;
  total: number;
};

function ProgressBar({ completed, total }: ProgressBarProps) {
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="progress-card">
      <div className="progress-top">
        <span>Village restored</span>
        <span>{completed} / {total}</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
