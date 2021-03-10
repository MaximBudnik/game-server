import {ApolloServer} from "apollo-server";
import './src/features/Registry/registries'
import * as Registry from "./src/features/Registry";

const server = new ApolloServer({
    typeDefs: Registry.TypeDefRegistry.combine(),
    resolvers: Registry.ResolverRegistry.combine(),
    subscriptions: {
        path: '/subscriptions'
    }
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});

/*
*
* TODO
*
* Add TypeDefsRegistry ✅
* Make better types or add some instrument for its generation https://graphql-code-generator.com/docs/getting-started/index
* PubSub and Logger decorators
* Testing framework
*
* */

/*
*
* TODO
*
* Next Scope
* Create cli for further feature-driven development
*
* */
