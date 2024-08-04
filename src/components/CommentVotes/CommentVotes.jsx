/*===============
    UPVOTING
===============*/

import React, { useState, useEffect, useCallback } from "react";
import "./CommentVotes.scss";
import { database } from "../../config/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"; 

/*=========================
    RESPONSIVE ICON SIZE
=========================*/
const getIconSize = () => {
  const width = window.innerWidth;
  if (width < 768) return { width: "1rem", height: "1rem" }; // Mobile
  return { width: "1.25rem", height: "1.25rem" }; // Tablet & Desktop
};

function Upvoting({ commentId="", currentUser}) {
  const [upvotes, setUpvotes] = useState(0);
  const [voteStatus, setVoteStatus] = useState(null); // null, "upvoted", "downvoted"
  const [iconSize, setIconSize] = useState(getIconSize());
  const [upvoteColors, setUpvoteColors] = useState(
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
    useEffect(() => {
      if (!commentId) {
        console.error("commentId is undefined or null");
        return;
      }
      // Fetch the current like status when the component mounts
      const fetchCommentData = async () => {
        const commentRef = doc(database, 'Comments', commentId);
        console.log("Fetching document with ID:", commentId);

      try {
        const commentDoc = await getDoc(commentRef);
        if (commentDoc.exists()) {
          const commentData = commentDoc.data();
          console.log("Fetched comment data:", commentData);

          if (Array.isArray(commentData.likedByUser)) {
          const hasLiked = commentData.likedByUser.includes(currentUser.id);
          setVoteStatus(hasLiked ? "upvoted" : null);
          setUpvotes(commentData.likes || 0);
          setUpvoteColors(hasLiked
            ? "primary:#000000,secondary:#000000,tertiary:#0099FF"
            : "primary:#000000,secondary:#000000,tertiary:#ffffff"
          );
        } else {
          console.error("likedByUser is not an array:", commentData.likedByUser);
        }
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching comment data:", error);
    }
  };
      fetchCommentData();
    }, [commentId, currentUser]);

  const handleUpvote = async () => {
    // if (voteStatus === "upvoted") {
    //   setUpvotes(upvotes - 1);
    //   setVoteStatus(null);
    //   setUpvoteColors("primary:#000000,secondary:#ffffff,tertiary:#ffffff");
    // } else {
    //   setUpvotes(upvotes + 1);
    //   setVoteStatus("upvoted");
    //   setUpvoteColors("primary:#000000,secondary:#000000,tertiary:#0099FF");
    // }

    /* modifying the function to update the likedByUser array in firestore */
    if (!commentId || !currentUser || !currentUser.id) {
      console.error("Invalid commentId or currentUser");
      return;
    }
    const commentRef = doc(database, 'Comments', commentId)
    const userId = currentUser.id;

    try {
      if (voteStatus === "upvoted") {
        setUpvotes(upvotes - 1);
        setVoteStatus(null);
        setUpvoteColors("primary:#000000,secondary:#ffffff,tertiary:#ffffff");
        await updateDoc(commentRef, {
          likedByUser: arrayRemove(userId),
          likes: upvotes - 1,
        });
    } else {
      setUpvotes(upvotes + 1);
      setVoteStatus("upvoted");
      setUpvoteColors("primary:#000000,secondary:#000000,tertiary:#0099FF");
      await updateDoc(commentRef, {
        likedByUser: arrayUnion(userId),
        likes: upvotes + 1,
      });
    }
  } catch (error) {
    console.error("Error updating upvote: ", error);
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
    </section>
  );
}

export default Upvoting;