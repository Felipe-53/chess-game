import { Pawn, Piece, King, Knight, Bishop, Queen, Rook } from "./pieces";
import { Player, Position } from "./types";

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
    const king = this.board.getKingPosition(player);
    if (!king) {
      throw Error(`King '${player}' not present on the board`);
    }

    const opposingPlayerPiecesPositions = this.board.getPlayerPiecesPositions(
      player === "white" ? "black" : "white"
    );

    for (const piecePosition of opposingPlayerPiecesPositions) {
      const piece = this.board.get(piecePosition)!;
      const pieceValidMoves = piece.getPossibleMoves(piecePosition, this.board);
      for (const move of pieceValidMoves) {
        if (move.toString() == king.toString()) {
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

    board.set([0, 0], new Rook("black"));
    board.set([0, 1], new Knight("black"));
    board.set([0, 2], new Bishop("black"));
    board.set([0, 3], new Queen("black"));
    board.set([0, 4], new King("black"));
    board.set([0, 5], new Bishop("black"));
    board.set([0, 6], new Knight("black"));
    board.set([0, 7], new Rook("black"));

    board.set([7, 0], new Rook("white"));
    board.set([7, 1], new Knight("white"));
    board.set([7, 2], new Bishop("white"));
    board.set([7, 3], new Queen("white"));
    board.set([7, 4], new King("white"));
    board.set([7, 5], new Bishop("white"));
    board.set([7, 6], new Knight("white"));
    board.set([7, 7], new Rook("white"));

    return board;
  }

  getKingPosition(player: Player) {
    for (const entry of this.board) {
      const [positionString, piece] = entry;
      if (piece instanceof King && piece.player === player) {
        const position = Array.from(positionString.replace(",", "")).map(
          (numberString) => Number.parseInt(numberString)
        ) as Position;
        return position;
      }
    }
  }

  getPlayerPiecesPositions(player: Player): Position[] {
    const positions: Position[] = [];

    for (const entry of this.board) {
      const [positionString, piece] = entry;
      if (piece.player === player) {
        const position = Array.from(positionString.replace(",", "")).map(
          (numberString) => Number.parseInt(numberString)
        ) as Position;
        positions.push(position);
      }
    }
    return positions;
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

  deepCopy() {
    const newBoard = new Board();
    for (const [stringKey, value] of this.board) {
      const key: Position = [
        Number.parseInt(stringKey[0]),
        Number.parseInt(stringKey[2]),
      ];
      newBoard.set(key, value);
    }

    return newBoard;
  }
}
