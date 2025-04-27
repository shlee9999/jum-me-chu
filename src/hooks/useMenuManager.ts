import { DropResult } from 'react-beautiful-dnd';
import { useMenuStore } from '../store/menuStore';

export const useMenuManager = () => {
  const { activeMenus, inactiveMenus, setActiveMenus, setInactiveMenus } =
    useMenuStore();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (
      source.droppableId === 'active' &&
      destination.droppableId === 'active'
    ) {
      const newActiveMenus = Array.from(activeMenus);
      const [movedItem] = newActiveMenus.splice(source.index, 1);
      newActiveMenus.splice(destination.index, 0, movedItem);
      setActiveMenus(newActiveMenus);
    } else if (
      source.droppableId === 'inactive' &&
      destination.droppableId === 'inactive'
    ) {
      const newInactiveMenus = Array.from(inactiveMenus);
      const [movedItem] = newInactiveMenus.splice(source.index, 1);
      newInactiveMenus.splice(destination.index, 0, movedItem);
      setInactiveMenus(newInactiveMenus);
    } else if (
      source.droppableId === 'active' &&
      destination.droppableId === 'inactive'
    ) {
      const newActiveMenus = Array.from(activeMenus);
      const newInactiveMenus = Array.from(inactiveMenus);
      const [movedItem] = newActiveMenus.splice(source.index, 1);
      newInactiveMenus.splice(destination.index, 0, movedItem);
      setActiveMenus(newActiveMenus);
      setInactiveMenus(newInactiveMenus);
    } else if (
      source.droppableId === 'inactive' &&
      destination.droppableId === 'active'
    ) {
      const newActiveMenus = Array.from(activeMenus);
      const newInactiveMenus = Array.from(inactiveMenus);
      const [movedItem] = newInactiveMenus.splice(source.index, 1);
      newActiveMenus.splice(destination.index, 0, movedItem);
      setInactiveMenus(newInactiveMenus);
      setActiveMenus(newActiveMenus);
    }
  };

  return { onDragEnd };
};
