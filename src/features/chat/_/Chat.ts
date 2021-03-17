import {ChatMessage} from "../../../../types/src/ChatTypes";

export interface IChat {
    readonly messages: Array<ChatMessage>
    addMessage: (message: ChatMessage) => void
}

class Chat implements IChat {

    private readonly _messages: Array<ChatMessage> = []

    get messages(): Array<ChatMessage> {
        return this._messages;
    }

    addMessage = (message: ChatMessage): void => {
        this._messages.push(message)
    }
}

export const newChat = () => new Chat()

