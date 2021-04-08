import {gql} from "apollo-server-express";
import {TypeDefRegistry} from "../base/registry";

const typeDef = gql`

    enum gameStatusEnum {
        lobby
        pause
        play
    }

    type Game {
        playerEntities: [PlayerEntity]!
    }

    extend type Room {
        gameStatus:gameStatusEnum
    }

    #    extend type Query {

    #    }

    extend type Mutation {
        updateGameStatus(gameStatus:gameStatusEnum!, roomId: Int!) : Room
    }

    extend type Subscription {
        onGameUpdate(id:Int!): Game
    }
`

TypeDefRegistry.register(typeDef)
