import SparkleField from "./SparkleField";
import Confetti from "./Confetti";
import { useSound } from "../hooks/useSound";
import clickSound from "../assets/sounds/click.wav";
import medallionWin from "../assets/icons/medallion-win.png";
import medallionTrophy from "../assets/icons/medallion-trophy.png";

type SuccessModalProps = {
  isLast: boolean;
  onPlayNext: () => void;
};

function SuccessModal({ isLast, onPlayNext }: SuccessModalProps) {
  const playClick = useSound(clickSound);

  const handleClick = () => {
    playClick();
    onPlayNext();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <Confetti />
        <SparkleField />
        <img src={isLast ? medallionTrophy : medallionWin} alt="" className="modal-icon" />
        <span className="modal-kicker">{isLast ? "Grand finale" : "Picture restored"}</span>
        <h1>{isLast ? "Village Complete!" : "You did it!"}</h1>
        <p>
          {isLast
            ? "You've completed every puzzle in the village!"
            : "Puzzle solved. Ready for the next one?"}
        </p>
        <button onClick={handleClick}>
          {isLast ? "Return to the trail" : "Next adventure"}
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
