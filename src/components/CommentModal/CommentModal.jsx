import React from "react";
import modalClose from "../../assets/icons/modalClose.svg";
import './CommentModal.scss'




export const CommentModal = ({closeModal}) => {



    return(
        <div className="modal">
            <img className="modalX" src={modalClose} alt="closeModal" onClick={closeModal}/>
            <h2 className="modalHeader">Success!</h2>
            <p className="modalText">Thank you for contributing to the community-driven resource library! Your resource has been uploaded.</p>
        </div>
    )
}