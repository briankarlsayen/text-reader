import React, { useState, useRef } from "react";

const FileUpload = ({book, setBook}) => {
  // const [book, setBook] = useState("");
  const inputFile = useRef(null);

  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
      console.log('files', files)
      setBook(files[0]);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  console.log("bookbook", book);
  return (
    <div>
      <input
        style={{ display: "none" }}
        // accept=".zip,.rar"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <div className="button" onClick={onButtonClick}>
        Upload
      </div>
    </div>
  )
}

export default FileUpload