import "./searchInput.style.css";

export default function SearchInput(props: { placeholder: string }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <label htmlFor="table-search" className="sr-only">
          {props.placeholder}
        </label>
        <div className="input-wrapper">
          <div className="search-icon">
            <svg
              className="icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="search-input"
            placeholder={props.placeholder}
          />
        </div>
      </div>
    </div>
  );
}
