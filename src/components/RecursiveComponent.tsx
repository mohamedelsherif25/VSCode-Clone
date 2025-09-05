import { useState } from "react";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import BottomArrowIcon from "./SVG/Bottom";
import RightArrowIcon from "./SVG/Right";
import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFileAction,
  setOpenedFilesAction,
  setOpenedTabsAction,
  setFileTreeAction,
} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { doesFileObjectExist } from "../utils/functions";
import {
  createNewFile,
  addFileToTree,
  removeFileFromTree,
  renameFileInTree,
} from "../utils/fileOperations";
import { useContextMenu } from "../hooks/useContextMenu";
import { useThemeColors } from "../hooks/useThemeColors";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id, name, isFolder, children, content } = fileTree;
  const dispatch = useDispatch();
  const {
    openedFiles,
    openedTabs,
    fileTree: rootFileTree,
  } = useSelector((state: RootState) => state.tree);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const { showContextMenu } = useContextMenu();
  const colors = useThemeColors();

  // ** Handlers
  const toggle = () => setIsOpen((prev) => !prev);

  const onFileClicked = () => {
    // Only open file in editor, no context menu
    if (!isFolder) {
      const exists = doesFileObjectExist(openedFiles, id);

      // Check if file is already in tabs
      const existingTab = openedTabs.find((tab) => tab.id === id);

      if (existingTab) {
        // Update active tab
        const updatedTabs = openedTabs.map((tab) => ({
          ...tab,
          isActive: tab.id === id,
        }));
        dispatch(setOpenedTabsAction(updatedTabs));
      } else {
        // Add new tab
        const newTab = {
          ...fileTree,
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
          filename: name,
          fileContent: content,
          activeTabId: id,
        })
      );

      if (!exists) {
        dispatch(setOpenedFilesAction([...openedFiles, fileTree]));
      }
    }
  };

  const onFolderClicked = () => {
    // Only toggle the folder, no context menu
    toggle();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    const contextMenuOptions = [
      { label: "New File", action: handleCreateFile, icon: "📄" },
      { label: "New Folder", action: handleCreateFolder, icon: "📁" },
      { label: "Rename", action: handleRename, icon: "✏️" },
      { label: "Delete", action: handleDelete, icon: "🗑️" },
    ];

    showContextMenu(e, contextMenuOptions);
  };

  const handleCreateFile = () => {
    if (rootFileTree) {
      const targetId = isFolder ? id : findParentId(rootFileTree, id);
      if (targetId) {
        const newFile = createNewFile(targetId, "new-file.txt", false);
        const updatedTree = addFileToTree(rootFileTree, targetId, newFile);
        dispatch(setFileTreeAction(updatedTree));
      }
    }
  };

  const handleCreateFolder = () => {
    if (rootFileTree) {
      const targetId = isFolder ? id : findParentId(rootFileTree, id);
      if (targetId) {
        const newFolder = createNewFile(targetId, "new-folder", true);
        const updatedTree = addFileToTree(rootFileTree, targetId, newFolder);
        dispatch(setFileTreeAction(updatedTree));
      }
    }
  };

  const handleDelete = () => {
    if (
      rootFileTree &&
      window.confirm(`Are you sure you want to delete "${name}"?`)
    ) {
      const updatedTree = removeFileFromTree(rootFileTree, id);
      dispatch(setFileTreeAction(updatedTree));

      // Remove from opened files/tabs if open
      const filteredFiles = openedFiles.filter((file) => file.id !== id);
      const filteredTabs = openedTabs.filter((tab) => tab.id !== id);
      dispatch(setOpenedFilesAction(filteredFiles));
      dispatch(setOpenedTabsAction(filteredTabs));
    }
  };

  const handleRename = () => {
    setIsRenaming(true);
    setNewName(name);
  };

  const handleRenameSubmit = () => {
    if (rootFileTree && newName.trim() && newName !== name) {
      const updatedTree = renameFileInTree(rootFileTree, id, newName.trim());
      dispatch(setFileTreeAction(updatedTree));

      // Update opened files/tabs if open
      const updatedFiles = openedFiles.map((file) =>
        file.id === id ? { ...file, name: newName.trim() } : file
      );
      const updatedTabsRenamed = openedTabs.map((tab) =>
        tab.id === id ? { ...tab, name: newName.trim() } : tab
      );
      dispatch(setOpenedFilesAction(updatedFiles));
      dispatch(setOpenedTabsAction(updatedTabsRenamed));
    }
    setIsRenaming(false);
  };

  const handleRenameCancel = () => {
    setIsRenaming(false);
    setNewName(name);
  };

  // Helper function to find parent ID
  const findParentId = (tree: IFile, targetId: string): string | null => {
    if (tree.children) {
      for (const child of tree.children) {
        if (child.id === targetId) {
          return tree.id;
        }
        const found = findParentId(child, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className="w-full mb-1 ml-1 cursor-pointer min-w-0">
      <div className="flex items-center mb-1 min-w-0">
        {isFolder ? (
          <div
            onClick={onFolderClicked}
            onContextMenu={handleContextMenu}
            className="flex items-center p-1 rounded min-w-0 transition-colors duration-150"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span className="mr-2">
              {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            </span>
            <RenderFileIcon filename={name} isFolder isOpen={isOpen} />
            {isRenaming ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.inputBorder;
                  handleRenameSubmit();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit();
                  if (e.key === "Escape") handleRenameCancel();
                }}
                className="ml-2 text-lg border rounded px-1"
                style={{
                  backgroundColor: colors.input,
                  color: colors.textPrimary,
                  borderColor: colors.inputBorder,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.inputFocus;
                }}
                autoFocus
              />
            ) : (
              <span
                className="ml-2 text-lg truncate flex-1 min-w-0"
                style={{ color: colors.textPrimary }}
              >
                {name}
              </span>
            )}
          </div>
        ) : (
          <div
            className="flex items-center ml-6 p-1 rounded min-w-0 transition-colors duration-150"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onClick={onFileClicked}
            onContextMenu={handleContextMenu}
          >
            <RenderFileIcon filename={name} />
            {isRenaming ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.inputBorder;
                  handleRenameSubmit();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit();
                  if (e.key === "Escape") handleRenameCancel();
                }}
                className="ml-2 text-lg border rounded px-1"
                style={{
                  backgroundColor: colors.input,
                  color: colors.textPrimary,
                  borderColor: colors.inputBorder,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.inputFocus;
                }}
                autoFocus
              />
            ) : (
              <span
                className="ml-2 text-lg truncate flex-1 min-w-0"
                style={{ color: colors.textPrimary }}
              >
                {name}
              </span>
            )}
          </div>
        )}
      </div>

      {isOpen &&
        children &&
        children.map((file, idx) => (
          <RecursiveComponent fileTree={file} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
