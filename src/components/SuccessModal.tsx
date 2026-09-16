import SparkleField from "./SparkleField";
import Confetti from "./Confetti";

type SuccessModalProps = {
  isLast: boolean;
  onPlayNext: () => void;
};

function SuccessModal({ isLast, onPlayNext }: SuccessModalProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <Confetti />
        <SparkleField />
        <div className="modal-icon">{isLast ? "🏆" : "🎉"}</div>
        <h1>{isLast ? "Village Complete!" : "You did it!"}</h1>
        <p>
          {isLast
            ? "You've completed every puzzle in the village!"
            : "Puzzle solved. Ready for the next one?"}
        </p>
        <button onClick={onPlayNext}>
          {isLast ? "Back to Map" : "Play Next"}
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;