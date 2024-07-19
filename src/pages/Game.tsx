import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Hand } from "../components/Hand";
import { GameControls } from "../components/GameControls";
import Result from "../components/Result";
import { CardType } from "../types";

export const Game = () => {
  const [deckId, setDeckId] = useState(null);

  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [houseHand, setHouseHand] = useState<CardType[]>([]);

  const [playerTotal, setPlayerTotal] = useState<number>(0);
  const [houseTotal, setHouseTotal] = useState<number>(0);

  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  const initializeDeck = async () => {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await response.json();
    setDeckId(data.deck_id);
  };

  useEffect(() => {
    initializeDeck();
  }, []);

  const calculateTotal = (hand: CardType[]) => {
    let total = 0;
    let aces = 0;
    hand.forEach((card: CardType) => {
      if (card.value === "ACE") {
        aces += 1;
        total += 11;
      } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        total += 10;
      } else {
        total += parseInt(card.value);
      }
    });
    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
  };

  const drawCard = async (
    hand: CardType[],
    setHand: Dispatch<SetStateAction<CardType[]>>,
    setTotal: Dispatch<SetStateAction<number>>
  ) => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    const newHand = [...hand, ...data.cards];
    setHand(newHand);
    setTotal(calculateTotal(newHand));
  };

  const handleHit = () => {
    drawCard(playerHand, setPlayerHand, setPlayerTotal);
  };

  const handleStand = () => {
    setGameOver(true);
    if (playerTotal > houseTotal) {
      setGameWon(true);
    } else if (playerTotal < houseTotal) {
      setGameWon(false);
    }
  };

  useEffect(() => {
    if (playerTotal > 21) {
      setGameOver(true);
      setGameWon(false);
    }
  }, [playerTotal]);

  useEffect(() => {
    if (deckId) {
      const initialDraw = async () => {
        await drawCard(playerHand, setPlayerHand, setPlayerTotal);
        await drawCard(playerHand, setPlayerHand, setPlayerTotal);
        await drawCard(houseHand, setHouseHand, setHouseTotal);
        await drawCard(houseHand, setHouseHand, setHouseTotal);
      };
      initialDraw();
    }
  }, [deckId]);

  const onReset = () => {
    setDeckId(null);
    setPlayerHand([]);
    setHouseHand([]);
    setPlayerTotal(0);
    setHouseTotal(0);

    setGameOver(false);
    setGameWon(false);

    initializeDeck();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="1rem"
    >
      <Typography variant="h1" fontFamily="zeyada">
        House of Blackjack
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="space-between"
        height="75vh"
        width="80%"
      >
        <Hand title="House" cards={houseHand} total={houseTotal} />
        <Hand title="Player" cards={playerHand} total={playerTotal} />
      </Box>
      <GameControls
        onHit={handleHit}
        onStand={handleStand}
        gameOver={isGameOver}
      />
      {isGameOver && <Result res={gameWon} onClose={onReset} />}
    </Box>
  );
};
