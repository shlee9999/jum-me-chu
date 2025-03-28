import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Menu } from './components/Menu';
import { cn } from './utils/cn';
import { Roulette } from './components/Roulette';
import { useMenuStore } from './store/menuStore';

function App() {
  const {
    activeMenus,
    inactiveMenus,
    setActiveMenus,
    setInactiveMenus,
    addActiveMenu,
  } = useMenuStore();

  const [inputValue, setInputValue] = useState('');
  const [enabled, setEnabled] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addActiveMenu({ option: inputValue });
      setInputValue('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (
      source.droppableId === 'active' &&
      destination.droppableId === 'active'
    ) {
      const newActiveMenus = Array.from(activeMenus);
      const [movedItem] = newActiveMenus.splice(source.index, 1);
      newActiveMenus.splice(destination.index, 0, movedItem);
      setActiveMenus(newActiveMenus);
    } else if (
      source.droppableId === 'inactive' &&
      destination.droppableId === 'inactive'
    ) {
      const newInactiveMenus = Array.from(inactiveMenus);
      const [movedItem] = newInactiveMenus.splice(source.index, 1);
      newInactiveMenus.splice(destination.index, 0, movedItem);
      setInactiveMenus(newInactiveMenus);
    } else if (
      source.droppableId === 'active' &&
      destination.droppableId === 'inactive'
    ) {
      const newActiveMenus = Array.from(activeMenus);
      const newInactiveMenus = Array.from(inactiveMenus);
      const [movedItem] = newActiveMenus.splice(source.index, 1);
      newInactiveMenus.splice(destination.index, 0, movedItem);
      setActiveMenus(newActiveMenus);
      setInactiveMenus(newInactiveMenus);
    } else if (
      source.droppableId === 'inactive' &&
      destination.droppableId === 'active'
    ) {
      const newActiveMenus = Array.from(activeMenus);
      const newInactiveMenus = Array.from(inactiveMenus);
      const [movedItem] = newInactiveMenus.splice(source.index, 1);
      newActiveMenus.splice(destination.index, 0, movedItem);
      setInactiveMenus(newInactiveMenus);
      setActiveMenus(newActiveMenus);
    }
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div
      className={cn(
        'min-h-screen bg-blue-50 flex flex-col justify-center items-center p-5'
      )}
    >
      <h1 className='font-sans text-gray-800 text-3xl font-bold mb-6'>
        점심 메뉴 룰렛 🎯
      </h1>
      <Roulette />

      <form onSubmit={onSubmit} className='mt-5 flex gap-2.5'>
        <input
          type='text'
          onChange={onChange}
          value={inputValue}
          placeholder='새 메뉴 입력'
          className='p-2 rounded-md border border-gray-300'
        />
        <button
          className={cn(
            'px-4 py-2 bg-blue-600 text-white border-none rounded-md cursor-pointer',
            'hover:bg-blue-700 transition-colors'
          )}
        >
          추가
        </button>
      </form>

      <div className='flex w-full justify-center gap-10 mt-6'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='w-2/5'>
            <h3 className='text-center text-blue-600 font-semibold mb-3'>
              맛집 리스트
            </h3>
            <Droppable droppableId='active'>
              {(provided) => (
                <Menu
                  menuOptions={activeMenus}
                  provided={provided}
                  className='bg-blue-100 border border-blue-600 rounded-md p-3'
                  droppableId='active'
                />
              )}
            </Droppable>
          </div>

          <div className='w-2/5'>
            <h3 className='text-center text-red-600 font-semibold mb-3'>
              오늘은 안갈래
            </h3>
            <Droppable droppableId='inactive'>
              {(provided) => (
                <Menu
                  menuOptions={inactiveMenus}
                  provided={provided}
                  className='bg-red-100 border border-red-600 rounded-md p-3'
                  droppableId='inactive'
                />
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
