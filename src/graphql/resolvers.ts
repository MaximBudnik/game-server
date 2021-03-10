import {PlayerType, RoomType} from "../features/room/types";
import {IResolvers, withFilter} from "apollo-server";
import {RoomList} from "../features/room/roomList";
import {pubsub, pubsubEvents} from "./pubsub";


export const resolvers: IResolvers = {
    Query: {
        rooms: (parent, args, context, info): Array<RoomType> => {
            return RoomList.getRooms()
        }
    },
    Mutation: {
        addPlayer: (parent, {player, roomId}: { player: PlayerType, roomId: number }, context, info): RoomType => {
            const Room = RoomList.getRoom(roomId)
            Room.addPlayer(player)
            pubsub.publish(pubsubEvents.ON_ROOM_UPDATE, {onRoomUpdate: Room.room})
            return Room.room
        },
        updatePlayer: (parent, {player, roomId}: { player: PlayerType, roomId: number }, context, info): RoomType => {
            const Room = RoomList.getRoom(roomId)
            Room.updatePlayer(player)
            pubsub.publish(pubsubEvents.ON_ROOM_UPDATE, {onRoomUpdate: Room.room})
            return Room.room
        },
        deletePlayer: (parent, {player, roomId}: { player: PlayerType, roomId: number }, context, info): RoomType => {
            const Room = RoomList.getRoom(roomId)
            Room.deletePlayer(player)
            pubsub.publish(pubsubEvents.ON_ROOM_UPDATE, {onRoomUpdate: Room.room})
            return Room.room
        },
        createRoom: (parent, {room}: { room: RoomType }, context, info): RoomType => {
            return RoomList.addRoom(room)
        },
        deleteRoom: (parent, {room}: { room: RoomType }, context, info): RoomType => {
            return RoomList.deleteRoom(room)
        },
    },
    Subscription: {
        onRoomUpdate: {
            subscribe: withFilter(() => pubsub.asyncIterator([pubsubEvents.ON_ROOM_UPDATE]),
                (payload, variables: { id: number }) => {
                    return (payload.onRoomUpdate.id === variables.id);
                }),
        }
    }
};

