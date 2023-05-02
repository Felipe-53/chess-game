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

  return <div className="flex lg:flex-col lg:gap-5 gap-2">{pieceElements}</div>;
};

export default PieceChooser;
