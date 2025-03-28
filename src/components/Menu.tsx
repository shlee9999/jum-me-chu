import {
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { TMenu } from '../types/menu';
import { CSSProperties } from 'react';

interface MenuItemProps {
  provided: DraggableProvided;
  item: TMenu;
}

export const MenuItem = ({ provided, item }: MenuItemProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: 'none',
        padding: '10px',
        margin: '0 0 8px 0',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        ...provided.draggableProps.style,
      }}
    >
      {item.option}
    </div>
  );
};

interface MenuProps {
  provided: DroppableProvided;
  menuOptions: TMenu[];
  style: CSSProperties;
  droppableId: string;
}

export const Menu = ({
  provided,
  menuOptions,
  style,
  droppableId,
}: MenuProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      style={{
        minHeight: '300px',
        padding: '10px',
        borderRadius: '8px',
        ...style,
      }}
    >
      {menuOptions.map((item, index) => (
        <Draggable
          key={`${droppableId}-${item.option}`}
          draggableId={`${droppableId}-${item.option}`}
          index={index}
        >
          {(provided) => <MenuItem item={item} provided={provided} />}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};
