const noZoneState = {
  allZones: [],
};

const addZoneReducer = (state = noZoneState, action) => {
  switch (action.type) {
    case "addZone":
      return {
        allZones: [...state.allZones, action.newZone],
      };
    case "addZoneActionFood":
      let array = state.allZones.map((element) => {
        var tempObject = {
          ...element,
          ...action.newZoneFood
        }

        return tempObject
      })
      return {
        allZones: array,
      }
    default:
      return state;
  }
};

export default addZoneReducer;
