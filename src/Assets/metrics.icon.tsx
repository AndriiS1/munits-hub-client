import type { SVGProps } from "react";
import type { JSX } from "react/jsx-runtime";

const SvgComponent = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path fill="#000" d="M13 11V1H9v10h4ZM15 15v-2H1v2h14ZM7 5v6H3V5h4Z" />
  </svg>
);
export default SvgComponent;
