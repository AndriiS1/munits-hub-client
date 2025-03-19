import "./input.style.css";

export default function Input(props: {
  topPlaceholder?: string | undefined;
  bottomPlaceholder?: string | undefined;
  placeholder?: string | undefined;
  value: string;
  type: "number" | "text";
  errorMessage?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="custom-input-wrapper">
      {props.topPlaceholder && <span>{props.topPlaceholder}</span>}
      <input
        type={props.type}
        className="custom-input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorMessage ? (
        <span className="input-error-message">{props.errorMessage}</span>
      ) : (
        props.bottomPlaceholder && <span>{props.bottomPlaceholder}</span>
      )}
    </div>
  );
}
