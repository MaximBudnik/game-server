import {IResolvers, withFilter} from "apollo-server";
import {ResolverRegistry} from "../base/registry";
import {gameStatusType, RoomType} from "../../../types";
import {IRoom, RoomList} from "../room";
import {pubsub, pubsubEvents} from "../../graphql/pubsub";

const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        updateGameStatus: (parent, {
            gameStatus,
            roomId
        }: { gameStatus: gameStatusType, roomId: number }, context, info): RoomType => {
            const Room: IRoom = RoomList.getRoom(roomId)
            Room.updateRoomGameStatus(gameStatus)
            return Room.room
        }
    },
    Subscription: {
        onGameUpdate: {
            subscribe: withFilter((() => pubsub.asyncIterator([pubsubEvents.ON_GAME_UPDATE])),
                (payload, variables: { id: number }) => {
                    return (payload.onGameUpdate.id === variables.id);
                }),
        }
    }
};

ResolverRegistry.register(resolvers)
