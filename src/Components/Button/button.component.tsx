import "./button.style.css";

export default function Button(props: {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
}) {
  return (
    <button
      className="custom-button"
      onClick={props.onClick}
      disabled={props.disabled}
      style={{ backgroundColor: props.color }}
    >
      {props.text}
    </button>
  );
}
