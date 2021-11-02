import GuidedTourContext from "./GuidedTourContext";
import React, { useState } from "react";
import { GuidedTourProviderProps, TourStep } from "./declarations";
import ReactFloater from "react-floater";
import VanillaButton from "./VanillaButton";

const GuidedTourProvider: React.FC<GuidedTourProviderProps> = ({
  actionButtonComponent,
  tourSteps = [],
  children,
}) => {
  // States of the current guided tour configuration
  const [tour, setTour] = useState<TourStep[]>(tourSteps);
  // State to disable back button if needed
  const [disableBack, setDisableBack] = useState<boolean>(false);
  // State to keep track of the active tour step index
  const [activeTourStepIndex, setActiveTourStepIndex] = useState<number>(0);

  const startTour = (tour: TourStep[], startFrom?: string) => {
    setTour(tour);
    startFrom ? goToTourStep(startFrom) : setActiveTourStepIndex(0);
  };

  const skipTour = () => setActiveTourStepIndex(tour.length - 1);

  const goToTourStep = (name: string) =>
    setActiveTourStepIndex((i) => tour.findIndex((j) => j.name === name) || i);

  const getCurrentTourStep = () => tour[activeTourStepIndex]?.name;

  const disableBackOption = () => setDisableBack(true);

  const goNext = () =>
    setActiveTourStepIndex((i) => Math.max(i + 1, tour.length - 1));

  const goBack = () => setActiveTourStepIndex((i) => Math.min(i - 1, 0));

  const getFloaterProps = () => {
    const { placement, offset } = tour[activeTourStepIndex];

    return {
      placement,
      offset,
    };
  };

  return (
    <GuidedTourContext.Provider
      value={{
        goNext,
        goBack,
        tour,
        startTour,
        skipTour,
        goToTourStep,
        getCurrentTourStep,
        disableBackOption,
      }}
    >
      {children}
      <>
        {tour.length > 0 && activeTourStepIndex >= 0 && (
          // START: Floater
          <ReactFloater
            key={`guided-tour-step-${activeTourStepIndex}`}
            styles={{
              container: {
                padding: tour[activeTourStepIndex]?.disableContainerGutters
                  ? 0
                  : 15,
              },
            }}
            {...getFloaterProps()}
            // wrapperOptions={{ position: true, offset: 0, placement: "center" }}
            content={
              <div className="guided-tour-wrapper">
                {/* Render the floating guided tour component which is currently active */}
                {React.createElement(
                  tour[activeTourStepIndex].component as any
                )}

                {/* Render the actions of thre guided your to go next or back */}
                {!Boolean(tour[activeTourStepIndex]?.handleActions) && (
                  <div className="guided-tour-step-actions">
                    {!disableBack && activeTourStepIndex > 0 && (
                      <VanillaButton
                        component={actionButtonComponent}
                        onClick={() => setActiveTourStepIndex((i) => i - 1)}
                      >
                        {tour[activeTourStepIndex].previousActionText || "Back"}
                      </VanillaButton>
                    )}
                    {activeTourStepIndex < tour.length - 1 && (
                      <VanillaButton
                        component={actionButtonComponent}
                        onClick={() => setActiveTourStepIndex((i) => i + 1)}
                      >
                        {tour[activeTourStepIndex].nextActionText || "Next"}{" "}
                        {`${activeTourStepIndex + 1}/${tour.length}`}
                      </VanillaButton>
                    )}
                  </div>
                )}
              </div>
            }
            open={activeTourStepIndex >= 0 && activeTourStepIndex < tour.length}
            target={
              document.querySelector(
                `[guided-tour-anchor="${tour[activeTourStepIndex]?.anchor}"]`
              ) as HTMLAnchorElement
            }
          />
          // END: Floater
        )}
      </>
    </GuidedTourContext.Provider>
  );
};

export default GuidedTourProvider;
