const getWinsLossesBattles = (imageObject) => {
  const nWins = imageObject.battlesWon ? imageObject.battlesWon : 0;
  const nLosses = imageObject.battlesLost ? imageObject.battlesLost : 0;
  const totalBattlesOfImage = nWins + nLosses > 0 ? nWins + nLosses : 1;
  return { nWins, nLosses, totalBattlesOfImage };
};

export const getWinRatio = (imageObject) => {
  const { nWins, nLosses, totalBattlesOfImage } =
    getWinsLossesBattles(imageObject);
  const winRatio = Math.round((100 * nWins) / totalBattlesOfImage);
  return winRatio;
};

export const getLooseRatio = (imageObject) => {
  const { nWins, nLosses, totalBattlesOfImage } =
    getWinsLossesBattles(imageObject);
  const looseRatio = Math.round((100 * nLosses) / totalBattlesOfImage);
  return looseRatio;
};
