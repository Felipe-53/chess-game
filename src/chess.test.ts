import { test, expect } from "vitest";
import { Board, Chess } from "./chess";
import { Tower } from "./pieces";
import { Position } from "./types";

test("Can instantiate chess game", () => {
  let chess = new Chess();
  expect(chess).toBeTruthy();
});

test("can get, retrieve and delete from Board", () => {
  let board = new Board();

  board.set([0, 0], new Tower("white"));
  expect(board.get([0, 0])).toBeTruthy();
  board.delete([0, 0]);
  expect(board.get([0, 0])).toBeFalsy();
});

test("Can instantiate a chess game with given initial state", () => {
  const board = new Board();
  board.set([0, 0], new Tower("white"));
  let chess = new Chess(board);
  expect(chess).toBeTruthy();
});

test("Can move a tower on an empty board", () => {
  const board = new Board();
  board.set([0, 0], new Tower("white"));

  let chess = new Chess(board);

  chess.move([0, 0], [0, 7]);

  let afterBoard = new Board();
  afterBoard.set([7, 7], new Tower("white"));

  console.log(chess.getStates());
});
