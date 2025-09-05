import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setSearchQueryAction,
  setSearchResultsAction,
  setClickedFileAction,
  setOpenedTabsAction,
} from "../app/features/fileTreeSlice";
import { searchFilesInTree } from "../utils/fileOperations";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";

const FileSearch = () => {
  const dispatch = useDispatch();
  const { fileTree, searchQuery, searchResults, openedTabs } = useSelector(
    (state: RootState) => state.tree
  );
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setIsSearchVisible(true);
      }
      if (e.key === "Escape") {
        setIsSearchVisible(false);
        dispatch(setSearchQueryAction(""));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery && fileTree) {
      const results = searchFilesInTree(fileTree, searchQuery);
      dispatch(
        setSearchResultsAction(results.filter((file) => !file.isFolder))
      );
    } else {
      dispatch(setSearchResultsAction([]));
    }
  }, [searchQuery, fileTree, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQueryAction(e.target.value));
  };

  const handleFileSelect = (file: IFile) => {
    // Check if file is already open
    const existingTab = openedTabs.find((tab) => tab.id === file.id);

    if (existingTab) {
      // Update active tab
      const updatedTabs = openedTabs.map((tab) => ({
        ...tab,
        isActive: tab.id === file.id,
      }));
      dispatch(setOpenedTabsAction(updatedTabs));
    } else {
      // Add new tab
      const newTab = {
        ...file,
        isPinned: false,
        isActive: true,
      };
      const updatedTabs = openedTabs.map((tab) => ({
        ...tab,
        isActive: false,
      }));
      dispatch(setOpenedTabsAction([...updatedTabs, newTab]));
    }

    dispatch(
      setClickedFileAction({
        filename: file.name,
        fileContent: file.content,
        activeTabId: file.id,
      })
    );

    setIsSearchVisible(false);
    dispatch(setSearchQueryAction(""));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsSearchVisible(false);
      dispatch(setSearchQueryAction(""));
    }
  };

  if (!isSearchVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#2d2d30] border border-[#3c3c3c] rounded-lg shadow-2xl w-full max-w-2xl mx-4">
        {/* Search Input */}
        <div className="p-4 border-b border-[#3c3c3c]">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search files... (Ctrl+P)"
            className="w-full bg-[#1e1e1e] text-white border border-[#3c3c3c] rounded px-3 py-2 focus:outline-none focus:border-[#007acc]"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="p-2">
              <div className="text-xs text-gray-400 px-3 py-2 uppercase tracking-wider">
                Files ({searchResults.length})
              </div>
              {searchResults.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center px-3 py-2 hover:bg-[#37373d] cursor-pointer rounded text-sm"
                  onClick={() => handleFileSelect(file)}
                >
                  <RenderFileIcon filename={file.name} />
                  <span className="ml-2 text-white">{file.name}</span>
                  <span className="ml-auto text-xs text-gray-400">
                    {file.content ? `${file.content.length} chars` : "Empty"}
                  </span>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-8 text-center text-gray-400">
              <div className="text-lg mb-2">No files found</div>
              <div className="text-sm">Try a different search term</div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <div className="text-lg mb-2">🔍 Quick File Search</div>
              <div className="text-sm">Start typing to search for files</div>
              <div className="text-xs mt-2 opacity-70">
                Press Escape to close
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#3c3c3c] text-xs text-gray-500 flex justify-between">
          <span>↑↓ Navigate</span>
          <span>Enter to open</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};

export default FileSearch;
