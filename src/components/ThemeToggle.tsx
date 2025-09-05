import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useThemeColors } from "../hooks/useThemeColors";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const colors = useThemeColors();

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-150 group"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      style={{ backgroundColor: "transparent" }}
    >
      {theme === "dark" ? (
        // Sun icon for switching to light mode
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8"
            cy="8"
            r="3.5"
            stroke={colors.textSecondary}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M8 1V3M8 13V15M15 8H13M3 8H1M12.5 3.5L11.1 4.9M4.9 11.1L3.5 12.5M12.5 12.5L11.1 11.1M4.9 4.9L3.5 3.5"
            stroke={colors.textSecondary}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        // Moon icon for switching to dark mode
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 2C6 6.4 9.6 10 14 10C13 13.3 10 15.5 6.5 15.5C2.4 15.5 0 12.1 0 8C0 4.5 2.7 1.5 6 2Z"
            fill={colors.textSecondary}
          />
        </svg>
      )}

      {/* Tooltip */}
      <div
        className="absolute left-12 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 text-xs"
        style={{
          backgroundColor: colors.tertiary,
          color: colors.textPrimary,
        }}
      >
        {theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </div>
    </button>
  );
};

export default ThemeToggle;
