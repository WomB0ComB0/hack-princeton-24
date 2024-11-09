import type { StoreApi } from 'zustand';
import { createStore } from 'zustand';

/**
 * Interface representing the state of the store.
 */
interface StoreState {
  header: {
    setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
    setIsScrolled: (value: boolean) => void;
    setVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
    isMenuOpen: boolean;
    isScrolled: boolean;
    visible: boolean;
    prevScrollPos: number;
  };
}

/**
 * Creates a global store using Zustand.
 * @returns {StoreApi<StoreState>} The Zustand store.
 */
const createGlobalStore = (): StoreApi<StoreState> =>
  createStore<StoreState>((set) => ({
    header: {
      isMenuOpen: false,
      isScrolled: false,
      visible: true,
      prevScrollPos: 0,
      setIsMenuOpen: (value) =>
        set((state) => ({
          header: {
            ...state.header,
            isMenuOpen: typeof value === 'function' ? value(state.header.isMenuOpen) : value,
          },
        })),
      setIsScrolled: (value) =>
        set((state) => ({
          header: { ...state.header, isScrolled: value },
        })),
      setVisible: (value) =>
        set((state) => ({
          header: {
            ...state.header,
            visible: typeof value === 'function' ? value(state.header.visible) : value,
          },
        })),
    },
  }));

export { createGlobalStore, type StoreState };
