import type { MouseEventHandler } from "react";
import { SIZE } from "../constants/variables";

export const SizeSelector = () => {
  function toggleCustomMode(buttonValue: string) {
    const calendarGraphClassList =
      document.getElementById("calendar-graph")?.classList;

    // delete all custom-theme classNamees
    for (const size of calendarGraphClassList ?? []) {
      calendarGraphClassList?.remove(size);
    }
    // add the selected custom-theme className
    calendarGraphClassList?.add(`calendar-size-${buttonValue}`);
  }

  const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
    const buttonValue = e.currentTarget.value;
    toggleCustomMode(buttonValue);
  };

  return (
    <fieldset>
      <ul
        className="w-full space-y-1 grid md:grid-cols-3 md:grid-rows-2 gap-2 p-2 grid-cols-2"
        aria-labelledby="dropdownHelperRadioButton2"
      >
        {Object.entries(SIZE).map(([key, value]) => (
          <li key={key}>
            <div className="flex p-2 rounded hover:bg-gray-100 transition">
              <div className="flex items-center h-5">
                <input
                  id={`size-radio-${key}`}
                  name="size-radio"
                  type="radio"
                  onClick={handleClick}
                  value={value}
                  className={"w-4 h-4"}
                />
              </div>
              <div className="ms-2 text-sm">
                <label
                  htmlFor={`size-radio-${key}`}
                  className="font-medium text-base-text"
                >
                  <div>{key}</div>
                </label>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
