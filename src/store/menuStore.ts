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
  activeMenus: JSON.parse(localStorage.getItem('activeMenuOptions') || '[]'),
  inactiveMenus: JSON.parse(
    localStorage.getItem('inactiveMenuOptions') || '[]'
  ),

  // Set active menus
  setActiveMenus: (menus) =>
    set(() => {
      localStorage.setItem('activeMenuOptions', JSON.stringify(menus));
      return { activeMenus: menus };
    }),

  // Set inactive menus
  setInactiveMenus: (menus) =>
    set(() => {
      localStorage.setItem('inactiveMenuOptions', JSON.stringify(menus));
      return { inactiveMenus: menus };
    }),

  // Add a menu to active menus
  addActiveMenu: (menu) =>
    set((state) => {
      const updatedMenus = [...state.activeMenus, menu];
      localStorage.setItem('activeMenuOptions', JSON.stringify(updatedMenus));
      return { activeMenus: updatedMenus };
    }),

  // Add a menu to inactive menus
  addInactiveMenu: (menu) =>
    set((state) => {
      const updatedMenus = [...state.inactiveMenus, menu];
      localStorage.setItem('inactiveMenuOptions', JSON.stringify(updatedMenus));
      return { inactiveMenus: updatedMenus };
    }),
}));
