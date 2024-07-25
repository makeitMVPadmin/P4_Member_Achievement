/*===============
    UPVOTING
===============*/
// src/components/Upvoting/Upvoting.jsx

import React, { useState, useEffect, useCallback } from "react";
import "./Upvoting.scss";

/*=========================
    RESPONSIVE ICON SIZE
=========================*/
const getIconSize = () => {
  const width = window.innerWidth;
  if (width < 768) return { width: "1rem", height: "1rem" }; // Mobile
  return { width: "1.25rem", height: "1.25rem" }; // Tablet & Desktop
};

function Upvoting() {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [voteStatus, setVoteStatus] = useState(null); // null, "upvoted", "downvoted"
  const [iconSize, setIconSize] = useState(getIconSize());
  const [upvoteColors, setUpvoteColors] = useState(
    "primary:#000000,secondary:#ffffff,tertiary:#ffffff"
  );
  const [downvoteColors, setDownvoteColors] = useState(
    "primary:#000000,secondary:#ffffff,tertiary:#ffffff"
  );

  const handleResize = useCallback(() => {
    setIconSize(getIconSize());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  /*============
        UPVOTE
    ============*/
  const handleUpvote = () => {
    if (voteStatus === "upvoted") {
      setUpvotes(upvotes - 1);
      setVoteStatus(null);
      setUpvoteColors("primary:#000000,secondary:#ffffff,tertiary:#ffffff");
    } else if (voteStatus === "downvoted") {
      setDownvotes(downvotes - 1);
      setUpvotes(upvotes + 1);
      setVoteStatus("upvoted");
      setUpvoteColors("primary:#000000,secondary:#000000,tertiary:#0099FF");
      setDownvoteColors("primary:#000000,secondary:#ffffff,tertiary:#ffffff");
    } else {
      setUpvotes(upvotes + 1);
      setVoteStatus("upvoted");
      setUpvoteColors("primary:#000000,secondary:#000000,tertiary:#0099FF");
    }
  };

  /*=============
        DOWNVOTE
    =============*/
  const handleDownvote = () => {
    if (voteStatus === "downvoted") {
      setDownvotes(downvotes - 1);
      setVoteStatus(null);
      setDownvoteColors("primary:#000000,secondary:#ffffff,tertiary:#ffffff");
    } else if (voteStatus === "upvoted") {
      setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
      setVoteStatus("downvoted");
      setDownvoteColors("primary:#000000,secondary:#000000,tertiary:#0099FF");
      setUpvoteColors("primary:#000000,secondary:#ffffff,tertiary:#ffffff");
    } else {
      setDownvotes(downvotes + 1);
      setVoteStatus("downvoted");
      setDownvoteColors("primary:#000000,secondary:#000000,tertiary:#0099FF");
    }
  };

  return (
    <section className="voting">
      <div className="voting__container">
        <lord-icon
          className="voting__icon"
          src="https://cdn.lordicon.com/ysheqztl.json"
          trigger="click"
          state="hover-up"
          stroke="bold"
          colors={upvoteColors}
          onClick={handleUpvote}
          aria-label="Upvote"
          style={iconSize}
        ></lord-icon>
        {upvotes}
      </div>
      <div className="voting__container">
        <lord-icon
          className="voting__icon"
          src="https://cdn.lordicon.com/ysheqztl.json"
          trigger="click"
          state="hover-down"
          stroke="bold"
          colors={downvoteColors}
          onClick={handleDownvote}
          aria-label="Downvote"
          style={iconSize}
        ></lord-icon>
        {downvotes}
      </div>
    </section>
  );
}

export default Upvoting;
