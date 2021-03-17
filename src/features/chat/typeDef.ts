import {gql} from "apollo-server-express";
import {TypeDefRegistry} from "../base/registry";

const typeDef = gql`

    type ChatMessage {
        senderName: String!
        text: String!
        type: String!
    }

    input ChatMessageInput {
        senderName: String!
        text: String!
        type: String!
    }

    type Chat {
        messages: [ChatMessage]!
    }

    extend type Mutation {
        sendLobbyChatMessage(chatMessage: ChatMessageInput!, roomId: Int!): Chat
    }

    extend type Subscription {
        onLobbyChatUpdate(id:Int!): Chat
    }
`

TypeDefRegistry.register(typeDef)
