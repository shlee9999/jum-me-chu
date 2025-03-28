import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Wheel } from 'react-custom-roulette';
import { Menu } from './components/Menu';
import { menuOptions } from './constants/matzib-list';
import { TMenu } from './types/menu';

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
      style={{
        minHeight: '100vh',
        backgroundColor: 'aliceblue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
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
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#64b031',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        SPIN
      </button>
      <form
        onSubmit={onSubmit}
        style={{
          margin: '20px 0',
          display: 'flex',
          gap: '10px',
        }}
      >
        <input
          type='text'
          onChange={onChange}
          value={inputValue}
          placeholder='새 메뉴 입력'
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          style={{
            padding: '8px 15px',
            backgroundColor: '#175fa9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          추가
        </button>
      </form>

      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ width: '40%' }}>
            <h3 style={{ textAlign: 'center', color: '#175fa9' }}>
              맛집 리스트
            </h3>
            <Droppable droppableId='active'>
              {(provided) => (
                <Menu
                  menuOptions={activeMenuOptions}
                  provided={provided}
                  style={{
                    backgroundColor: '#e6f7ff',
                    border: '1px solid #175fa9',
                  }}
                  droppableId='active'
                />
              )}
            </Droppable>
          </div>

          <div style={{ width: '40%' }}>
            <h3 style={{ textAlign: 'center', color: '#dc0936' }}>
              오늘은 안갈래
            </h3>
            <Droppable droppableId='inactive'>
              {(provided) => (
                <Menu
                  menuOptions={inactiveMenuOptions}
                  provided={provided}
                  style={{
                    backgroundColor: '#ffebeb',
                    border: '1px solid #dc0936',
                  }}
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
