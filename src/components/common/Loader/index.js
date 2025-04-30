import { CircularProgress } from "@mui/material";
import React from "react";
import "./style.css";
function Loader() {
  return (
    <div className="loader-background">
      <CircularProgress />
    </div>
  );
}

export default Loader;
