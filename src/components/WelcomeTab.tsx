import { useThemeColors } from "../hooks/useThemeColors";

const WelcomeTab = () => {
  const colors = useThemeColors();
  const recentFiles = [
    { name: "project-1", path: "/path/to/project-1", type: "folder" },
    { name: "app.js", path: "/path/to/app.js", type: "file" },
    { name: "styles.css", path: "/path/to/styles.css", type: "file" },
  ];

  return (
    <div
      className="h-full overflow-auto"
      style={{
        backgroundColor: colors.editor,
        color: colors.textPrimary,
      }}
    >
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-4">💻</div>
            <div>
              <h1 className="text-2xl font-light mb-1">
                Visual Studio Code Clone
              </h1>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Editing evolved
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Start Section */}
          <div>
            <h2
              className="text-lg font-medium mb-4"
              style={{ color: colors.textSecondary }}
            >
              Start
            </h2>
            <div className="space-y-2">
              <div
                className="flex items-center p-3 rounded cursor-pointer group transition-colors duration-150"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.sidebarHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span className="mr-3" style={{ color: colors.accent }}>
                  📁
                </span>
                <div>
                  <div
                    className="text-sm group-hover:underline"
                    style={{ color: colors.accent }}
                  >
                    Open folder...
                  </div>
                  <div className="text-xs" style={{ color: colors.textMuted }}>
                    Open a local folder to start working
                  </div>
                </div>
              </div>

              <div
                className="flex items-center p-3 rounded cursor-pointer group transition-colors duration-150"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.sidebarHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span className="mr-3" style={{ color: colors.accent }}>
                  🌐
                </span>
                <div>
                  <div
                    className="text-sm group-hover:underline"
                    style={{ color: colors.accent }}
                  >
                    Clone Git Repository...
                  </div>
                  <div className="text-xs" style={{ color: colors.textMuted }}>
                    Get code from an online repository
                  </div>
                </div>
              </div>

              <div
                className="flex items-center p-3 rounded cursor-pointer group transition-colors duration-150"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.sidebarHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span className="mr-3" style={{ color: colors.accent }}>
                  📄
                </span>
                <div>
                  <div
                    className="text-sm group-hover:underline"
                    style={{ color: colors.accent }}
                  >
                    New file
                  </div>
                  <div className="text-xs" style={{ color: colors.textMuted }}>
                    Create a new file
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Section */}
          <div>
            <h2
              className="text-lg font-medium mb-4"
              style={{ color: colors.textSecondary }}
            >
              Recent
            </h2>
            <div className="space-y-2">
              {recentFiles.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 rounded cursor-pointer group transition-colors duration-150"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.sidebarHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <span
                    className="mr-3"
                    style={{ color: colors.textSecondary }}
                  >
                    {item.type === "folder" ? "📁" : "📄"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm truncate group-hover:underline"
                      style={{ color: colors.textPrimary }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="text-xs truncate"
                      style={{ color: colors.textMuted }}
                    >
                      {item.path}
                    </div>
                  </div>
                  <button
                    className="opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-150"
                    style={{ color: colors.textSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.tertiary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    📌
                  </button>
                </div>
              ))}

              {recentFiles.length === 0 && (
                <div
                  className="text-sm p-3"
                  style={{ color: colors.textMuted }}
                >
                  No recent folders
                </div>
              )}
            </div>

            <div className="mt-4">
              <button
                className="hover:underline text-sm"
                style={{ color: colors.accent }}
              >
                More actions...
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12">
          <h2
            className="text-lg font-medium mb-4"
            style={{ color: colors.textSecondary }}
          >
            Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              className="p-4 border rounded cursor-pointer transition-all duration-150"
              style={{ borderColor: colors.sidebarBorder }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.inputBorder;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.sidebarBorder;
              }}
            >
              <div className="mb-2" style={{ color: colors.accent }}>
                📖
              </div>
              <div
                className="text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Documentation
              </div>
              <div className="text-xs" style={{ color: colors.textMuted }}>
                Browse the comprehensive docs
              </div>
            </div>

            <div
              className="p-4 border rounded cursor-pointer transition-all duration-150"
              style={{ borderColor: colors.sidebarBorder }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.inputBorder;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.sidebarBorder;
              }}
            >
              <div className="mb-2" style={{ color: colors.accent }}>
                🎮
              </div>
              <div
                className="text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Interactive Playground
              </div>
              <div className="text-xs" style={{ color: colors.textMuted }}>
                Try out VS Code features
              </div>
            </div>

            <div
              className="p-4 border rounded cursor-pointer transition-all duration-150"
              style={{ borderColor: colors.sidebarBorder }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.inputBorder;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.sidebarBorder;
              }}
            >
              <div className="mb-2" style={{ color: colors.accent }}>
                ⚙️
              </div>
              <div
                className="text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Keyboard Shortcuts
              </div>
              <div className="text-xs" style={{ color: colors.textMuted }}>
                Learn useful shortcuts
              </div>
            </div>
          </div>
        </div>

        {/* Customize Section */}
        <div className="mt-8">
          <h2
            className="text-lg font-medium mb-4"
            style={{ color: colors.textSecondary }}
          >
            Customize
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="flex items-center p-3 rounded cursor-pointer group transition-colors duration-150"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.sidebarHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span className="mr-3" style={{ color: colors.accent }}>
                🎨
              </span>
              <div>
                <div
                  className="text-sm group-hover:underline"
                  style={{ color: colors.accent }}
                >
                  Color theme
                </div>
                <div className="text-xs" style={{ color: colors.textMuted }}>
                  Make it yours with custom colors
                </div>
              </div>
            </div>

            <div
              className="flex items-center p-3 rounded cursor-pointer group transition-colors duration-150"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.sidebarHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span className="mr-3" style={{ color: colors.accent }}>
                ⚙️
              </span>
              <div>
                <div
                  className="text-sm group-hover:underline"
                  style={{ color: colors.accent }}
                >
                  Settings Sync
                </div>
                <div className="text-xs" style={{ color: colors.textMuted }}>
                  Sync settings across devices
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTab;
