import { useState } from "react";
import RecursiveComponent from "./RecursiveComponent";
import { IFile } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setSearchQueryAction } from "../app/features/fileTreeSlice";
import { useThemeColors } from "../hooks/useThemeColors";

interface SidebarPanelProps {
  activity: string;
  fileTree: IFile;
}

const SidebarPanel = ({ activity, fileTree }: SidebarPanelProps) => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(({ tree }: RootState) => tree);
  const [searchInput, setSearchInput] = useState("");
  const colors = useThemeColors();

  const renderExplorer = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between p-2 text-xs uppercase tracking-wider border-b"
        style={{
          color: colors.textMuted,
          borderColor: colors.sidebarBorder,
        }}
      >
        <span>Explorer</span>
        <div className="flex items-center space-x-1">
          <button
            className="p-1 rounded transition-colors duration-150"
            title="New File"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <img
              src="/icons/new-file-default.svg"
              className="w-4 h-4"
              alt="New File"
              style={{ filter: "brightness(0.7)" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/icons/file.svg";
              }}
            />
          </button>
          <button
            className="p-1 rounded transition-colors duration-150"
            title="New Folder"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <img
              src="/icons/new-folder-default.svg"
              className="w-4 h-4"
              alt="New Folder"
              style={{ filter: "brightness(0.7)" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/icons/folder.svg";
              }}
            />
          </button>
          <button
            className="p-1 rounded transition-colors duration-150"
            title="Refresh"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <img
              src="/icons/refresh-default.svg"
              className="w-4 h-4"
              alt="Refresh"
              style={{ filter: "brightness(0.7)" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/icons/file.svg";
              }}
            />
          </button>
          <button
            className="p-1 rounded transition-colors duration-150"
            title="Collapse All"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <img
              src="/icons/collapse-all-default.svg"
              className="w-4 h-4"
              alt="Collapse All"
              style={{ filter: "brightness(0.7)" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/icons/folder.svg";
              }}
            />
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2">
        <RecursiveComponent fileTree={fileTree} />
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-[#2d2d30]">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          Search
        </div>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#3c3c3c] text-white text-sm px-3 py-2 rounded border border-[#464647] focus:border-[#007acc] focus:outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(setSearchQueryAction(searchInput));
              }
            }}
          />
          <input
            type="text"
            placeholder="Files to include"
            className="w-full bg-[#3c3c3c] text-white text-sm px-3 py-2 rounded border border-[#464647] focus:border-[#007acc] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Files to exclude"
            className="w-full bg-[#3c3c3c] text-white text-sm px-3 py-2 rounded border border-[#464647] focus:border-[#007acc] focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 mt-3">
          <button className="flex-1 bg-[#0e639c] hover:bg-[#1177bb] text-white text-sm px-3 py-2 rounded">
            Search
          </button>
          <button
            className="p-2 hover:bg-[#2a2d2e] rounded text-gray-400"
            title="Search Settings"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 p-3">
        <div className="text-gray-400 text-sm text-center py-8">
          {searchQuery
            ? `No results found for "${searchQuery}"`
            : "Search for files or content"}
        </div>
      </div>
    </div>
  );

  const renderSourceControl = () => (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#2d2d30]">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">
          Source Control
        </div>
        <button className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white text-sm px-3 py-2 rounded">
          Initialize Repository
        </button>
      </div>
      <div className="flex-1 p-3">
        <div className="text-gray-400 text-sm text-center py-8">
          No source control providers registered.
        </div>
      </div>
    </div>
  );

  const renderDebug = () => (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#2d2d30]">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">
          Run and Debug
        </div>
        <button className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white text-sm px-3 py-2 rounded">
          Run and Debug
        </button>
      </div>
      <div className="flex-1 p-3">
        <div className="text-gray-400 text-sm text-center py-8">
          To customize Run and Debug create a launch.json file.
        </div>
      </div>
    </div>
  );

  const renderExtensions = () => (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#2d2d30]">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          Extensions
        </div>
        <input
          type="text"
          placeholder="Search Extensions in Marketplace"
          className="w-full bg-[#3c3c3c] text-white text-sm px-3 py-2 rounded border border-[#464647] focus:border-[#007acc] focus:outline-none"
        />
      </div>
      <div className="flex-1 p-3">
        <div className="text-gray-400 text-sm text-center py-8">
          No extensions installed
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activity) {
      case "explorer":
        return renderExplorer();
      case "search":
        return renderSearch();
      case "source-control":
        return renderSourceControl();
      case "debug":
        return renderDebug();
      case "extensions":
        return renderExtensions();
      default:
        return renderExplorer();
    }
  };

  return (
    <div
      className="w-80 h-full border-r overflow-hidden"
      style={{
        backgroundColor: colors.sidebar,
        borderColor: colors.sidebarBorder,
        color: colors.textPrimary,
      }}
    >
      {renderContent()}
    </div>
  );
};

export default SidebarPanel;
