import {
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { TMenu } from '../types/menu';
import { cn } from '../utils/cn';
import { useMenuStore } from '../store/menuStore';
import { TDroppableId } from '../types/dnd';
interface MenuItemProps {
  provided: DraggableProvided;
  item: TMenu;
  type: TDroppableId;
}

export const MenuItem = ({ provided, item, type }: MenuItemProps) => {
  const {
    editActiveMenu,
    removeActiveMenu,
    editInactiveMenu,
    removeInactiveMenu,
    addActiveMenu,
    addInactiveMenu,
  } = useMenuStore(); // Access Zustand store actions and state

  const editMenu = type === 'active' ? editActiveMenu : editInactiveMenu;
  const removeMenu = type === 'active' ? removeActiveMenu : removeInactiveMenu;
  const addAnotherMenu = type === 'active' ? addInactiveMenu : addActiveMenu;

  // Handle edit action
  const handleEdit = () => {
    const newLabel = prompt('메뉴 이름 바꾸기', item.option); // Prompt for new label
    if (newLabel) {
      editMenu({ ...item, option: newLabel });
    }
  };

  // Handle delete action
  const handleDelete = () => {
    if (confirm(`정말 "${item.option}"을(를) 삭제하시겠어요?`)) {
      removeMenu(item.id);
    }
  };

  // Handle menu item click to move to the opposite menu
  const onClickMenu = () => {
    removeMenu(item.id);
    addAnotherMenu(item);
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        ...provided.draggableProps.style,
      }}
      className={cn(
        'select-none p-[10px] mb-2 bg-white rounded-[4px] flex justify-between items-center',
        'transition-all duration-200 hover:bg-gray-50 hover:scale-[1.02] hover:shadow-md cursor-pointer'
      )}
      onClick={onClickMenu} // Attach onClick handler
    >
      <span>{item.option}</span>
      <div className='flex gap-2'>
        {/* Edit button */}
        <button
          onClick={handleEdit}
          className='text-blue-500 hover:text-blue-700 transition-colors duration-200'
          aria-label='Edit menu'
        >
          ✏️
        </button>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className='text-red-500 hover:text-red-700 transition-colors duration-200'
          aria-label='Delete menu'
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

interface MenuProps {
  provided: DroppableProvided;
  menuOptions: TMenu[];
  droppableId: TDroppableId;
  className: string;
}

export const MenuList = ({
  provided,
  menuOptions,
  droppableId,
  className,
}: MenuProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={cn('h-[500px] p-[10px] rounded-lg overflow-auto', className)}
    >
      {menuOptions.map((item, index) => (
        <Draggable
          key={`${droppableId}-${item.option}`}
          draggableId={`${droppableId}-${item.option}`}
          index={index}
        >
          {(provided) => (
            <MenuItem item={item} provided={provided} type={droppableId} />
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};
