import { useThemeColors } from "../hooks/useThemeColors";
import ThemeToggle from "./ThemeToggle";

interface ActivityBarProps {
  onActivityChange: (activity: string) => void;
  activeActivity: string;
}

const ActivityBar = ({
  onActivityChange,
  activeActivity,
}: ActivityBarProps) => {
  const colors = useThemeColors();

  const activities = [
    {
      id: "explorer",
      iconPath: "/icons/explorer-default.svg",
      label: "Explorer",
      shortcut: "Ctrl+Shift+E",
    },
    {
      id: "search",
      iconPath: "/icons/search-default.svg",
      label: "Search",
      shortcut: "Ctrl+Shift+F",
    },
    {
      id: "source-control",
      iconPath: "/icons/source-control-default.svg",
      label: "Source Control",
      shortcut: "Ctrl+Shift+G",
    },
    {
      id: "debug",
      iconPath: "/icons/debug-default.svg",
      label: "Run and Debug",
      shortcut: "Ctrl+Shift+D",
    },
    {
      id: "extensions",
      iconPath: "/icons/extensions-default.svg",
      label: "Extensions",
      shortcut: "Ctrl+Shift+X",
    },
  ];

  return (
    <div
      className="w-12 flex flex-col items-center py-2 border-r"
      style={{
        backgroundColor: colors.activityBar,
        borderColor: colors.activityBarBorder,
      }}
    >
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="w-12 h-12 flex items-center justify-center cursor-pointer relative group transition-colors duration-150"
          style={{
            backgroundColor:
              activeActivity === activity.id
                ? colors.activityBarActive
                : "transparent",
            borderLeft:
              activeActivity === activity.id
                ? `2px solid ${colors.accent}`
                : "none",
          }}
          onMouseEnter={(e) => {
            if (activeActivity !== activity.id) {
              e.currentTarget.style.backgroundColor = colors.activityBarHover;
            }
          }}
          onMouseLeave={(e) => {
            if (activeActivity !== activity.id) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
          onClick={() => onActivityChange(activity.id)}
          title={`${activity.label} (${activity.shortcut})`}
        >
          <img
            src={activity.iconPath}
            className="w-6 h-6"
            alt={activity.label}
            style={{
              filter:
                activeActivity === activity.id ? "none" : "brightness(0.7)",
            }}
            onError={(e) => {
              // Fallback to generic icon if specific icon doesn't exist
              (e.target as HTMLImageElement).src = "/icons/file.svg";
            }}
          />

          {/* Active indicator */}
          {activeActivity === activity.id && (
            <div className="absolute left-0 top-0 w-0.5 h-full bg-[#007acc]" />
          )}

          {/* Tooltip */}
          <div
            className="absolute left-12 text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
            style={{
              backgroundColor: colors.tertiary,
              color: colors.textPrimary,
            }}
          >
            {activity.label}
            <div
              className="text-[10px] mt-0.5"
              style={{ color: colors.textMuted }}
            >
              {activity.shortcut}
            </div>
          </div>
        </div>
      ))}

      {/* Bottom section */}
      <div className="mt-auto flex flex-col">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Settings */}
        <div
          className="w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-150 group"
          title="Settings"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.activityBarHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <img
            src="/icons/settings-default.svg"
            className="w-6 h-6"
            alt="Settings"
            style={{ filter: "brightness(0.7)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/icons/file.svg";
            }}
          />

          {/* Tooltip */}
          <div
            className="absolute left-12 text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
            style={{
              backgroundColor: colors.tertiary,
              color: colors.textPrimary,
            }}
          >
            Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityBar;
