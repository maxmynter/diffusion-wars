import { useState } from "react";
import Image from "next/image";

const DragNDropField = ({ setImage }) => {
  const [dragging, setDragging] = useState(false);

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
      className={`m-12 flex h-80 w-80 items-center rounded-3xl border-4 border-dashed text-center  ${
        dragging ? "border-sky-500" : "border-purple-500"
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
          <div className="m-auto ">
            Upload here :
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
      </form>
    </div>
  );
};

const UploadImage = () => {
  const [image, setImage] = useState(null);
  return (
    <div className="flex h-full w-full justify-center p-12">
      {image && (
        <div>
          <div className="overflow-hidden rounded-3xl border-4 border-purple-500">
            <Image
              src={URL.createObjectURL(image)}
              alt="Uploadedd Submission"
              width={500}
              height={500}
            />
          </div>
          <div className="flex justify-between">
            <button onClick={() => setImage(null)}>Cancel</button>
            <button>Submit</button>
          </div>
        </div>
      )}
      {!image && <DragNDropField setImage={setImage} />}
    </div>
  );
};

export default UploadImage;
