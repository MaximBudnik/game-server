export type ChatMessage = {
    text: string
    senderName: string
    type: ChatMessageType
}

export type Chat = {
    messages: Array<ChatMessage>
}

export type ChatMessageType = 'default' | 'info'

export type LobbyChatSubscriptionInput = {
    id: number
}

export type ChatInput = {
    text: string
}

export type addMessageVars = {
    chatMessage: ChatMessage
    roomId: number
}
