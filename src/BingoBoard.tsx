import React, { useState, useEffect } from "react";
import { useReward } from "react-rewards";

interface BingoBoardProps {
  board: string[][];
}

const BingoBoard: React.FC<BingoBoardProps> = ({ board }) => {
  const [selectedCells, setSelectedCells] = useState<{
    [key: string]: boolean;
  }>({});
  const [winningCombinations, setWinningCombinations] = useState<string[][]>(
    []
  );

  const { reward: confettiReward } = useReward("rewardId", "emoji", {
    emoji: ["⚪🔴", "🟡", "🐱"],
    elementCount: 100,
    spread: 40,
    lifetime: 100,
  });

  const toggleCell = (rowIndex: number, columnIndex: number) => {
    const cellKey = `${rowIndex}-${columnIndex}`;
    if (
      cellKey ===
        `${Math.floor(board.length / 2)}-${Math.floor(board.length / 2)}` &&
      selectedCells[cellKey]
    ) {

      return;
    }
    setSelectedCells((prevSelectedCells) => ({
      ...prevSelectedCells,
      [cellKey]: !prevSelectedCells[cellKey],
    }));
  };

  const initializeCentralCell = () => {
    setSelectedCells((prevSelectedCells) => ({
      ...prevSelectedCells,
      [`${Math.floor(board.length / 2)}-${Math.floor(board.length / 2)}`]: true,
    }));
  };

  const checkForWinner = () => {
    const checkAndSetWinningCombination = (combination: string[]) => {
      if (
        !winningCombinations.some((existingCombination) =>
          existingCombination.every((cell) => combination.includes(cell))
        ) &&
        combination.every((cell) => selectedCells[cell])
      ) {
        setWinningCombinations((prevCombinations) => [
          ...prevCombinations,
          combination,
        ]);
        confettiReward();
        return true;
      }
      return false;
    };

    // Check rows
    for (let i = 0; i < board.length; i++) {
      if (checkAndSetWinningCombination(board[i].map((_, j) => `${i}-${j}`))) {
        return;
      }
    }

    // Check columns
    for (let j = 0; j < board[0].length; j++) {
      if (checkAndSetWinningCombination(board.map((_, i) => `${i}-${j}`))) {
        return;
      }
    }

    // Check diagonals
    const diagonalCombination1 = board.map((_, i) => `${i}-${i}`);
    const diagonalCombination2 = board.map(
      (_, i) => `${i}-${board.length - 1 - i}`
    );

    if (
      checkAndSetWinningCombination(diagonalCombination1) ||
      checkAndSetWinningCombination(diagonalCombination2)
    ) {
      return;
    }
  };

  useEffect(() => {
    initializeCentralCell();
  }, []); // Empty dependency array ensures it runs only on mount

  useEffect(() => {
    // Trigger checkForWinner when selectedCells changes
    checkForWinner();
  }, [selectedCells]);
  console.log({ selectedCells });
  return (
    <div
      className="flex flex-col items-center justify-center space-y-2"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((cell, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-36 lg:h-36  border border-gray-400 cursor-pointer 
              ${
                selectedCells[`${rowIndex}-${columnIndex}`]
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => toggleCell(rowIndex, columnIndex)}
            >
              <img
                  src={`https://img.pokemondb.net/sprites/ruby-sapphire/normal/${cell.toLowerCase()}.png`}
                  alt={cell}
              />
            </div>
          ))}
        </div>
      ))}
      <div className="fixed">
        <span id="rewardId" />
      </div>
    </div>
  );
};

export default BingoBoard;
