import {PlayerType} from "./PlayerTypes";
import {gameStatusType} from "./GameTypes";


export type RoomType = {
    id: number
    name: string
    players: Array<PlayerType>
    gameStatus: gameStatusType
}

export type RoomFormType = {
    name: string
}

export type RoomInput = {
    name: string
}

export type PlayerInput = {
    id: number
    name: string
}

export type RoomSubscriptionInput = {
    id: number
}
