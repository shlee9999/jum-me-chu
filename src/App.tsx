import { AddForm } from './components/AddForm';
import { MenuManager } from './components/MenuManager';
import { Roulette } from './components/Roulette';
import { useInitAnimationFrame } from './hooks/useInitAnimationFrame';
import { cn } from './utils/cn';

function App() {
  const { enabled } = useInitAnimationFrame();

  if (!enabled) return null;

  return (
    <>
      <header>
        <h1 className='font-sans text-gray-800 text-3xl font-bold mb-6 w-full text-center py-5'>
          점심 메뉴 룰렛 🎯
        </h1>
      </header>
      <main
        className={cn('min-h-screen flex flex-col justify-center items-center')}
      >
        <Roulette />
        <AddForm />
        <MenuManager />
      </main>
    </>
  );
}

export default App;
