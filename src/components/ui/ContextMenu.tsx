import { useRef, useEffect } from "react";
import {
  setOpenedFilesAction,
  setOpenedTabsAction,
} from "../../app/features/fileTreeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IContextMenuOption {
  label: string;
  action: () => void;
  icon?: string;
  disabled?: boolean;
}

interface IProps {
  setShowMenu: (val: boolean) => void;
  positions: {
    x: number;
    y: number;
  };
  options?: IContextMenuOption[];
}

const ContextMenu = ({ positions: { x, y }, setShowMenu, options }: IProps) => {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const { openedFiles, openedTabs, tabIdToRemove } = useSelector(
    (state: RootState) => state.tree
  );

  // ** Default Handlers
  const onCloseAll = () => {
    dispatch(setOpenedFilesAction([]));
    dispatch(setOpenedTabsAction([]));
    setShowMenu(false);
  };
  const onClose = () => {
    const filtered = openedFiles.filter((file) => file.id !== tabIdToRemove);
    const filteredTabs = openedTabs.filter((tab) => tab.id !== tabIdToRemove);
    dispatch(setOpenedFilesAction(filtered));
    dispatch(setOpenedTabsAction(filteredTabs));
    setShowMenu(false);
  };

  // Default options if none provided
  const defaultOptions: IContextMenuOption[] = [
    { label: "Close", action: onClose },
    { label: "Close All", action: onCloseAll },
  ];

  const menuOptions = options || defaultOptions;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div ref={menuRef}>
      <ul
        className="z-10 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        style={{
          position: "absolute",
          left: x,
          top: y,
        }}
      >
        {menuOptions.map((option, index) => (
          <li
            key={index}
            className={`text-gray-400 px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm flex items-center ${
              option.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            role="menuitem"
            onClick={() => {
              if (!option.disabled) {
                option.action();
                setShowMenu(false);
              }
            }}
          >
            {option.icon && <span className="mr-2">{option.icon}</span>}
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
