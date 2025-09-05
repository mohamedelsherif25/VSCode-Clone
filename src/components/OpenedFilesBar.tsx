import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { RootState } from "../app/store";
import OpenedFilesBarTab from "./OpenedFilesBarTab";
import {
  reorderTabsAction,
  closeAllTabsExceptActiveAction,
} from "../app/features/fileTreeSlice";
import { useContextMenu } from "../hooks/useContextMenu";
import { useThemeColors } from "../hooks/useThemeColors";

const OpenedFilesBar: React.FC = () => {
  const { openedTabs } = useSelector((state: RootState) => state.tree);
  const dispatch = useDispatch();
  const { showContextMenu } = useContextMenu();
  const colors = useThemeColors();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    dispatch(
      reorderTabsAction({
        startIndex: result.source.index,
        endIndex: result.destination.index,
      })
    );
  };

  const handleCloseAllExceptActive = () => {
    dispatch(closeAllTabsExceptActiveAction());
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    const options = [
      {
        label: "Close All Except Active",
        action: handleCloseAllExceptActive,
      },
    ];
    showContextMenu(e, options);
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tabs" direction="horizontal">
          {(provided) => (
            <div
              className="flex items-center border-b-[1px] overflow-x-auto"
              style={{
                borderColor: colors.tabBorder,
                backgroundColor: colors.tabInactive,
              }}
              onContextMenu={handleContextMenu}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {openedTabs.map((tab, index) => (
                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? "opacity-50" : ""}`}
                    >
                      <OpenedFilesBarTab file={tab} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default OpenedFilesBar;
