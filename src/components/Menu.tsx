import {
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { TMenu } from '../types/menu';
import { cn } from '../utils/cn';

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
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        ...provided.draggableProps.style,
      }}
      className={cn('select-none p-[10px] mb-2 bg-white rounded-[4px] ')}
    >
      {item.option}
    </div>
  );
};

interface MenuProps {
  provided: DroppableProvided;
  menuOptions: TMenu[];
  droppableId: string;
  className: string;
}

export const Menu = ({
  provided,
  menuOptions,
  droppableId,
  className,
}: MenuProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={cn('min-h-[300px] p-[10px] rounded-lg', className)}
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
