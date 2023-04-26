import { Piece } from "./pieces";
import { Player, Position } from "./types";

type Board = Map<Position, Piece>;

export class Chess {
  private board: Board;
  private turn: Player;
  private states: Board[];

  constructor(board?: Board) {
    this.turn = "white";
    this.states = [];
    if (board) {
      this.board = board;
    } else {
      this.board = new Map();
    }
  }

  move(from: Position, to: Position) {
    const piece = this.board.get(from);
    if (!piece) {
      throw Error("No piece to move");
    }

    this.board.set(to, piece);
    this.board.delete(to);

    this.states.push(this.board);
    this.turn = this.turn === "white" ? "black" : "white";
  }

  getPossibleMoves(from: Position) {
    const moves: Position[] = [];

    const movingPiece = this.board.get(from);
    if (!movingPiece) throw Error("No piece on position");

    const paths = movingPiece.getPaths(from);

    for (const path of paths) {
      for (const position of path) {
        const piece = this.board.get(position);

        if (!piece) {
          moves.push(position);
          continue;
        }

        if (movingPiece.player === piece.player) {
          // Path is blocked, look no further
          break;
        }

        if (movingPiece.player !== piece.player) {
          // A take move, but the rest of the path is blocked
          moves.push(position);
          break;
        }

        moves.push(position);
      }
    }

    return moves;
  }
}
