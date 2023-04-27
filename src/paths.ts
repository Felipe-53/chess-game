import { Position } from "./types";

export function* up(from: Position) {
  for (let i = from[0] - 1; i >= 0; i--) {
    yield [i, from[1]] as Position;
  }
}

export function* down(from: Position) {
  for (let i = from[0] + 1; i <= 7; i++) {
    yield [i, from[1]] as Position;
  }
}

export function* left(from: Position) {
  for (let j = from[1] - 1; j >= 0; j--) {
    yield [from[0], j] as Position;
  }
}

export function* right(from: Position) {
  for (let j = from[1] + 1; j <= 7; j++) {
    yield [from[0], j] as Position;
  }
}

export function* upperLeft(from: Position) {
  let [i, j] = from;
  i--, j--;
  while (i >= 0 && j >= 0) {
    yield [i, j] as Position;
    i--, j--;
  }
}

export function* upperRight(from: Position) {
  let [i, j] = from;
  i--, j++;
  while (i >= 0 && j <= 7) {
    yield [i, j] as Position;
    i--, j++;
  }
}

export function* lowerLeft(from: Position) {
  let [i, j] = from;
  i++, j--;
  while (i <= 7 && j >= 0) {
    yield [i, j] as Position;
    i++, j--;
  }
}

export function* lowerRight(from: Position) {
  let [i, j] = from;
  i++, j++;
  while (i <= 7 && j <= 7) {
    yield [i, j] as Position;
    i++, j++;
  }
}

export function* upOne(from: Position) {
  const generator = up(from);
  let position = generator.next();
  yield position;
}

export function* downOne(from: Position) {
  const generator = down(from);
  let position = generator.next();
  yield position;
}

export function* leftOne(from: Position) {
  const generator = left(from);
  let position = generator.next();
  yield position;
}

export function* rightOne(from: Position) {
  const generator = right(from);
  let position = generator.next();
  yield position;
}

export function* upperLeftOne(from: Position) {
  const generator = upperLeft(from);
  let position = generator.next();
  yield position;
}

export function* upperRightOne(from: Position) {
  const generator = upperRight(from);
  let position = generator.next();
  yield position;
}

export function* lowerLeftOne(from: Position) {
  const generator = lowerLeft(from);
  let position = generator.next();
  yield position;
}

export function* lowerRightOne(from: Position) {
  const generator = lowerRight(from);
  let position = generator.next();
  yield position;
}

export function getKnightPaths(
  from: Position
): Generator<Position, void, unknown>[] {
  const moves: Position[] = [];

  let [i, j] = from;

  moves.push([i + 2, j + 1]);
  moves.push([i + 2, j - 1]);
  moves.push([i - 2, j + 1]);
  moves.push([i - 2, j - 1]);

  moves.push([i + 1, j + 2]);
  moves.push([i - 1, j + 2]);
  moves.push([i + 1, j - 2]);
  moves.push([i - 1, j - 2]);

  let rv: Generator<Position, void, unknown>[] = [];

  for (const move of moves) {
    let gen = function* (from: Position) {
      yield move;
    };

    rv.push(gen(from));
  }

  return rv;
}
