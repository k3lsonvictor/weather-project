"use client";

interface Props{
  onClick?: () => void;
  checked?: boolean;  
}

export function ToggleSwitch({ onClick, checked }: Props) {
  return (
    <div>
      <div className="flex justify-end">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={onClick}
            />
            <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
            <div
              className={`dot absolute left-1 top-1 transition-transform duration-300 ease-in-out ${
                checked ? "translate-x-4" : "translate-x-0"
              }`}
            >
              <div
                className={`w-4 h-4 ${
                  checked ? "bg-black" : "bg-white"
                } rounded-full shadow-md`}
              ></div>
            </div>
          </div>
          <span
            className={`ml-3 text-${checked ? "white" : "black"}`}
          ></span>
        </label>
      </div>
    </div>
  );
}