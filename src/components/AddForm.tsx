import { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { cn } from '../utils/cn';

export const AddForm = () => {
  const { addActiveMenu, activeMenus, inactiveMenus } = useMenuStore();

  const [inputValue, setInputValue] = useState('');

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

  return (
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
  );
};
