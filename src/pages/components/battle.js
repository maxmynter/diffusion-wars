import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Image from "next/image";
import { useState } from "react";
import BlurredBackgroundContainer from "./BlurredBackgroundContainer";
import Navigation from "./Navigation";

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
  const nWins = imageObject.battlesWon ? imageObject.battlesWon : 0;
  const nLosses = imageObject.battlesLost ? imageObject.battlesLost : 0;
  const totalBattlesOfImage = nWins + nLosses;

  const getWinOrLooseRatio = () =>
    Math.round(
      (100 * (tileHasWon ? nWins + 1 : nLosses + 1)) / (totalBattlesOfImage + 1)
    );
  return (
    <div
      className={`transform p-3 transition duration-500 ${
        userVoted ? "" : "hover:scale-105"
      }`}
      onClick={handleThisTileWins}
    >
      <div className="overflow-hidden rounded-3xl">
        <div className="relative">
          {console.log("In tile", tileHasLost, tileHasWon)}
          <Image
            src={imageObject.base64ImageString}
            width={500}
            height={500}
            alt="Stable Diffusion Picture"
          />
          <div
            className={`absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center p-4 text-center align-middle ${
              tileHasWon ? "bg-transparentWhite" : ""
            } ${tileHasLost ? "bg-transparentBlack" : ""}`}
          >
            <h1 className="p-7 text-9xl font-bold">
              {tileHasWon ? `Winner` : " Looser"}
            </h1>
            <div className="p-11">
              <h1 className="text-3xl font-bold">
                {userVoted ? `${getWinOrLooseRatio()}%` : ""}
              </h1>
              <h1 className="text-md font-bold">Win Rate</h1>
            </div>
            {console.log(nWins, nLosses, totalBattlesOfImage)}
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageTile = ({ twoImages }) => {
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
    }

    //Enlighten winner, darken looser
    // Send API Calls to update winner looser
    //Reload Page
  };
  return (
    <div className="m-auto flex items-center justify-center ">
      {console.log(twoImages)}
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
  const twoImages = useQuery(GET_TWO_DIFFERENT_RANDOM_IMAGES);

  if (twoImages.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Click on the Winner</h2>
      {twoImages.data && (
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
