import { expect, test } from "vitest";
import { Bishop, Tower } from "./pieces";

test("Bishop", () => {
  let bishop = new Bishop("black");

  let paths = bishop.getPaths([0, 0]);

  let moves = [];
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

  expect(diagonal.length).toBe(moves.length);
});

test("tower", () => {
  const tower = new Tower("white");

  let paths = tower.getPaths([0, 0]);

  let moves = [];
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
    moves.some((move) => move.toString() === [1, 0].toString())
  ).toBeTruthy();

  expect(
    moves.some((move) => move.toString() === [1, 1].toString())
  ).toBeFalsy();

  paths = tower.getPaths([4, 4]);

  moves = [];
  for (const path of paths) {
    moves.push(...path);
  }

  expect(
    moves.some((move) => move.toString() === [4, 4].toString())
  ).toBeFalsy();

  expect(
    moves.some((move) => move.toString() === [4, 5].toString())
  ).toBeTruthy();

  expect(
    moves.some((move) => move.toString() === [5, 4].toString())
  ).toBeTruthy();

  expect(
    moves.some((move) => move.toString() === [7, 4].toString())
  ).toBeTruthy();

  expect(
    moves.some((move) => move.toString() === [4, 7].toString())
  ).toBeTruthy();
});
