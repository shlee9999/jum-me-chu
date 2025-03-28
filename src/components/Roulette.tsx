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
    }
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={
          activeMenus.length
            ? activeMenus
            : [
                {
                  option: '',
                  style: {
                    backgroundColor: 'gray',
                  },
                },
              ]
        }
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
          'rounded-md cursor-pointer shadow-md hover:bg-green-600 transition-colors',
          'disabled:bg-gray-500 disabled:text-gray-400'
        )}
        disabled={!activeMenus.length}
      >
        SPIN
      </button>
    </>
  );
};
