import { Props } from "react-floater";

export type TourStep = {
  name: string;
  anchor: string;
  component: React.ReactNode;
  nextActionText?: string;
  previousActionText?: string;
  handleActions?: boolean;
  disableContainerGutters?: boolean;
} & Pick<Props, "placement" | "offset">;

export interface GuidedTourContextInterface {
  tour: TourStep[];
  disableBackOption?: () => void;
  startTour: (tour: TourStep[]) => void;
  goToTourStep: (name: string) => void;
  skipTour: () => void;
  goNext: () => void;
  goBack: () => void;
  getCurrentTourStep: () => string;
}

export interface GuidedTourProviderProps {
  actionButtonComponent?: React.ReactNode;
  tourSteps?: TourStep[];
}

export type useGuidedTourContextType = Omit<
  GuidedTourContextInterface,
  "tour" | "isEnabled"
>;
