import { CardType } from "../types";
import { Card } from "./Card";
import { Box, Typography } from "@mui/material";

type HandProps = {
  title: string;
  total: number;
  cards: CardType[];
};

export const Hand = ({ title, cards, total }: HandProps) => (
  <Box width="100%">
    <Typography variant="h5" fontWeight="bold" color="#988f8c">
      {title} -
    </Typography>

    <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
      <Box display="flex" alignItems="center" gap="1rem">
        {cards.map((card) => (
          <Card key={card.code as string} card={card} />
        ))}
      </Box>
      <Typography variant="h6">Total: {total}</Typography>
    </Box>
  </Box>
);

export default Hand;
