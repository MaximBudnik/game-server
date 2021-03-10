import {gql} from "apollo-server-express";
import {ResolverRegistry, TypeDefRegistry} from "../Registry";
import {IResolvers, withFilter} from "apollo-server";
import {PlayerType, RoomType} from "./types";
import {RoomList} from "./roomList";
import {pubsub, pubsubEvents} from "../../graphql/pubsub";

export const userType = gql`

    type Player {
        id: Int!
        name: String!
    }

    input PlayerInput {
        id: Int!
        name: String!
    }

    type Room {
        id: Int!
        name: String!
        players: [Player]!
    }

    input RoomInput {
        id: Int!
        name: String!
        players: [PlayerInput]!
    }

    extend type Query {
        rooms: [Room]
    }

    extend type Mutation {
        addPlayer(player: PlayerInput, roomId: Int!): Room
        updatePlayer(player: PlayerInput, roomId: Int!): Room
        deletePlayer(player: PlayerInput, roomId: Int!): Room
        createRoom(room:RoomInput): Room
        deleteRoom(room:Int!): Room
    }

    extend type Subscription {
        onRoomUpdate(id:Int!): Room
    }
`

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

TypeDefRegistry.register(userType)
ResolverRegistry.register(resolvers)
