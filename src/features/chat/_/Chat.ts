import {ChatMessage} from "../../../../types/src/ChatTypes";
import {pubsub, pubsubEvents} from "../../../graphql/pubsub";

export interface IChat {
    readonly messages: Array<ChatMessage>
    addMessage: (message: ChatMessage) => void
    addServerMessage: (text: string) => void
}

class Chat implements IChat {

    private _messages: Array<ChatMessage> = []
    private readonly _roomId: number
    private readonly maxMessagesCount = 20


    constructor(roomId: number) {
        this._roomId = roomId
    }

    get messages(): Array<ChatMessage> {
        return this._messages;
    }

    addMessage = (message: ChatMessage): void => {
        this._messages.push(message)
        this._messages = this._messages.slice(-this.maxMessagesCount)
        this.publishPubsubChanges()
    }

    addServerMessage = (text: string) => this.addMessage({text, senderName: 'Server', type: 'info'})

    private publishPubsubChanges = () => {
        pubsub.publish(pubsubEvents.ON_LOBBY_CHAT_UPDATE, {
            onLobbyChatUpdate: {
                messages: this._messages,
                id: this._roomId
            }
        })
    }
}

export const newChat = (roomId: number) => new Chat(roomId)

