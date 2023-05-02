import React from "react";
import { Piece } from "./Piece";

interface Props {
  color: "white" | "black";
  setSelectedPiece: (name: string) => void;
}

const pieces = ["pawn", "rook", "knight", "bishop", "queen", "king"];

const PieceChooser: React.FC<Props> = ({ color, setSelectedPiece }) => {
  let styles = "bg-amber-500 p-1 rounded-md";

  const pieceElements = pieces.map((pieceName) => {
    return (
      <Piece
        key={`${color}-${pieceName}`}
        className={styles}
        onDragHandler={setSelectedPiece}
        name={`${color}-${pieceName}`}
      />
    );
  });

  return <div className="flex flex-col gap-5">{pieceElements}</div>;
};

export default PieceChooser;
