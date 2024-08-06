/*===============
    UPVOTING
===============*/
// src/components/Upvoting/Upvoting.jsx

import React, { useState, useEffect } from "react";
import "./Upvoting.scss";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import ThumbIcon from "../../assets/icons/thumbsUpComments.svg";
import ThumbIconActive from "../../assets/icons/thumbsUpCommentsActive.svg";

function Upvoting(props) {
  const { resourceId, currentUser, initialUpvotes, initialDownvotes, onVoteChange, likedByUser } = props;
  const [resource, setResource] = useState({
    upvotes: initialUpvotes,
    downvotes: initialDownvotes,
    likedByUser: likedByUser || [],
    downvotedByUsers: []
  });
  const [voteStatus, setVoteStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchResource = async () => {
      if (resourceId && currentUser) {
        console.log("Fetching resource with ID:", resourceId);
        console.log("Current user ID:", currentUser.id);
        try {
          const docRef = doc(db, "Resources", resourceId.toString());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const resourceData = docSnap.data();
            console.log("Document data:", resourceData);
            setResource({
              ...resourceData,
              upvotes: resourceData.upvote || 0,
              downvotes: resourceData.downvote || 0,
              likedByUser: resourceData.likedByUser || [],
              downvotedByUsers: resourceData.downvotedByUsers || []
            });

            if (resourceData.likedByUser?.includes(currentUser.id)) {
              setVoteStatus('upvote');
            } else if (resourceData.downvotedByUsers?.includes(currentUser.id)) {
              setVoteStatus('downvote');
            } else {
              setVoteStatus(null);
            }
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchResource();
  }, [resourceId, db, currentUser]);

  useEffect(() => {
    setResource({
      upvotes: initialUpvotes || 0,
      downvotes: initialDownvotes || 0,
      likedByUser: likedByUser || [],
      downvotedByUsers: []
    });
    setVoteStatus(null);
  }, [resourceId, initialUpvotes, initialDownvotes, likedByUser]);

  const handleVote = async (voteType) => {
    if (isLoading || !currentUser || !resourceId) {
      console.error("Invalid state:", { isLoading, currentUser, resourceId });
      return;
    }

    const userId = currentUser.id;
    if (!userId) {
      console.error("User ID is not defined");
      return;
    }

    console.log("ResourceId:", resourceId);
    console.log("ResourceId type:", typeof resourceId);

    const docRef = doc(db, "Resources", resourceId.toString());
    console.log("Attempting to update document:", resourceId);

    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.error("Document does not exist:", resourceId);
        return;
      }

      const currentData = docSnap.data();
      let updates = {};

      if (voteType === 'upvote') {
        if (currentData.likedByUser && currentData.likedByUser.includes(userId)) {
          updates = {
            upvote: increment(-1),
            likedByUser: arrayRemove(userId)
          };
        } else {
          updates = {
            upvote: increment(1),
            likedByUser: arrayUnion(userId),
            downvotedByUsers: arrayRemove(userId)
          };
          if (currentData.downvotedByUsers && currentData.downvotedByUsers.includes(userId)) {
            updates.downvote = increment(-1);
          }
        }
      } else if (voteType === 'downvote') {
        if (currentData.downvotedByUsers && currentData.downvotedByUsers.includes(userId)) {
          updates = {
            downvote: increment(-1),
            downvotedByUsers: arrayRemove(userId)
          };
        } else {
          updates = {
            downvote: increment(1),
            downvotedByUsers: arrayUnion(userId),
            likedByUser: arrayRemove(userId)
          };
          if (currentData.likedByUser && currentData.likedByUser.includes(userId)) {
            updates.upvote = increment(-1);
          }
        }
      }

      console.log("Before Firestore update");
      await updateDoc(docRef, updates);
      console.log("After Firestore update");

      // Fetch the updated document
      const updatedDocSnap = await getDoc(docRef);
      const updatedData = updatedDocSnap.data();
      console.log("Updated document data:", updatedData);

      const updatedResource = {
        ...resource,
        upvotes: updatedData.upvote || 0,
        downvotes: updatedData.downvote || 0,
        likedByUser: updatedData.likedByUser || [],
        downvotedByUsers: updatedData.downvotedByUsers || []
      };

      setResource(updatedResource);
      setVoteStatus(voteType);
      onVoteChange(updatedResource.upvotes, updatedResource.downvotes, resourceId);
    } catch (error) {
      console.error("Error updating vote:", error, { resourceId, userId, voteType });
    }
  };

  return (
    <div className="voting">
      <div className="voting__container">
        <img
          src={voteStatus === "upvote" ? ThumbIconActive : ThumbIcon}
          alt="Thumb up"
          className={`voting__thumb voting__thumb--up ${voteStatus === "upvote" ? "voting__thumb--active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleVote("upvote");
          }}
        />
        <span className="voting__count">{resource.upvotes}</span>
      </div>
      <div className="voting__container">
        <img
          src={voteStatus === "downvote" ? ThumbIconActive : ThumbIcon}
          alt="Thumb down"
          className={`voting__thumb voting__thumb--down ${voteStatus === "downvote" ? "voting__thumb--active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleVote("downvote");
          }}
        />
        <span className="voting__count">{resource.downvotes}</span>
      </div>
    </div>
  );
}

export default Upvoting;