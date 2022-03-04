export const addFoodAction = (food) => {
  //add new food
  return {
    type: "addFood",
    payload: food,
  };
};

export const addZoneAction = (zone) => {
  //add new zone
  return {
    type: "addZone",
    payload: zone,
  };
};

export const addZoneActionFood = (zoneUpdateFood) => {
  //update food in specific zone
  return {
    type: "addZoneActionFood",
    payload: zoneUpdateFood,
  };
};

//removes food from about to be deleted zone from all other zones
export const deleteZoneFood = (zone) => {
  return {
    type: "deleteFoodFromAllZones",
    payload: zone,
  };
};

export const deleteZone = (zone) => {
  //delete zone
  return {
    type: "deleteZone",
    payload: zone,
  };
};

export const addToUnassignedFood = (food) => {
  //add to unassigned food
  return {
    type: "addToUnassigned",
    payload: food,
  };
};

export const deleteFromUnassignedFood = (food) => {
  //add to unassigned food
  return {
    type: "deleteFromUnassigned",
    payload: food,
  };
};
