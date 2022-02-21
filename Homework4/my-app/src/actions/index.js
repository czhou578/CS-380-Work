export const addFoodAction = (food) => {
  return {
    type: "addFood",
    newFood: food,
  };
};
