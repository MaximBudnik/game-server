import {gql} from "apollo-server-express";
import {TypeDefRegistry} from "../base/registry";

const typeDef = gql`

    enum characterEnum {
        redKnight
    }

    extend type Player {
        character: characterEnum
    }

    extend input PlayerInput {
        character: characterEnum
    }

    #    extend type Query {
    #    }

    #    extend type Mutation {
    #        
    #    }

    #    extend type Subscription {
    #        
    #    }
`

TypeDefRegistry.register(typeDef)
