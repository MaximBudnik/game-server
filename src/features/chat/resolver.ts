import {IResolvers, withFilter} from "apollo-server";
import {ResolverRegistry} from "../base/registry";
import {pubsub, pubsubEvents} from "../../graphql/pubsub";
import {Chat, ChatMessage} from "../../../types";
import {RoomList} from "../room/_/RoomList";
import {IRoom} from "../room/_/Room";

const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        sendLobbyChatMessage: (parent, {
            chatMessage,
            roomId
        }: { chatMessage: ChatMessage, roomId: number }, context, info): Chat => {
            const Room: IRoom = RoomList.getRoom(roomId)
            Room.chat.addMessage(chatMessage)

            return {messages: Room.chat.messages}
        }
    },
    Subscription: {
        onLobbyChatUpdate: {
            subscribe: withFilter((() => pubsub.asyncIterator([pubsubEvents.ON_LOBBY_CHAT_UPDATE])),
                (payload, variables: { id: number }) => {
                    return (payload.onLobbyChatUpdate.id === variables.id);
                }),
        }
    }
};

ResolverRegistry.register(resolvers)
