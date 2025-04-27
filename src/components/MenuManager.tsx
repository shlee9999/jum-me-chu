import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMenuManager } from '../hooks/useMenuManager';
import { useMenuStore } from '../store/menuStore';
import { MenuList } from './MenuList';
import { cn } from '../utils/cn';

export const MenuManager = () => {
  const { onDragEnd } = useMenuManager();
  const { activeMenus, inactiveMenus, initActiveMenu, initInactiveMenu } =
    useMenuStore();

  return (
    <div className='flex flex-col mt-4 w-full px-4'>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl'>
          {/* Active Menus Section */}
          <div className='w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-primary-600 font-semibold text-lg'>
                맛집 리스트
              </h3>
              <button
                onClick={() => {
                  const isAllowed = confirm(
                    '맛집 리스트가 모두 삭제되며, 복구할 수 없습니다. 삭제하시겠습니까?'
                  );
                  if (isAllowed) initActiveMenu();
                }}
                className={cn(
                  'px-4 py-1.5 bg-red-600 text-white text-sm',
                  'rounded-lg shadow-md hover:bg-red-700',
                  'transition-all transform hover:scale-105 active:scale-95'
                )}
              >
                전부 비우기
              </button>
            </div>
            <Droppable droppableId='active'>
              {(provided) => (
                <MenuList
                  menuOptions={activeMenus}
                  provided={provided}
                  className='bg-primary-50 border border-primary-200 shadow-lg rounded-lg p-6 min-h-[300px]'
                  droppableId='active'
                />
              )}
            </Droppable>
          </div>

          {/* Inactive Menus Section */}
          <div className='w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-red-600 font-semibold text-lg'>
                오늘은 안갈래
              </h3>
              <button
                onClick={() => {
                  const isAllowed = confirm(
                    '오늘 안갈래가 모두 삭제되며, 복구할 수 없습니다. 삭제하시겠습니까?'
                  );
                  if (isAllowed) initInactiveMenu();
                }}
                className={cn(
                  'px-4 py-1.5 bg-red-600 text-white text-sm',
                  'rounded-lg shadow-md hover:bg-red-700',
                  'transition-all transform hover:scale-105 active:scale-95'
                )}
              >
                전부 비우기
              </button>
            </div>
            <Droppable droppableId='inactive'>
              {(provided) => (
                <MenuList
                  menuOptions={inactiveMenus}
                  provided={provided}
                  className='bg-red-50 border border-red-200 shadow-lg rounded-lg p-6 min-h-[300px]'
                  droppableId='inactive'
                />
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};
