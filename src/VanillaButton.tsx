import React from "react";

const VanillaButton: React.FC<
  {
    component?: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ component, children, ...props }) => {
  if (component) {
    return React.createElement(component as any, { ...props }, children);
  }

  return <button {...props}>{children}</button>;
};

export default VanillaButton;
