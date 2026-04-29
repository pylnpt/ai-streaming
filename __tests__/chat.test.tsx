import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Chat } from "@/components/stream-player/chat";

// Dynamic mock value for sidebar
let sidebarMock: any = {
  type: "chat",
  onExpand: jest.fn(),
};

// ACTUAL MOCKS
jest.mock("@livekit/components-react", () => ({
  useConnectionState: () => "connected",
  useRemoteParticipant: () => ({}),
  useChat: () => ({
    chatMessages: [
      { timestamp: 2, message: "Yo" },
      { timestamp: 1, message: "Sup" },
    ],
    send: jest.fn(),
  }),
}));

jest.mock("usehooks-ts", () => ({
  useMediaQuery: () => false,
}));

jest.mock("@/store/use-chat-sidebar", () => ({
  ChatType: {
    CHAT: "chat",
    COMMUNITY: "community",
  },
  useChatSideBar: () => sidebarMock,
}));

jest.mock("@/components/stream-player/chat-header", () => ({
  ChatHeader: () => <div>ChatHeader</div>,
  ChatHeaderSkeleton: () => <div>ChatHeaderSkeleton</div>,
}));

jest.mock("@/components/stream-player/chat-form", () => ({
  ChatForm: () => <div>ChatForm</div>,
  ChatFormSkeleton: () => <div>ChatFormSkeleton</div>,
}));

jest.mock("@/components/stream-player/chat-list", () => ({
  ChatList: () => <div>ChatList</div>,
  ChatListSkeleton: () => <div>ChatListSkeleton</div>,
}));

jest.mock("@/components/stream-player/chat-community", () => ({
  ChatCommunity: () => <div>ChatCommunity</div>,
}));

describe("Chat component", () => {
  const baseProps = {
    hostName: "EricCartman",
    hostidentity: "host123",
    viewerName: "Kyle",
    isFollowing: true,
    isChatEnabled: true,
    isChatDelayed: false,
    isChatFollowersOnly: false,
    user: {
      id: "user123",
      username: "Kyle",
      bio: "I'm not fat, I'm big-boned.",
      stream: null,
      profilePicture: "",
      isUsingProfanityFilter: true,
      imageUrl: "",
      _count: {
        follow: 0,
      },
    },
    threshold: 0.7,
    filters: ["toxicity"],
  };

  beforeEach(() => {
    sidebarMock.type = "chat";
  });

  it("renders ChatHeader", () => {
    render(<Chat {...baseProps} />);
    expect(screen.getByText("ChatHeader")).toBeInTheDocument();
  });

  it("renders ChatList and ChatForm when type is CHAT", () => {
    sidebarMock.type = "chat";
    render(<Chat {...baseProps} />);
    expect(screen.getByText("ChatList")).toBeInTheDocument();
    expect(screen.getByText("ChatForm")).toBeInTheDocument();
  });

  it("renders ChatCommunity when type is COMMUNITY", () => {
    sidebarMock.type = "community";
    render(<Chat {...baseProps} />);
    expect(screen.getByText("ChatCommunity")).toBeInTheDocument();
  });

  it("does render ChatList and ChatForm when isChatEnabled is false", () => {
    render(<Chat {...baseProps} isChatEnabled={false} />);
    expect(screen.queryByText("ChatList")).toBeInTheDocument();
    expect(screen.queryByText("ChatForm")).toBeInTheDocument();
  });

  it("renders ChatHeaderSkeleton when loading", () => {
    render(<Chat {...baseProps} />);
    expect(screen.queryByText("ChatHeaderSkeleton")).not.toBeInTheDocument();
  });

  it("renders ChatListSkeleton and ChatFormSkeleton when loading", () => {
    render(<Chat {...baseProps} />);
    expect(screen.queryByText("ChatListSkeleton")).not.toBeInTheDocument();
    expect(screen.queryByText("ChatFormSkeleton")).not.toBeInTheDocument();
  });
});
