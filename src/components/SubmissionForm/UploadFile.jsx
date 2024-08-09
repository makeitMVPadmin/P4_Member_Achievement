import React, { useState } from "react";
import "../SubmissionForm/SubmissionDrawer.scss"

const UploadFile = ({ onFileChange }) => {
 
  return (
        <input
          className="submission__file-button"
          type="file"
          color="black"
          onChange={onFileChange}
        />
  );
}

export default UploadFile;