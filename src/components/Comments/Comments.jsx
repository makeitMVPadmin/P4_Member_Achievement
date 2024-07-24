import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from '@chakra-ui/react'
import './Comments.scss'
import blankProfile from "../../assets/icons/BlankProfile.png";
import thumbsUpComments from "../../assets/icons/thumbsUpComments.svg"
import { CommentModal } from "../CommentModal/CommentModal";



export const Comments = () => {

    const [comment, setComment] = useState('');
    const [postedComments, setpostedComments] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const CommentValue = (e) => {
        setComment(e.target.value);
    }

    const submitComment = (e) => {
        e.preventDefault()
        if (comment.trim()) {
            setpostedComments([...postedComments, comment])
            setComment('')
            setShowModal(true)
        }
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
      }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="comments">

            
            {/*static comment*/}
            <div className="commentDivs">
                <img className="commentImg" src={blankProfile} alt="userprofile" />
                <div className="commentContext">
                    <div className="commentHeader">
                        <div className="commenter">Sarah Lee</div>
                        <div className="commentDate">5 days ago</div>
                        <div className="thumbsup">
                            <img className="commentLikes" src={thumbsUpComments} alt="thumbsUp" />
                        </div>
                    </div>
                    <div className="commentText">em maxime est iusto cum vel odio
                        quasi fugiat? Quibusdam magni, illum reiciendis
                        minima labore ducimus v lkdj lasdia  lasi leanrning ikinilknoiwing</div>
                </div>
            </div>

            {postedComments.map((postedComment, index) => (
                <div key={index} className="commentDivs">
                    <img 
                    className="commentImg" src={blankProfile} alt="userprofile" />
                    <div className="commentContext">
                        <div className="commentHeader">
                            <div className="commenter">Anonymous</div>
                            <div className="commentDate">Just now</div>
                            <div className="thumbsup">
                                <img 
                                className="commentLikes" 
                                src={thumbsUpComments} 
                                alt="thumbsUp"
                                onClick={handleClick} />
                            </div>
                        </div>
                        <div className="commentText">{postedComment}</div>
                    </div>
                </div>
            ))}

            <form className="newComment" onSubmit={submitComment}>
                <img className="commentImg" src={blankProfile} alt="userprofile" />
                <Input
                    maxLength={800}
                    value={comment}
                    onChange={CommentValue}
                    placeholder='Contribute your experience'
                    size='md'
                    sx={{
                        borderRadius: '50px'
                    }} />
            </form>
            {/* <CommentModal/>    */}
        </div>
    )
}
