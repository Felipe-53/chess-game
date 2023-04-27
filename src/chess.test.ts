import { test, expect, describe, beforeEach } from "vitest";
import { Board, Chess } from "./chess";
import { Bishop, Pawn, Queen, Tower } from "./pieces";
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

describe("Pawn special moves", () => {
  test("Black pawn", () => {
    let pawn = new Pawn("black");
    let pawnPosition: Position = [1, 2];
    let singleStep: Position = [2, 2];
    let doubleStep: Position = [3, 2];
    let diagonal1: Position = [2, 3];
    let diagonal2: Position = [2, 1];

    board.set(pawnPosition, pawn);
    let moves = pawn.getValidMoves(pawnPosition, board);

    expect(moves).toContainEqual(singleStep);
    expect(moves).toContainEqual(doubleStep);
    expect(moves).not.toContainEqual(diagonal1);
    expect(moves).not.toContainEqual(diagonal2);

    board.set(diagonal1, new Bishop("white"));
    board.set(diagonal2, new Bishop("white"));

    moves = pawn.getValidMoves(pawnPosition, board);

    expect(moves).toContainEqual(diagonal1);
    expect(moves).toContainEqual(diagonal2);
  });

  test("White pawn", () => {
    let pawn = new Pawn("white");
    let pawnPosition: Position = [6, 2];
    let singleStep: Position = [5, 2];
    let doubleStep: Position = [4, 2];
    let diagonal1: Position = [5, 3];
    let diagonal2: Position = [5, 1];

    board.set(pawnPosition, pawn);
    let moves = pawn.getValidMoves(pawnPosition, board);

    expect(moves).toContainEqual(singleStep);
    expect(moves).toContainEqual(doubleStep);
    expect(moves).not.toContainEqual(diagonal1);
    expect(moves).not.toContainEqual(diagonal2);

    board.set(diagonal1, new Queen("black"));
    board.set(diagonal2, new Queen("black"));

    moves = pawn.getValidMoves(pawnPosition, board);

    expect(moves).toContainEqual(diagonal1);
    expect(moves).toContainEqual(diagonal2);
  });

  test("Cannot make double-step move unless in initial position", () => {
    let pawn = new Pawn("white");
    let pawnPosition: Position = [5, 1];
    let doubleStep: Position = [3, 1];

    const board = new Board();
    board.set(pawnPosition, pawn);

    let moves = pawn.getValidMoves(pawnPosition, board);

    expect(moves).not.toContainEqual(doubleStep);

    pawn = new Pawn("black");
    pawnPosition = [2, 1];
    doubleStep = [4, 1];

    board.set(pawnPosition, pawn);

    moves = pawn.getValidMoves(pawnPosition, board);

    expect(moves).not.toContainEqual(doubleStep);
  });
});
