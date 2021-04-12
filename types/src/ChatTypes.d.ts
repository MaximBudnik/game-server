export declare type ChatMessage = {
    text: string;
    senderName: string;
    type: ChatMessageType;
};
export declare type Chat = {
    messages: Array<ChatMessage>;
};
export declare type ChatMessageType = 'default' | 'info';
export declare type LobbyChatSubscriptionInput = {
    id: number;
};
export declare type ChatInput = {
    text: string;
};
export declare type addMessageVars = {
    chatMessage: ChatMessage;
    roomId: number;
};
//# sourceMappingURL=ChatTypes.d.ts.map