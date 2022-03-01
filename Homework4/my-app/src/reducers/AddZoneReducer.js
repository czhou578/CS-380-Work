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
      let array = state.allZones.map((element, index) => {
        if (index === action.newZoneFood.index) {
          let key = Object.keys(action.newZoneFood)[0];
          let value = Object.values(action.newZoneFood)[0];
          var tempObject = {
            ...element,
            [key]: value,
          };
          return tempObject;
        }
        return element;
      });
      return {
        allZones: array,
      };
    default:
      return state;
  }
};

export default addZoneReducer;
