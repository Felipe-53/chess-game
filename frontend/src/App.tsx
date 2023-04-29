import { useState } from "react";

import { Chess } from "../../backend/src/chess";
import { Piece } from "./components/Piece";
import { Position } from "./types";

const chess = new Chess();

function App() {
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);

  function tiles() {
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7];
    const arr = [];

    const board = chess.getBoard();

    let possibleMoves: Position[] = [];
    if (selectedPiece) {
      try {
        possibleMoves = chess.getValidMoves(selectedPiece);
      } catch {}
    }

    let color = false;
    for (const i of indexes) {
      for (const j of indexes) {
        const stringId = i.toString() + j.toString();

        const piece = board.get([i, j]);

        const possibleMove = possibleMoves.find((position) => {
          if (position.toString() === [i, j].toString()) return true;
        });

        let bg: string;
        if (possibleMove) {
          bg = "bg-yellow-400";
        } else {
          bg = color ? "bg-green-400" : "bg-gray-300";
        }

        function onClickHandler() {
          if (piece && !possibleMove) {
            return setSelectedPiece([i, j]);
          }
          if (possibleMove) {
            chess.move(selectedPiece!, [i, j]);
            setSelectedPiece(null);
          }
        }

        arr.push(
          <div
            key={stringId}
            onClick={onClickHandler}
            className={
              "h-full w-full" +
              " " +
              bg +
              " " +
              "flex items-center justify-center"
            }
          >
            {piece ? <Piece name={piece.name} /> : null}
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
