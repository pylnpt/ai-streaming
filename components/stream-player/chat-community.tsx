"use client"

import { useParticipants } from "@livekit/components-react";
import { useMemo } from "react";
import { useDebounceValue} from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant,  RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    viewerName: string;
    hostName: string;
    isHidden: boolean;
}

export const ChatCommunity = ({
    viewerName,
    hostName,
    isHidden,
}: ChatCommunityProps) => {
    const participants = useParticipants();
    const [debouncedValue, updateDebouncedValue] = useDebounceValue<string>("", 500);
    // const [value, setValue] = useState("");
   

    const onChange = (newValue: string) => {
        updateDebouncedValue(newValue);
    };
    
    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
        });
    }, [participants, debouncedValue]);

    if(isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground"> 
                    Community is disabled
                </p>
            </div>
        )
    }

    return(
        <div className="p-4">
            <Input onChange={(e) => {onChange(e.target.value)}} 
                placeholder="Search community"
                className=" border border-primary"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2 ">
                    No results
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName} 
                        participantName={participant.name} 
                        participantIdentity={participant.identity} />
                ))}
            </ScrollArea>
                  
        </div>
    );
}