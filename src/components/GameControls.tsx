import { Button, Box } from "@mui/material";

type GameControlsProps = {
  onHit: () => void;
  onStand: () => void;
  gameOver: boolean;
};

export const GameControls = ({
  onHit,
  onStand,
  gameOver,
}: GameControlsProps) => (
  <Box display="flex" justifyContent="space-between" width="15rem" mt="2rem">
    <Button
      variant="contained"
      color="primary"
      onClick={onHit}
      disabled={gameOver}
    >
      Hit
    </Button>
    <Button
      variant="contained"
      color="error"
      onClick={onStand}
      disabled={gameOver}
    >
      Stand
    </Button>
  </Box>
);
