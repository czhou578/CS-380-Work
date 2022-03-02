const initialFoodManagerState = {
  allFoodArray: [],
};

const addFoodReducer = (state = initialFoodManagerState, action) => {
  switch (action.type) {
    case "addFood":
      return {
        allFoodArray: [...state.allFoodArray, action.newFood],
      };
    default:
      return state;
  }
};

export default addFoodReducer;
