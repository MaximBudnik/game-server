import {PlayerType, RoomType} from "../../../../types";
import {IChat, newChat} from "../../chat/_/Chat";

export interface IRoom {
    readonly room: RoomType
    readonly chat: IChat
    addPlayer: (player: PlayerType) => void
    canAddPlayer: (player: PlayerType) => boolean
    updatePlayer: (player: PlayerType) => void
    deletePlayer: (playerId: number) => void
}

class Room implements IRoom {

    private readonly _room: RoomType
    private readonly _chat: IChat

    constructor(room: RoomType) {
        this._room = room
        this._chat = newChat()
    }

    get room(): RoomType {
        return this._room;
    }

    get chat(): IChat {
        return this._chat;
    }

    canAddPlayer = (player: PlayerType): boolean => {
        return !this._room.players.find(e => e.id === player.id)
    }

    addPlayer = (player: PlayerType): void => {
        this._room.players.push(player)
    }

    updatePlayer = (player: PlayerType): void => {
        const playerIndex = this._room.players.findIndex((e => e.id == player.id));
        this._room.players[playerIndex] = player
    }
    deletePlayer = (id: number): void => {
        const playerIndex = this._room.players.map(e => e.id).indexOf(id);
        this._room.players.splice(playerIndex, 1)
    }
}

export const newRoom = (room: RoomType) => new Room(room)

