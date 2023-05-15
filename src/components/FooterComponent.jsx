import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const FooterComponent = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: theme.palette.background.paper, py: 4 }}>
      <Typography variant="body2" align="center" color="text.secondary">
        &copy; {new Date().getFullYear()} Your Website. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
        Additional information or links can be placed here.
      </Typography>
    </Box>
  );
};

export default FooterComponent;
