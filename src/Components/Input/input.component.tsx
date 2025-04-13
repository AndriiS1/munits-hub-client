import "./input.style.css";

export default function Input(props: {
  topPlaceholder?: string | undefined;
  bottomPlaceholder?: string | undefined;
  placeholder?: string | undefined;
  value: string;
  type: "number" | "text";
  errorMessage?: string | undefined;
  prefix?: string | undefined;
  suffix?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="custom-input-wrapper">
      {props.topPlaceholder && (
        <div className="bold-message">{props.topPlaceholder}</div>
      )}
      <input
        type={props.type}
        className="custom-input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorMessage ? (
        <div className="input-error-message bold-message">
          {props.errorMessage}
        </div>
      ) : (
        props.bottomPlaceholder && (
          <div className="bold-message">{props.bottomPlaceholder}</div>
        )
      )}
    </div>
  );
}
