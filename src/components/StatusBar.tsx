import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useThemeColors } from "../hooks/useThemeColors";

const StatusBar = () => {
  const { clickedFile, openedTabs } = useSelector(
    ({ tree }: RootState) => tree
  );
  const colors = useThemeColors();

  const activeTab = openedTabs.find((tab) => tab.isActive);
  const activeFile = activeTab || clickedFile;

  const getLanguageFromFilename = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      js: "JavaScript",
      jsx: "JavaScript React",
      ts: "TypeScript",
      tsx: "TypeScript React",
      html: "HTML",
      css: "CSS",
      scss: "SCSS",
      json: "JSON",
      md: "Markdown",
      py: "Python",
      java: "Java",
      cpp: "C++",
      c: "C",
      php: "PHP",
      rb: "Ruby",
      go: "Go",
      rs: "Rust",
      xml: "XML",
      yaml: "YAML",
      yml: "YAML",
    };
    return languageMap[extension || ""] || "Plain Text";
  };

  const getFileStats = () => {
    const content = activeTab?.content || clickedFile?.fileContent;
    if (!content) return { lines: 0, characters: 0 };
    const lines = content.split("\n").length;
    const characters = content.length;
    return { lines, characters };
  };

  const stats = getFileStats();
  const filename = activeTab?.name || clickedFile?.filename;
  const language = filename ? getLanguageFromFilename(filename) : "";

  return (
    <div
      className="h-6 text-xs flex items-center justify-between px-3 select-none"
      style={{
        backgroundColor: colors.accent,
        color: "#ffffff",
      }}
    >
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-[10px]">🌿</span>
          <span>main</span>
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-[10px]">⚠️</span>
          <span>0</span>
          <span className="text-[10px]">❌</span>
          <span>0</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {filename && (
          <>
            <div className="hover:bg-[#005a9e] px-2 py-0.5 rounded cursor-pointer">
              Ln 1, Col 1
            </div>

            <div className="hover:bg-[#005a9e] px-2 py-0.5 rounded cursor-pointer">
              {stats.lines} lines, {stats.characters} characters
            </div>

            <div className="hover:bg-[#005a9e] px-2 py-0.5 rounded cursor-pointer">
              UTF-8
            </div>

            <div className="hover:bg-[#005a9e] px-2 py-0.5 rounded cursor-pointer">
              LF
            </div>

            <div className="hover:bg-[#005a9e] px-2 py-0.5 rounded cursor-pointer">
              {language}
            </div>
          </>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-[10px]">🔔</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
