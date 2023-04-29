import React from "react";
import whiteKing from "../assets/svg/white-king.svg";
import blackKing from "../assets/svg/black-king.svg";
import whiteQueen from "../assets/svg/white-queen.svg";
import blackQueen from "../assets/svg/black-queen.svg";
import whiteBishop from "../assets/svg/white-bishop.svg";
import blackBishop from "../assets/svg/black-bishop.svg";
import whiteKnight from "../assets/svg/white-knight.svg";
import blackKnight from "../assets/svg/black-knight.svg";
import whiteRook from "../assets/svg/white-rook.svg";
import blackRook from "../assets/svg/black-rook.svg";
import whitePawn from "../assets/svg/white-pawn.svg";
import blackPawn from "../assets/svg/black-pawn.svg";

interface Props {
  name: string;
}

export const Piece: React.FC<Props> = ({ name }) => {
  return <img width={50} src={pieceSvgMap[name]} />;
};

const pieceSvgMap: Record<string, string> = {
  "white-king": whiteKing,
  "black-king": blackKing,
  "white-queen": whiteQueen,
  "black-queen": blackQueen,
  "white-bishop": whiteBishop,
  "black-bishop": blackBishop,
  "white-knight": whiteKnight,
  "black-knight": blackKnight,
  "white-rook": whiteRook,
  "black-rook": blackRook,
  "white-pawn": whitePawn,
  "black-pawn": blackPawn,
};
