import React from "react";

export type Screen = "build" | "play-new" | "play-built";

interface Props {
  setScreen: React.Dispatch<React.SetStateAction<Screen | null>>;
}

const ChooseScreen: React.FC<Props> = ({ setScreen }) => {
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center p-10 gap-10 mx-auto w-full">
      <h1 className="text-5xl font-bold text-gray-100">Build or Play</h1>

      <div className="flex justify-around w-72">
        <button
          className="btn btn-secondary"
          onClick={() => setScreen("build")}
        >
          Build
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setScreen("play-new")}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default ChooseScreen;
