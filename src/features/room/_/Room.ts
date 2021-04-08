import {gameStatusType, PlayerInput, PlayerType, RoomType} from "../../../../types";
import {IChat, newChat} from "../../chat";
import {pubsub, pubsubEvents} from "../../../graphql/pubsub";
import {IGame, newGame} from "../../game";

export interface IRoom {
    readonly room: RoomType
    readonly chat: IChat
    readonly game: IGame
    updateRoomGameStatus: (gameStatus: gameStatusType) => void
    addPlayer: (player: PlayerType) => void
    canAddPlayer: (player: PlayerType) => boolean
    updatePlayer: (player: PlayerType) => void
    deletePlayer: (playerId: number) => void
    disposeRoom: () => void
}

class Room implements IRoom {

    private readonly _room: RoomType
    private readonly _chat: IChat
    private _game: IGame

    constructor(room: RoomType) {
        this._room = room
        this._chat = newChat(this._room.id)
    }

    get room(): RoomType {
        return this._room;
    }

    get chat(): IChat {
        return this._chat;
    }

    get game(): IGame {
        return this._game
    }

    updateRoomGameStatus = (gameStatus: gameStatusType) => {
        this._room.gameStatus = gameStatus
        this.publishPubsubChanges()
        if (gameStatus === 'play') {
            this._game = newGame({players: this._room.players, roomId: this._room.id})
            this._game.start()
        }
    }

    addPlayer = (player: PlayerType): void => {
        this._room.players.push(player)
        this._chat.addServerMessage(`Player ${player.name} entered the lobby`)
        this.publishPubsubChanges()
    }

    canAddPlayer = (player: PlayerInput): boolean => {
        return !this._room.players.find(e => e.id === player.id)
    }

    updatePlayer = (player: PlayerType): void => {
        const playerIndex = this._room.players.findIndex((e => e.id == player.id));
        this._room.players[playerIndex] = player
        this.publishPubsubChanges()
    }

    deletePlayer = (id: number): void => {
        const playerIndex = this._room.players.map(e => e.id).indexOf(id);
        this._chat.addServerMessage(`Player ${this._room.players[playerIndex].name} left the lobby`)
        this._room.players.splice(playerIndex, 1)
        this.publishPubsubChanges()
    }

    disposeRoom = () => {
        // this._game = null
        // this._room = null
        // this._chat = null
    }

    private publishPubsubChanges = () => {
        pubsub.publish(pubsubEvents.ON_ROOM_UPDATE, {onRoomUpdate: this.room})
    }
}

export const newRoom = (room: RoomType): IRoom => new Room(room)

