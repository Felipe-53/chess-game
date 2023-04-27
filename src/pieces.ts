import { Board } from "./chess";
import {
  down,
  downOne,
  getKnightPaths,
  left,
  leftOne,
  lowerLeft,
  lowerLeftOne,
  lowerRight,
  lowerRightOne,
  right,
  rightOne,
  up,
  upOne,
  upperLeft,
  upperLeftOne,
  upperRight,
  upperRightOne,
} from "./paths";
import { Player, Position } from "./types";

export abstract class Piece {
  constructor(public player: Player) {}

  abstract getPossiblePaths(
    from: Position
  ): Generator<Position, void, unknown>[];

  getValidMoves(from: Position, board: Board) {
    const moves: Position[] = [];

    const paths = this.getPossiblePaths(from);

    for (const path of paths) {
      for (const position of path) {
        const piece = board.get(position);

        if (!piece) {
          moves.push(position);
          continue;
        }

        if (this.player === piece.player) {
          // Path is blocked, look no further
          break;
        }

        if (this.player !== piece.player) {
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

export class Tower extends Piece {
  constructor(public player: Player) {
    super(player);
  }

  getPossiblePaths(from: Position) {
    const paths = [left(from), right(from), down(from), up(from)];
    return paths;
  }
}

export class Knight extends Piece {
  constructor(public player: Player) {
    super(player);
  }

  getPossiblePaths(from: Position) {
    const paths = getKnightPaths(from);
    return paths;
  }
}

export class Bishop extends Piece {
  constructor(public player: Player) {
    super(player);
  }

  getPossiblePaths(from: Position) {
    const paths = [
      upperLeft(from),
      upperRight(from),
      lowerLeft(from),
      lowerRight(from),
    ];
    return paths;
  }
}

export class Queen extends Piece {
  constructor(public player: Player) {
    super(player);
  }

  getPossiblePaths(from: Position) {
    const paths = [
      upperLeft(from),
      upperRight(from),
      lowerLeft(from),
      lowerRight(from),
      left(from),
      right(from),
      down(from),
      up(from),
    ];
    return paths;
  }
}

export class King extends Piece {
  constructor(public player: Player) {
    super(player);
  }

  getPossiblePaths(from: Position) {
    const paths = [
      upperLeftOne(from),
      upperRightOne(from),
      lowerLeftOne(from),
      lowerRightOne(from),
      leftOne(from),
      rightOne(from),
      downOne(from),
      upOne(from),
    ];
    return paths;
  }
}
