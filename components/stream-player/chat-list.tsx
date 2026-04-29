import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatMessage } from "./chat-message"
import { Skeleton } from "../ui/skeleton"

interface CustomWord {
    word: string;
    caseSensitive: boolean;
}

interface ChatListProps{
    messages: ReceivedChatMessage[],
    isHidden: boolean,
    isUsingProfanityFilter: boolean,
    threshold: number
    toxicityLabels: string[],
    whitelist: CustomWord[],
    blacklist: CustomWord[],
    userId: string
}

export const ChatList =  ({
    messages,
    isHidden,
    isUsingProfanityFilter,
    threshold,
    toxicityLabels,
    whitelist,
    blacklist,
    userId
}: ChatListProps) => {

    if(isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat is disabled" : "Welcome to the chat! "}
                </p>
            </div> 
        )
    }
    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
            {messages.map((message) =>(
                <ChatMessage
                    key={message.timestamp}
                    data={{...message,
                            isToxic: false}}
                    threshold={threshold}
                    toxicityLabels={toxicityLabels}
                    isProfFilterEnabled={isUsingProfanityFilter}
                    whitelist={whitelist}
                    blacklist={blacklist}
                    userId={userId}/>
            ))}
        </div>
    )
}

export const ChatListSkeleton = () => {
    return(
        <div className="flex h-full items-center justify-center">
            <Skeleton  className="w-1/2 h-6"/>
        </div>
    )
}