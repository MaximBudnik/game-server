import {gql} from "apollo-server-express";
import {TypeDefRegistry} from "../base/registry";

const typeDef = gql`


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
