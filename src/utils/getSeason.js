const getSeason = (month) => {
  if (month >= 3 && month <= 5) {
    return "Spring";
  }
  if (month >= 6 && month <= 8) {
    return "Summer";
  }
  if (month >= 9 && month >= 11) {
    return "Fall";
  }
  return "Winter";
};

export default getSeason;
