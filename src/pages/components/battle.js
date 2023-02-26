import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Image from "next/image";
import Navigation from "./Navigation";

const GET_TWO_DIFFERENT_RANDOM_IMAGES = gql`
  query {
    getTwoDifferentRandomImages {
      creator
      base64ImageString
    }
  }
`;
const SingleImageInStandoff = ({ src }) => {
  return (
    <div className="transform p-3 transition duration-500 hover:scale-105">
      <div className="overflow-hidden rounded-3xl">
        <Image
          src={src}
          width={500}
          height={500}
          alt="Stable Diffusion Picture"
        />
      </div>
    </div>
  );
};

const ImageTile = ({ twoImages }) => {
  return (
    <div className="m-auto flex items-center justify-center ">
      <div className="rounded-3xl bg-sky-900 p-5 shadow-overarch-md">
        <SingleImageInStandoff src={twoImages[0].base64ImageString} />
        <SingleImageInStandoff src={twoImages[1].base64ImageString} />
      </div>
    </div>
  );
};

const ImagesContainer = () => {
  const twoImages = useQuery(GET_TWO_DIFFERENT_RANDOM_IMAGES);

  if (twoImages.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Click on the Winner</h2>
      {twoImages && (
        <ImageTile twoImages={twoImages.data.getTwoDifferentRandomImages} />
      )}
    </div>
  );
};

const Battle = () => {
  return (
    <>
      <Navigation />
      <div> Battle Page</div>
      <ImagesContainer />
    </>
  );
};
export default Battle;
