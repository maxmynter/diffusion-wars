import { useState } from "react";
import Image from "next/image";

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleUpload = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <>
      {image && (
        <Image
          src={URL.createObjectURL(image)}
          alt="Uploadedd Submission"
          width={500}
          height={500}
        />
      )}
      {!image && (
        <input type="file" name="submission" onChange={handleUpload} />
      )}
    </>
  );
};

export default UploadImage;
