import SparkleField from "./SparkleField";
import { useSound } from "../hooks/useSound";
import clickSound from "../assets/sounds/click.wav";
import medallionStart from "../assets/icons/medallion-start.png";

type StartModalProps = {
  onStart: () => void;
};

function StartModal({ onStart }: StartModalProps) {
  const playClick = useSound(clickSound);

  const handleClick = () => {
    playClick();
    onStart();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <SparkleField />
        <img src={medallionStart} alt="" className="modal-icon" />
        <h1>Picture Puzzle Journey</h1>
        <p>Solve each puzzle to unlock the next house on the map.</p>
        <button onClick={handleClick}>Start Playing</button>
      </div>
    </div>
  );
}

export default StartModal;