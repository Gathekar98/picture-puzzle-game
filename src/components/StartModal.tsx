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
        <span className="modal-kicker">A cozy puzzle adventure</span>
        <h1>Picture Puzzle Journey</h1>
        <p>Rebuild beautiful pictures and light up every home along the village trail.</p>
        <button onClick={handleClick}>Begin the journey</button>
      </div>
    </div>
  );
}

export default StartModal;
