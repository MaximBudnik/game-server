import {PubSub} from "apollo-server";


export enum pubsubEvents {
    ON_ROOM_UPDATE = 'ON_ROOM_UPDATE'
}

export const pubsub = new PubSub();

