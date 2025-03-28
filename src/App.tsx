import { AddForm } from './components/AddForm';
import { MenuManager } from './components/MenuManager';
import { Roulette } from './components/Roulette';
import { useInitAnimationFrame } from './hooks/useInitAnimationFrame';
import { cn } from './utils/cn';

function App() {
  const { enabled } = useInitAnimationFrame();

  if (!enabled) return null;

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
      <AddForm />
      <MenuManager />
    </div>
  );
}

export default App;
