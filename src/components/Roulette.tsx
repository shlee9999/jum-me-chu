import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { backgroundColors } from '../constants/colors';
import { useMenuStore } from '../store/menuStore';
import { cn } from '../utils/cn';

export const Roulette = () => {
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);
  const { activeMenus } = useMenuStore();

  const handleSpinClick = () => {
    if (!mustSpin && activeMenus.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * activeMenus.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    } else if (activeMenus.length === 0) {
      alert(
        '활성화된 메뉴가 없습니다. 메뉴를 추가하거나 비활성 메뉴를 활성화해주세요.'
      );
    }
  };
  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={activeMenus}
        backgroundColors={backgroundColors}
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
          if (activeMenus.length > 0) {
            alert(`오늘 점심은 ${activeMenus[prizeNumber].option}!`);
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
    </>
  );
};
