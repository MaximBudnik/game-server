import {ApolloServer} from "apollo-server";
import {typeDefs} from "./src/typeDefs";
import {resolvers} from "./src/resolvers";


const server = new ApolloServer({
    typeDefs, resolvers, subscriptions: {
        path: '/subscriptions'
    }
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});

/*

* TODO
*
* Add TypeDefsRegistry
* Make better types or add some instrument for its generation https://graphql-code-generator.com/docs/getting-started/index
* PubSub and Logger decorators
* Testing framework

* */
