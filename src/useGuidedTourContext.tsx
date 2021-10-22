import { useContext } from "react";
import { useGuidedTourContextType } from "./declarations";
import GuidedTourContext from "./GuidedTourContext";

const useGuidedTourContext = (): useGuidedTourContextType =>
  useContext(GuidedTourContext);

export default useGuidedTourContext;
