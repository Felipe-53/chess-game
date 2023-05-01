import { Player, Position } from "./types";
import { Board } from "./board";

export class Chess {
  private board: Board;
  private turn: Player;
  private states: Board[];
  public isCheck: boolean;
  public isCheckmate: boolean;

  constructor(board?: Board) {
    board ? (this.board = board) : (this.board = Board.new());
    this.turn = "white";
    this.states = [structuredClone(this.board)];
    this.isCheck = false;
    this.isCheckmate = false;
  }

  getBoard() {
    return this.board;
  }

  getTurn() {
    return this.turn;
  }

  move(from: Position, to: Position) {
    const piece = this.board.get(from);
    if (!piece) {
      throw Error("No piece to move");
    }

    this.board.delete(from);
    this.board.set(to, piece);

    this.turn = this.turn === "white" ? "black" : "white";

    const { check, checkmate } = this.check();
    (this.isCheck = check), (this.isCheckmate = checkmate);

    this.states.push(structuredClone(this.board));
  }

  check() {
    let check = this.isKingThreatened(this.turn);
    let checkmate = false;

    if (check) {
      checkmate = true;

      const currentPlayerPiecesPositions = this.board.getPlayerPiecesPositions(
        this.turn
      );

      for (const position of currentPlayerPiecesPositions) {
        if (this.getValidMoves(position).length > 0) {
          checkmate = false;
          break;
        }
      }
    }

    return { check, checkmate };
  }

  getValidMoves(from: Position) {
    const movingPiece = this.board.get(from);
    if (!movingPiece) throw Error("No piece on position");
    if (movingPiece.player !== this.turn) throw Error("Not on player's turn");

    const validPieceMoves = movingPiece
      .getPossibleMoves(from, this.board)
      .filter((position) => {
        const chessCopy = this.deepCopy();
        chessCopy.move(from, position);
        return !chessCopy.isKingThreatened(this.turn);
      });

    return validPieceMoves;
  }

  isKingThreatened(player: Player) {
    const kingPosition = this.board.getKingPosition(player);
    if (!kingPosition) {
      throw Error(`King '${player}' not present on the board`);
    }

    const opposingPlayerPiecesPositions = this.board.getPlayerPiecesPositions(
      player === "white" ? "black" : "white"
    );

    for (const piecePosition of opposingPlayerPiecesPositions) {
      const piece = this.board.get(piecePosition)!;
      const piecePossibleMoves = piece.getPossibleMoves(
        piecePosition,
        this.board
      );

      for (const move of piecePossibleMoves) {
        if (move.toString() == kingPosition.toString()) {
          return true;
        }
      }
    }

    return false;
  }

  deepCopy() {
    const boardCopy = this.board.deepCopy();
    const chessCopy = new Chess(boardCopy);
    chessCopy.turn = this.turn;
    return chessCopy;
  }

  getStates() {
    return this.states;
  }
}
