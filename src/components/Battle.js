import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Image from "next/image";
import { useState } from "react";
import { getWinRatio, getLooseRatio } from "../utils/getWinAndLooseRatio";
import BlurredBackgroundContainer from "./BlurredBackgroundContainer";
import Loading from "./Loading";

const GET_TWO_DIFFERENT_RANDOM_IMAGES = gql`
  query {
    getTwoDifferentRandomImages {
      id
      creator
      base64ImageString
      battlesWon
      battlesLost
    }
  }
`;

const BATTLE_WON = gql`
  mutation winBattle($imageId: String!) {
    battleWon(imageId: $imageId) {
      battlesWon
      battlesLost
    }
  }
`;

const BATTLE_LOST = gql`
  mutation looseBattle($imageId: String!) {
    battleLost(imageId: $imageId) {
      battlesWon
      battlesLost
    }
  }
`;

const SingleImageInStandoff = ({
  imageObject,
  handleThisTileWins,
  tileHasWon,
  tileHasLost,
  userVoted,
}) => {
  const getWinOrLooseRatioWithCurrentVoting = () => {
    return userVoted && tileHasWon
      ? getWinRatio({
          ...imageObject,
          battlesWon: imageObject.battlesWon + 1,
        })
      : userVoted && tileHasLost
      ? getWinRatio({
          ...imageObject,
          battlesLost: imageObject.battlesLost + 1,
        })
      : null;
  };

  return (
    <div
      className={`transform p-3 transition duration-500 ${
        userVoted ? "" : "hover:scale-105"
      }`}
      onClick={handleThisTileWins}
    >
      <div className="overflow-hidden rounded-3xl">
        <div className="relative">
          <Image
            src={imageObject.base64ImageString}
            width={500}
            height={500}
            alt="Stable Diffusion Picture"
          />
          {userVoted ? (
            <div
              className={`absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center p-4 text-center align-middle ${
                userVoted && tileHasWon ? "bg-transparentWhite" : ""
              } ${userVoted && tileHasLost ? "bg-transparentBlack" : ""}`}
            >
              <h1 className="p-7 text-9xl font-bold">
                {userVoted && tileHasWon ? `Winner` : " Looser"}
              </h1>
              <div className="p-11">
                <h1 className="text-3xl font-bold">
                  {userVoted ? `${getWinOrLooseRatioWithCurrentVoting()}%` : ""}
                </h1>
                <h1 className="text-md font-bold">Win Rate</h1>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const ImageTile = ({ twoImages, refetch }) => {
  const [winBattle] = useMutation(BATTLE_WON);
  const [looseBattle] = useMutation(BATTLE_LOST);
  const [oneWins, setOneWins] = useState(false);
  const [oneLooses, setOneLooses] = useState(false);
  const [twoWins, setTwoWins] = useState(false);
  const [twoLooses, setTwoLooses] = useState(false);
  const [userVoted, setUserVoted] = useState(false);

  const handleClickWinner = async (
    setWinFlagOfWinner,
    setWinFlagOfLooser,
    setLooseFlagOfWinner,
    setLooseFlagOfLooser
  ) => {
    console.log("tile wins");
    // Have to display new win / loose ratio for image
    if (!oneWins && !oneLooses && !twoWins && !twoLooses) {
      // If no winning event occured and all flags are therefore false. If it did, do nothing
      await setWinFlagOfWinner(true);
      await setWinFlagOfLooser(false);
      await setLooseFlagOfWinner(false);
      await setLooseFlagOfLooser(true);
      await setUserVoted(true);

      await looseBattle({
        variables: { imageId: oneLooses ? twoImages[0].id : twoImages[1].id },
      });
      await winBattle({
        variables: { imageId: oneWins ? twoImages[0].id : twoImages[1].id },
      });

      setTimeout(async () => {
        await refetch();
        await setWinFlagOfWinner(false);
        await setWinFlagOfLooser(false);
        await setLooseFlagOfWinner(false);
        await setLooseFlagOfLooser(false);
        await setUserVoted(false);
      }, 1500);
    }
  };
  return (
    <div className="m-auto flex items-center justify-center ">
      <BlurredBackgroundContainer>
        <SingleImageInStandoff
          imageObject={twoImages[0]}
          handleThisTileWins={() =>
            handleClickWinner(
              setOneWins,
              setTwoWins,
              setOneLooses,
              setTwoLooses
            )
          }
          tileHasWon={oneWins}
          tileHasLost={oneLooses}
          userVoted={userVoted}
        />
        <SingleImageInStandoff
          imageObject={twoImages[1]}
          handleThisTileWins={() =>
            handleClickWinner(
              setTwoWins,
              setOneWins,
              setTwoLooses,
              setOneLooses
            )
          }
          tileHasWon={twoWins}
          tileHasLost={twoLooses}
          userVoted={userVoted}
        />
      </BlurredBackgroundContainer>
    </div>
  );
};

const ImagesContainer = () => {
  const twoImages = useQuery(GET_TWO_DIFFERENT_RANDOM_IMAGES, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div>
      <h2>Select the Winner</h2>
      {twoImages.loading && <Loading />}
      {!twoImages.loading && twoImages.data && (
        <ImageTile
          refetch={twoImages.refetch}
          twoImages={twoImages.data.getTwoDifferentRandomImages}
        />
      )}
    </div>
  );
};

const Battle = () => {
  return (
    <div className="items-center text-center">
      <h1 className="p-5 text-3xl"> Standoff </h1>
      <ImagesContainer />
    </div>
  );
};
export default Battle;
