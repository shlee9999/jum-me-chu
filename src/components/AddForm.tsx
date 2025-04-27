import { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { cn } from '../utils/cn';
import { v4 } from 'uuid';

export const AddForm = () => {
  const { addActiveMenu } = useMenuStore();

  const [inputValue, setInputValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addActiveMenu({ option: inputValue, id: v4() });
      setInputValue('');
    }
  };

  return (
    <form onSubmit={onSubmit} className='mt-8 flex gap-3 w-full max-w-md'>
      <input
        type='text'
        onChange={onChange}
        value={inputValue}
        placeholder='새 메뉴 입력'
        className={cn(
          'flex-1 px-4 py-2.5 rounded-lg border border-gray-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all duration-200',
          'placeholder:text-gray-400'
        )}
      />
      <button
        className={cn(
          'px-6 py-2.5 bg-primary-600 text-white',
          'rounded-lg cursor-pointer shadow-md',
          'hover:bg-primary-700 transition-all',
          'transform hover:scale-105 active:scale-95',
          'disabled:bg-gray-400 disabled:cursor-not-allowed'
        )}
        disabled={!inputValue.trim()}
      >
        추가
      </button>
    </form>
  );
};
