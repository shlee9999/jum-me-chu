import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Wheel } from 'react-custom-roulette';
import { Menu } from './components/Menu';
import { menuOptions } from './constants/matzib-list';
import { TMenu } from './types/menu';
import { cn } from './utils/cn';
import './styles/global.css';

function App() {
  // 활성 메뉴와 비활성 메뉴를 분리하여 상태 관리
  const [activeMenuOptions, setActiveMenuOptions] = useState<TMenu[]>(() => {
    const savedMenus = localStorage.getItem('activeMenuOptions');
    return savedMenus ? JSON.parse(savedMenus) : menuOptions;
  });

  const [inactiveMenuOptions, setInactiveMenuOptions] = useState<TMenu[]>(
    () => {
      const savedInactiveMenus = localStorage.getItem('inactiveMenuOptions');
      return savedInactiveMenus ? JSON.parse(savedInactiveMenus) : [];
    }
  );

  const [inputValue, setInputValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const [enabled, setEnabled] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin && activeMenuOptions.length > 0) {
      const newPrizeNumber = Math.floor(
        Math.random() * activeMenuOptions.length
      );
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    } else if (activeMenuOptions.length === 0) {
      alert(
        '활성화된 메뉴가 없습니다. 메뉴를 추가하거나 비활성 메뉴를 활성화해주세요.'
      );
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setActiveMenuOptions((prev) => [...prev, { option: inputValue }]);
      setInputValue('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // 드롭 위치가 없으면 아무 작업도 하지 않음
    if (!destination) return;

    // 같은 위치에 드롭한 경우 아무 작업도 하지 않음
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // 활성 목록 내에서 순서 변경
    if (
      source.droppableId === 'active' &&
      destination.droppableId === 'active'
    ) {
      const newActiveMenus = Array.from(activeMenuOptions);
      const [movedItem] = newActiveMenus.splice(source.index, 1);
      newActiveMenus.splice(destination.index, 0, movedItem);
      setActiveMenuOptions(newActiveMenus);
    }
    // 비활성 목록 내에서 순서 변경
    else if (
      source.droppableId === 'inactive' &&
      destination.droppableId === 'inactive'
    ) {
      const newInactiveMenus = Array.from(inactiveMenuOptions);
      const [movedItem] = newInactiveMenus.splice(source.index, 1);
      newInactiveMenus.splice(destination.index, 0, movedItem);
      setInactiveMenuOptions(newInactiveMenus);
    }
    // 활성 -> 비활성으로 이동
    else if (
      source.droppableId === 'active' &&
      destination.droppableId === 'inactive'
    ) {
      const newActiveMenus = Array.from(activeMenuOptions);
      const newInactiveMenus = Array.from(inactiveMenuOptions);
      const [movedItem] = newActiveMenus.splice(source.index, 1);
      newInactiveMenus.splice(destination.index, 0, movedItem);
      setActiveMenuOptions(newActiveMenus);
      setInactiveMenuOptions(newInactiveMenus);
    }
    // 비활성 -> 활성으로 이동
    else if (
      source.droppableId === 'inactive' &&
      destination.droppableId === 'active'
    ) {
      const newActiveMenus = Array.from(activeMenuOptions);
      const newInactiveMenus = Array.from(inactiveMenuOptions);
      const [movedItem] = newInactiveMenus.splice(source.index, 1);
      newActiveMenus.splice(destination.index, 0, movedItem);
      setActiveMenuOptions(newActiveMenus);
      setInactiveMenuOptions(newInactiveMenus);
    }
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'activeMenuOptions',
      JSON.stringify(activeMenuOptions)
    );
    localStorage.setItem(
      'inactiveMenuOptions',
      JSON.stringify(inactiveMenuOptions)
    );
  }, [activeMenuOptions, inactiveMenuOptions]);

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
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={activeMenuOptions}
        backgroundColors={[
          '#3f297e',
          '#175fa9',
          '#169ed8',
          '#239b63',
          '#64b031',
          '#efe61f',
          '#f7a416',
          '#e6471d',
          '#dc0936',
          '#e5177b',
          '#be1180',
          '#871f7f',
        ]}
        textColors={['#ffffff']}
        outerBorderColor='#000'
        outerBorderWidth={10}
        innerBorderColor='#fff'
        innerBorderWidth={5}
        radiusLineColor='#ddd'
        radiusLineWidth={2}
        fontSize={18}
        textDistance={60}
        onStopSpinning={() => {
          setMustSpin(false);
          if (activeMenuOptions.length > 0) {
            alert(`오늘 점심은 ${activeMenuOptions[prizeNumber].option}!`);
          }
        }}
        disableInitialAnimation
        spinDuration={0.5}
      />
      <button
        onClick={handleSpinClick}
        className={cn(
          'mt-5 px-5 py-2.5 text-lg font-bold bg-green-500 text-white border-none',
          'rounded-md cursor-pointer shadow-md hover:bg-green-600 transition-colors'
        )}
      >
        SPIN
      </button>
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
                  menuOptions={activeMenuOptions}
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
                  menuOptions={inactiveMenuOptions}
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
