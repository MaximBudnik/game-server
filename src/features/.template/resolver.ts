import {IResolvers} from "apollo-server";
import {ResolverRegistry} from "../base/registry";

const resolvers: IResolvers = {
    Query: {},
    Mutation: {},
    Subscription: {}
};

ResolverRegistry.register(resolvers)
