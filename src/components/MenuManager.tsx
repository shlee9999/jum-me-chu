import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMenuManager } from '../hooks/useMenuManager';
import { useMenuStore } from '../store/menuStore';
import { Menu } from './Menu';
import { cn } from '../utils/cn';

export const MenuManager = () => {
  const { onDragEnd } = useMenuManager();
  const {
    activeMenus,
    inactiveMenus,
    initActiveMenu,
    initInactiveMenu,
    shuffleActiveMenus,
  } = useMenuStore();

  return (
    <div className='flex flex-col items-center w-full mt-12 px-4'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row justify-between w-full max-w-6xl mb-8 gap-4'>
        <div className='flex gap-4'>
          <button
            onClick={() => {
              const isAllowed = confirm(
                '모든 리스트가 첫 방문 시로 돌아가며, 복구할 수 없습니다. 정말 초기화하시겠습니까? '
              );
              if (isAllowed) {
                localStorage.clear();
                location.reload();
              }
            }}
            className={cn(
              'px-5 py-2.5 bg-gray-700 text-white',
              'rounded-lg shadow-md hover:bg-gray-600',
              'transition-all transform hover:scale-105 active:scale-95',
              'w-full sm:w-auto'
            )}
          >
            초기화
          </button>
          <button
            onClick={() => shuffleActiveMenus()}
            className={cn(
              'px-5 py-2.5 bg-primary-600 text-white',
              'rounded-lg shadow-md hover:bg-primary-700',
              'transition-all transform hover:scale-105 active:scale-95',
              'w-full sm:w-auto'
            )}
          >
            셔플
          </button>
        </div>
      </div>

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
                <Menu
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
                <Menu
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
