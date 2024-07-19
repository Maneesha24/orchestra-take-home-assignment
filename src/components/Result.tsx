import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, Button, Typography } from "@mui/material";
import YouWin from "../assets/images/you_win.gif";
import YouLost from "../assets/images/you_lose.gif";

type ResultProps = {
  res: boolean;
  onClose: () => void;
};

export const Result = ({ res, onClose }: ResultProps) => {
  const [open, setIsOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Typography variant="h4" align="center" my="1rem">
          {res
            ? "You won this game!!!"
            : "Sorry, you lost! Please play another game"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          id="alert-dialog-description"
        >
          <img src={res ? YouWin : YouLost} alt="confetti" width={500} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Result;
