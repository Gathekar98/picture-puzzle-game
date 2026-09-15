type SuccessModalProps = {
    isLast : boolean;
    onPlayNext: () => void;
};

function SuccessModal({isLast, onPlayNext}:SuccessModalProps){
    return(
        <div className="overlay">
            <div className="modal">
                <h1>🎉 You did it!</h1>
                <p>
                    {isLast
                        ? "You've Completed every puzzle!"
                        : "Puzzle solved. Ready for the next one?"
                    }
                </p>
                <button onClick={onPlayNext}>
                    {isLast ? "Back to Map" : "Play Next"}
                </button>
            </div>
        </div>
    );
}
export default SuccessModal;