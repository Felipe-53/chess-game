import { useState } from "react";

import { Chess } from "../../backend/src/chess";
import { Piece } from "./components/Piece";
import { Position } from "./types";

const chess = new Chess();

function App() {
  const [chessGame, setChessGame] = useState(chess);
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);

  function tiles() {
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7];
    const arr = [];

    const board = chessGame.getBoard();

    let possibleMoves: Position[] = [];
    if (selectedPiece) {
      try {
        possibleMoves = chess.getValidMoves(selectedPiece);
      } catch {}
    }

    let color = false;
    for (const i of indexes) {
      for (const j of indexes) {
        const bg = color ? "bg-green-400" : "bg-gray-400";
        const stringId = i.toString() + j.toString();

        const piece = board.get([i, j]);

        const possibleMove = possibleMoves.find((position) => {
          if (position.toString() === [i, j].toString()) return true;
        });

        arr.push(
          <div
            key={stringId}
            className={
              "h-full w-full" +
              " " +
              bg +
              " " +
              "flex items-center justify-center"
            }
          >
            {piece ? (
              <Piece
                name={piece.name}
                select={() => setSelectedPiece([i, j])}
              />
            ) : null}

            {possibleMove ? (
              <div
                onClick={() => {
                  chess.move(selectedPiece!, [i, j]);
                  setSelectedPiece(null);
                }}
                className="w-6 h-6 rounded-full bg-yellow-400"
              ></div>
            ) : null}
          </div>
        );
        color = !color;
      }
      color = !color;
    }

    return arr;
  }

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <div className="chess-board">{tiles()}</div>
    </div>
  );
}

export default App;
