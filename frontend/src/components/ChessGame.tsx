import { useState } from "react";
import { Chess } from "../../../backend/src/chess";
import { Piece } from "./Piece";
import { Position } from "../types";

interface Props {
  chess: Chess;
}

const ChessGame: React.FC<Props> = ({ chess }) => {
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);

  const board = chess.getBoard();
  const boardElements: JSX.Element[] = [];

  const validPieceMoves = getValidPieceMoves(chess, selectedPiece);

  let color = false;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board.get([i, j]);

      const isValidMove = validPieceMoves.find((position) => {
        if (position.toString() === [i, j].toString()) return true;
      });

      let bg: string;
      if (isValidMove) {
        bg = "bg-yellow-400";
      } else {
        bg = color ? "bg-amber-900" : "bg-stone-500";
      }

      function onClickHandler() {
        if (chess.getChessCondition() === "checkmate") return;

        if (piece && !isValidMove) {
          return setSelectedPiece([i, j]);
        }

        if (isValidMove) {
          chess.move(selectedPiece!, [i, j]);
          setSelectedPiece(null);
        }
      }

      boardElements.push(
        <div
          key={[i, j].toString()}
          onClick={onClickHandler}
          className={
            "relative " +
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

  return (
    <div className="py-4 absolute inset-0 bg-black flex justify-center items-center overflow-auto">
      <div className="chess-board">{boardElements}</div>
    </div>
  );
};

function isDevelopment() {
  const origin = window.location.origin;

  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return true;
  }

  return false;
}

function getValidPieceMoves(chess: Chess, selectedPiece: Position | null) {
  let validPieceMoves: Position[] = [];

  if (selectedPiece) {
    try {
      validPieceMoves = chess.getValidMoves(selectedPiece);
      if (isDevelopment()) {
        console.log(validPieceMoves);
      }
    } catch (err) {
      if (isDevelopment()) {
        console.log(err);
      }
    }
  }

  return validPieceMoves;
}

export default ChessGame;
