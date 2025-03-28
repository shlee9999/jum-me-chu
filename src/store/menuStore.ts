import { create } from 'zustand';
import { TMenu } from '../types/menu';

interface MenuState {
  activeMenus: TMenu[];
  inactiveMenus: TMenu[];
  setActiveMenus: (menus: TMenu[]) => void;
  setInactiveMenus: (menus: TMenu[]) => void;
  addActiveMenu: (menu: TMenu) => void;
  addInactiveMenu: (menu: TMenu) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
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
        (activeMenu) => activeMenu.option === menu.option // Assuming TMenu has an `id` property for comparison
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
        (inactiveMenu) => inactiveMenu.option === menu.option // Assuming TMenu has an `id` property for comparison
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
}));
