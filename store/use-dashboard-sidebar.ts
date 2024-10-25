import {create} from 'zustand';

interface DashboardSidebarStoreProps {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () =>void;
}

export const useDashboardSideBar = create<DashboardSidebarStoreProps>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapse: () => set(() => ({collapsed: true})),
}));