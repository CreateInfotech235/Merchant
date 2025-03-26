import { useState } from "react";

const ToggleSwitch = ({ checked, setChecked }) => {

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={!checked}
        onChange={() => setChecked(!checked)}
        className="sr-only"
      />
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-200 ${!checked ? 'bg-green-500' : 'bg-gray-500'}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-200 flex items-center justify-center ${!checked ? 'translate-x-6' : 'translate-x-0'}`}
        >
          {!checked ? (
            <svg
              className="w-3 h-3 text-green-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
            </svg>
          ) : (
            <svg
              className="w-2 h-2 text-gray-500"
              viewBox="0 0 365.696 365.696"
              fill="currentColor"
            >
              <path d="M243.188 182.86L356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25z" />
            </svg>
          )}
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
