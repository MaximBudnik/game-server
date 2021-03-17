export type ChatMessage = {
    senderName: string
    text: string
    type: ChatMessageType
}

export type Chat = {
    messages: Array<ChatMessage>
}

export type ChatMessageType = 'default' | 'info'
