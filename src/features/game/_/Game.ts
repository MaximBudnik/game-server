import {IPlayer, newPlayerEntity} from "../../player";
import {pubsub, pubsubEvents} from "../../../graphql/pubsub";
import {gameSettings} from "./gameSettings";
import {playerActionType} from "../../../../types";

export interface IGame {
    players: Array<IPlayer>
    start: () => void
    pause: () => void
    addPlayerActionToQueue: (action: playerActionType, playerId: number) => void
}

interface GameConstructorParams {
    players: Array<{ id: number }>;
    roomId: number
}

class Game implements IGame {
    players: Array<IPlayer> = []
    private readonly _roomId: number
    private loopActive = false

    constructor({players, roomId}: GameConstructorParams) {
        players.forEach((e, i) => this.players.push(newPlayerEntity({
            ...e,
            position: gameSettings.player.defaultPos(i)
        })))
        this._roomId = roomId
    }

    start = async () => {
        this.loopActive = true
        this.loop()
    }

    pause = () => {
        this.loopActive = false
    }

    addPlayerActionToQueue = (action: playerActionType, playerId: number) => {
        this.players.find(e => e.playerId === playerId).addActionQueue(action)
    }

    private loop = async () => {

        this.players.forEach(e => e.loopAction())


        this.publishPubsubChanges()
        if (!this.loopActive) return
        setTimeout(this.loop, gameSettings.loopTimeout);
    }

    private publishPubsubChanges = () => {
        pubsub.publish(pubsubEvents.ON_GAME_UPDATE, {
            onGameUpdate: {
                id: this._roomId,
                playerEntities: this.players.map(e => e.getEntityData())
            }
        })
    }
}

export const newGame = (params: GameConstructorParams): IGame => new Game(params)
