export const addFoodAction = (food) => { //add new food
  return {
    type: "addFood",
    payload: food,
  };
};

export const addZoneAction = (zone) => { //add new zone
  return {
    type: "addZone",
    payload: zone,
  };
};

export const addZoneActionFood = (zoneUpdateFood) => { //update food in specific zone
  return {
    type: "addZoneActionFood",
    payload: zoneUpdateFood,
  };
};

export const deleteZone = (zone) => {
  return {
    type: "deleteZone",
    payload: zone
  }

}
