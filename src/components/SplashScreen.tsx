import SparkleField from "./SparkleField";
import medallionSplash from "../assets/icons/medallion-splash.png";

function SplashScreen() {
  return (
    <div className="splash-screen">
      <SparkleField count={40} />
      <img src={medallionSplash} alt="" className="splash-icon" />
      <h1 className="splash-title">Picture Puzzle Journey</h1>
      <p className="splash-subtitle">Welcome to the village...</p>
    </div>
  );
}

export default SplashScreen;