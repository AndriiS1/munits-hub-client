import * as React from "react";
import type { JSX } from "react/jsx-runtime";

const FolderIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
    viewBox="0 0 30 30"
    {...props}
  >
    <path d="M4 3a2 2 0 0 0-2 2v3h26V7a2 2 0 0 0-2-2H11.2l-.618-1.03A2 2 0 0 0 8.867 3H4zm-1 7a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V11a1 1 0 0 0-1-1H3z" />
  </svg>
);

export default FolderIcon;
