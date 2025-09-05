export const themes = {
  dark: {
    // Main backgrounds
    primary: "#1e1e1e",
    secondary: "#252526",
    tertiary: "#2d2d30",

    // Activity bar
    activityBar: "#333333",
    activityBarBorder: "#2d2d30",
    activityBarActive: "#37373d",
    activityBarHover: "#2a2d2e",

    // Sidebar
    sidebar: "#252526",
    sidebarBorder: "#2d2d30",
    sidebarHover: "#2a2d2e",

    // Editor
    editor: "#1e1e1e",
    editorLine: "#282828",

    // Tabs
    tabActive: "#1e1e1e",
    tabInactive: "#2d2d30",
    tabBorder: "#2d2d30",
    tabHover: "#1e1e1e",

    // Text colors
    textPrimary: "#cccccc",
    textSecondary: "#969696",
    textMuted: "#6a6a6a",

    // Accent colors
    accent: "#007acc",
    accentHover: "#1177bb",

    // Status colors
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",

    // Inputs
    input: "#3c3c3c",
    inputBorder: "#464647",
    inputFocus: "#007acc",
  },

  light: {
    // Main backgrounds
    primary: "#ffffff",
    secondary: "#ffffff",
    tertiary: "#f8f8f8",

    // Activity bar
    activityBar: "#f3f3f3",
    activityBarBorder: "#e1e1e1",
    activityBarActive: "#e8e8e8",
    activityBarHover: "#e8e8e8",

    // Sidebar
    sidebar: "#ffffff",
    sidebarBorder: "#e1e1e1",
    sidebarHover: "#f0f0f0",

    // Editor
    editor: "#ffffff",
    editorLine: "#f8f8f8",

    // Tabs
    tabActive: "#ffffff",
    tabInactive: "#f3f3f3",
    tabBorder: "#e1e1e1",
    tabHover: "#f8f8f8",

    // Text colors
    textPrimary: "#333333",
    textSecondary: "#666666",
    textMuted: "#999999",

    // Accent colors
    accent: "#0078d4",
    accentHover: "#106ebe",

    // Status colors
    success: "#107c10",
    warning: "#ff8c00",
    error: "#d13438",

    // Inputs
    input: "#ffffff",
    inputBorder: "#d1d1d1",
    inputFocus: "#0078d4",
  },
};

export type ThemeColors = typeof themes.dark;
