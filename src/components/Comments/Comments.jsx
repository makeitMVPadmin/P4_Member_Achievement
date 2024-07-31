import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import "./Comments.scss";
import blankProfile from "../../assets/icons/BlankProfile.png";
import CommentVotes from '../CommentVotes/CommentVotes'
import { CommentModal } from "../CommentModal/CommentModal";
import { formatDistanceToNow } from "date-fns";



export const Comments = ({ selectedResource }) => {
  const [comment, setComment] = useState("");
  const [postedComments, setPostedComments] = useState(
    selectedResource.comments || []
  );
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPostedComments(selectedResource.comments || []);
  }, [selectedResource.comments]);

  const CommentValue = (e) => {
    setComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        name: "Anonymous",
        comment: comment,
        likes: 0,
        timestamp: Date.now(),
      };
      setPostedComments([...postedComments, newComment]);
      setComment("");
      setShowModal(true);
    }
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="comments">
      {postedComments.length > 0 ? (
        postedComments.sort((a, b) => b.timestamp - a.timestamp).map((postedComments) => (
          <div key={postedComments.id} className="commentDivs">
            <img className="commentImg" src={blankProfile} alt="userprofile" aria-label="user profile image" />
            <div className="commentContext">
              <div className="commentHeader">
                <div className="commenter">{postedComments.name}</div>
                <div className="commentDate">
                  {formatDistanceToNow(new Date(postedComments.timestamp), {
                    addSuffix: true,
                  })}
                </div>
                <div className="thumbsup" aria-label="thumbs up Comment button">
                <CommentVotes />
                </div>
              </div>
              <div className="commentText">{postedComments.comment}</div>
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      <form className="newComment" onSubmit={submitComment}>
        <img className="commentImg" src={blankProfile} alt="userprofile" aria-label="your profile image" />
        <Input
          aria-label="input comment"
          maxLength={800}
          value={comment}
          onChange={CommentValue}
          placeholder="Contribute your experience"
          size="md"
          sx={{
            borderRadius: "50px",
          }}
        />
        <button type="submit" aria-label="submit comment" style={{color:'#0099ff'}}>Post</button>
        {showModal && <CommentModal closeModal={closeModal} />}
      </form>
    </div>
  );
};
