import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useThemeColors } from "../hooks/useThemeColors";

const TitleBar = () => {
  const { clickedFile, openedTabs } = useSelector(
    ({ tree }: RootState) => tree
  );
  const colors = useThemeColors();
  const activeTab = openedTabs.find((tab) => tab.isActive);
  const activeFile = activeTab || clickedFile;

  const getTitle = () => {
    if (activeFile) {
      // Handle both ITab and IClickedFile types
      const filename =
        "name" in activeFile ? activeFile.name : activeFile.filename;
      const edited =
        "isEdited" in activeFile && activeFile.isEdited ? " ●" : "";
      return `${filename}${edited} - VS Code Clone`;
    }
    return "VS Code Clone";
  };

  return (
    <div
      className="h-8 text-sm flex items-center justify-between px-3 select-none border-b"
      style={{
        backgroundColor: colors.tertiary,
        color: colors.textPrimary,
        borderColor: colors.sidebarBorder,
      }}
    >
      {/* Left side - Menu */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="text-lg">💻</div>
          <span className="font-medium">VS Code Clone</span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          {[
            "File",
            "Edit",
            "Selection",
            "View",
            "Go",
            "Run",
            "Terminal",
            "Help",
          ].map((menuItem) => (
            <div
              key={menuItem}
              className="px-2 py-1 rounded cursor-pointer transition-colors duration-150"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.sidebarHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {menuItem}
            </div>
          ))}
        </div>
      </div>

      {/* Center - Title */}
      <div
        className="flex-1 text-center text-xs"
        style={{ color: colors.textSecondary }}
      >
        {getTitle()}
      </div>

      {/* Right side - Window controls */}
      <div className="flex items-center">
        <div className="flex items-center space-x-1">
          <div
            className="w-11 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span className="text-xs">−</span>
          </div>
          <div
            className="w-11 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span className="text-xs">□</span>
          </div>
          <div
            className="w-11 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#dc3545";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span className="text-xs">×</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
