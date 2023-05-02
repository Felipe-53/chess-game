import React, { useState } from "react";
import { Board } from "../../../backend/src/board";
import { Piece } from "./Piece";
import { pieceNameMap } from "../../../backend/src/pieces";

interface Props {
  board: Board;
  play: () => void;
}

const BuildBoard: React.FC<Props> = ({ board, play }) => {
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const boardElements: JSX.Element[] = [];

  let color = false;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const bg = color ? "bg-amber-900" : "bg-stone-500";

      const piece = board.get([i, j]);

      boardElements.push(
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (selectedPiece) {
              board.set([i, j], pieceNameMap[selectedPiece]);
              setSelectedPiece(null);
            }
          }}
          key={[i, j].toString()}
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
    <div className="h-screen bg-slate-600  flex flex-col items-center gap-4 p-4">
      <button className="btn btn-warning w-32" onClick={play}>
        PLAY
      </button>

      <div className="flex justify-center gap-10 items-center">
        <div className="flex flex-col gap-4">
          <Piece onDragHandler={setSelectedPiece} name="white-pawn" />
          <Piece onDragHandler={setSelectedPiece} name="white-king" />
          <Piece onDragHandler={setSelectedPiece} name="white-queen" />
          <Piece onDragHandler={setSelectedPiece} name="white-bishop" />
          <Piece onDragHandler={setSelectedPiece} name="white-knight" />
          <Piece onDragHandler={setSelectedPiece} name="white-rook" />
        </div>

        <div className="chess-board">{boardElements}</div>

        <div className="flex flex-col gap-4">
          <Piece onDragHandler={setSelectedPiece} name="black-pawn" />
          <Piece onDragHandler={setSelectedPiece} name="black-king" />
          <Piece onDragHandler={setSelectedPiece} name="black-queen" />
          <Piece onDragHandler={setSelectedPiece} name="black-bishop" />
          <Piece onDragHandler={setSelectedPiece} name="black-knight" />
          <Piece onDragHandler={setSelectedPiece} name="black-rook" />
        </div>
      </div>
    </div>
  );
};

export { BuildBoard };
