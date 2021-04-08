import {IResolvers} from "apollo-server";
import {ResolverRegistry} from "../base/registry";
import {moveDirectionType} from "../../../types";
import {IRoom, RoomList} from "../room";

const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        movePlayer: (parent, {
            direction,
            playerId,
            roomId
        }: { direction: moveDirectionType, playerId: number, roomId: number }, context, info): void => {
            const Room: IRoom = RoomList.getRoom(roomId)
            Room.game.addPlayerActionToQueue({type: 'move', payload: direction}, playerId)
        }
    },
    Subscription: {}
};

ResolverRegistry.register(resolvers)
