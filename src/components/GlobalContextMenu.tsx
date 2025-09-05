import { useGlobalContextMenu } from "../hooks/useContextMenu";

const GlobalContextMenu = () => {
  const { contextMenu, hideContextMenu } = useGlobalContextMenu();

  if (!contextMenu?.isVisible) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={hideContextMenu}>
      <ul
        className="absolute z-10 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2"
        style={{
          left: contextMenu.position.x,
          top: contextMenu.position.y,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {contextMenu.options.map((option, index) => (
          <li
            key={index}
            className={`text-gray-400 px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm flex items-center ${
              option.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (!option.disabled) {
                option.action();
                hideContextMenu();
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

export default GlobalContextMenu;
