const getNextSeason = (monthString) => {
  const nextSeasons = {
    Spring: "Summer",
    Fall: "Winter",
    Winter: "Spring",
    Summer: "Fall",
  };
  return nextSeasons[monthString];
};

export default getNextSeason;
