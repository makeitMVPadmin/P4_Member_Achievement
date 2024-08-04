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

//-----------from LAP4MA-42-upvoting-MM //

// /*===============
//     UPVOTING
// ===============*/
// // src/components/Upvoting/Upvoting.jsx

// import React, { useState, useEffect } from "react";
// import "./Upvoting.scss";
// import mockData from "../../data/resource-details.json";
// import { ReactComponent as ThumbIcon } from "../../assets/icons/thumbsUpComments.svg";
// import { ReactComponent as ThumbIconActive } from "../../assets/icons/thumbsUpCommentsActive.svg";

// function Upvoting({ resourceId }) {
//   const [resource, setResource] = useState(null);
//   const [voteStatus, setVoteStatus] = useState(null);

//   useEffect(() => {
//     const foundData = mockData.find(item => item.id === resourceId);
//     if (foundData) {
//       setResource(foundData);
//       setVoteStatus(null); // Reset vote status when resource changes
//     }
//   }, [resourceId]);

//   if (!resource) {
//     return null;
//   }

//   const updateVotes = (voteType) => {
//     setResource(prevResource => {
//       const newResource = { ...prevResource };

//       if (voteType === 'upvote') {
//         if (voteStatus === 'upvote') {
//           newResource.upvotes -= 1;
//           setVoteStatus(null);
//         } else {
//           if (voteStatus === 'downvote') {
//             newResource.downvotes -= 1;
//           }
//           newResource.upvotes += 1;
//           setVoteStatus('upvote');
//         }
//       } else if (voteType === 'downvote') {
//         if (voteStatus === 'downvote') {
//           newResource.downvotes -= 1;
//           setVoteStatus(null);
//         } else {
//           if (voteStatus === 'upvote') {
//             newResource.upvotes -= 1;
//           }
//           newResource.downvotes += 1;
//           setVoteStatus('downvote');
//         }
//       }

//       const index = mockData.findIndex(item => item.id === resourceId);
//       if (index !== -1) {
//         mockData[index] = newResource;
//       }

//       return newResource;
//     });
//   };

//   const handleVote = (voteType) => {
//     updateVotes(voteType);
//   };

//   return (
//     <section className="voting">
//       <div className="voting__container">
//         {voteStatus === "upvote" ? (
//           <ThumbIconActive
//             className="voting__thumb voting__thumb--up voting__thumb--active"
//             onClick={() => handleVote("upvote")}
//           />
//         ) : (
//           <ThumbIcon
//             className="voting__thumb voting__thumb--up"
//             onClick={() => handleVote("upvote")}
//           />
//         )}
//         <span className="voting__count">{resource.upvotes}</span>
//       </div>
//       <div className="voting__container">
//         {voteStatus === "downvote" ? (
//           <ThumbIconActive
//             className="voting__thumb voting__thumb--down voting__thumb--active"
//             onClick={() => handleVote("downvote")}
//           />
//         ) : (
//           <ThumbIcon
//             className="voting__thumb voting__thumb--down"
//             onClick={() => handleVote("downvote")}
//           />
//         )}
//         <span className="voting__count">{resource.downvotes}</span>
//       </div>
//     </section>
//   );
// }

// export default Upvoting;
