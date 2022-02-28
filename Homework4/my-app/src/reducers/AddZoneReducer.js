const noZoneState = {
  allZones: [],
};

const addZoneReducer = (state = noZoneState, action) => {
  switch (action.type) {
    case "addZone":
      return {
        ...state.allZones,
        allZones: [...state.allZones, action.newZone],
      };
    default:
      return state;
  }
};

export default addZoneReducer;
