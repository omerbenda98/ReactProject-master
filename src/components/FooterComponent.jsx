import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const FooterComponent = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 4 }}>
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
