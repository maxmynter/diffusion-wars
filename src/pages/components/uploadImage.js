import { useState } from "react";
import Image from "next/image";
import LinkText from "./Linktext";

const DragNDropField = ({ setImage, dragging, setDragging }) => {
  const handleDragging = (event, setDraggingValue) => {
    event.preventDefault();
    setDragging(setDraggingValue);
  };

  const handleDrop = (event) => {
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
      className={`m-2 flex flex-col items-center rounded-3xl  p-6 text-center 
      `}
    >
      <div
        className={`m-12 flex h-80 w-80 items-center rounded-3xl border-4 border-dashed p-6 text-center  ${
          dragging ? "border-sky-500 " : "border-white "
        }`}
      >
        <form
          className="flex h-full w-full items-center justify-center text-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <div className="w-full">
              <p>Drag your image here or</p>
            </div>
          </div>
        </form>
      </div>
      <div className="m-auto ">
        {"Select File: "}
        <input
          className="m-auto items-center text-center"
          type="file"
          name="submission"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  return (
    <div className="flex h-full w-full justify-center p-12 ">
      <div
        className={`rounded-3xl ${dragging ? "bg-sky-600" : "bg-sky-900"}  ${
          dragging ? "shadow-overarch-xl" : "shadow-overarch-md"
        } shadow-white`}
      >
        {image && (
          <div className="m-2 flex flex-col items-center rounded-3xl p-6 text-center ">
            <div className="relative m-12 flex h-80 w-80 items-center overflow-hidden rounded-3xl border-4 border-white">
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploadedd Submission"
                fill
              />
            </div>
            <div className="flex w-full justify-between">
              <button onClick={() => setImage(null)}>
                <LinkText text="Cancel" />
              </button>
              <button>
                {" "}
                <LinkText text="Submit" />
              </button>
            </div>
          </div>
        )}
        {!image && (
          <DragNDropField
            setImage={setImage}
            dragging={dragging}
            setDragging={setDragging}
          />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
