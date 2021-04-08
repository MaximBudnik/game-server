import {gql} from "apollo-server-express";
import {TypeDefRegistry} from "../base/registry";

const typeDef = gql`

    enum characterEnum {
        girl
        boy
        redKnight
        orangeKnight
        blueDragon
        greenDragon
    }

    type PlayerEntity {
        id: Int!
        position: Position
    }

    extend type Player {
        character: characterEnum
    }

    extend input PlayerInput {
        character: characterEnum
    }

    #    extend type Query {
    #    }

    extend type Mutation {
        movePlayer(direction:MoveDirectionInput,playerId:Int!,roomId:Int!): Game
    }

    #    extend type Subscription {
    #        
    #    }
`

TypeDefRegistry.register(typeDef)
