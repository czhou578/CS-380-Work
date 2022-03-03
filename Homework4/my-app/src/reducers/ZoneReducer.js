const noZoneState = {
  allZones: [],
};

const addZoneReducer = (state = noZoneState, action) => {
  switch (action.type) {
    case "addZone":
      return {
        allZones: [...state.allZones, action.payload],
      };
    case "addZoneActionFood":
      console.log(action.payload);
      let array = state.allZones.map((element, index) => {
        if (index === action.payload.index) {
          let key = Object.keys(action.payload)[0];
          let value = Object.values(action.payload)[0];
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
    case "deleteFoodFromAllZones":
      let keys = Object.keys(action.payload)
      keys.pop()
      keys.pop()

      let newFilteredArray = state.allZones.map((element, index) => {
        for (const key of keys) {
          if (element[key]) {
            delete element[key]
          }
        }

        return element
      })

      return {
        allZones: newFilteredArray
      }
    case "deleteZone":

      return {
        allZones: state.allZones.filter(
          (element) => element.color !== action.payload.color
        ),
      };
    default:
      return state;
  }
};

export default addZoneReducer;
