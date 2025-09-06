// Type override for @hello-pangea/dnd to resolve React type conflicts
declare module "@hello-pangea/dnd" {
  import * as React from "react";
  
  export interface DroppableProps {
    droppableId: string;
    direction?: "vertical" | "horizontal";
    children: (provided: any, snapshot?: any) => React.ReactElement;
  }
  
  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: any, snapshot?: any) => React.ReactElement;
  }
  
  export const DragDropContext: React.ComponentType<{
    onDragEnd: (result: any) => void;
    children: React.ReactNode;
  }>;
  
  export const Droppable: React.ComponentType<DroppableProps>;
  export const Draggable: React.ComponentType<DraggableProps>;
}
