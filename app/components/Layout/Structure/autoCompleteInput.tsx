import { useState } from "react";

interface AutoCompleteInputFieldProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  style?: any;
  options?: any;
  onSelect: (e: any) => void;
  resetButton?: any;
  tooltip?: boolean;
  required?: boolean;
  label?: string;
  icon?: string;
  modified?: boolean;
  info?: string;

}
export const AutoCompleteInputField = ({ value, modified, label, info, icon, required, placeholder = "Digite para pesquisar...", disabled, className, maxLength, style, options, onSelect, resetButton, tooltip }: AutoCompleteInputFieldProps) => {
  const [preValue, setPreValue] = useState("");


  return <>
    <div className={`${tooltip ? "flex" : "flex-col"} items-center`}>
      {label !== "" && (
        <label
          htmlFor={label}
          className="text-grey dark:text-light-grey dark:font-light  text-[12px]  inline-flex justify-between truncate"
        >
          {label}
          {required && (
            <span className="italic text-[11px] text-red truncate">
              * Requerido
            </span>
          )}
          {icon !== "" ? (
            <div
              className="plus bg-white w-min h-auto rounded-full ml-2 flex align-center justify-center"
            >            
            </div>
          ) : null}
        </label>
      )}
      {modified !== null && modified === true && (
        <div className="bg-[orange] h-[8px] w-[8px] ml-2 inline-flex rounded-full "></div>
      )}
    </div>


    <div className={`px-3 py-[2px] [&>*]:text-[14px] rounded-xl flex [&>*]:outline-none bg-white border border-cloudy-blue dark:border-medium-grey bg-white  relative`}>
      <div className="w-full relative [&>*]:outline-none">
        {value !== "" && (
          <div
            onClick={resetButton}
            className="  font-semibold cursor-pointer flex h-[40px] text-black dark:text-white justify-between items-center rounded-[10px]"
          >
            <span className="truncate">
              {options?.filter((f: any) => f.value === value)[0]?.label}
            </span>{" "}
          </div>
        )}
        {value === "" && (
          <div className="flex items-center justify-center px-2 relative">
          </div>
        )}
        {value === "" && (
          <input
            value={preValue}
            onChange={(e) => setPreValue(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={`${className} w-full h-[38px] bg-[transparent]`}
            maxLength={maxLength}
            style={style}
          />
        )}
        {preValue !== "" && value === "" && options?.length > 0 && (
          <ul className="absolute top-[41px] -left-[12px] z-[100] bg-white text-black bg-tall-grey rounded-b-[10px] border-r border-l border-b border-cloudy-blue shadow-2xl max-h-[170px] overflow-auto w-[calc(100%+24px)] p-2">
            {options
              .filter((f: any) =>
                f.label.toLowerCase().includes(preValue.toLowerCase()),
              )
              .map((e: any, i: any) => (
                <li
                  className="py-2 px-3 cursor-pointer hover:bg-cloudy-blue/25 hover:dark:bg-cloudy-blue/25  rounded-[10px] truncate"
                  key={i}
                  onClick={() => {
                    onSelect(e);
                    setPreValue("");
                  }}
                >
                  {e.label}
                </li>
              ))}
            {options.filter((f: any) =>
              f.label.toLowerCase().includes(preValue.toLowerCase()),
            ).length === 0 && (
                <li className="py-2 italic text-center">
                  Nenhum resultado encontrado
                </li>
              )}
          </ul>
        )}
      </div></div></>
}