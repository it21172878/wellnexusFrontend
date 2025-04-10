import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import banner from "@/assets/images/banner.png";
// import Header from "@/layouts/header";
// import Ionicons from "@expo/vector-icons/Ionicons";

const FunEvents = () => {
  const router = useRouter();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over

  const checkWinner = (newBoard: string[]) => {
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

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a]; // Return "X" or "O" as the winner
      }
    }

    return null;
  };

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setIsGameOver(true); // Show the prompt when the game ends
    } else if (newBoard.every((cell) => cell !== null)) {
      setWinner("Draw");
      setIsGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsGameOver(false); // Hide the modal
  };
  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#f7f7fc" },
        Platform.OS == "android" && { paddingBottom: 60 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <View style={{ flex: -1 }}>
        <View className=" ">
          <ImageBackground
            resizeMode="cover"
            style={{
              position: "absolute",
              width: "100%",
              height: 220, // or whatever height you need
              top: 0,
              left: 0,
              right: 0,
              borderBottomLeftRadius: 100,
            }}
            source={banner}
          ></ImageBackground>
        </View>
        {/* <View> */}
        {/* <Header
          left={
            <Link href={"/"} asChild>
              <TouchableOpacity>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </Link>
          }
          centerText="Fun Events"
        /> */}
        <ScrollView style={{ marginTop: 110 }}>
          <View className=" content-center items-center justify-center mt-36">
            <Text className="text-color1 text-3xl font-bold mb-4">
              Tic-Tac-Toe
            </Text>

            {/* 3x3 Grid Fix */}
            <View className="flex flex-wrap flex-row w-[240px]">
              {board.map((cell, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[70px] h-[70px] bg-color1 border border-color3 items-center justify-center rounded-full m-1"
                  onPress={() => handlePress(index)}
                >
                  <Text className="text-color3 text-4xl font-bold">{cell}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              className="mt-10 p-3 bg-color3 rounded-lg w-36 items-center justify-center border border-color1"
              onPress={resetGame}
            >
              <Text className="text-color1 text-lg font-bold">
                Restart Game
              </Text>
            </TouchableOpacity>

            {/* Prompt Box (Modal) when Game Over */}
            <Modal visible={isGameOver} transparent animationType="slide">
              <View className="flex-1 justify-center items-center bg-[#201a245b]">
                <View className="bg-color1 border border-color3 p-4 rounded-lg justify-center items-center w-96 h-60">
                  <Text className="text-color3 text-2xl font-bold mb-3">
                    {winner === "Draw"
                      ? "🤝 It's a Draw!"
                      : `🎉 Player ${winner} Wins!`}
                  </Text>

                  <TouchableOpacity
                    className="mt-4 px-6 py-3 bg-color3 rounded-lg"
                    onPress={() => (
                      resetGame(), // Reset the game
                      router.navigate("/mentalDisease/handlePredict") // Navigate to review screen
                    )}
                  >
                    <Text className="text-color1 text-lg font-bold">
                      Review
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FunEvents;
