import { useTheme } from "../contexts/ThemeContext";
import { themes, ThemeColors } from "../styles/themes";

export const useThemeColors = (): ThemeColors => {
  const { theme } = useTheme();
  return themes[theme];
};
