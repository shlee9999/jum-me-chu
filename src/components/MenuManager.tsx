import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMenuManager } from '../hooks/useMenuManager';
import { useMenuStore } from '../store/menuStore';
import { Menu } from './Menu';

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
    <div className='flex flex-col items-center w-full mt-8'>
      {/* Header Section */}
      <div className='flex justify-between w-full max-w-4xl mb-6'>
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
          className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition'
        >
          초기화
        </button>
        <button
          onClick={() => shuffleActiveMenus()}
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition'
        >
          셔플
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex justify-center gap-10 w-full max-w-4xl'>
          {/* Active Menus Section */}
          <div className='w-full'>
            <h3 className='text-center text-blue-600 font-bold text-lg mb-4'>
              맛집 리스트
            </h3>
            <Droppable droppableId='active'>
              {(provided) => (
                <Menu
                  menuOptions={activeMenus}
                  provided={provided}
                  className='bg-blue-100 border border-blue-400 shadow-lg rounded-lg p-4'
                  droppableId='active'
                />
              )}
            </Droppable>
            <button
              onClick={() => {
                const isAllowed = confirm(
                  '맛집 리스트가 모두 삭제되며, 복구할 수 없습니다. 삭제하시겠습니까?'
                );
                if (isAllowed) initActiveMenu();
              }}
              className='mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition'
            >
              전부 비우기
            </button>
          </div>

          {/* Inactive Menus Section */}
          <div className='w-full'>
            <h3 className='text-center text-red-600 font-bold text-lg mb-4'>
              오늘은 안갈래
            </h3>
            <Droppable droppableId='inactive'>
              {(provided) => (
                <Menu
                  menuOptions={inactiveMenus}
                  provided={provided}
                  className='bg-red-100 border border-red-400 shadow-lg rounded-lg p-4'
                  droppableId='inactive'
                />
              )}
            </Droppable>
            <button
              onClick={() => {
                const isAllowed = confirm(
                  '오늘 안갈래가 모두 삭제되며, 복구할 수 없습니다. 삭제하시겠습니까?'
                );
                if (isAllowed) initInactiveMenu();
              }}
              className='mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition'
            >
              전부 비우기
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};
