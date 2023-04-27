import { test, expect, describe, beforeEach } from "vitest";
import { Board, Chess } from "./chess";
import { Bishop, Tower } from "./pieces";
import { Position } from "./types";

let board: Board;

beforeEach(() => {
  board = new Board();
});

test("Can instantiate chess game", () => {
  let chess = new Chess();
  expect(chess).toBeTruthy();
});

test("can get, retrieve and delete from Board", () => {
  board.set([0, 0], new Tower("white"));
  expect(board.get([0, 0])).toBeTruthy();
  board.delete([0, 0]);
  expect(board.get([0, 0])).toBeFalsy();
});

test("Can instantiate a chess game with given initial state", () => {
  board.set([0, 0], new Tower("white"));

  let chess = new Chess(board);

  expect(chess.getStates()[0]).toEqual(
    new Board([[[0, 0], new Tower("white")]])
  );
});

test("Can move a tower on an empty board", () => {
  board.set([0, 0], new Tower("white"));

  let chess = new Chess(board);

  chess.move([0, 0], [0, 7]);

  expect(chess.getStates()[1]).toEqual(
    new Board([[[0, 7], new Tower("white")]])
  );
});

test("Cannot move a constrained tower", () => {
  board.set([0, 0], new Tower("white"));

  board.set([1, 0], new Bishop("white"));
  board.set([0, 1], new Bishop("white"));
  board.set([1, 1], new Bishop("white"));

  const chess = new Chess(board);

  const moves = chess.getValidMoves([0, 0]);

  expect(moves.length).toBe(0);
});
