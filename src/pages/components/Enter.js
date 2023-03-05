import { useState } from "react";
import UploadImage from "./uploadImage";

const Enter = () => {
  return (
    <div>
      <div className="flex flex-col text-center">
        <h1 className="m-5 text-3xl font-bold">Enter</h1>
      </div>
      <UploadImage />
    </div>
  );
};

export default Enter;
