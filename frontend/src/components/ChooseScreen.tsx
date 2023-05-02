import React, { useEffect, useState } from "react";

export type Screen = "build" | "play-new" | "play-built";

interface Props {
  setScreen: React.Dispatch<React.SetStateAction<Screen | null>>;
}

const ChooseScreen: React.FC<Props> = ({ setScreen }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  if (isMobile === null) return null;

  return (
    <div className="bg-black my-auto absolute inset-0 flex flex-col items-center justify-center p-10 gap-10 mx-auto w-full">
      <h1 className="text-5xl font-bold text-gray-100">Build or Play</h1>

      <div className="flex justify-around w-72">
        {isMobile ? null : (
          <button
            className="btn btn-secondary"
            onClick={() => setScreen("build")}
          >
            Build
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={() => setScreen("play-new")}
        >
          Play
        </button>
      </div>

      <p className="pt-4 text-secondary">
        <b>*</b> Build only available on desktop
      </p>
    </div>
  );
};

export default ChooseScreen;
