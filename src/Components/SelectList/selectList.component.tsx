import { useRef } from "react";
import Input from "../Input/input.component";
import "./selectList.style.css";

interface SelectListOption {
  title: string;
  content: string;
  value: any;
}

interface ExtendedSelectListOption extends SelectListOption {
  placeholder: string;
  inputValue: any;
}

export default function SelectList(props: {
  options: (SelectListOption | ExtendedSelectListOption)[];
  selectedValue: any | null;
  onChange: (value: any) => void;
}) {
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const displayOption = (option: SelectListOption) => {
    if ("inputValue" in option) {
      return (
        <div className="option-content">
          <h2>{option.title}</h2>
          <span>{option.content}</span>
          <Input
            type="number"
            value={(option as ExtendedSelectListOption).inputValue}
            placeholder={(option as ExtendedSelectListOption).placeholder}
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
