import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import "./Comments.scss";
import blankProfile from "../../assets/icons/BlankProfile.png";
import arrowForwardIcon from "../../assets/icons/blue-arrow-forward-svgrepo-com.png";
import CommentVotes from "../CommentVotes/CommentVotes";
import { CommentModal } from "../CommentModal/CommentModal";
import { formatDistanceToNow } from "date-fns";
import { database } from "../../config/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const Comments = ({
  comments,
  currentUser,
  resourceId,
  onCommentAdded,
}) => {
  const [comment, setComment] = useState("");
  const [postedComments, setPostedComments] = useState(comments || []);
  // const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   setPostedComments(comments || []);
  // }, [comments]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!resourceId) return;
      console.log("No resourceId provided");

      const commentsRef = collection(database, "Comments");
      const q = query(commentsRef, where("resourceId", "==", resourceId));
      const querySnapshot = await getDocs(q);

      const comments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        commentId: doc.id,
      }));
      setPostedComments(comments);
    };

    fetchComments();
  }, [resourceId]);

  const CommentValue = (e) => {
    setComment(e.target.value);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (comment.trim() && currentUser) {
      const newComment = {
        content: comment,
        createdAt: Timestamp.now(),
        likedByUser: [],
        likes: 0,
        name: currentUser.name || "Anonymous",
        resourceId: resourceId || "",
        userId: currentUser.id || "",
      };
      try {
        const commentsRef = collection(database, "Comments");
        const docRef = await addDoc(commentsRef, newComment);
        const commentWithId = { ...newComment, commentId: docRef.id };
        setPostedComments((postedComments) => [
          ...postedComments,
          commentWithId,
        ]);
        setComment("");
        setShowModal(true);
        // Notify parent component that a comment was added
        if (typeof onCommentAdded === "function") {
          onCommentAdded();
        }
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  };

  // const handleClick = () => {
  //   setIsClicked(!isClicked);
  // };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="commentsContainer">
      <div className="comments">
        {postedComments.length > 0 ? (
          postedComments
            .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
            .map((postedComment) => (
              <div key={postedComment.commentId} className="commentDivs">
                <img
                  className="commentImg"
                  src={blankProfile}
                  alt="userprofile"
                  aria-label="user profile image"
                />
                <div className="commentContext">
                  <div className="commentHeader">
                    <div className="commenter">{postedComment.name}</div>
                    <div className="commentDate">
                      {formatDistanceToNow(postedComment.createdAt.toDate(), {
                        addSuffix: true,
                      })}
                    </div>
                    <div
                      className="thumbsup"
                      aria-label="thumbs up Comment button"
                    >
                      <CommentVotes
                        commentId={postedComment.commentId}
                        currentUser={currentUser}
                      />
                    </div>
                  </div>
                  <div className="commentText">{postedComment.content}</div>
                </div>
              </div>
            ))
        ) : (
          <p className="noCommentText">No comments yet.</p>
        )}
      </div>

      <div className="newCommentContainer">
        <form className="newComment" onSubmit={submitComment}>
          <img
            className="commentImg"
            src={blankProfile}
            alt="userprofile"
            aria-label="your profile image"
          />
          <Input
            aria-label="input comment"
            maxLength={800}
            value={comment}
            onChange={CommentValue}
            placeholder="Add a comment"
            size="md"
            sx={{
              borderRadius: "50px",
            }}
          />
          <button
            type="submit"
            aria-label="submit comment"
            style={{ color: "#0099ff" }}
          >
            <img
              src={arrowForwardIcon}
              alt="arrow forward"
              className="resource__forward-arrow-icon"
              aria-hidden="true"
            />
          </button>
          {showModal && <CommentModal closeModal={closeModal} />}
        </form>
      </div>
    </div>
  );
};
