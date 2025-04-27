import { MenuModal } from './components/MenuModal';
import { Roulette } from './components/Roulette';
import { useInitAnimationFrame } from './hooks/useInitAnimationFrame';
import { useMenuStore } from './store/menuStore';
import { cn } from './utils/cn';
import { useState } from 'react';

function App() {
  const { enabled } = useInitAnimationFrame();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const { shuffleActiveMenus } = useMenuStore();

  if (!enabled) return null;

  return (
    <div className='bg-background text-foreground flex flex-col justify-center h-screen'>
      <div className='container mx-auto'>
        <header className='flex justify-between items-center mb-10 relative'>
          <div className='w-24'></div>
          <h1 className='text-3xl font-bold text-primary-600 absolute left-1/2 transform -translate-x-1/2 lg:text-4xl'>
            점심 메뉴 룰렛 🎯
          </h1>
          <div className='flex gap-2'>
            <button
              onClick={() => shuffleActiveMenus()}
              className={cn(
                'p-2 bg-primary-600 text-white',
                'rounded-lg shadow-md hover:bg-primary-700',
                'transition-all transform hover:scale-105 active:scale-95',
                'disabled:bg-gray-400 disabled:cursor-not-allowed'
              )}
              disabled={isSpinning}
              title='셔플'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <button
              onClick={() => setIsMenuModalOpen(true)}
              className={cn(
                'p-2 lg:px-4 lg:py-2 bg-primary-600 text-white',
                'rounded-lg shadow-md hover:bg-primary-700',
                'transition-all transform hover:scale-105 active:scale-95',
                'flex items-center gap-2',
                'disabled:bg-gray-400 disabled:cursor-not-allowed'
              )}
              disabled={isSpinning}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='hidden lg:block'>메뉴 관리</span>
            </button>
          </div>
        </header>
        <main className={cn('flex flex-col justify-center items-center')}>
          <Roulette onSpinningChange={setIsSpinning} />
        </main>
      </div>
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </div>
  );
}

export default App;
