import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Image from "next/image";
import Navigation from "./Navigation";

const GET_ALL_IMAGES = gql`
  query {
    getAllImages {
      creator
      base64ImageString
    }
  }
`;

const ImageTile = ({ imageString }) => {
  return (
    <Image
      src={imageString}
      width={500}
      height={500}
      alt="Stable Diffusion Picture"
    />
  );
};

const ImagesContainer = () => {
  const allImages = useQuery(GET_ALL_IMAGES);

  if (allImages.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {console.log("allImages", allImages)}
      {allImages.data.getAllImages.map((img, index) => (
        <ImageTile key={index} imageString={img.base64ImageString} />
      ))}
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
