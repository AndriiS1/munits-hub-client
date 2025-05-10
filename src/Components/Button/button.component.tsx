import { ReactNode } from "react";
import "./button.style.css";

export default function Button(props: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  inverted?: boolean;
}) {
  const color = props.color ?? "#3b82f6";

  return (
    <button
      className={`custom-button${props.inverted ? " inverted" : ""}`}
      onClick={props.onClick}
      disabled={props.disabled}
      style={
        props.disabled
          ? undefined
          : props.inverted
          ? { color, borderColor: color, borderWidth: "1px" }
          : { backgroundColor: color }
      }
    >
      {props.children}
    </button>
  );
}
