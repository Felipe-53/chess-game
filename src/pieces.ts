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

export interface Piece {
  player: Player;
  getPaths: (from: Position) => Generator<Position, void, unknown>[];
}

export class Tower implements Piece {
  constructor(public player: Player) {}

  getPaths(from: Position) {
    const paths = [left(from), right(from), down(from), up(from)];
    return paths;
  }
}

export class Knight implements Piece {
  constructor(public player: Player) {}

  getPaths(from: Position) {
    const paths = getKnightPaths(from);
    return paths;
  }
}

export class Bishop implements Piece {
  constructor(public player: Player) {}

  getPaths(from: Position) {
    const paths = [
      upperLeft(from),
      upperRight(from),
      lowerLeft(from),
      lowerRight(from),
    ];
    return paths;
  }
}

export class Queen implements Piece {
  constructor(public player: Player) {}

  getPaths(from: Position) {
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

export class King implements Piece {
  constructor(public player: Player) {}

  getPaths(from: Position) {
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
