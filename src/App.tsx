import React, { useState } from "react";
import "./App.css";
import Timer from "react-compound-timer";
// Lines 5-8: Bring in chessboard and chess.js stuff
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js");

const paddingStyle = {
  padding: 5
}

const marginStyle = {
  margin: 5
}

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    // Set initial state to FEN layout // FEN:- Position representation of the chess pieces 
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());

  // Logic for the setting up the random computer move.
  const handleMove = (move: ShortMove) => {
    //  Todo: Start timer on user move.
    
    // Todo: Show the possible moves of Selected piece.

    // validates the user move.
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        console.log(moves);
        // Lines 33-28: Computer random move.
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);
      // Sets state of chess board
      setFen(chess.fen());
    }
  };

  return (
    <div className="flex-center">
      <h1>Two Player Chess Game</h1>
      <Chessboard
        width={600}
        position={fen}
        // Todo: Show the User Names
        // Todo: Show the Game move, till now.
        // Todo: Show the Capture pieces.
        // Todo: Show the Game Win Window at Finish.
        // Todo: Provide the separate timer to the players.
        // Todo: Draw offer
        // Todo: Abort Option
        // Todo: Surrender feature.
        // Todo: Game analysis with an Engine.

        // onDrop prop tracks everytime a piece is moved.
        // The rest is handled in the the handleMove function.
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            // This promotion attribute changes pawns to a queen if they reach the other side of the board.

            // Todo: Give the option to the user to make the choice for pawn promotion.
            
            promotion: "q",
          })
        }
      />
      {/* Timer code */}
      <Timer initialTime={0} startImmediately={false}>
        {/* I thought this was weird. Definitely a better way to do this, but I just wanted it to work. */}
        {({ start, resume, pause, stop, reset, timerState } : {start:any, resume:any, pause:any, stop:any, reset:any, timerState:any}) => (
            <>
                <div>
                    <span style={paddingStyle}><Timer.Minutes /> minutes</span>
                    <span style={paddingStyle}><Timer.Seconds /> sec</span>
                    <span style={paddingStyle}><Timer.Milliseconds /> ms</span>
                </div>
                <div style={paddingStyle}>{timerState}</div>
                <br />
                <div>
                    <button style={marginStyle} onClick={start}>Start</button>
                    <button style={marginStyle} onClick={pause}>Pause</button>
                    <button style={marginStyle} onClick={resume}>Resume</button>
                    <button style={marginStyle} onClick={stop}>Stop</button>
                    <button style={marginStyle} onClick={reset}>Reset</button>
                </div>
            </>
        )}
      </Timer>
    </div>
  );
};

export default App;
