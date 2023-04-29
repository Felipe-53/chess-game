import { useState } from "react";
import whiteKing from "./assets/svg/white-king.svg";
import blackKing from "./assets/svg/black-king.svg";
import whiteQueen from "./assets/svg/white-queen.svg";
import blackQueen from "./assets/svg/black-queen.svg";
import whiteBishop from "./assets/svg/white-bishop.svg";
import blackBishop from "./assets/svg/black-bishop.svg";
import whiteKnight from "./assets/svg/white-knight.svg";
import blackKnight from "./assets/svg/black-knight.svg";
import whiteRook from "./assets/svg/white-rook.svg";
import blackRook from "./assets/svg/black-rook.svg";
import whitePawn from "./assets/svg/white-pawn.svg";
import blackPawn from "./assets/svg/black-pawn.svg";

import { Chess } from "../../backend/src/chess";

const chess = new Chess();

function App() {
  const [chessGame, setChessGame] = useState(chess);

  function tiles() {
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7];
    const arr = [];

    let color = false;
    for (const i of indexes) {
      for (const j of indexes) {
        const bg = color ? "bg-green-400" : "bg-gray-400";
        const stringId = i.toString() + j.toString();
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
            <img width={50} src={whiteKing} />
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
