import { test, expect } from "vitest";
import { Chess } from ".";

test("Can instantiate chess game", () => {
  let chess = new Chess();
  expect(chess).toBeDefined();
});
