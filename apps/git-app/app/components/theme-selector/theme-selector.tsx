import type { MouseEventHandler } from "react";
import { THEMES } from "../constants/variables";

export const ThemeSelector = () => {
  function toggleCustomMode(buttonValue: string) {
    console.log("buttonValue", buttonValue);
    const themingAreaClassList =
      document.getElementById("theming-area")?.classList;

    // delete all custom-theme classNamees
    for (const theme of themingAreaClassList ?? []) {
      themingAreaClassList?.remove(theme);
    }
    // add the selected custom-theme className
    buttonValue === "default"
      ? undefined // do nothing
      : themingAreaClassList?.add(buttonValue);
    console.log("themingAreaClassList", themingAreaClassList);
  }

  const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
    const buttonValue = e.currentTarget.value;
    toggleCustomMode(buttonValue);
  };

  return (
    <>
      {/* create grid which is a flex container and has a column layout */}
      <ul
        className="w-full space-y-1 grid md:grid-cols-3 md:grid-rows-2 gap-2 p-2 grid-cols-2"
        aria-labelledby="dropdownHelperRadioButton"
      >
        {THEMES.map((theme, index) => (
          <li key={theme.name}>
            <div className="flex p-2 rounded hover:bg-gray-100 transition">
              <div className="flex items-center h-5">
                <input
                  id={`helper-radio-${index}`}
                  name="helper-radio"
                  type="radio"
                  onClick={handleClick}
                  value={theme.themeClass}
                  className={`w-4 h-4 ${theme.radioButtonColor} `}
                />
              </div>
              <div className="ms-2 text-sm">
                <label
                  htmlFor={`helper-radio-${index}`}
                  className="font-medium text-base-text"
                >
                  <div>{theme.name}</div>
                </label>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
