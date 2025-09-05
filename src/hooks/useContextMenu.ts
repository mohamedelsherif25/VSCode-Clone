import { useState, useEffect, useCallback } from "react";

interface ContextMenuState {
  isVisible: boolean;
  position: { x: number; y: number };
  options: Array<{
    label: string;
    action: () => void;
    icon?: string;
    disabled?: boolean;
  }>;
}

let globalContextMenuSetter: ((state: ContextMenuState | null) => void) | null =
  null;

export const useGlobalContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  useEffect(() => {
    globalContextMenuSetter = setContextMenu;
    return () => {
      globalContextMenuSetter = null;
    };
  }, []);

  const hideContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      hideContextMenu();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hideContextMenu();
      }
    };

    if (contextMenu?.isVisible) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [contextMenu?.isVisible, hideContextMenu]);

  return {
    contextMenu,
    hideContextMenu,
  };
};

export const useContextMenu = () => {
  const showContextMenu = useCallback(
    (
      e: React.MouseEvent,
      options: Array<{
        label: string;
        action: () => void;
        icon?: string;
        disabled?: boolean;
      }>
    ) => {
      // Prevent the default browser context menu
      e.preventDefault();
      e.stopPropagation();

      // Close any existing context menu first
      if (globalContextMenuSetter) {
        globalContextMenuSetter(null);

        // Small delay to ensure the previous menu is closed before opening new one
        setTimeout(() => {
          if (globalContextMenuSetter) {
            globalContextMenuSetter({
              isVisible: true,
              position: { x: e.clientX, y: e.clientY },
              options,
            });
          }
        }, 0);
      }
    },
    []
  );

  return { showContextMenu };
};
