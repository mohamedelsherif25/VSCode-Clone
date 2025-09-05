import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFileAction,
  setOpenedTabsAction,
  setTabIdToRemoveAction,
  toggleTabPinAction,
} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { ITab } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { useThemeColors } from "../hooks/useThemeColors";

interface IProps {
  file: ITab;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const colors = useThemeColors();
  const [previewTimeout, setPreviewTimeout] = useState<number | null>(null);

  const { openedTabs } = useSelector((state: RootState) => state.tree);

  // ** Handlers
  const onClick = () => {
    const { id, name, content } = file;
    // Update all tabs to set isActive correctly
    const updatedTabs = openedTabs.map((tab) => ({
      ...tab,
      isActive: tab.id === id,
    }));
    dispatch(setOpenedTabsAction(updatedTabs));
    dispatch(
      setClickedFileAction({
        filename: name,
        fileContent: content,
        activeTabId: id,
      })
    );
  };

  const onRemove = (selectedId: string) => {
    const filtered = openedTabs.filter((tab) => tab.id !== selectedId);
    const lastTab = filtered[filtered.length - 1];

    if (!lastTab) {
      dispatch(setOpenedTabsAction([]));
      dispatch(
        setClickedFileAction({
          activeTabId: null,
          fileContent: "",
          filename: "",
        })
      );
      return;
    }

    // Set the last tab as active
    const updatedTabs = filtered.map((tab) => ({
      ...tab,
      isActive: tab.id === lastTab.id,
    }));

    const { id, name, content } = lastTab;
    dispatch(setOpenedTabsAction(updatedTabs));
    dispatch(
      setClickedFileAction({
        activeTabId: id,
        fileContent: content,
        filename: name,
      })
    );
  };

  const onTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleTabPinAction(file.id));
  };

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowPreview(true);
    }, 500); // Show preview after 500ms hover
    setPreviewTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (previewTimeout) {
      clearTimeout(previewTimeout);
      setPreviewTimeout(null);
    }
    setShowPreview(false);
  };

  return (
    <div className="relative">
      <div
        className="max-w-screen-md flex items-center p-2 border-t-2 cursor-pointer transition-colors duration-150"
        style={{
          borderTopColor: file.isActive ? "#cf6ccf" : "transparent",
          backgroundColor: file.isActive
            ? colors.tabActive
            : file.isPinned
            ? colors.sidebarHover
            : "transparent",
          color: colors.textPrimary,
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
          handleMouseEnter();
          if (!file.isActive && !file.isPinned) {
            e.currentTarget.style.backgroundColor = colors.tabHover;
          }
        }}
        onMouseLeave={(e) => {
          handleMouseLeave();
          if (!file.isActive && !file.isPinned) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          dispatch(setTabIdToRemoveAction(file.id));
        }}
      >
        <RenderFileIcon filename={file.name} />

        {/* Pin indicator */}
        {file.isPinned && (
          <span className="text-xs mr-1" style={{ color: colors.accent }}>
            📌
          </span>
        )}

        {/* File name with edited indicator */}
        <span
          className="flex items-center mx-2 text-sm"
          style={{ color: colors.textPrimary }}
        >
          {file.name}
          {file.isEdited && (
            <span
              className="ml-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.textPrimary }}
            ></span>
          )}
        </span>

        {/* Pin/Unpin button (visible on hover or when pinned) */}
        <span
          className={`cursor-pointer duration-300 flex justify-center items-center w-fit mr-1 p-1 rounded-md text-xs ${
            file.isPinned ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{ color: colors.textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.sidebarHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={onTogglePin}
          title={file.isPinned ? "Unpin tab" : "Pin tab"}
        >
          📌
        </span>

        {/* Close button */}
        <span
          className="cursor-pointer duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md"
          style={{ color: colors.textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.sidebarHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(file.id);
          }}
          title="Close tab"
        >
          <CloseIcon />
        </span>
      </div>

      {/* Preview tooltip */}
      {showPreview && file.content && (
        <div
          className="absolute top-full left-0 z-50 border rounded shadow-lg p-2 max-w-md max-h-40 overflow-hidden"
          style={{
            backgroundColor: colors.tertiary,
            borderColor: colors.inputBorder,
            color: colors.textPrimary,
          }}
        >
          <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
            {file.name}
          </div>
          <pre
            className="text-xs whitespace-pre-wrap overflow-hidden"
            style={{ color: colors.textMuted }}
          >
            {file.content.substring(0, 200)}
            {file.content.length > 200 && "..."}
          </pre>
        </div>
      )}
    </div>
  );
};

export default OpenedFilesBarTab;
