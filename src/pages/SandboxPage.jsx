import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import RP1 from "./RP1";
import RP2 from "./RP2";

const SandboxPage = () => {
  const [currentPage, setCurrentPage] = useState("RP1");

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick("RP1")}
          style={{ marginRight: "10px" }}
        >
          RP1
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick("RP2")}
        >
          RP2
        </Button>
      </div>
      {currentPage === "RP1" ? <RP1 /> : <RP2 />}
    </>
  );
};

export default SandboxPage;
