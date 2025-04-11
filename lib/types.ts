export type Filter = {
    label: string;
    value: string;
    id: string
};

export type FieldTypes = 
    "isChatEnabled" |
    "isChatDelayed" | 
    "isChatFollowersOnly";

export type BlockedUserType = {
    id: string
    userId: string
    imageUrl: string
    username: string
    createdAt: string
}

export type SecureStreamType = {
    id: string;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    isStreaming: boolean;
    thumbnailUrl: string | null;
    name: string;  
}

export type NonSensitiveUserDataType = {
    id: string;
    username: string;
    bio: string | null;
    stream: SecureStreamType | null;
    imageUrl: string;
    _count: { follow: number }
    isUsingProfanityFilter: boolean;
}
