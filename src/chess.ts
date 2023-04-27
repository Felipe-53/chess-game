import { Piece } from "./pieces";
import { Player, Position } from "./types";

export class Chess {
  private board: Board;
  private turn: Player;
  private states: Board[];

  constructor(board?: Board) {
    board ? (this.board = board) : (this.board = new Board());
    this.turn = "white";
    this.states = [structuredClone(this.board)];
  }

  move(from: Position, to: Position) {
    const piece = this.board.get(from);
    if (!piece) {
      throw Error("No piece to move");
    }

    this.board.delete(from);
    this.board.set(to, piece);

    this.states.push(structuredClone(this.board));
    this.turn = this.turn === "white" ? "black" : "white";
  }

  getValidMoves(from: Position) {
    const moves: Position[] = [];

    const movingPiece = this.board.get(from);
    if (!movingPiece) throw Error("No piece on position");

    let validPieceMoves = movingPiece.getValidMoves(from, this.board);

    // TODO: filter out check conditions

    return validPieceMoves;
  }

  getStates() {
    return this.states;
  }
}

export class Board {
  private board: Map<string, Piece>;

  constructor(init?: [Position, Piece][]) {
    if (init) {
      this.board = new Map(
        init.map((keyValue) => {
          return [keyValue[0].toString(), keyValue[1]];
        })
      );
    } else {
      this.board = new Map();
    }
  }

  get(element: Position) {
    return this.board.get(element.toString());
  }

  set(element: Position, piece: Piece) {
    return this.board.set(element.toString(), piece);
  }

  delete(element: Position) {
    this.board.delete(element.toString());
  }
}
