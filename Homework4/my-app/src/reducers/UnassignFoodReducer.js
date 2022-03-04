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

    case "deleteFromUnassigned":
      let name = Object.keys(action.payload)[0];
      console.log(name);

      let newArrayState = state.unAssignFood.filter(
        (element) => element !== name
      );

      return {
        unAssignFood: newArrayState,
      };

    default:
      return state;
  }
};

export default UnassignFoodReducer;
