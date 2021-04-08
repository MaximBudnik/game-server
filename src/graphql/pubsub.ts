import {PubSub} from "apollo-server";


export enum pubsubEvents {
    ON_ROOM_UPDATE = 'ON_ROOM_UPDATE',
    ON_LOBBY_CHAT_UPDATE = 'ON_LOBBY_CHAT_UPDATE',
    ON_GAME_UPDATE = 'ON_GAME_UPDATE',
}

export const pubsub = new PubSub();

