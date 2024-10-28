import {create} from 'zustand';
export enum ChatType {
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY",
};


interface ChatSidebarStoreProps {
    collapsed: boolean;
    type: ChatType
    onExpand: () => void;
    onCollapse: () =>void;
    onChangeChatType: (type: ChatType) =>void;
}

export const useChatSideBar = create<ChatSidebarStoreProps>((set) => ({
    collapsed: false,
    type: ChatType.CHAT,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapse: () => set(() => ({collapsed: true})),
    onChangeChatType: (type: ChatType ) => set(() => ({type})),
}));