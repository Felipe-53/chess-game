import { Pawn, Piece, King, Knight, Bishop, Queen, Tower } from "./pieces";
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

  static new() {
    const board = new Board();

    for (let i = 0; i < 8; i++) {
      board.set([1, i], new Pawn("black"));
      board.set([6, i], new Pawn("white"));
    }

    board.set([0, 0], new Tower("black"));
    board.set([0, 1], new Knight("black"));
    board.set([0, 2], new Bishop("black"));
    board.set([0, 3], new Queen("black"));
    board.set([0, 4], new King("black"));
    board.set([0, 5], new Bishop("black"));
    board.set([0, 6], new Knight("black"));
    board.set([0, 7], new Tower("black"));

    board.set([7, 0], new Tower("white"));
    board.set([7, 1], new Knight("white"));
    board.set([7, 2], new Bishop("white"));
    board.set([7, 3], new Queen("white"));
    board.set([7, 4], new King("white"));
    board.set([7, 5], new Bishop("white"));
    board.set([7, 6], new Knight("white"));
    board.set([7, 7], new Tower("white"));

    return board;
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
