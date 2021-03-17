import {ApolloServer} from "apollo-server";
import './src/graphql/registries'
import * as Registry from "./src/features/base/registry";

try {
    const server = new ApolloServer({
        typeDefs: Registry.TypeDefRegistry.combine(),
        resolvers: Registry.ResolverRegistry.combine(),
        subscriptions: {
            path: '/subscriptions',
        }
    });
    server.listen(4000, process.env.IP).then(({url}) => {
        console.log(`Server ready at ${url}`);
    });

} catch (e) {
    console.error(e);
}
