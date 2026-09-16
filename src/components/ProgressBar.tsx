type ProgressBarProps = {
  completed: number;
  total: number;
};

function ProgressBar({ completed, total }: ProgressBarProps) {
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-bar-label">{completed} / {total} unlocked</span>
    </div>
  );
}

export default ProgressBar;