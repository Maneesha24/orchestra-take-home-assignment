import { CardType } from "../types";

type CardProps = {
  card: CardType;
};

export const Card = ({ card }: CardProps) => (
  <img
    src={card.image}
    alt={`${card.value} of ${card.suit}`}
    width={120}
    className="card-img"
  />
);
