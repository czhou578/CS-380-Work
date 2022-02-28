export const addFoodAction = (food) => {
  return {
    type: "addFood",
    newFood: food,
  };
};

export const addZoneAction = (zone) => {
  return {
    type: "addZone",
    newZone: zone
  }
}
