import { create } from 'zustand';
import { TMenu } from '../types/menu';
import { initialMenus } from '../constants/initialMenus';

interface MenuState {
  activeMenus: TMenu[];
  inactiveMenus: TMenu[];
  setActiveMenus: (menus: TMenu[]) => void;
  setInactiveMenus: (menus: TMenu[]) => void;
  addActiveMenu: (menu: TMenu) => void;
  addInactiveMenu: (menu: TMenu) => void;
  editActiveMenu: (menu: TMenu) => void;
  editInactiveMenu: (menu: TMenu) => void;
  removeActiveMenu: (menuOption: string) => void;
  removeInactiveMenu: (menuOption: string) => void;
  initActiveMenu: () => void;
  initInactiveMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => {
  // 첫 방문 시 localStorage 초기화
  if (
    !localStorage.getItem('activeMenus') &&
    !localStorage.getItem('inactiveMenus')
  ) {
    localStorage.setItem('activeMenus', JSON.stringify(initialMenus));
    localStorage.setItem('inactiveMenus', JSON.stringify([]));
  }

  return {
    activeMenus: JSON.parse(localStorage.getItem('activeMenus') || '[]'),
    inactiveMenus: JSON.parse(localStorage.getItem('inactiveMenus') || '[]'),

    // Set active menus
    setActiveMenus: (menus) =>
      set(() => {
        localStorage.setItem('activeMenus', JSON.stringify(menus));
        return { activeMenus: menus };
      }),

    // Set inactive menus
    setInactiveMenus: (menus) =>
      set(() => {
        localStorage.setItem('inactiveMenus', JSON.stringify(menus));
        return { inactiveMenus: menus };
      }),

    // Add a menu to active menus with duplicate check
    addActiveMenu: (menu) =>
      set((state) => {
        const isDuplicate = state.activeMenus.some(
          (activeMenu) => activeMenu.option === menu.option
        );
        if (isDuplicate) {
          console.warn(
            'Duplicate menu detected in activeMenus. Skipping addition.'
          );
          return state; // Return the current state without modification
        }
        const updatedMenus = [...state.activeMenus, menu];
        localStorage.setItem('activeMenus', JSON.stringify(updatedMenus));
        return { activeMenus: updatedMenus };
      }),

    // Add a menu to inactive menus with duplicate check
    addInactiveMenu: (menu) =>
      set((state) => {
        const isDuplicate = state.inactiveMenus.some(
          (inactiveMenu) => inactiveMenu.option === menu.option
        );
        if (isDuplicate) {
          console.warn(
            'Duplicate menu detected in inactiveMenus. Skipping addition.'
          );
          return state; // Return the current state without modification
        }
        const updatedMenus = [...state.inactiveMenus, menu];
        localStorage.setItem('inactiveMenus', JSON.stringify(updatedMenus));
        return { inactiveMenus: updatedMenus };
      }),

    // Edit a menu in active menus
    editActiveMenu: (menu) =>
      set((state) => {
        console.log(menu);
        const updatedMenus = state.activeMenus.map((activeMenu) => {
          return activeMenu.id === menu.id ? menu : activeMenu;
        });

        localStorage.setItem('activeMenus', JSON.stringify(updatedMenus));
        return { activeMenus: updatedMenus };
      }),

    // Edit a menu in inactive menus
    editInactiveMenu: (menu) =>
      set((state) => {
        const updatedMenus = state.inactiveMenus.map((inactiveMenu) =>
          inactiveMenu.id === menu.id ? menu : inactiveMenu
        );
        localStorage.setItem('inactiveMenus', JSON.stringify(updatedMenus));
        return { inactiveMenus: updatedMenus };
      }),

    // Remove a menu from active menus
    removeActiveMenu: (id) =>
      set((state) => {
        const updatedMenus = state.activeMenus.filter(
          (activeMenu) => activeMenu.id !== id
        );
        localStorage.setItem('activeMenus', JSON.stringify(updatedMenus));
        return { activeMenus: updatedMenus };
      }),

    // Remove a menu from inactive menus
    removeInactiveMenu: (id) =>
      set((state) => {
        const updatedMenus = state.inactiveMenus.filter(
          (inactiveMenu) => inactiveMenu.id !== id
        );
        localStorage.setItem('inactiveMenus', JSON.stringify(updatedMenus));
        return { inactiveMenus: updatedMenus };
      }),

    // Initialize active menus
    initActiveMenu: () =>
      set(() => {
        localStorage.setItem('activeMenus', JSON.stringify([]));
        return { activeMenus: [] };
      }),

    // Initialize inactive menus
    initInactiveMenu: () =>
      set(() => {
        localStorage.setItem('inactiveMenus', JSON.stringify([]));
        return { inactiveMenus: [] };
      }),
  };
});
