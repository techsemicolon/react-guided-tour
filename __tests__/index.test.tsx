import React from "react";
import ReactDOM from "react-dom";
import GuidedTourProvider from "../src/GuidedTourProvider";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GuidedTourProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with children without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <GuidedTourProvider>
      <div>Something</div>
    </GuidedTourProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
