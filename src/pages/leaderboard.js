import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Image from "next/image";
import BlurredBackgroundContainer from "./components/BlurredBackgroundContainer";
import Navigation from "./components/Navigation";

const GET_ALL_IMAGES = gql`
  query {
    getAllImages {
      creator
      base64ImageString
    }
  }
`;

const Leaderboard = () => {
  const allImagesQueryRetrurn = useQuery(GET_ALL_IMAGES);

  if (allImagesQueryRetrurn.loading) {
    return (
      <>
        <Navigation />
        Leaderboard loading ...
      </>
    );
  }

  const allImages = allImagesQueryRetrurn.data.getAllImages;

  return (
    <div className="flex h-screen flex-col">
      <Navigation />
      <div className=" flex  w-full flex-grow flex-col items-center overflow-scroll p-12">
        {allImages.map((img, idx) => {
          return (
            <BlurredBackgroundContainer key={idx}>
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src={img.base64ImageString}
                  alt={`Submission ${idx}`}
                  height={512}
                  width={512}
                />
              </div>
              <div className="items-left flex w-full flex-col p-2 align-middle">
                <p>-- {img.creator}</p>
              </div>
            </BlurredBackgroundContainer>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
