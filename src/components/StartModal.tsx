import SparkleField from "./SparkleField";

type StartModalProps = {
  onStart: () => void;
};

function StartModal({ onStart }: StartModalProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <SparkleField />
        <div className="modal-icon">🏡</div>
        <h1>Picture Puzzle Journey</h1>
        <p>Solve each puzzle to unlock the next house on the map.</p>
        <button onClick={onStart}>Start Playing</button>
      </div>
    </div>
  );
}

export default StartModal;