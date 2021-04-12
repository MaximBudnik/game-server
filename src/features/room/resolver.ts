import {IResolvers, withFilter} from "apollo-server";
import {PlayerType, RoomInput, RoomType} from "../../../types";
import {RoomList} from "./_/RoomList";
import {pubsub, pubsubEvents} from "../../graphql/pubsub";
import {ResolverRegistry} from "../base/registry";
import {IRoom} from "./_/Room";

const resolvers: IResolvers = {
    Query: {
        rooms: (parent, args, context, info): Array<RoomType> => {
            return RoomList.getRooms()
        }
    },
    Mutation: {
        addPlayer: (parent, {player, roomId}: { player: PlayerType, roomId: number }, context, info): RoomType => {
            const Room: IRoom = RoomList.getRoom(roomId)
            if (!Room.canAddPlayer(player)) {
                Room.deletePlayer(player.id)
            }
            Room.addPlayer(player)
            return Room.room
        },
        updatePlayer: (parent, {player, roomId}: { player: PlayerType, roomId: number }, context, info): RoomType => {
            const Room: IRoom = RoomList.getRoom(roomId)
            Room.updatePlayer(player)
            return Room.room
        },
        deletePlayer: (parent, {playerId, roomId}: { playerId: number, roomId: number }, context, info): RoomType => {
            const Room: IRoom = RoomList.getRoom(roomId)
            Room.deletePlayer(playerId)
            if (Room.room.players.length === 0) {
                //Disabled for dev
                // RoomList.deleteRoom(Room.room)
            }
            return Room.room
        },
        createRoom: (parent, {room}: { room: RoomInput }, context, info): RoomType => {
            const res = RoomList.addRoom({
                ...room,
                id: RoomList.generateValidRoomId(),
                players: [],
                gameStatus: "lobby"
            })
            return res
        },
        deleteRoom: (parent, {room}: { room: RoomType }, context, info): RoomType => {
            return RoomList.deleteRoom(room)
        },
    },
    Subscription: {
        onRoomUpdate: {
            subscribe: withFilter((() => pubsub.asyncIterator([pubsubEvents.ON_ROOM_UPDATE])),
                (payload, variables: { id: number }) => {
                    return (payload.onRoomUpdate.id === variables.id);
                }),
        }
    }
};

ResolverRegistry.register(resolvers)
