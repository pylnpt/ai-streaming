import {create} from 'zustand';

interface SettingsSidebarStoreProps {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () =>void;
}

export const useSettingsSideBar = create<SettingsSidebarStoreProps>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapse: () => set(() => ({collapsed: true})),
}));