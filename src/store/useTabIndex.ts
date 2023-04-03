import create from 'zustand';

interface TabIndex {
  tabIndex: 1 | 0 | -1;
  setTabIndex: (value: TabIndex['tabIndex']) => void;
}

export const useTabIndex = create<TabIndex>((set) => ({
  tabIndex: 0,
  setTabIndex: (value: TabIndex['tabIndex']) => set({ tabIndex: value }),
}));
