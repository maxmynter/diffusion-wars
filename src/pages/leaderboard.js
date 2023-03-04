import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Image from "next/image";
import { getWinRatio } from "../utils/getWinAndLooseRatio";
import BlurredBackgroundContainer from "../components/BlurredBackgroundContainer";
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";

const GET_ALL_IMAGES = gql`
  query {
    getAllImages {
      creator
      base64ImageString
      battlesWon
      battlesLost
    }
  }
`;

const Leaderboard = () => {
  const allImagesQueryRetrurn = useQuery(GET_ALL_IMAGES);

  if (allImagesQueryRetrurn.loading) {
    return (
      <>
        <Navigation />
        <Loading />
      </>
    );
  }

  const allImages = allImagesQueryRetrurn.data.getAllImages;

  return (
    <div className="flex h-screen flex-col">
      <Navigation />
      <div className=" flex  w-full flex-grow flex-col items-center overflow-scroll p-12">
        {[...allImages]
          .sort((a, b) => getWinRatio(b) - getWinRatio(a))
          .map((img, idx) => {
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
                  <p>-- {img.creator}</p> <p>{getWinRatio(img)} % win rate</p>
                  <p>{img.battlesWon + img.battlesLost} standoffs</p>
                </div>
              </BlurredBackgroundContainer>
            );
          })}
      </div>
    </div>
  );
};

export default Leaderboard;
