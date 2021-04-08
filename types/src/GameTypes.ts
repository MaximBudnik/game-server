import {PlayerEntityType} from "./PlayerTypes";

export type gameStatusType = 'lobby' | 'pause' | 'play'

export type GameType = {
    playerEntities: Array<PlayerEntityType>
}

export type updateGameStatusVars = {
    gameStatus: gameStatusType
    roomId: number
}

export type GameSubscriptionInput = {
    id: number
}
