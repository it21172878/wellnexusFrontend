import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import banner from "@/assets/images/banner.png";

type BoardState = (string | null)[];

const FunEvents = () => {
  const router = useRouter();
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const checkWinner = (board: BoardState): string | null => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return "Draw";
    }

    return null;
  };

  const handlePress = (index: number): void => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setIsGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsGameOver(false);
  };

  const renderCell = (index: number): JSX.Element => {
    const cellValue = board[index];
    const isActive = cellValue !== null;
    const cellColor = cellValue === "X" ? "text-red-500" : "text-blue-500";
    const cellBg =
      cellValue === "X"
        ? "bg-red-50"
        : cellValue === "O"
        ? "bg-blue-50"
        : "bg-white";

    return (
      <TouchableOpacity
        key={index}
        className={`w-20 h-20 ${cellBg} border-2 border-purple-200 items-center justify-center rounded-xl m-1 shadow-md`}
        onPress={() => handlePress(index)}
        activeOpacity={0.7}
      >
        {isActive && (
          <Text className={`text-4xl font-bold ${cellColor}`}>{cellValue}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
      <SafeAreaView
        className={`flex-1 ${Platform.OS === "android" ? "pb-16" : "pb-5"}`}
      >
        {/* Banner Background */}
        <View className="top-0 left-0 right-0">
          <ImageBackground
            source={banner}
            resizeMode="cover"
            className="w-full h-56"
            style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
          >
            <View className="absolute inset-0 bg-black opacity-20 rounded-b-xl" />
          </ImageBackground>
        </View>

        <ScrollView className="">
          <View className="items-center mt-2 px-4 pb-10">
            {/* Header */}
            <View className="mb-8 items-center">
              <Text className="text-3xl font-extrabold text-gray-800">
                Relax Your Mind
              </Text>
              <Text className="text-lg text-gray-600 mt-1">
                Play Tic-Tac-Toe
              </Text>
            </View>

            {/* Game Status */}
            <View className="bg-white/80 px-6 py-3 rounded-full mb-6">
              <Text className="text-lg font-semibold text-gray-700">
                {!winner ? `${currentPlayer}'s Turn` : "Game Over"}
              </Text>
            </View>

            {/* Game Board */}
            <View className="flex-row flex-wrap justify-center w-72 mb-8">
              {Array(9)
                .fill(null)
                .map((_, index) => renderCell(index))}
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              className="bg-purple-600 px-8 py-3 rounded-full shadow-lg"
              onPress={resetGame}
            >
              <Text className="text-white text-lg font-bold">Restart Game</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Game Over Modal */}
        <Modal
          visible={isGameOver}
          transparent
          animationType="fade"
          onRequestClose={() => setIsGameOver(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-80 p-6 rounded-2xl items-center">
              <Text className="text-2xl font-bold text-gray-800 mb-4">
                {winner === "Draw"
                  ? "🤝 It's a Draw!"
                  : `🎉 Player ${winner} Wins!`}
              </Text>

              <View className="flex-row justify-between w-full mt-4">
                <TouchableOpacity
                  className="bg-purple-600 px-6 py-3 rounded-lg flex-1 mr-2"
                  onPress={() => {
                    resetGame();
                    router.navigate("/mentalDisease/handlePredict");
                  }}
                >
                  <Text className="text-white font-bold text-center">
                    Review
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-gray-800 px-6 py-3 rounded-lg flex-1 ml-2"
                  onPress={resetGame}
                >
                  <Text className="text-white font-bold text-center">
                    Play Again
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FunEvents;
