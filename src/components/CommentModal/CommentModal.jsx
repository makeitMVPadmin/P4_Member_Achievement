import React from "react";
import modalClose from "../../assets/icons/modalClose.svg";
import "./CommentModal.scss";

export const CommentModal = ({ closeModal }) => {
  return (
    <div className="modal">
      <img
        className="modalX"
        src={modalClose}
        alt="closeModal"
        onClick={closeModal}
        aria-label="close modal"
      />
      <h2 className="modalHeader">Success!</h2>
      <p className="modalText">Thank you! Your comment has been posted.</p>
    </div>
  );
};
