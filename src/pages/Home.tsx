import BlackJackImg from "../assets/images/black-jack.png";
import { Box, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap="2rem"
      textAlign="center"
    >
      <img src={BlackJackImg} width={600} alt="black-jack-img" />
      <Typography color="whitesmoke" variant="h1" fontFamily="zeyada">
        House of Black Jack
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => navigate("/game")}
      >
        Enter
      </Button>
    </Box>
  );
};
