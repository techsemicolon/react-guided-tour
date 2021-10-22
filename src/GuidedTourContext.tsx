import { GuidedTourContextInterface, TourStep } from "./declarations";
import React from "react";

const GuidedTourContext = React.createContext<GuidedTourContextInterface>({
  tour: [],
  disableBackOption: () => {},
  startTour: (_: TourStep[]) => {},
  goToTourStep: () => {},
  skipTour: () => {},
  goNext: () => {},
  goBack: () => {},
  getCurrentTourStep: () => "",
});

export default GuidedTourContext;
