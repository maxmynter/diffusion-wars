import { useState } from "react";
import Image from "next/image";
import LinkText from "./Linktext";
import { gql, useMutation } from "@apollo/client";
import BlurredBackgroundContainer from "./BlurredBackgroundContainer";

const ADD_IMAGE = gql`
  mutation uploadImage($imageString: String!, $artist: String) {
    addImage(imageString: $imageString, artist: $artist) {
      ok
    }
  }
`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DisplayUploadedImage = ({ image, setImage }) => {
  const [username, setUsername] = useState(null);
  const [addImage] = useMutation(ADD_IMAGE);

  const handleSubmit = async () => {
    if (image) {
      const base64Image = await getBase64(image);
      const returnValue = await addImage({
        variables: {
          imageString: base64Image,
          artist: username ? username : "Anonymos",
        },
      });
      setImage(null);
      window.alert("Submitted");
    }
  };

  return (
    <div className="m-2 flex flex-col items-center space-y-4 rounded-3xl p-6 text-center">
      <div className="relative m-12 flex h-80 w-80 items-center overflow-hidden rounded-3xl ">
        <Image
          src={URL.createObjectURL(image)}
          alt="Uploaded Submission"
          fill
        />
      </div>
      <label className="rounded-2xl p-2 backdrop-blur-3xl">
        Artist:{" "}
        <input
          className="rounded-2xl border-2 border-white bg-transparent p-2 !outline-none"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <div className="flex w-full justify-between">
        <button onClick={() => setImage(null)}>
          <LinkText text="Cancel" />
        </button>
        <button onClick={handleSubmit}>
          <LinkText text="Submit" />
        </button>
      </div>
    </div>
  );
};

const DragNDropField = ({ setImage, dragging, setDragging }) => {
  const handleDragging = (event, setDraggingValue) => {
    event.preventDefault();
    setDragging(setDraggingValue);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setImage(event.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragEnter={(event) => handleDragging(event, true)}
      onDragOver={(event) => handleDragging(event, true)}
      onDragLeave={(event) => handleDragging(event, false)}
      onDrop={handleDrop}
      className={`m-2 flex flex-col items-center rounded-3xl p-12  text-center 
      `}
    >
      <div
        className={`flex h-80 w-80 items-center rounded-3xl border-2 border-dashed border-white p-6 text-center transition `}
      >
        <form
          className="flex h-full w-full items-center justify-center text-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <label
            for="file-upload"
            className="m-auto cursor-pointer items-center rounded-xl text-center"
          >
            {!dragging && "Drag image here or click here to browse files"}
          </label>
          <input
            className="hidden"
            type="file"
            id="file-upload"
            name="submission"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
        </form>
      </div>
    </div>
  );
};

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="flex h-full w-full justify-center p-12 ">
      <BlurredBackgroundContainer>
        {image && <DisplayUploadedImage image={image} setImage={setImage} />}
        {!image && (
          <DragNDropField
            setImage={setImage}
            dragging={dragging}
            setDragging={setDragging}
          />
        )}
      </BlurredBackgroundContainer>
    </div>
  );
};

export default UploadImage;
