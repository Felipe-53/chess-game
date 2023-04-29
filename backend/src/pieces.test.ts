import { expect, test } from "vitest";
import { Bishop, King, Rook } from "./pieces";
import { Position } from "./types";

// TODO: some wisdom: testing the individual paths makes more sense
// then, a simples integration test with the pieces would suffice
// you're kinda wasting time doing that
test("Bishop", () => {
  let bishop = new Bishop("black");

  expect(bishop.name).toBe("black-bishop");

  let paths = bishop.getPossiblePaths([0, 0]);

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

test("rook", () => {
  const rook = new Rook("white");

  expect(rook.name).toBe("white-rook");

  let paths = rook.getPossiblePaths([0, 0]);

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

  paths = rook.getPossiblePaths([4, 4]);

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

test("King", () => {
  const king = new King("white");

  let position = [4, 4] as Position;

  let paths = king.getPossiblePaths(position);

  let moves = [];
  for (const path of paths) {
    moves.push(...path);
  }

  let allDirections = getAllDirectionsOneUnity(position);

  for (const position of allDirections) {
    expect(
      moves.some((move) => move.toString() === position.toString())
    ).toBeTruthy();
  }

  position = [0, 0];

  paths = king.getPossiblePaths(position);

  moves = [];
  for (const path of paths) {
    moves.push(...path);
  }

  allDirections = getAllDirectionsOneUnity(position);

  for (const position of allDirections) {
    expect(
      moves.some((move) => move.toString() === position.toString())
    ).toBeTruthy();
  }
});

function getAllDirectionsOneUnity(position: Position) {
  let [iValue, jValue] = position;

  const allDirections = [];
  for (const i of [-1, 1, 0]) {
    for (const j of [-1, 1, 0]) {
      if (i === 0 && j === 0) continue;
      let iResult = iValue + i;
      let jResult = jValue + j;
      if (
        iResult >= 0 &&
        iResult <= 7 &&
        jResult + j >= 0 &&
        jResult + j <= 7
      ) {
        allDirections.push([iResult, jResult]);
      }
    }
  }

  return allDirections;
}
