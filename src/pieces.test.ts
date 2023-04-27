import { expect, test } from "vitest";
import { Bishop, Tower } from "./pieces";

test("Bishop", () => {
  let bishop = new Bishop("black");
  const paths = bishop.getPaths([0, 0]);

  const moves = [];
  for (const path of paths) {
    moves.push(...path);
  }

  let i = 1;
  const diagonal = [];
  while (i < 8) {
    diagonal.push([i, i]);
    i++;
  }

  for (const position of diagonal) {
    expect(
      moves.some((move) => move.toString() === position.toString())
    ).toBeTruthy();
  }
});

test("tower", () => {
  let tower = new Tower("white");
  const paths = tower.getPaths([0, 0]);

  const moves = [];
  for (const path of paths) {
    moves.push(...path);
  }

  expect(
    moves.some((move) => move.toString() === [0, 7].toString())
  ).toBeTruthy();

  expect(
    moves.some((move) => move.toString() === [7, 0].toString())
  ).toBeTruthy();

  expect(
    moves.some((move) => move.toString() === [0, 1].toString())
  ).toBeTruthy();

  expect(
    moves.some((move) => move.toString() === [0, 2].toString())
  ).toBeTruthy();

  expect(
    moves.some((move) => move.toString() === [1, 1].toString())
  ).toBeFalsy();
});
