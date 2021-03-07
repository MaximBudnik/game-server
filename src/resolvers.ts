import {PlayerType, RoomType} from "./types";
import {PubSub, withFilter} from "apollo-server";
import {RoomList} from "./roomList";


const pubsub = new PubSub();

const ON_ROOM_UPDATE = 'ON_ROOM_UPDATE'

export const resolvers = {
    Query: {
        rooms: (parent, args, context, info): Array<RoomType> => {
            return RoomList.getRooms()
        }
    },
    Mutation: {
        addPlayer: (parent, {player, roomId}: { player: PlayerType, roomId: number }, context, info): RoomType => {
            const Room = RoomList.getRoom(roomId)
            Room.addPlayer(player)
            pubsub.publish(ON_ROOM_UPDATE, {onRoomUpdate: Room.room});
            return Room.room
        },
        updatePlayer: (parent, {player, roomId}: { player: PlayerType, roomId: number }, context, info): RoomType => {
            const Room = RoomList.getRoom(roomId)
            Room.updatePlayer(player)
            pubsub.publish(ON_ROOM_UPDATE, {onRoomUpdate: Room.room});
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
            subscribe: withFilter(() => pubsub.asyncIterator([ON_ROOM_UPDATE]),
                (payload, variables: { id: number }) => {
                    return (payload.onRoomUpdate.repository_name === variables.id);
                }),
        }
    }
};

