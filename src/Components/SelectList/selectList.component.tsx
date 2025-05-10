import { useRef } from "react";
import Input from "../Input/input.component";
import "./selectList.style.css";

interface SelectListOption {
  title: string;
  content: string;
  value: unknown;
}

interface ExtendedSelectListOption extends SelectListOption {
  childPlaceholder: string;
  childInputValue: unknown;
  childErrorMessage?: string;
  onChildInputChange: (value: unknown) => void;
}

export default function SelectList(props: {
  options: (SelectListOption | ExtendedSelectListOption)[];
  selectedValue: unknown | null;
  onChange: (value: unknown) => void;
}) {
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const displayOption = (option: SelectListOption) => {
    if ("childInputValue" in option) {
      return (
        <div className="option-content">
          <h2>{option.title}</h2>
          <span>{option.content}</span>
          <Input
            type="number"
            value={String(
              (option as ExtendedSelectListOption).childInputValue ?? ""
            )}
            placeholder={(option as ExtendedSelectListOption).childPlaceholder}
            errorMessage={
              (option as ExtendedSelectListOption).childErrorMessage
            }
            onChange={(option as ExtendedSelectListOption).onChildInputChange}
          ></Input>
        </div>
      );
    }

    return (
      <div className="option-content">
        <h2>{option.title}</h2>
        <span>{option.content}</span>
      </div>
    );
  };

  return (
    <div className="select-list-wrapper">
      {props.options.map((option, index) => (
        <div
          key={index}
          className="select-list-option"
          tabIndex={index}
          ref={(el) => {
            optionRefs.current[index] = el;
          }}
          onClick={() => props.onChange(option.value)}
        >
          <div className="option-wrap">
            <input
              className="option-checkbox"
              type="checkbox"
              checked={props.selectedValue === option.value}
              onChange={() => props.onChange(option.value)}
              onFocus={() => optionRefs.current[index]?.focus()}
            />
            {displayOption(option)}
          </div>
        </div>
      ))}
    </div>
  );
}
