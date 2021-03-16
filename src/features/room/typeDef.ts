import {gql} from "apollo-server-express";
import {TypeDefRegistry} from "../base/registry";

const typeDef = gql`

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
        name: String!
    }

    extend type Query {
        rooms: [Room]
    }

    extend type Mutation {
        addPlayer(player: PlayerInput!, roomId: Int!): Room
        updatePlayer(player: PlayerInput!, roomId: Int!): Room
        deletePlayer(playerId: Int!, roomId: Int!): Room
        createRoom(room:RoomInput): Room
        deleteRoom(room:Int!): Room
    }

    extend type Subscription {
        onRoomUpdate(id:Int!): Room
    }
`

TypeDefRegistry.register(typeDef)
