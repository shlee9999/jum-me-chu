import { AddForm } from './AddForm';
import { MenuManager } from './MenuManager';
import { cn } from '../utils/cn';
import { useEffect, useState } from 'react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuModal = ({ isOpen, onClose }: MenuModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const ANIMATION_DURATION = 300;

    if (isOpen) {
      // 모달이 열릴 때: mounted -> visible 순서로 상태 변경
      setIsMounted(true);
      const showTimer = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(showTimer);
    }

    // 모달이 닫힐 때: visible -> mounted 순서로 상태 변경
    setIsVisible(false);
    const hideTimer = setTimeout(() => setIsMounted(false), ANIMATION_DURATION);
    return () => clearTimeout(hideTimer);
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div
        className={cn(
          'bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden',
          'transform transition-all duration-300',
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        {/* 헤더 */}
        <div className='flex justify-between items-center p-8 border-b border-gray-100 bg-gray-50/50'>
          <div className='flex items-center gap-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7 text-primary-600'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                clipRule='evenodd'
              />
            </svg>
            <h2 className='text-2xl font-bold text-gray-900'>메뉴 관리</h2>
          </div>
          <button
            onClick={onClose}
            className={cn(
              'p-2.5 rounded-lg text-gray-400 hover:text-gray-600',
              'hover:bg-gray-100 transition-colors duration-200'
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className='p-8 space-y-10 overflow-y-auto max-h-[calc(90vh-80px)]'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h3 className='text-xl font-semibold text-gray-900'>
                새 메뉴 추가
              </h3>
              <p className='text-gray-500 text-sm'>
                오늘 점심 메뉴로 추가하고 싶은 메뉴를 입력해주세요.
              </p>
            </div>
            <AddForm />
          </div>

          <div className='space-y-6'>
            <div className='space-y-2'>
              <h3 className='text-xl font-semibold text-gray-900'>메뉴 목록</h3>
              <p className='text-gray-500 text-sm'>
                메뉴를 드래그하여 순서를 변경하거나, 다른 리스트로 이동할 수
                있습니다.
              </p>
            </div>
            <div className='border-t border-gray-100'>
              <MenuManager />
            </div>
            <div className='flex justify-end'>
              <button
                onClick={() => {
                  const isAllowed = confirm(
                    '모든 리스트가 첫 방문 시로 돌아가며, 복구할 수 없습니다. 정말 초기화하시겠습니까? '
                  );
                  if (isAllowed) {
                    localStorage.clear();
                    location.reload();
                  }
                }}
                className={cn(
                  'px-5 py-2.5 bg-gray-700 text-white',
                  'rounded-lg shadow-md hover:bg-gray-600',
                  'transition-all transform hover:scale-105 active:scale-95',
                  'w-full sm:w-auto'
                )}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
