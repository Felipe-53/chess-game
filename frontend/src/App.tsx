import { useState } from "react";
import ChessGame from "./components/ChessGame";
import { Board } from "../../backend/src/board";
import { BuildBoard } from "./components/BuildBoard";
import { Chess } from "../../backend/src/chess";
import ChooseScreen from "./components/ChooseScreen";
import { Screen } from "./components/ChooseScreen";

const board = new Board();

const App = () => {
  const [screen, setScreen] = useState<Screen | null>(null);

  const map = {
    build: <BuildBoard board={board} play={() => setScreen("play-built")} />,
    "play-new": <ChessGame chess={new Chess()} />,
    "play-built": <ChessGame chess={new Chess(board)} />,
  };

  return screen ? map[screen] : <ChooseScreen setScreen={setScreen} />;
};

export default App;
