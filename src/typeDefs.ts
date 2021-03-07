import {gql} from "apollo-server-express";

export const typeDefs = gql`

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

    type Query {
        rooms: [Room]
    }

    type Mutation {
        addPlayer(player: PlayerInput, roomId: Int!): Room
        updatePlayer(player: PlayerInput, roomId: Int!): Room
        createRoom(room:RoomInput): Room
        deleteRoom(room:Int!): Room
    }

    type Subscription {
        onRoomUpdate(id:Int!): Room
    }

`


