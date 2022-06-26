const getLastSeason = (monthString) => {
  const nextSeasons = {
    Spring: "Winter",
    Fall: "Summer",
    Winter: "Fall",
    Summer: "Spring",
  };
  return nextSeasons[monthString];
};

export default getLastSeason;
