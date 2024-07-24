import React from "react";

import './CommentModal.scss'




export const CommentModal = ({closeModal}) => {



    return(
        <div className="modal">
            <div className="modalX">&times;</div>
            <h2 className="modalHeader">Success!</h2>
            <p className="modalText">Thank you for contributing to the community-driven resource library! Your resource has been uploaded.</p>
        </div>
    )
}