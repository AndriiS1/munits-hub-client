import { ReactNode } from "react";
import "./button.style.css";

export default function Button(props: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
}) {
  return (
    <button
      className="custom-button"
      onClick={props.disabled ? undefined : props.onClick}
      disabled={props.disabled}
      style={{ backgroundColor: props.color }}
    >
      {props.children}
    </button>
  );
}
