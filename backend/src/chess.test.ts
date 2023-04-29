import { test, expect, describe, beforeEach } from "vitest";
import { Board, Chess } from "./chess";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./pieces";
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
  board.set([0, 0], new Rook("white"));
  expect(board.get([0, 0])).toBeTruthy();
  board.delete([0, 0]);
  expect(board.get([0, 0])).toBeFalsy();
});

test("Can instantiate a chess game with given initial state", () => {
  board.set([0, 0], new Rook("white"));

  let chess = new Chess(board);

  expect(chess.getStates()[0]).toEqual(
    new Board([[[0, 0], new Rook("white")]])
  );
});

test("Can move a rook on an empty board", () => {
  board.set([0, 0], new Rook("white"));
  // TODO: if king is not added, test fail because of failure
  // to verify check condition
  board.set([5, 5], new King("black"));

  let chess = new Chess(board);

  chess.move([0, 0], [0, 7]);

  expect(chess.getStates()[1]).toEqual(
    new Board([
      [[0, 7], new Rook("white")],
      [[5, 5], new King("black")],
    ])
  );
});

test("Cannot move a constrained rook", () => {
  board.set([0, 0], new Rook("white"));

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
    let moves = pawn.getPossibleMoves(pawnPosition, board);

    expect(moves).toContainEqual(singleStep);
    expect(moves).toContainEqual(doubleStep);
    expect(moves).not.toContainEqual(diagonal1);
    expect(moves).not.toContainEqual(diagonal2);

    board.set(diagonal1, new Bishop("white"));
    board.set(diagonal2, new Bishop("white"));

    moves = pawn.getPossibleMoves(pawnPosition, board);

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
    let moves = pawn.getPossibleMoves(pawnPosition, board);

    expect(moves).toContainEqual(singleStep);
    expect(moves).toContainEqual(doubleStep);
    expect(moves).not.toContainEqual(diagonal1);
    expect(moves).not.toContainEqual(diagonal2);

    board.set(diagonal1, new Queen("black"));
    board.set(diagonal2, new Queen("black"));

    moves = pawn.getPossibleMoves(pawnPosition, board);

    expect(moves).toContainEqual(diagonal1);
    expect(moves).toContainEqual(diagonal2);
  });

  test("Cannot make double-step move unless in initial position", () => {
    let pawn = new Pawn("white");
    let pawnPosition: Position = [5, 1];
    let doubleStep: Position = [3, 1];

    const board = new Board();
    board.set(pawnPosition, pawn);

    let moves = pawn.getPossibleMoves(pawnPosition, board);

    expect(moves).not.toContainEqual(doubleStep);

    pawn = new Pawn("black");
    pawnPosition = [2, 1];
    doubleStep = [4, 1];

    board.set(pawnPosition, pawn);

    moves = pawn.getPossibleMoves(pawnPosition, board);

    expect(moves).not.toContainEqual(doubleStep);
  });
});

test("King position", () => {
  const whiteKingPosition: Position = [0, 0];
  const blackKingPosition: Position = [7, 7];

  board.set(whiteKingPosition, new King("white"));

  expect(board.getKingPosition("white")).toEqual(whiteKingPosition);

  board.set(blackKingPosition, new King("black"));

  expect(board.getKingPosition("black")).toEqual(blackKingPosition);
});

test("All player's piece positions", () => {
  const allWhitePieces: Position[] = [];

  let pawnPosition = [0, 0] as Position;
  let bishopPosition = [1, 1] as Position;
  let knightPosition = [6, 7] as Position;
  let kingPosition = [3, 7] as Position;

  allWhitePieces.push(pawnPosition);
  allWhitePieces.push(bishopPosition);
  allWhitePieces.push(knightPosition);
  allWhitePieces.push(kingPosition);

  board.set(pawnPosition, new Pawn("white"));
  board.set(bishopPosition, new Bishop("white"));
  board.set(knightPosition, new Knight("white"));
  board.set(kingPosition, new King("white"));

  board.set([5, 5], new King("black"));

  expect(board.getPlayerPiecesPositions("white")).toEqual(allWhitePieces);

  board = Board.new();

  expect(board.getPlayerPiecesPositions("white").length).toBe(16);
  expect(board.getPlayerPiecesPositions("black").length).toBe(16);
});

test("Simple check", () => {
  board.set([0, 0], new King("black"));
  board.set([7, 7], new Rook("white"));

  const chess = new Chess(board);

  chess.move([7, 7], [7, 0]);

  expect(chess.isCheck).toBe(true);
});

test("Simple checkmate", () => {
  board.set([0, 0], new King("black"));
  board.set([7, 0], new Rook("white"));
  board.set([0, 7], new Rook("white"));
  board.set([7, 5], new Bishop("white"));

  const chess = new Chess(board);

  chess.move([7, 5], [6, 6]);

  expect(chess.isCheckmate).toBe(true);
});
