import { useState } from "react";
import ChessGame from "./components/ChessGame";
import { Board } from "../../backend/src/board";
import { BuildBoard } from "./components/BuildBoard";
import { Chess } from "../../backend/src/chess";

type Screen = "build" | "play-new" | "play-built";

const board = new Board();

const App = () => {
  const [screen, setScreen] = useState<Screen | null>(null);

  function ChooseScreen() {
    return (
      <div className="flex flex-col items-center mt-10 gap-10">
        <h1 className="font-bold text-3xl">Build or Play</h1>

        <div className="flex justify-around w-72">
          <button onClick={() => setScreen("build")}>Build</button>
          <button onClick={() => setScreen("play-new")}>Play</button>
        </div>
      </div>
    );
  }

  const map = {
    build: <BuildBoard board={board} play={() => setScreen("play-built")} />,
    "play-new": <ChessGame chess={new Chess()} />,
    "play-built": <ChessGame chess={new Chess(board)} />,
  };

  return screen ? map[screen] : <ChooseScreen />;
};

export default App;
