import React from "react";

const CurrentTempUnitContext = React.createContext({
  currentTempUnit: "C",
  handleToggleSwitchChange: () => {},
});

export { CurrentTempUnitContext };
