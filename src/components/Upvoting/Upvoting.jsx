/*===============
    UPVOTING
===============*/
// src/components/Upvoting/Upvoting.jsx

import React, { useState, useEffect } from "react";
import "./Upvoting.scss";
import mockData from "../../data/resource-details.json";
import { ReactComponent as ThumbIcon } from "../../assets/icons/thumbsUpComments.svg";
import { ReactComponent as ThumbIconActive } from "../../assets/icons/thumbsUpCommentsActive.svg";

function Upvoting({ resourceId }) {
  const [resource, setResource] = useState(null);
  const [voteStatus, setVoteStatus] = useState(null);

  useEffect(() => {
    const foundData = mockData.find(item => item.id === resourceId);
    if (foundData) {
      setResource(foundData);
      setVoteStatus(null); // Reset vote status when resource changes
    }
  }, [resourceId]);

  if (!resource) {
    return null;
  }

  const updateVotes = (voteType) => {
    setResource(prevResource => {
      const newResource = { ...prevResource };

      if (voteType === 'upvote') {
        if (voteStatus === 'upvote') {
          newResource.upvotes -= 1;
          setVoteStatus(null);
        } else {
          if (voteStatus === 'downvote') {
            newResource.downvotes -= 1;
          }
          newResource.upvotes += 1;
          setVoteStatus('upvote');
        }
      } else if (voteType === 'downvote') {
        if (voteStatus === 'downvote') {
          newResource.downvotes -= 1;
          setVoteStatus(null);
        } else {
          if (voteStatus === 'upvote') {
            newResource.upvotes -= 1;
          }
          newResource.downvotes += 1;
          setVoteStatus('downvote');
        }
      }

      const index = mockData.findIndex(item => item.id === resourceId);
      if (index !== -1) {
        mockData[index] = newResource;
      }

      return newResource;
    });
  };

  const handleVote = (voteType) => {
    updateVotes(voteType);
  };

  return (
    <section className="voting">
      <div className="voting__container">
        {voteStatus === "upvote" ? (
          <ThumbIconActive
            className="voting__thumb voting__thumb--up voting__thumb--active"
            onClick={() => handleVote("upvote")}
          />
        ) : (
          <ThumbIcon
            className="voting__thumb voting__thumb--up"
            onClick={() => handleVote("upvote")}
          />
        )}
        <span className="voting__count">{resource.upvotes}</span>
      </div>
      <div className="voting__container">
        {voteStatus === "downvote" ? (
          <ThumbIconActive
            className="voting__thumb voting__thumb--down voting__thumb--active"
            onClick={() => handleVote("downvote")}
          />
        ) : (
          <ThumbIcon
            className="voting__thumb voting__thumb--down"
            onClick={() => handleVote("downvote")}
          />
        )}
        <span className="voting__count">{resource.downvotes}</span>
      </div>
    </section>
  );
}

export default Upvoting;