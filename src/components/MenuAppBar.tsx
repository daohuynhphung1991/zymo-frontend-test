import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../images/logo.png";

export default function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt={"corona virus"} width={"auto"} height={40} />
          <Typography variant="h6" component="div">
            <span style={{ marginLeft: 15 }}>{" Coronavirus disease"}</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
