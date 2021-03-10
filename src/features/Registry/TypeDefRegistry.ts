import {DocumentNode} from "graphql";
import {gql} from "apollo-server-express";
import {AbstractRegistry} from "./AbstractRegistry";

const root = gql`
    scalar Date
    scalar DateTime
    type Query {
        root: String
    }
    type Mutation {
        root: String
    }
    type Subscription {
        root: String
    }
`

class _TypeDefRegistry extends AbstractRegistry<DocumentNode> {
}

export const TypeDefRegistry = new _TypeDefRegistry(root);
