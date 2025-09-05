import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import Preview from "./components/Preview";
import WelcomeTab from "./components/WelcomeTab";
import FileSearch from "./components/FileSearch";
import GlobalContextMenu from "./components/GlobalContextMenu";
import ActivityBar from "./components/ActivityBar";
import SidebarPanel from "./components/SidebarPanel";
import TitleBar from "./components/TitleBar";
import StatusBar from "./components/StatusBar";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useThemeColors } from "./hooks/useThemeColors";
import { ITab } from "./interfaces";
import { IFile } from "./interfaces";
import { fileTree } from "./data/fileTree";
import { setFileTreeAction } from "./app/features/fileTreeSlice";

interface AppContentProps {
  activeActivity: string;
  setActiveActivity: (activity: string) => void;
  displayFileTree: IFile;
  openedTabs: ITab[];
}

const AppContent: React.FC<AppContentProps> = ({
  activeActivity,
  setActiveActivity,
  displayFileTree,
  openedTabs,
}) => {
  const colors = useThemeColors();

  return (
    <div
      className="vscode-app h-screen flex flex-col"
      style={{
        backgroundColor: colors.primary,
        color: colors.textPrimary,
      }}
    >
      {/* Title Bar */}
      <TitleBar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar
          activeActivity={activeActivity}
          onActivityChange={setActiveActivity}
        />

        {/* Sidebar Panel */}
        <SidebarPanel activity={activeActivity} fileTree={displayFileTree} />

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {openedTabs.length ? <Preview /> : <WelcomeTab />}
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Overlays */}
      <FileSearch />
      <GlobalContextMenu />
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { openedTabs, fileTree: currentFileTree } = useSelector(
    ({ tree }: RootState) => tree
  );
  const [activeActivity, setActiveActivity] = useState("explorer");

  useEffect(() => {
    // Initialize file tree in Redux store
    if (!currentFileTree) {
      dispatch(setFileTreeAction(fileTree));
    }
  }, [dispatch, currentFileTree]);

  // Prevent default context menu on the entire app
  useEffect(() => {
    const preventDefaultContextMenu = (e: MouseEvent) => {
      // Only prevent if it's within our app area
      const target = e.target as HTMLElement;
      if (target.closest(".vscode-app")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventDefaultContextMenu);
    return () => {
      document.removeEventListener("contextmenu", preventDefaultContextMenu);
    };
  }, []);

  const displayFileTree = currentFileTree || fileTree;

  return (
    <ThemeProvider>
      <AppContent
        activeActivity={activeActivity}
        setActiveActivity={setActiveActivity}
        displayFileTree={displayFileTree}
        openedTabs={openedTabs}
      />
    </ThemeProvider>
  );
};

export default App;
