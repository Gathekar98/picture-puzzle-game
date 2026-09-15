type StartModalProps = {
    onStart: () => void;
}

function StartModal({ onStart }: StartModalProps){
    return(
        <div className="overlay">
            <div className="modal">
                <h1>Picture Puzzle Journey</h1>
                <p>Solve each puzzle to unlock the nezt house on the map.</p>
                <button onClick={onStart}>Start Playing</button>
            </div>
        </div>
    );
}
export default StartModal;