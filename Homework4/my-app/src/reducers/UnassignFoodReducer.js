const unassignState = {
  unAssignFood: [],
};

const UnassignFoodReducer = (state = unassignState, action) => {
  switch (action.type) {
    case "addToUnassigned":
      let unassignedFood = Object.keys(action.payload);
      unassignedFood.pop();
      unassignedFood.pop();

      return {
        unAssignFood: unassignedFood,
      };

    default:
      return state;
  }
};

export default UnassignFoodReducer;
