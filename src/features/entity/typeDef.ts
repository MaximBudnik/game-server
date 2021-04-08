import {gql} from "apollo-server-express";
import {TypeDefRegistry} from "../base/registry";

const typeDef = gql`


    type Position {
        x: Float
        y: Float
    }

    input MoveDirectionInput{
        x: Int
        y: Int
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
