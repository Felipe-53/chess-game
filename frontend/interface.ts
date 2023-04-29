type IPlayer = "white" | "black";

type IPice = {
  name: string;
  player: "white" | "black";
};

interface IChess {
  getBoard: () => Map<string, IPice>;
  getTurn: () => IPlayer;
  getIsCheck: () => {
    check: boolean;
    checkmate: boolean;
  };
  getValidMoves: (position: string) => string[];
  move: (from: string, to: string) => void;
}
