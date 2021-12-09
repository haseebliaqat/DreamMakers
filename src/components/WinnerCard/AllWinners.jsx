import React from "react";
import "./AllWinners.css";
import WinnerCard from "../../_assets/WinerCard/WinnerCard.png";
const AllWinners = () => {
  return (
    <div className="all-winners mx-2">
      <div className="winner-image">
        <img src={WinnerCard} alt="Wineer Image" style={{ width: "100%" }} />
      </div>
      <div
        className="winner-descriptions pb-4 pt-3"
        style={{ textAlign: "center" }}
      >
        <div className="winner-name">Kate J.</div>
        <div className="winning-place">Won Sky diving at Abu Dhabi</div>
      </div>
    </div>
  );
};

export default AllWinners;
