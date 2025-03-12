import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export const Droppable = ({ id, children }: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? "rgba(0, 255, 0, 0.1)" : undefined,
    transition: "background-color 0.2s ease",
  };

  return (
    <div ref={setNodeRef} style={style} className="droppable-area">
      {children}
    </div>
  );
};
