import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { backgroundColors } from '../constants/colors';
import { useMenuStore } from '../store/menuStore';
import { cn } from '../utils/cn';

interface RouletteProps {
  onSpinningChange?: (isSpinning: boolean) => void;
}

export const Roulette = ({ onSpinningChange }: RouletteProps) => {
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);
  const { activeMenus } = useMenuStore();

  const handleSpinClick = () => {
    if (!mustSpin && activeMenus.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * activeMenus.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      onSpinningChange?.(true);
    }
  };

  return (
    <div className='flex flex-col items-center'>
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
        outerBorderColor='#e2e8f0'
        outerBorderWidth={8}
        innerBorderColor='#f8fafc'
        innerBorderWidth={4}
        radiusLineColor='#e2e8f0'
        radiusLineWidth={1}
        fontSize={16}
        textDistance={60}
        onStopSpinning={() => {
          setMustSpin(false);
          onSpinningChange?.(false);
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
          'mt-6 px-6 py-3 text-lg font-semibold bg-primary-600 text-white',
          'rounded-lg cursor-pointer shadow-md hover:bg-primary-700 transition-all',
          'disabled:bg-gray-400 disabled:cursor-not-allowed',
          'transform hover:scale-105 active:scale-95'
        )}
        disabled={!activeMenus.length || mustSpin}
      >
        {mustSpin ? '돌리는 중...' : '룰렛 돌리기'}
      </button>
    </div>
  );
};
